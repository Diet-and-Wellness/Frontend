"use client";

import Script from "next/script";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

type GoogleAuthButtonProps = {
  label: string;
  loadingLabel: string;
  dividerLabel: string;
  mode: "signin" | "signup";
  onCredential: (credential: string) => void;
  onError: (error: Error) => void;
  disabled?: boolean;
};

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const GoogleAuthButton = ({
  label,
  loadingLabel,
  dividerLabel,
  mode,
  onCredential,
  onError,
  disabled = false,
}: GoogleAuthButtonProps) => {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const renderedWidthRef = useRef(0);
  const credentialRef = useRef(onCredential);
  const errorRef = useRef(onError);
  const reportedConfigurationErrorRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    credentialRef.current = onCredential;
    errorRef.current = onError;
  }, [onCredential, onError]);

  const renderButton = useCallback(() => {
    const container = containerRef.current;
    const googleIdentity = window.google?.accounts.id;

    if (!container || !googleIdentity || !initializedRef.current) return;

    const containerWidth = Math.floor(container.getBoundingClientRect().width);

    if (containerWidth <= 0) return;

    // Google Identity Services supports button widths up to 400px. Rendering
    // with the actual available width keeps the iframe from overflowing on
    // small screens while preserving the official button's proportions.
    const width = Math.min(containerWidth, 400);

    if (renderedWidthRef.current === width && container.childElementCount > 0) {
      return;
    }

    container.replaceChildren();
    googleIdentity.renderButton(container, {
      type: "standard",
      theme: "outline",
      size: "large",
      shape: "pill",
      logo_alignment: "left",
      text: mode === "signup" ? "signup_with" : "signin_with",
      width,
    });
    renderedWidthRef.current = width;
    setIsReady(true);
  }, [mode]);

  const initializeGoogle = useCallback(() => {
    const googleIdentity = window.google?.accounts.id;

    if (!googleIdentity || !containerRef.current) return;

    if (!googleClientId) {
      if (!reportedConfigurationErrorRef.current) {
        reportedConfigurationErrorRef.current = true;
        errorRef.current(
          new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured"),
        );
      }
      return;
    }

    if (!initializedRef.current) {
      googleIdentity.initialize({
        client_id: googleClientId,
        auto_select: false,
        cancel_on_tap_outside: true,
        callback: ({ credential }) => {
          if (credential) credentialRef.current(credential);
        },
      });
      initializedRef.current = true;
    }

    renderButton();
  }, [renderButton]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => renderButton());
    observer.observe(container);

    return () => observer.disconnect();
  }, [renderButton]);

  const reportScriptError = () => {
    setIsReady(false);
    errorRef.current(new Error("Google Identity Services failed to load"));
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <div
        aria-label={label}
        aria-busy={disabled || !isReady}
        className={`relative h-12.5 w-full overflow-hidden rounded-full ${
          disabled ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <div
          ref={containerRef}
          className="google-auth-button h-full w-full overflow-hidden rounded-full"
        />

        {!isReady && (
          <div className="type-control absolute inset-0 flex items-center justify-center gap-2 rounded-full border-2 border-line-strong bg-surface-raised font-semibold text-content-muted">
            <span className="size-4 animate-spin rounded-full border-2 border-brand/25 border-t-brand" />
            <span>{loadingLabel}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-line" />
        <span className="type-meta font-medium text-content-subtle">
          {dividerLabel}
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <Script
        id={`google-identity-services-${locale}`}
        src={`https://accounts.google.com/gsi/client?hl=${locale}`}
        strategy="afterInteractive"
        onReady={initializeGoogle}
        onError={reportScriptError}
      />
    </div>
  );
};

export default GoogleAuthButton;
