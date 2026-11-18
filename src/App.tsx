import { useEffect, useMemo, useState } from 'react';
import {
  DEVICES,
  type DeviceCategory,
  type DeviceModel,
  type DeviceUseCase,
  type ProcessorFamily,
} from './data/devices';
import {
  CURRENCIES,
  convertBudgetBetweenCurrencies,
  formatCurrencyAmount,
  getBestLocalPrice,
  type CurrencyCode,
} from './utils/currency';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar, type SortOption } from './components/FilterBar';
import { MobileFilterSheet } from './components/MobileFilterSheet';
import { DeviceCard } from './components/DeviceCard';
import { CompareSection } from './components/CompareSection';
import { DeviceDetailModal } from './components/DeviceDetailModal';
import { BuyingGuideSection } from './components/BuyingGuideSection';
import { MobileBottomNav } from './components/MobileBottomNav';

const CURRENCY_STORAGE_KEY = 'specbrief_currency_v1';

function getInitialCurrency(): CurrencyCode {
  try {
    const saved = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (saved === 'USD' || saved === 'EUR' || saved === 'GBP' || saved === 'INR') {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'USD';
}

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>(getInitialCurrency);
  const [category, setCategory] = useState<DeviceCategory>('laptop');
  const [useCase, setUseCase] = useState<DeviceUseCase | 'All'>('All');
  const [budgets, setBudgets] = useState<Record<DeviceCategory, number>>(() => {
    const initial = getInitialCurrency();
    return {
      laptop: CURRENCIES[initial].bounds.laptop.defaultBudget,
      mobile: CURRENCIES[initial].bounds.mobile.defaultBudget,
    };
  });

  const [selectedProcessor, setSelectedProcessor] = useState<
    ProcessorFamily | 'All'
  >('All');
  const [minRam, setMinRam] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('best-match');

  const [compareIdsByCategory, setCompareIdsByCategory] = useState<
    Record<DeviceCategory, string[]>
  >({
    laptop: ['macbook-air-m4-16', 'asus-zenbook-14-oled-ultra5'],
    mobile: ['google-pixel-9-12gb', 'samsung-galaxy-s25-12gb'],
  });

  const [inspectedDevice, setInspectedDevice] = useState<DeviceModel | null>(
    null,
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    } catch {
      // Ignore storage access errors
    }
  }, [currency]);

  const currentBudget = budgets[category];
  const currentCompareIds = compareIdsByCategory[category];

  const handleCurrencyChange = (nextCurrency: CurrencyCode) => {
    if (nextCurrency === currency) return;
    setBudgets((prev) => ({
      laptop: convertBudgetBetweenCurrencies(prev.laptop, currency, nextCurrency),
      mobile: convertBudgetBetweenCurrencies(prev.mobile, currency, nextCurrency),
    }));
    setCurrency(nextCurrency);
  };

  const handleCategoryChange = (nextCategory: DeviceCategory) => {
    if (nextCategory === category) return;
    setCategory(nextCategory);
    setUseCase('All');
    setSelectedProcessor('All');
    setMinRam(null);
    setSearchQuery('');
  };

  const handleBudgetChange = (val: number) => {
    setBudgets((prev) => ({
      ...prev,
      [category]: val,
    }));
  };

  const handleResetFilters = () => {
    setUseCase('All');
    setSelectedProcessor('All');
    setMinRam(null);
    setSearchQuery('');
    setSortBy('best-match');
  };

  const filteredDevices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matches = DEVICES.filter((device) => {
      if (device.category !== category) return false;
      if (useCase !== 'All' && !device.useCases.includes(useCase)) return false;
      const bestPrice = getBestLocalPrice(device, currency);
      if (bestPrice > currentBudget) return false;
      if (
        selectedProcessor !== 'All' &&
        device.processorFamily !== selectedProcessor
      ) {
        return false;
      }
      if (minRam !== null && device.ramGb < minRam) return false;
      if (query) {
        const haystack = `${device.brand} ${device.name} ${device.processor} ${device.tagline} ${device.useCases.join(' ')}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    return matches.sort((a, b) => {
      const priceA = getBestLocalPrice(a, currency);
      const priceB = getBestLocalPrice(b, currency);
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'ram-desc') {
        if (b.ramGb !== a.ramGb) return b.ramGb - a.ramGb;
        return priceA - priceB;
      }
      if (b.ramGb !== a.ramGb) return b.ramGb - a.ramGb;
      return priceB - priceA;
    });
  }, [
    category,
    useCase,
    currency,
    currentBudget,
    selectedProcessor,
    minRam,
    searchQuery,
    sortBy,
  ]);

  // Helpful suggestion when current budget is below cheapest matching spec
  const cheapestMatchingSpecPrice = useMemo(() => {
    const specMatches = DEVICES.filter((device) => {
      if (device.category !== category) return false;
      if (useCase !== 'All' && !device.useCases.includes(useCase)) return false;
      if (
        selectedProcessor !== 'All' &&
        device.processorFamily !== selectedProcessor
      ) {
        return false;
      }
      if (minRam !== null && device.ramGb < minRam) return false;
      return true;
    });
    if (specMatches.length === 0) return null;
    return Math.min(
      ...specMatches.map((d) => getBestLocalPrice(d, currency)),
    );
  }, [category, useCase, currency, selectedProcessor, minRam]);

  const comparedDevices = useMemo(() => {
    return currentCompareIds
      .map((id) => DEVICES.find((d) => d.id === id))
      .filter((d): d is DeviceModel => Boolean(d));
  }, [currentCompareIds]);

  const handleToggleCompare = (device: DeviceModel) => {
    setCompareIdsByCategory((prev) => {
      const list = prev[category];
      if (list.includes(device.id)) {
        return { ...prev, [category]: list.filter((id) => id !== device.id) };
      }
      if (list.length >= 3) return prev;
      return { ...prev, [category]: [...list, device.id] };
    });
  };

  const handleAddCompare = (device: DeviceModel) => {
    setCompareIdsByCategory((prev) => {
      const list = prev[category];
      if (list.includes(device.id) || list.length >= 3) return prev;
      return { ...prev, [category]: [...list, device.id] };
    });
  };

  const handleRemoveCompare = (id: string) => {
    setCompareIdsByCategory((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== id),
    }));
  };

  const handleClearCompare = () => {
    setCompareIdsByCategory((prev) => ({
      ...prev,
      [category]: [],
    }));
  };

  const handleAutoFillCompare = () => {
    const topIds = filteredDevices.slice(0, 3).map((d) => d.id);
    setCompareIdsByCategory((prev) => ({
      ...prev,
      [category]: topIds,
    }));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeFilterCount =
    (useCase !== 'All' ? 1 : 0) +
    (selectedProcessor !== 'All' ? 1 : 0) +
    (minRam !== null ? 1 : 0);

  const budgetSnapStep = CURRENCIES[currency].bounds[category].step;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#101828] pb-16 md:pb-0">
      <Header
        activeCategory={category}
        onSelectCategory={handleCategoryChange}
        compareCount={comparedDevices.length}
        onJumpToCompare={() => scrollToSection('compare')}
      />

      <main className="flex-1">
        <HeroSection
          category={category}
          useCase={useCase}
          currency={currency}
          budget={currentBudget}
          matchCount={filteredDevices.length}
          onCategoryChange={handleCategoryChange}
          onUseCaseChange={setUseCase}
          onCurrencyChange={handleCurrencyChange}
          onBudgetChange={handleBudgetChange}
          onExploreClick={() => scrollToSection('catalog')}
        />

        {/* Catalog & Specification Filter Section */}
        <section
          id="catalog"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-6 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">
                Filtered Recommendations
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {useCase !== 'All' ? `${useCase} ` : ''}
                {category === 'laptop' ? 'Laptops' : 'Mobiles'} Under{' '}
                <span className="font-mono tabular-nums">
                  {formatCurrencyAmount(currentBudget, currency)}
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Max 3 models can be compared side-by-side at once
            </p>
          </div>

          <FilterBar
            category={category}
            useCase={useCase}
            currency={currency}
            budget={currentBudget}
            selectedProcessor={selectedProcessor}
            minRam={minRam}
            searchQuery={searchQuery}
            sortBy={sortBy}
            totalResults={filteredDevices.length}
            activeFilterCount={activeFilterCount}
            onCategoryChange={handleCategoryChange}
            onUseCaseChange={setUseCase}
            onCurrencyChange={handleCurrencyChange}
            onBudgetChange={handleBudgetChange}
            onProcessorChange={setSelectedProcessor}
            onMinRamChange={setMinRam}
            onSearchChange={setSearchQuery}
            onSortChange={setSortBy}
            onResetFilters={handleResetFilters}
            onOpenMobileSheet={() => setIsMobileFilterOpen(true)}
          />

          {filteredDevices.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center">
              <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">
                No {category === 'laptop' ? 'laptops' : 'mobiles'} match all selected criteria
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6">
                {cheapestMatchingSpecPrice !== null &&
                cheapestMatchingSpecPrice > currentBudget
                  ? `The lowest-priced ${useCase !== 'All' ? `${useCase} ` : ''}${
                      selectedProcessor !== 'All' ? `${selectedProcessor} ` : ''
                    }model${
                      minRam ? ` with ${minRam} GB+ RAM` : ''
                    } starts at ${formatCurrencyAmount(
                      cheapestMatchingSpecPrice,
                      currency,
                    )}.`
                  : 'Try adjusting your category focus, processor family, RAM minimum, or search text.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {cheapestMatchingSpecPrice !== null &&
                  cheapestMatchingSpecPrice > currentBudget && (
                    <button
                      type="button"
                      onClick={() =>
                        handleBudgetChange(
                          Math.ceil(cheapestMatchingSpecPrice / budgetSnapStep) *
                            budgetSnapStep,
                        )
                      }
                      className="min-h-[44px] px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer tabular-nums"
                    >
                      Raise Budget to{' '}
                      {formatCurrencyAmount(
                        Math.ceil(cheapestMatchingSpecPrice / budgetSnapStep) *
                          budgetSnapStep,
                        currency,
                      )}
                    </button>
                  )}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="min-h-[44px] px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-medium rounded-xl transition-colors cursor-pointer"
                >
                  Reset Spec Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevices.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  currency={currency}
                  isCompared={currentCompareIds.includes(device.id)}
                  compareDisabled={currentCompareIds.length >= 3}
                  onToggleCompare={handleToggleCompare}
                  onInspect={setInspectedDevice}
                />
              ))}
            </div>
          )}
        </section>

        {/* Side-by-Side Comparison Section */}
        <CompareSection
          selectedDevices={comparedDevices}
          activeCategory={category}
          currency={currency}
          filteredDevices={filteredDevices}
          onRemoveDevice={handleRemoveCompare}
          onAddDevice={handleAddCompare}
          onClearAll={handleClearCompare}
          onAutoFillCompare={handleAutoFillCompare}
        />

        {/* Practical Decision Framework */}
        <BuyingGuideSection />
      </main>

      {/* Clean Minimal Footer */}
      <footer className="bg-[#F8F9FA] border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-display font-semibold text-slate-800">
              SpecBrief
            </span>{' '}
            · Independent Laptop &amp; Mobile Hardware Advisor
          </div>
          <div>
            Regional prices reflect typical unlocked &amp; retail configurations
            across USD, EUR, GBP, and INR storefronts. Verify final stock and
            active promotions at checkout.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Sheet for Filters */}
      <MobileFilterSheet
        isOpen={isMobileFilterOpen}
        category={category}
        useCase={useCase}
        currency={currency}
        budget={currentBudget}
        selectedProcessor={selectedProcessor}
        minRam={minRam}
        totalResults={filteredDevices.length}
        onClose={() => setIsMobileFilterOpen(false)}
        onUseCaseChange={setUseCase}
        onCurrencyChange={handleCurrencyChange}
        onBudgetChange={handleBudgetChange}
        onProcessorChange={setSelectedProcessor}
        onMinRamChange={setMinRam}
        onResetFilters={handleResetFilters}
      />

      {/* Full Spec & Cons Modal */}
      <DeviceDetailModal
        device={inspectedDevice}
        currency={currency}
        isCompared={
          inspectedDevice ? currentCompareIds.includes(inspectedDevice.id) : false
        }
        compareDisabled={currentCompareIds.length >= 3}
        onClose={() => setInspectedDevice(null)}
        onToggleCompare={handleToggleCompare}
      />

      {/* Mobile Bottom Thumb-Zone Navigation */}
      <MobileBottomNav
        compareCount={comparedDevices.length}
        activeFilterCount={activeFilterCount}
        onOpenFilters={() => setIsMobileFilterOpen(true)}
        onJumpToCatalog={() => scrollToSection('catalog')}
        onJumpToCompare={() => scrollToSection('compare')}
        onJumpToGuide={() => scrollToSection('guide')}
      />
    </div>
  );
}
