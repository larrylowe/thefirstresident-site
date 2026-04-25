"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faq";

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section-anchor paper-texture bg-aged py-24 text-ink">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <p className="mb-4 text-center text-sm uppercase tracking-[0.28em] text-tobacco">FAQ</p>
        <h2 className="text-center font-serif text-4xl md:text-6xl">Before you enter Briar Glen</h2>
        <div className="mt-12 divide-y divide-tobacco/25 border-y border-tobacco/25">
          {faqs.map((faq, index) => (
            <div key={faq.question}>
              <button className="flex w-full items-center justify-between gap-6 py-6 text-left" onClick={() => setOpen(open === index ? -1 : index)}>
                <span className="font-serif text-2xl">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition ${open === index ? "rotate-180" : ""}`} />
              </button>
              {open === index && <p className="pb-6 text-lg leading-8 text-ink/78">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
