import { X, RotateCcw } from 'lucide-react';
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

interface MobileFilterSheetProps {
  isOpen: boolean;
  category: DeviceCategory;
  useCase: DeviceUseCase | 'All';
  currency: CurrencyCode;
  budget: number;
  selectedProcessor: ProcessorFamily | 'All';
  minRam: number | null;
  totalResults: number;
  onClose: () => void;
  onUseCaseChange: (useCase: DeviceUseCase | 'All') => void;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onBudgetChange: (val: number) => void;
  onProcessorChange: (proc: ProcessorFamily | 'All') => void;
  onMinRamChange: (ram: number | null) => void;
  onResetFilters: () => void;
}

export function MobileFilterSheet({
  isOpen,
  category,
  useCase,
  currency,
  budget,
  selectedProcessor,
  minRam,
  totalResults,
  onClose,
  onUseCaseChange,
  onCurrencyChange,
  onBudgetChange,
  onProcessorChange,
  onMinRamChange,
  onResetFilters,
}: MobileFilterSheetProps) {
  if (!isOpen) return null;

  const processors =
    category === 'laptop' ? LAPTOP_PROCESSORS : MOBILE_PROCESSORS;
  const ramOptions =
    category === 'laptop' ? LAPTOP_RAM_OPTIONS : MOBILE_RAM_OPTIONS;
  const useCases =
    category === 'laptop' ? LAPTOP_USE_CASES : MOBILE_USE_CASES;
  const bounds = CURRENCIES[currency].bounds[category];

  return (
    <div
      className="fixed inset-0 z-50 md:hidden flex items-end bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-filter-title"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full bg-white rounded-t-3xl max-h-[86vh] flex flex-col shadow-xl">
        {/* Grab handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Sheet Header */}
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
          <h2
            id="mobile-filter-title"
            className="font-display text-base font-semibold text-slate-900"
          >
            Filter {category === 'laptop' ? 'Laptops' : 'Mobiles'}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetFilters}
              className="min-h-[44px] px-3 text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Filter Body */}
        <div className="overflow-y-auto px-5 py-5 space-y-6">
          {/* Use-Case Focus */}
          <div className="space-y-2.5">
            <span className="block text-sm font-medium text-slate-900">
              Category Focus
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUseCaseChange('All')}
                className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium border text-left ${
                  useCase === 'All'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                All {category === 'laptop' ? 'Laptops' : 'Mobiles'}
              </button>
              {useCases.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onUseCaseChange(item)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium border text-left ${
                    useCase === item
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Currency Selector */}
          <div className="space-y-2.5">
            <span className="block text-sm font-medium text-slate-900">
              Currency
            </span>
            <div className="grid grid-cols-4 gap-2">
              {CURRENCY_LIST.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => onCurrencyChange(c.code)}
                  className={`min-h-[44px] px-2 py-2 rounded-xl font-mono text-xs font-semibold border transition-colors ${
                    currency === c.code
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {c.code} {c.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="mobile-budget-slider"
                className="text-sm font-medium text-slate-900"
              >
                Maximum Budget
              </label>
              <span className="font-mono text-base font-semibold text-blue-700 tabular-nums">
                {formatCurrencyAmount(budget, currency)}
              </span>
            </div>
            <input
              id="mobile-budget-slider"
              type="range"
              min={bounds.min}
              max={bounds.max}
              step={bounds.step}
              value={Math.min(Math.max(budget, bounds.min), bounds.max)}
              onChange={(e) => onBudgetChange(Number(e.target.value))}
              className="w-full budget-slider"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              {bounds.presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onBudgetChange(preset)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-xl font-mono text-xs font-medium tabular-nums border ${
                    budget === preset
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {formatCurrencyAmount(preset, currency)}
                </button>
              ))}
            </div>
          </div>

          {/* Processor */}
          <div className="space-y-2.5">
            <span className="block text-sm font-medium text-slate-900">
              Processor Family
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onProcessorChange('All')}
                className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium border text-left ${
                  selectedProcessor === 'All'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                All Processors
              </button>
              {processors.map((proc) => (
                <button
                  key={proc}
                  type="button"
                  onClick={() => onProcessorChange(proc)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium border text-left ${
                    selectedProcessor === proc
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {proc}
                </button>
              ))}
            </div>
          </div>

          {/* RAM */}
          <div className="space-y-2.5">
            <span className="block text-sm font-medium text-slate-900">
              Minimum RAM
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onMinRamChange(null)}
                className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium border ${
                  minRam === null
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Any RAM
              </button>
              {ramOptions.map((ram) => (
                <button
                  key={ram}
                  type="button"
                  onClick={() => onMinRamChange(ram)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl font-mono text-xs font-medium tabular-nums border ${
                    minRam === ram
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {ram} GB+
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pinned Action Footer */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[48px] bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-colors tabular-nums"
          >
            Show {totalResults} Matching {category === 'laptop' ? 'Laptops' : 'Mobiles'}
          </button>
        </div>
      </div>
    </div>
  );
}
