import { LayoutGrid, SlidersHorizontal, ArrowLeftRight, BookOpen } from 'lucide-react';

interface MobileBottomNavProps {
  compareCount: number;
  activeFilterCount: number;
  onOpenFilters: () => void;
  onJumpToCatalog: () => void;
  onJumpToCompare: () => void;
  onJumpToGuide: () => void;
}

export function MobileBottomNav({
  compareCount,
  activeFilterCount,
  onOpenFilters,
  onJumpToCatalog,
  onJumpToCompare,
  onJumpToGuide,
}: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobile quick navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 h-14 px-2 grid grid-cols-4 items-center"
    >
      <button
        type="button"
        onClick={onJumpToCatalog}
        className="min-h-[44px] flex flex-col items-center justify-center text-slate-700 hover:text-blue-700 transition-colors"
      >
        <LayoutGrid className="w-5 h-5" aria-hidden="true" />
        <span className="text-[10px] font-medium mt-0.5">Browse</span>
      </button>

      <button
        type="button"
        onClick={onOpenFilters}
        className="min-h-[44px] flex flex-col items-center justify-center text-slate-700 hover:text-blue-700 transition-colors"
      >
        <SlidersHorizontal className="w-5 h-5" aria-hidden="true" />
        <span className="text-[10px] font-medium mt-0.5 tabular-nums">
          Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
        </span>
      </button>

      <button
        type="button"
        onClick={onJumpToCompare}
        className="min-h-[44px] flex flex-col items-center justify-center text-blue-700 font-semibold transition-colors"
      >
        <ArrowLeftRight className="w-5 h-5" aria-hidden="true" />
        <span className="text-[10px] mt-0.5 tabular-nums">
          Compare{compareCount > 0 ? ` (${compareCount})` : ''}
        </span>
      </button>

      <button
        type="button"
        onClick={onJumpToGuide}
        className="min-h-[44px] flex flex-col items-center justify-center text-slate-700 hover:text-blue-700 transition-colors"
      >
        <BookOpen className="w-5 h-5" aria-hidden="true" />
        <span className="text-[10px] font-medium mt-0.5">Guide</span>
      </button>
    </nav>
  );
}
