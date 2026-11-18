import type { DeviceCategory } from '../data/devices';

interface HeaderProps {
  activeCategory: DeviceCategory;
  onSelectCategory: (cat: DeviceCategory) => void;
  compareCount: number;
  onJumpToCompare: () => void;
}

export function Header({
  activeCategory,
  onSelectCategory,
  compareCount,
  onJumpToCompare,
}: HeaderProps) {
  const handleCategoryNav = (cat: DeviceCategory) => {
    onSelectCategory(cat);
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 md:sticky md:top-0 md:z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 rounded"
        >
          SpecBrief
        </a>

        {/* Zone 2: 4 concise single-line text links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() => handleCategoryNav('laptop')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${
              activeCategory === 'laptop'
                ? 'border-blue-700 text-slate-900'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Laptops
          </button>
          <button
            type="button"
            onClick={() => handleCategoryNav('mobile')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${
              activeCategory === 'mobile'
                ? 'border-blue-700 text-slate-900'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Mobiles
          </button>
          <a
            href="#compare"
            className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:text-slate-900 hover:border-slate-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
          >
            Compare
          </a>
          <a
            href="#guide"
            className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:text-slate-900 hover:border-slate-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
          >
            Buying Guide
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onJumpToCompare}
            className="min-h-[44px] md:min-h-[40px] px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            {compareCount > 0 ? `Compare (${compareCount})` : 'Compare Models'}
          </button>
        </div>
      </div>
    </header>
  );
}
