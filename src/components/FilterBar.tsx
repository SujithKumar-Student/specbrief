import { Search, SlidersHorizontal, RotateCcw, ArrowUpDown } from 'lucide-react';
import {
  LAPTOP_PROCESSORS,
  MOBILE_PROCESSORS,
  LAPTOP_RAM_OPTIONS,
  MOBILE_RAM_OPTIONS,
  LAPTOP_USE_CASES,
  MOBILE_USE_CASES,
  type DeviceCategory,
  type DeviceUseCase,
  type ProcessorFamily,
} from '../data/devices';
import {
  CURRENCIES,
  CURRENCY_LIST,
  formatCurrencyAmount,
  type CurrencyCode,
} from '../utils/currency';

export type SortOption = 'best-match' | 'price-asc' | 'price-desc' | 'ram-desc';

interface FilterBarProps {
  category: DeviceCategory;
  useCase: DeviceUseCase | 'All';
  currency: CurrencyCode;
  budget: number;
  selectedProcessor: ProcessorFamily | 'All';
  minRam: number | null;
  searchQuery: string;
  sortBy: SortOption;
  totalResults: number;
  activeFilterCount: number;
  onCategoryChange: (cat: DeviceCategory) => void;
  onUseCaseChange: (useCase: DeviceUseCase | 'All') => void;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onBudgetChange: (val: number) => void;
  onProcessorChange: (proc: ProcessorFamily | 'All') => void;
  onMinRamChange: (ram: number | null) => void;
  onSearchChange: (q: string) => void;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  onOpenMobileSheet: () => void;
}

export function FilterBar({
  category,
  useCase,
  currency,
  budget,
  selectedProcessor,
  minRam,
  searchQuery,
  sortBy,
  totalResults,
  activeFilterCount,
  onCategoryChange,
  onUseCaseChange,
  onCurrencyChange,
  onBudgetChange,
  onProcessorChange,
  onMinRamChange,
  onSearchChange,
  onSortChange,
  onResetFilters,
  onOpenMobileSheet,
}: FilterBarProps) {
  const processors =
    category === 'laptop' ? LAPTOP_PROCESSORS : MOBILE_PROCESSORS;
  const ramOptions =
    category === 'laptop' ? LAPTOP_RAM_OPTIONS : MOBILE_RAM_OPTIONS;
  const useCases =
    category === 'laptop' ? LAPTOP_USE_CASES : MOBILE_USE_CASES;
  const bounds = CURRENCIES[currency].bounds[category];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-5">
      {/* Row 1: Category Toggle, Search, Sort & Mobile Filter Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center justify-between gap-2">
          <div
            role="group"
            aria-label="Device type"
            className="inline-flex p-1 bg-slate-100 rounded-xl"
          >
            <button
              type="button"
              onClick={() => onCategoryChange('laptop')}
              className={`min-h-[44px] sm:min-h-[38px] px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                category === 'laptop'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Laptops
            </button>
            <button
              type="button"
              onClick={() => onCategoryChange('mobile')}
              className={`min-h-[44px] sm:min-h-[38px] px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                category === 'mobile'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mobiles
            </button>
          </div>

          {/* Mobile Currency + Filter Triggers */}
          <div className="flex md:hidden items-center gap-2">
            <select
              aria-label="Select currency"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="min-h-[44px] px-2.5 py-2 border border-slate-300 bg-white rounded-xl font-mono text-xs font-semibold text-slate-800 focus:border-blue-700 focus:outline-none cursor-pointer"
            >
              {CURRENCY_LIST.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={onOpenMobileSheet}
              className="min-h-[44px] px-3.5 py-2 border border-slate-300 bg-white hover:bg-slate-50 rounded-xl text-sm font-medium text-slate-800 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span>
                Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 md:max-w-lg md:justify-end">
          <div className="relative flex-1">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={`Search ${category === 'laptop' ? 'MacBook, LOQ, ThinkPad, Ryzen...' : 'Pixel, iPhone, Galaxy, Snapdragon...'}`}
              aria-label="Search models by name, brand, or chip"
              className="w-full min-h-[44px] sm:min-h-[40px] pl-10 pr-3 py-2 bg-[#F8F9FA] border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
            />
          </div>

          <div className="relative shrink-0">
            <ArrowUpDown
              className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort results"
              className="w-full sm:w-auto min-h-[44px] sm:min-h-[40px] pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 focus:border-blue-700 focus:outline-none cursor-pointer"
            >
              <option value="best-match">Best Match Under Budget</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="ram-desc">Highest RAM First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Focus Filter Strip (Both Mobile Scroll & Desktop) */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
        <span className="text-xs font-medium text-slate-600 mr-1">
          Category:
        </span>
        <button
          type="button"
          onClick={() => onUseCaseChange('All')}
          className={`min-h-[40px] sm:min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            useCase === 'All'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
          }`}
        >
          All {category === 'laptop' ? 'Laptops' : 'Mobiles'}
        </button>
        {useCases.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onUseCaseChange(item)}
            className={`min-h-[40px] sm:min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              useCase === item
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Desktop Inline Filters: Budget Slider + Currency, Processor, RAM */}
      <div className="hidden md:grid grid-cols-12 gap-6 pt-4 border-t border-slate-100 items-start">
        {/* Budget Slider + Currency Selector */}
        <div className="col-span-4 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="desktop-budget-range"
                className="text-xs font-medium text-slate-600"
              >
                Max Budget
              </label>
              <select
                aria-label="Select currency"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="px-2 py-1 bg-[#F8F9FA] border border-slate-300 rounded-lg font-mono text-xs font-semibold text-slate-800 focus:border-blue-700 focus:outline-none cursor-pointer"
              >
                {CURRENCY_LIST.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <span className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
              {formatCurrencyAmount(budget, currency)}
            </span>
          </div>
          <input
            id="desktop-budget-range"
            type="range"
            min={bounds.min}
            max={bounds.max}
            step={bounds.step}
            value={Math.min(Math.max(budget, bounds.min), bounds.max)}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="w-full budget-slider cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-400 tabular-nums">
            <span>{formatCurrencyAmount(bounds.min, currency)}</span>
            <span>
              {formatCurrencyAmount(
                Math.round((bounds.min + bounds.max) / 2),
                currency,
              )}
            </span>
            <span>{formatCurrencyAmount(bounds.max, currency)}+</span>
          </div>
        </div>

        {/* Processor Family Filter */}
        <div className="col-span-4 space-y-2">
          <span className="block text-xs font-medium text-slate-600">
            Processor Family
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => onProcessorChange('All')}
              className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedProcessor === 'All'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
              }`}
            >
              All CPUs
            </button>
            {processors.map((proc) => (
              <button
                key={proc}
                type="button"
                onClick={() => onProcessorChange(proc)}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedProcessor === proc
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                }`}
              >
                {proc}
              </button>
            ))}
          </div>
        </div>

        {/* RAM Spec Filter */}
        <div className="col-span-4 space-y-2">
          <span className="block text-xs font-medium text-slate-600">
            Minimum RAM
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => onMinRamChange(null)}
              className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                minRam === null
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
              }`}
            >
              Any RAM
            </button>
            {ramOptions.map((ram) => (
              <button
                key={ram}
                type="button"
                onClick={() => onMinRamChange(ram)}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg font-mono text-xs font-medium tabular-nums border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  minRam === ram
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                }`}
              >
                {ram} GB+
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Summary & Active Filter Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-2 tabular-nums">
          <span>
            Showing <strong className="text-slate-900">{totalResults}</strong>{' '}
            {category === 'laptop' ? 'laptops' : 'mobiles'}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Budget &le;{' '}
            <strong className="font-mono text-slate-900">
              {formatCurrencyAmount(budget, currency)}
            </strong>
          </span>
          {useCase !== 'All' && (
            <>
              <span aria-hidden="true">·</span>
              <span>Category: {useCase}</span>
            </>
          )}
          {selectedProcessor !== 'All' && (
            <>
              <span aria-hidden="true">·</span>
              <span>CPU: {selectedProcessor}</span>
            </>
          )}
          {minRam !== null && (
            <>
              <span aria-hidden="true">·</span>
              <span>RAM &ge; {minRam} GB</span>
            </>
          )}
        </div>

        {(useCase !== 'All' ||
          selectedProcessor !== 'All' ||
          minRam !== null ||
          searchQuery.trim() !== '') && (
          <button
            type="button"
            onClick={onResetFilters}
            className="min-h-[36px] px-2.5 py-1 text-xs font-medium text-blue-700 hover:text-blue-800 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
