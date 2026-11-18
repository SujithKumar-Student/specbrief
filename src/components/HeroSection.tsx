import { useEffect, useState } from 'react';
import { Laptop, Smartphone, ArrowDown } from 'lucide-react';
import {
  HERO_IMAGE,
  LAPTOP_USE_CASES,
  MOBILE_USE_CASES,
  type DeviceCategory,
  type DeviceUseCase,
} from '../data/devices';
import {
  CURRENCIES,
  CURRENCY_LIST,
  formatCurrencyAmount,
  type CurrencyCode,
} from '../utils/currency';

interface HeroSectionProps {
  category: DeviceCategory;
  useCase: DeviceUseCase | 'All';
  currency: CurrencyCode;
  budget: number;
  matchCount: number;
  onCategoryChange: (cat: DeviceCategory) => void;
  onUseCaseChange: (useCase: DeviceUseCase | 'All') => void;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onBudgetChange: (val: number) => void;
  onExploreClick: () => void;
}

const RETAILER_SUMMARY: Record<CurrencyCode, string> = {
  USD: 'Amazon · Best Buy · B&H Photo · Official Stores',
  EUR: 'Amazon DE · MediaMarkt · Cyberport · Official Stores',
  GBP: 'Amazon UK · Currys · John Lewis · Official Stores',
  INR: 'Amazon India · Flipkart · Reliance Digital · Official Stores',
};

export function HeroSection({
  category,
  useCase,
  currency,
  budget,
  matchCount,
  onCategoryChange,
  onUseCaseChange,
  onCurrencyChange,
  onBudgetChange,
  onExploreClick,
}: HeroSectionProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [budgetText, setBudgetText] = useState(() => String(budget));
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  const currencyCfg = CURRENCIES[currency];
  const bounds = currencyCfg.bounds[category];
  const useCases =
    category === 'laptop' ? LAPTOP_USE_CASES : MOBILE_USE_CASES;

  useEffect(() => {
    if (!isEditingBudget) {
      setBudgetText(String(budget));
    }
  }, [budget, isEditingBudget]);

  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Headline & Quick Budget Launcher */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-slate-500 mb-3">
                Hardware Buyer Advisor · Laptops &amp; Smartphones
              </p>
              <h1 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold tracking-tight text-slate-900 leading-[1.12] [text-wrap:balance] mb-4">
                Find the right laptop or phone under your budget.
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                Pick a starting category, set your currency and budget, filter by
                processor and RAM, inspect honest cons, and compare models
                side-by-side.
              </p>
            </div>

            {/* Interactive Budget, Start Category, Currency & Device Switcher */}
            <div className="bg-[#F8F9FA] border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div
                  role="group"
                  aria-label="Select device category"
                  className="inline-flex items-center p-1 bg-slate-200/75 rounded-xl"
                >
                  <button
                    type="button"
                    onClick={() => onCategoryChange('laptop')}
                    className={`min-h-[44px] sm:min-h-[40px] px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                      category === 'laptop'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Laptop className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Laptops</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onCategoryChange('mobile')}
                    className={`min-h-[44px] sm:min-h-[40px] px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                      category === 'mobile'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Mobiles</span>
                  </button>
                </div>

                <div className="text-sm text-slate-600 tabular-nums">
                  <span className="font-semibold text-slate-900">{matchCount}</span>{' '}
                  {matchCount === 1 ? 'model' : 'models'} under{' '}
                  <span className="font-mono font-semibold text-slate-900">
                    {formatCurrencyAmount(budget, currency)}
                  </span>
                </div>
              </div>

              {/* Start Categories (Use-Case Focus) */}
              <div>
                <span className="block text-xs font-medium text-slate-600 mb-1.5">
                  Start with a Category ({category === 'laptop' ? 'Laptops' : 'Phones'})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => onUseCaseChange('All')}
                    className={`min-h-[44px] sm:min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                      useCase === 'All'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    All
                  </button>
                  {useCases.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => onUseCaseChange(item)}
                      className={`min-h-[44px] sm:min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                        useCase === item
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency + Numeric Budget Input Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="hero-currency-select"
                    className="block text-xs font-medium text-slate-600 mb-1"
                  >
                    Currency
                  </label>
                  <select
                    id="hero-currency-select"
                    value={currency}
                    onChange={(e) =>
                      onCurrencyChange(e.target.value as CurrencyCode)
                    }
                    className="w-full min-h-[44px] px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-semibold text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20 cursor-pointer"
                  >
                    {CURRENCY_LIST.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-8">
                  <label
                    htmlFor="hero-budget-input"
                    className="block text-xs font-medium text-slate-600 mb-1"
                  >
                    Maximum Budget ({currencyCfg.code})
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-sm font-mono font-medium text-slate-500">
                      {currencyCfg.symbol}
                    </span>
                    <input
                      id="hero-budget-input"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder={String(bounds.defaultBudget)}
                      value={budgetText}
                      onFocus={() => setIsEditingBudget(true)}
                      onBlur={() => {
                        setIsEditingBudget(false);
                        if (budgetText.trim() === '') {
                          setBudgetText(String(budget));
                        } else {
                          const parsed = Number(budgetText);
                          if (!Number.isNaN(parsed) && parsed > 0) {
                            setBudgetText(String(parsed));
                          } else {
                            setBudgetText(String(budget));
                          }
                        }
                      }}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/[^0-9]/g, '');
                        const normalized = digitsOnly.replace(/^0+/, '');
                        setBudgetText(normalized);
                        if (normalized !== '') {
                          onBudgetChange(Number(normalized));
                        }
                      }}
                      className="w-full min-h-[44px] pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-semibold text-slate-900 tabular-nums focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Budget Presets */}
              <div>
                <span className="block text-xs font-medium text-slate-600 mb-1.5">
                  Quick Budget Presets
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {bounds.presets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => onBudgetChange(preset)}
                      className={`min-h-[44px] sm:min-h-[36px] px-3 py-1.5 rounded-lg font-mono text-xs font-medium tabular-nums border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                        budget === preset
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {formatCurrencyAmount(preset, currency)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="min-h-[44px] px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-xl inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  <span>
                    Browse Matching {category === 'laptop' ? 'Laptops' : 'Mobiles'}
                  </span>
                  <ArrowDown className="w-4 h-4" aria-hidden="true" />
                </button>
                <span className="text-xs text-slate-500">
                  {RETAILER_SUMMARY[currency]}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Hardware Image */}
          <div className="lg:col-span-6">
            <div className="h-full min-h-[240px] sm:min-h-[320px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              {!imgFailed ? (
                <img
                  src={HERO_IMAGE}
                  alt="Brushed aluminum ultrabook laptop and titanium smartphone on architectural stone surface"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full lg:h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <div className="flex items-center gap-4 text-slate-400 mb-3">
                    <Laptop className="w-10 h-10" aria-hidden="true" />
                    <Smartphone className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    Laptop &amp; Smartphone Hardware Comparison
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
