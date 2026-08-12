"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { COUNTRY_CODES, countryCodeToFlag } from "./countries";
import FieldError from "./FieldError";

type CountrySelectProps = {
  label: string;
  value: string;
  onChange: (countryCode: string) => void;
  onBlur: () => void;
  placeholder: string;
  searchPlaceholder: string;
  noResults: string;
  error?: string;
  disabled?: boolean;
};

type CountryOption = {
  code: string;
  label: string;
  flag: string;
};

const CountrySelect = ({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  searchPlaceholder,
  noResults,
  error,
  disabled,
}: CountrySelectProps) => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const triggerId = `${generatedId}-trigger`;
  const listboxId = `${generatedId}-listbox`;
  const errorId = `${generatedId}-error`;

  const countries = useMemo<CountryOption[]>(() => {
    const names = new Intl.DisplayNames([locale], { type: "region" });

    return COUNTRY_CODES.map((code) => ({
      code,
      label: names.of(code) ?? code,
      flag: countryCodeToFlag(code),
    })).sort((first, second) =>
      first.label.localeCompare(second.label, locale),
    );
  }, [locale]);

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);
    if (!normalizedQuery) return countries;

    return countries.filter(
      (country) =>
        country.label.toLocaleLowerCase(locale).includes(normalizedQuery) ||
        country.code.toLocaleLowerCase(locale).includes(normalizedQuery),
    );
  }, [countries, locale, query]);

  const selectedCountry = countries.find((country) => country.code === value);

  const close = () => {
    setIsOpen(false);
    setQuery("");
    setHighlightedIndex(0);
  };

  const selectCountry = (country: CountryOption) => {
    onChange(country.code);
    close();
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideInteraction = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
        onBlur();
      }
    };

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handleOutsideInteraction);
    document.addEventListener("keydown", handleEscape);
    requestAnimationFrame(() => searchRef.current?.focus());

    return () => {
      document.removeEventListener("pointerdown", handleOutsideInteraction);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onBlur]);

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((current) =>
        Math.min(current + 1, filteredCountries.length - 1),
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const country = filteredCountries[highlightedIndex];
      if (country) selectCountry(country);
    }
  };

  return (
    <motion.div layout ref={rootRef} className="relative flex flex-col gap-2">
      <label htmlFor={triggerId} className="type-label font-medium text-content-strong">
        {label}
        <span aria-hidden="true" className="ms-1 text-danger">
          *
        </span>
      </label>

      <motion.button
        ref={triggerRef}
        id={triggerId}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        disabled={disabled}
        onBlur={(event) => {
          if (!rootRef.current?.contains(event.relatedTarget as Node)) onBlur();
        }}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter") {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
        className={`flex h-12.5 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border-2 bg-surface-raised px-3.5 text-start text-base outline-none transition-[border-color,box-shadow] duration-200 hover:border-brand/45 focus:border-brand focus:ring-4 focus:ring-brand/10 ${
          error ? "border-danger focus:border-danger focus:ring-danger/10" : "border-line-strong"
        }`}
      >
        <span className={`flex min-w-0 items-center gap-2.5 ${selectedCountry ? "text-content" : "text-content-placeholder"}`}>
          {selectedCountry && <span className="text-xl leading-none">{selectedCountry.flag}</span>}
          <span className="truncate">{selectedCountry?.label ?? placeholder}</span>
        </span>
        <motion.svg
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          viewBox="0 0 20 20"
          fill="none"
          className="size-5 shrink-0 text-content-muted"
        >
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.button>

      <FieldError id={errorId} message={error} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-line bg-surface-raised p-2 shadow-[0_20px_55px_rgba(17,24,39,0.18)]"
          >
            <div className="relative mb-2">
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="absolute start-3 top-1/2 size-4.5 -translate-y-1/2 text-content-subtle">
                <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="m12.5 12.5 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setHighlightedIndex(0);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                aria-activedescendant={
                  filteredCountries[highlightedIndex]
                    ? `${listboxId}-option-${filteredCountries[highlightedIndex].code}`
                    : undefined
                }
                className="h-10 w-full rounded-xl border border-line bg-surface-muted ps-10 pe-3 text-sm text-content outline-none transition focus:border-brand focus:ring-3 focus:ring-brand/10 placeholder:text-content-placeholder"
              />
            </div>

            <div id={listboxId} role="listbox" className="max-h-60 overflow-y-auto overscroll-contain p-1">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => {
                  const isSelected = country.code === value;
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <button
                      key={country.code}
                      id={`${listboxId}-option-${country.code}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onPointerMove={() => setHighlightedIndex(index)}
                      onClick={() => selectCountry(country)}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-start text-sm transition-colors ${
                        isHighlighted ? "bg-brand-soft text-brand-ink" : "text-content hover:bg-surface-muted"
                      }`}
                    >
                      <span className="text-xl leading-none">{country.flag}</span>
                      <span className="min-w-0 flex-1 truncate">{country.label}</span>
                      <span className="type-meta text-content-subtle">{country.code}</span>
                      {isSelected && (
                        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4.5 text-brand">
                          <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  );
                })
              ) : (
                <p className="type-label px-3 py-8 text-center text-content-muted">{noResults}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CountrySelect;
