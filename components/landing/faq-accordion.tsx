"use client";

import { useState } from "react";
import type { FaqItem } from "@/app/content";

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1, 2]);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div
            key={item.question}
            className="card-surface overflow-hidden rounded-[24px] border border-forest-900/8"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              onClick={() =>
                setOpenIndexes((current) =>
                  isOpen ? current.filter((itemIndex) => itemIndex !== index) : [...current, index].sort((a, b) => a - b),
                )
              }
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-forest-900 sm:text-lg">
                {item.question}
              </span>
              <span className="text-2xl leading-none text-forest-700">{isOpen ? "-" : "+"}</span>
            </button>
            {isOpen ? (
              <div className="border-t border-forest-900/8 px-5 py-5 text-sm leading-7 text-forest-800/80 sm:px-6 sm:text-base">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
