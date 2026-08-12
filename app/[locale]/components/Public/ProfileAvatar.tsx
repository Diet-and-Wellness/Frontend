"use client";

import Image from "next/image";
import { useState } from "react";

type ProfileAvatarProps = {
  avatarUrl?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  className?: string;
  statusRingClassName?: string;
};

const ProfileAvatar = ({
  avatarUrl,
  firstName,
  lastName,
  className = "size-9",
  statusRingClassName = "shadow-[0_0_0_2px_var(--color-surface)]",
}: ProfileAvatarProps) => {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  const initials = `${firstName?.trim().at(0) ?? ""}${
    lastName?.trim().at(0) ?? ""
  }`.toUpperCase();
  const showImage = Boolean(avatarUrl) && avatarUrl !== failedUrl;

  return (
    <span className={`relative block shrink-0 ${className}`}>
      <span className="relative flex size-full items-center justify-center overflow-hidden rounded-full bg-accent">
        {showImage ? (
          <Image
            fill
            src={avatarUrl!}
            alt=""
            sizes="36px"
            className="object-cover"
            onError={() => setFailedUrl(avatarUrl ?? null)}
          />
        ) : (
          <span className="type-meta font-bold text-accent-contrast">
            {initials || "DW"}
          </span>
        )}
      </span>

      <span
        aria-hidden="true"
        className={`absolute -inset-e-0.5 -top-0.5 size-3 rounded-full bg-brand ${statusRingClassName}`}
      />
    </span>
  );
};

export default ProfileAvatar;
