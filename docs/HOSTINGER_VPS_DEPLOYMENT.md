# Hostinger VPS deployment — Diet Wellness frontend

This guide deploys this Next.js 16 repository as the frontend half of the two-repository system. Replace all example domains and placeholders.

## 1. Final architecture

```text
Cloudflare
    |
    v
Nginx :80/:443
    |-- example.com      -> Next.js on 127.0.0.1:3000
    `-- api.example.com  -> backend on 127.0.0.1:5000
```

PM2 manages Node.js; Nginx handles public HTTP/HTTPS. This repository supplies `diet-wellness-frontend` on port 3000 using standard `next start`.

## 2. Values the user must replace

| Placeholder | Production value |
|---|---|
| `example.com`, `api.example.com` | Final domains |
| `VPS_IP` | VPS public IPv4 |
| `GITHUB_OWNER` | GitHub owner |
| `Diet-Wellness`, `nutrition-be` | Actual frontend/backend repository names |
| Frontend/backend ports | `3000` / `5000` |
| Deploy directories | `/var/www/frontend`, `/var/www/backend` |
| Node version | `20.19.5` from `.nvmrc` |

## 3. Initial root login

```bash
ssh root@VPS_IP
```

Keep this session open until the new login works.

## 4. Update Ubuntu and install base packages

```bash
apt update
apt upgrade -y
apt install -y git curl nginx ufw build-essential ca-certificates
```

No additional native frontend packages were identified.

## 5. Create the non-root deploy user

```bash
adduser deploy
usermod -aG sudo deploy
install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
cp /root/.ssh/authorized_keys /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
```

If root has no key, add the administrator's public key (never private key). Test `ssh deploy@VPS_IP` from a second terminal first.

## 6. SSH hardening

After key login succeeds, keep root open and run:

```bash
cat >/etc/ssh/sshd_config.d/99-hardening.conf <<'EOF'
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
EOF
sshd -t
systemctl reload ssh || systemctl reload sshd
```

Test another deploy login before closing root. Ubuntu commonly calls the service `ssh`; some images use `sshd`. Allow any custom SSH port before changing it. Never risk lockout by reversing this order.

## 7. Configure UFW

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status verbose
```

Do not open ports 3000 or 5000.

## 8. Install the repository's required Node.js version

As `deploy`:

```bash
su - deploy
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm install 20.19.5
nvm alias default 20.19.5
node --version
```

Verify the NVM release/source before executing it. The deployment script explicitly loads NVM for non-interactive Actions SSH sessions.

## 9. Install PM2

```bash
npm install -g pm2
pm2 --version
pm2 startup
```

Run exactly the sudo command PM2 prints, then later run `pm2 start ecosystem.config.cjs`, `pm2 status`, `pm2 logs`, and `pm2 save`. `pm2 save` persists processes across reboot.

## 10. Create application directories

As root:

```bash
mkdir -p /var/www/frontend /var/www/backend
chown -R deploy:deploy /var/www/frontend /var/www/backend
```

## 11. Give the VPS read access to GitHub

As `deploy`, create separate repository keys:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/github_frontend -C 'example-frontend-vps' -N ''
ssh-keygen -t ed25519 -f ~/.ssh/github_backend -C 'example-backend-vps' -N ''
cat ~/.ssh/github_frontend.pub
cat ~/.ssh/github_backend.pub
```

Add each public key under that GitHub repository's **Settings → Deploy keys** with write access disabled. Put this in `~/.ssh/config` and set mode 600:

```sshconfig
Host github-frontend
  HostName github.com
  User git
  IdentityFile ~/.ssh/github_frontend
  IdentitiesOnly yes

Host github-backend
  HostName github.com
  User git
  IdentityFile ~/.ssh/github_backend
  IdentitiesOnly yes
```

Compare GitHub's officially published host-key fingerprints with `ssh-keyscan github.com` output through a trusted channel before adding it to `known_hosts`. Test `ssh -T github-frontend` and `ssh -T github-backend`; GitHub may return exit 1 with a successful authentication message. These VPS→GitHub keys are distinct from the Actions→VPS key.

## 12. Clone the repository

```bash
git clone git@github-frontend:GITHUB_OWNER/Diet-Wellness.git /var/www/frontend
git clone git@github-backend:GITHUB_OWNER/nutrition-be.git /var/www/backend
```

## 13. Create production environment files

```bash
cd /var/www/frontend
cp .env.example .env.production
chmod 600 .env.production
```

Set `NEXT_PUBLIC_API_URL=https://api.example.com/api`. This is intentionally public, browser-visible, and embedded during `next build`; never put secrets in `NEXT_PUBLIC_*`, and rebuild after changing it. The backend separately needs mode-600 `/var/www/backend/.env`, including `FRONTEND_URL=https://example.com`; see its `.env.example`. Never commit either production file.

## 14. First manual build and launch

```bash
cd /var/www/frontend
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use
npm ci
npm run lint
npm run build
mkdir -p logs
pm2 start ecosystem.config.cjs
pm2 save
curl --fail http://127.0.0.1:3000/api/health
pm2 logs diet-wellness-frontend --lines 100 --nostream
```

Prove the manual deployment before Actions. Standard `next start` was retained; standalone copying is unnecessary for this single-server install.

## 15. Nginx configuration

Create `/etc/nginx/sites-available/example-frontend`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_buffering off;
        proxy_read_timeout 60s;
    }
}
```

Upgrade headers cover current/future WebSockets; none were found. Buffering is disabled for Next.js streaming. No enlarged frontend body limit is justified. The backend matching block has `server_name api.example.com`, proxies to `127.0.0.1:5000`, and uses `client_max_body_size 10m` for its 5 MB uploads.

```bash
ln -s /etc/nginx/sites-available/example-frontend /etc/nginx/sites-enabled/example-frontend
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

## 16. Cloudflare DNS setup

Create A `@ → VPS_IP`, CNAME `www → example.com`, and A `api → VPS_IP`. DNS-only is easiest while troubleshooting DNS and certificate issuance. Enable proxying afterward if desired; proxied HTTP/HTTPS then passes through Cloudflare. Cloudflare does not automatically install the VPS origin certificate.

## 17. HTTPS setup

After both HTTP Nginx sites and DNS work:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d example.com -d www.example.com
certbot --nginx -d api.example.com
nginx -t
systemctl status certbot.timer
certbot renew --dry-run
```

Complete Certbot prompts. Select Cloudflare **Full (strict)** with valid origin certificates; never Flexible.

## 18. Create the GitHub Actions deployment SSH key

Direction: **GitHub Actions runner → VPS**. On a trusted administrator machine:

```bash
ssh-keygen -t ed25519 -f github_actions_example_frontend -C 'github-actions-frontend' -N ''
```

Append only the public key to `/home/deploy/.ssh/authorized_keys`, ensure `deploy:deploy`, mode 600, and test it. Put only the no-passphrase private key in `VPS_SSH_PRIVATE_KEY`; do not reuse personal keys. Command restriction is possible after validating the exact workflow.

## 19. Configure GitHub repository secrets

Under **Settings → Secrets and variables → Actions**, add `VPS_HOST`, `VPS_PORT` (`22` unless changed), `VPS_USER` (`deploy`), `VPS_SSH_PRIVATE_KEY`, and `VPS_KNOWN_HOSTS`. Produce a candidate with `ssh-keyscan -p 22 VPS_IP`, but verify its fingerprint against Hostinger console/trusted access before saving; never trust an unverified network scan.

## 20. GitHub Actions behavior

Direct pushes and merged PRs both produce pushes to `main` and deploy. Unmerged PRs do not. `workflow_dispatch` allows manual deployment. Repository concurrency prevents overlapping production runs.

## 21. First automated deployment

Commit on a feature branch, push, review the PR, and merge. Inspect Actions logs; then inspect PM2/Nginx, curl local and public health URLs, open both domains, and confirm a frontend API request succeeds.

## 22. Deployment flow

```text
push/merge to main
  -> GitHub Actions
  -> SSH as deploy
  -> scripts/deploy.sh
  -> fetch/reset origin/main
  -> npm ci
  -> next build
  -> PM2 startOrReload
  -> GET /api/health
```

## 23. Rollback procedure

This is an in-place, non-atomic deployment. Find a healthy SHA and run:

```bash
cd /var/www/frontend
git fetch origin
git reset --hard HEALTHY_COMMIT_SHA
npm ci
npm run build
pm2 startOrReload ecosystem.config.cjs --update-env
curl --fail http://127.0.0.1:3000/api/health
```

Ignored `.env.production` remains. A later normal deployment returns to `origin/main`. Backend database migrations, if ever introduced, may not be reversible; back up first and never perform destructive rollback without a backup.

## 24. Logs and troubleshooting

```bash
pm2 status
pm2 logs diet-wellness-frontend --lines 200
pm2 describe diet-wellness-frontend
journalctl -u pm2-deploy --since today
nginx -t
systemctl status nginx
tail -f /var/log/nginx/access.log /var/log/nginx/error.log
curl -v http://127.0.0.1:3000/api/health
curl -v https://example.com/api/health
dig +short example.com api.example.com
git -C /var/www/frontend remote -v
ssh -T github-frontend
ss -ltnp | grep ':3000'
```

For Actions SSH errors verify key formatting, user, port, authorization, and pinned host key. For build/runtime errors check Node version, ownership, disk/RAM, and `.env.production` presence without printing secrets. A wrong `NEXT_PUBLIC_API_URL` requires rebuilding. Backend CORS must exactly include `https://example.com`. Check backend health/migrations separately. `EADDRINUSE` means a port collision; permission errors usually mean incorrect `deploy` ownership.

## 25. Security checklist

- Non-root app user; root/password SSH disabled only after verified key login.
- Dedicated Actions key and read-only repository deploy keys.
- App ports loopback-only; UFW permits only SSH and Nginx.
- HTTPS is public; secrets remain in mode-600 VPS files and out of logs.
- Regular OS updates and backups before data changes.
- Cloudflare Full (strict); SSH host verification stays enabled.

## 26. Final verification checklist

- [ ] Frontend opens at `https://example.com`
- [ ] `www` redirects correctly
- [ ] Backend responds at `https://api.example.com/api/health`
- [ ] Frontend calls backend successfully
- [ ] Certificate is valid and renewal active
- [ ] PM2 survives reboot
- [ ] UFW is active; ports 3000/5000 are not public
- [ ] Push/merge to `main` deploys automatically
- [ ] Failed builds do not restart the working process
- [ ] Logs are available
- [ ] Production environment files are not committed

## 27. Remaining manual actions

## Manual actions still required

1. Choose final domains, IP, GitHub names, and replace repository/VPS placeholders.
2. Run VPS setup, user, SSH, firewall, NVM, PM2, directory, and clone commands.
3. Verify SSH/GitHub fingerprints using trusted channels.
4. Add separate read-only repository deploy keys.
5. Write frontend `.env.production` and backend `.env` on the VPS.
6. Create both Nginx sites and Cloudflare DNS records.
7. Complete Certbot and select Cloudflare Full (strict).
8. Create dedicated Actions→VPS keys and all five secrets in each repository.
9. Prove manual builds, then merge deployment files and inspect automated runs.
10. Reboot-test PM2 and complete every verification checkbox.
