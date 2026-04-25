import { BookOpen, FileText, LockKeyhole, BadgeCheck } from "lucide-react";

// The trust bar highlights three key reasons to purchase: immediate access,
// secure checkout, and a polished PDF reading experience.  We deliberately
// avoid promises of refunds or generic "official site" claims here.
const items = [
  { icon: BookOpen, title: "Instant Download", text: "Read immediately on any device" },
  { icon: LockKeyhole, title: "Secure Payment", text: "Processed securely by Stripe" },
  { icon: FileText, title: "PDF Format", text: "Designed for a rich reading experience" }
];

export function TrustBar() {
  return (
    <section className="bg-moss py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 md:grid-cols-4 md:px-8">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-4 border-antique/15 md:border-r md:last:border-r-0">
            <item.icon className="h-8 w-8 text-antique" strokeWidth={1.5} />
            <div>
              <p className="font-serif text-base uppercase tracking-[0.12em] text-parchment">{item.title}</p>
              <p className="text-sm text-aged">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
