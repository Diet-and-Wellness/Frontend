module.exports = {
  apps: [
    {
      name: "diet-wellness-frontend",
      cwd: __dirname,
      script: "./node_modules/next/dist/bin/next",
      args: "start --hostname 127.0.0.1 --port 3000",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
      watch: false,
      autorestart: true,
      restart_delay: 3000,
      max_memory_restart: "2G",
      kill_timeout: 10000,
      listen_timeout: 10000,
      max_restarts: 10,
      min_uptime: "10s",
      error_file: "./logs/err.fe.log",
      out_file: "./logs/out.fe.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
    },
  ],
};
