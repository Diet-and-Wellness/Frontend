"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

export type FilterOption = {
  value: string;
  label: string;
};

type FilterSelectProps = {
  ariaLabel: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

const FilterSelect = ({
  ariaLabel,
  value,
  options,
  onChange,
  disabled = false,
}: FilterSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const listboxId = `${generatedId}-listbox`;
  const selectedIndex = Math.max(
    options.findIndex((option) => option.value === value),
    0,
  );
  const selectedOption = options[selectedIndex] ?? options[0];

  const close = () => setIsOpen(false);

  const open = () => {
    if (disabled) return;
    setHighlightedIndex(selectedIndex);
    setIsOpen(true);
    requestAnimationFrame(() => listRef.current?.focus());
  };

  const select = (option: FilterOption) => {
    onChange(option.value);
    close();
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideInteraction = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", handleOutsideInteraction);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideInteraction);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((current) =>
        Math.min(current + 1, options.length - 1),
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setHighlightedIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setHighlightedIndex(options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = options[highlightedIndex];
      if (option) select(option);
    }
  };

  return (
    <div ref={rootRef} className="relative w-full sm:w-auto">
      <motion.button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={disabled}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter") {
            event.preventDefault();
            open();
          }
        }}
        className={`flex min-h-12 w-full items-center justify-between gap-4 rounded-xl border bg-surface-raised px-4.5 py-2.5 text-start outline-none transition-[border-color,box-shadow,background-color] sm:min-w-43 ${
          disabled
            ? "cursor-not-allowed border-line text-content-placeholder opacity-65"
            : "cursor-pointer border-line text-content hover:border-brand/55 hover:bg-brand-soft/35 focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-brand/10"
        }`}
      >
        <span className="truncate text-sm font-medium sm:text-base">
          {selectedOption?.label}
        </span>
        <motion.svg
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          viewBox="0 0 20 20"
          fill="none"
          className="size-5 shrink-0 text-brand"
        >
          <path
            d="m5 7.5 5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={listRef}
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            aria-label={ariaLabel}
            aria-activedescendant={
              options[highlightedIndex]
                ? `${listboxId}-${highlightedIndex}`
                : undefined
            }
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onKeyDown={handleListKeyDown}
            className="absolute inset-x-0 top-full z-40 mt-2 max-h-72 min-w-full overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface-raised p-2 shadow-[0_20px_55px_rgba(17,24,39,0.18)] outline-none sm:min-w-56"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = highlightedIndex === index;

              return (
                <button
                  key={option.value || "all"}
                  id={`${listboxId}-${index}`}
                  type="button"
                  role="option"
                  tabIndex={-1}
                  aria-selected={isSelected}
                  onPointerMove={() => setHighlightedIndex(index)}
                  onClick={() => select(option)}
                  className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition-colors ${
                    isHighlighted
                      ? "bg-brand-soft text-brand-ink"
                      : "text-content hover:bg-surface-muted"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-brand-contrast">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="size-3.5"
                      >
                        <path
                          d="m4 10 4 4 8-8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterSelect;
