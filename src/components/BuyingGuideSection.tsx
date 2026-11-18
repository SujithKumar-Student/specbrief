export function BuyingGuideSection() {
  return (
    <section
      id="guide"
      className="bg-white border-t border-slate-200 py-12 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-medium text-slate-500 mb-1">
            Practical Decision Framework
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            How to Weigh Processor, RAM, and Trade-offs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2.5">
            <div className="font-mono text-xs font-semibold text-blue-700">
              01. Processor Fit
            </div>
            <h3 className="font-display text-base font-semibold text-slate-900">
              Match Silicon to Your Daily Workload
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              For silent all-day battery life on laptops, Apple M-Series and
              AMD Ryzen U/HS chips lead efficiency. On smartphones, Snapdragon 8
              Elite and Apple A18 sustain heavy gaming and 4K video better than
              Google Tensor or mid-tier chips.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="font-mono text-xs font-semibold text-blue-700">
              02. Memory Longevity
            </div>
            <h3 className="font-display text-base font-semibold text-slate-900">
              Don’t Under-Buy Soldered RAM
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Most modern ultrabooks and all smartphones ship with non-upgradeable
              memory. Target at least <strong>16 GB</strong> for laptops you plan
              to keep 4+ years, and <strong>8 GB to 12 GB</strong> on phones for
              smooth multitasking.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="font-mono text-xs font-semibold text-blue-700">
              03. Reading the Cons
            </div>
            <h3 className="font-display text-base font-semibold text-slate-900">
              Every Budget Tier Makes Compromises
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A lower price often trades away 120Hz displays, charging speed,
              wireless charging, or USB-A/HDMI ports. Reviewing each model’s
              cons upfront prevents buyer’s remorse after delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
