import {
  X,
  ExternalLink,
  AlertTriangle,
  Check,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { DEVICES, type DeviceCategory, type DeviceModel } from '../data/devices';
import {
  formatCurrencyAmount,
  getBestLocalPrice,
  getRegionalRetailers,
  type CurrencyCode,
} from '../utils/currency';

interface CompareSectionProps {
  selectedDevices: DeviceModel[];
  activeCategory: DeviceCategory;
  currency: CurrencyCode;
  filteredDevices: DeviceModel[];
  onRemoveDevice: (id: string) => void;
  onAddDevice: (device: DeviceModel) => void;
  onClearAll: () => void;
  onAutoFillCompare: () => void;
}

export function CompareSection({
  selectedDevices,
  activeCategory,
  currency,
  filteredDevices,
  onRemoveDevice,
  onAddDevice,
  onClearAll,
  onAutoFillCompare,
}: CompareSectionProps) {
  const availableToAdd = DEVICES.filter(
    (d) =>
      d.category === activeCategory &&
      !selectedDevices.some((sel) => sel.id === d.id),
  );

  const lowestPriceAmongCompared =
    selectedDevices.length > 1
      ? Math.min(
          ...selectedDevices.map((d) => getBestLocalPrice(d, currency)),
        )
      : null;

  const highestRamAmongCompared =
    selectedDevices.length > 1
      ? Math.max(...selectedDevices.map((d) => d.ramGb))
      : null;

  const lightestWeightAmongCompared =
    selectedDevices.length > 1
      ? Math.min(...selectedDevices.map((d) => d.weightGrams))
      : null;

  return (
    <section
      id="compare"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1">
            Side-by-Side Specification Matrix
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Compare Models Side by Side
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Select up to 3 models to evaluate processors, RAM, honest cons, and
            lowest trusted prices in {currency} side-by-side.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {selectedDevices.length < 2 && filteredDevices.length >= 2 && (
            <button
              type="button"
              onClick={onAutoFillCompare}
              className="min-h-[44px] sm:min-h-[40px] px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Compare Top {Math.min(3, filteredDevices.length)} Under Budget</span>
            </button>
          )}

          {selectedDevices.length < 3 && availableToAdd.length > 0 && (
            <select
              aria-label="Add a model to comparison"
              value=""
              onChange={(e) => {
                const found = DEVICES.find((d) => d.id === e.target.value);
                if (found) onAddDevice(found);
              }}
              className="min-h-[44px] sm:min-h-[40px] px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:border-blue-700 focus:outline-none cursor-pointer"
            >
              <option value="">
                + Add {activeCategory === 'laptop' ? 'laptop' : 'mobile'} to compare...
              </option>
              {availableToAdd.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.brand} {d.name} (
                  {formatCurrencyAmount(
                    getBestLocalPrice(d, currency),
                    currency,
                  )}
                  )
                </option>
              ))}
            </select>
          )}

          {selectedDevices.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="min-h-[44px] sm:min-h-[40px] px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-xl inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Clear ({selectedDevices.length})</span>
            </button>
          )}
        </div>
      </div>

      {selectedDevices.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 text-center">
          <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">
            No models selected for comparison yet
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-5">
            Click <strong>Compare</strong> on any laptop or mobile card above, or
            load the top matches under your current budget right now.
          </p>
          {filteredDevices.length >= 2 && (
            <button
              type="button"
              onClick={onAutoFillCompare}
              className="min-h-[44px] px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
            >
              Load Top {Math.min(3, filteredDevices.length)} Under-Budget Models
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-[#F8F9FA]">
                  <th
                    scope="col"
                    className="w-40 sm:w-48 p-4 text-xs font-semibold text-slate-500 align-bottom sticky left-0 bg-[#F8F9FA] z-10 border-r border-slate-200"
                  >
                    Specification
                  </th>
                  {selectedDevices.map((device) => {
                    const bestPrice = getBestLocalPrice(device, currency);
                    return (
                      <th
                        key={device.id}
                        scope="col"
                        className="p-4 align-top min-w-[210px] border-r last:border-r-0 border-slate-200"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="text-xs font-medium text-slate-500">
                            {device.brand} · {device.year}
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveDevice(device.id)}
                            aria-label={`Remove ${device.name} from comparison`}
                            className="min-w-[36px] min-h-[36px] -mt-1 -mr-1 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/70 transition-colors cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100 mb-3">
                          <img
                            src={device.image}
                            alt={`${device.brand} ${device.name}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="font-display text-sm font-semibold text-slate-900 leading-snug mb-1">
                          {device.name}
                        </div>
                        <div className="font-mono text-base font-bold text-slate-900 tabular-nums">
                          {formatCurrencyAmount(bestPrice, currency)}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {/* Best Price */}
                <tr>
                  <th
                    scope="row"
                    className="p-4 font-medium text-slate-600 sticky left-0 bg-white z-10 border-r border-slate-200"
                  >
                    Lowest Price ({currency})
                  </th>
                  {selectedDevices.map((device) => {
                    const bestPrice = getBestLocalPrice(device, currency);
                    const isLowest =
                      lowestPriceAmongCompared !== null &&
                      bestPrice === lowestPriceAmongCompared;
                    return (
                      <td
                        key={device.id}
                        className="p-4 font-mono tabular-nums border-r last:border-r-0 border-slate-100"
                      >
                        <span className="font-semibold text-slate-900">
                          {formatCurrencyAmount(bestPrice, currency)}
                        </span>
                        {isLowest && (
                          <span className="ml-2 inline-flex items-center gap-1 text-xs font-sans font-medium text-emerald-700">
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            Lowest
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Processor */}
                <tr>
                  <th
                    scope="row"
                    className="p-4 font-medium text-slate-600 sticky left-0 bg-white z-10 border-r border-slate-200"
                  >
                    Processor
                  </th>
                  {selectedDevices.map((device) => (
                    <td
                      key={device.id}
                      className="p-4 text-slate-900 border-r last:border-r-0 border-slate-100"
                    >
                      <div className="font-medium">{device.processor}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {device.processorFamily}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* RAM */}
                <tr>
                  <th
                    scope="row"
                    className="p-4 font-medium text-slate-600 sticky left-0 bg-white z-10 border-r border-slate-200"
                  >
                    Memory (RAM)
                  </th>
                  {selectedDevices.map((device) => {
                    const isHighest =
                      highestRamAmongCompared !== null &&
                      device.ramGb === highestRamAmongCompared;
                    return (
                      <td
                        key={device.id}
                        className="p-4 font-mono tabular-nums text-slate-900 border-r last:border-r-0 border-slate-100"
                      >
                        <span className="font-medium">{device.ramSpec}</span>
                        {isHighest && (
                          <span className="ml-2 inline-flex items-center gap-1 text-xs font-sans font-medium text-blue-700">
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            Most RAM
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Storage */}
                <tr>
                  <th
                    scope="row"
                    className="p-4 font-medium text-slate-600 sticky left-0 bg-white z-10 border-r border-slate-200"
                  >
                    Storage
                  </th>
                  {selectedDevices.map((device) => (
                    <td
                      key={device.id}
                      className="p-4 font-mono tabular-nums text-slate-900 border-r last:border-r-0 border-slate-100"
                    >
                      {device.storage}
                    </td>
                  ))}
                </tr>

                {/* Display */}
                <tr>
                  <th
                    scope="row"
                    className="p-4 font-medium text-slate-600 sticky left-0 bg-white z-10 border-r border-slate-200"
                  >
                    Display
                  </th>
                  {selectedDevices.map((device) => (
                    <td
                      key={device.id}
                      className="p-4 text-slate-800 border-r last:border-r-0 border-slate-100"
                    >
                      {device.display}
                    </td>
                  ))}
                </tr>

                {/* Battery */}
                <tr>
                  <th
                    scope="row"
                    className="p-4 font-medium text-slate-600 sticky left-0 bg-white z-10 border-r border-slate-200"
                  >
                    Battery &amp; Power
                  </th>
                  {selectedDevices.map((device) => (
                    <td
                      key={device.id}
                      className="p-4 font-mono tabular-nums text-slate-800 border-r last:border-r-0 border-slate-100"
                    >
                      {device.battery}
                    </td>
                  ))}
                </tr>

                {/* Weight */}
                <tr>
                  <th
                    scope="row"
                    className="p-4 font-medium text-slate-600 sticky left-0 bg-white z-10 border-r border-slate-200"
                  >
                    Weight
                  </th>
                  {selectedDevices.map((device) => {
                    const isLightest =
                      lightestWeightAmongCompared !== null &&
                      device.weightGrams === lightestWeightAmongCompared;
                    return (
                      <td
                        key={device.id}
                        className="p-4 font-mono tabular-nums text-slate-800 border-r last:border-r-0 border-slate-100"
                      >
                        <span>{device.weight}</span>
                        {isLightest && (
                          <span className="ml-2 inline-flex items-center gap-1 text-xs font-sans font-medium text-emerald-700">
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            Lightest
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Connectivity */}
                <tr>
                  <th
                    scope="row"
                    className="p-4 font-medium text-slate-600 sticky left-0 bg-white z-10 border-r border-slate-200"
                  >
                    Ports &amp; Wireless
                  </th>
                  {selectedDevices.map((device) => (
                    <td
                      key={device.id}
                      className="p-4 text-slate-700 border-r last:border-r-0 border-slate-100"
                    >
                      {device.connectivity}
                    </td>
                  ))}
                </tr>

                {/* Key Strengths */}
                <tr>
                  <th
                    scope="row"
                    className="p-4 font-medium text-slate-600 align-top sticky left-0 bg-white z-10 border-r border-slate-200"
                  >
                    Key Strengths
                  </th>
                  {selectedDevices.map((device) => (
                    <td
                      key={device.id}
                      className="p-4 align-top border-r last:border-r-0 border-slate-100"
                    >
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {device.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <Check
                              className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Honest Cons Side-by-Side */}
                <tr className="bg-amber-50/40">
                  <th
                    scope="row"
                    className="p-4 font-semibold text-amber-900 align-top sticky left-0 bg-amber-50 z-10 border-r border-slate-200"
                  >
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle
                        className="w-4 h-4 text-amber-700 shrink-0"
                        aria-hidden="true"
                      />
                      <span>Known Cons</span>
                    </div>
                  </th>
                  {selectedDevices.map((device) => (
                    <td
                      key={device.id}
                      className="p-4 align-top border-r last:border-r-0 border-slate-100"
                    >
                      <ul className="space-y-1.5 text-xs text-slate-800">
                        {device.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span
                              aria-hidden="true"
                              className="font-mono font-bold text-amber-700 shrink-0"
                            >
                              −
                            </span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Trusted Retailer Buy Links */}
                <tr>
                  <th
                    scope="row"
                    className="p-4 font-medium text-slate-600 align-top sticky left-0 bg-white z-10 border-r border-slate-200"
                  >
                    Trusted Retailers ({currency})
                  </th>
                  {selectedDevices.map((device) => {
                    const regional = getRegionalRetailers(device, currency);
                    return (
                      <td
                        key={device.id}
                        className="p-4 align-top border-r last:border-r-0 border-slate-100"
                      >
                        <div className="space-y-2">
                          {regional.map((r, i) => (
                            <a
                              key={r.retailer}
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`min-h-[44px] px-3 py-2 rounded-xl flex items-center justify-between gap-2 text-xs font-medium transition-colors ${
                                i === 0
                                  ? 'bg-blue-700 hover:bg-blue-800 text-white'
                                  : 'bg-[#F8F9FA] hover:bg-slate-100 text-slate-800 border border-slate-200'
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="truncate">{r.retailer}</div>
                                <div
                                  className={`text-[10px] font-normal truncate ${
                                    i === 0 ? 'text-blue-100' : 'text-slate-500'
                                  }`}
                                >
                                  {r.isDirectProduct
                                    ? 'Direct product page'
                                    : 'Live store search'}
                                </div>
                              </div>
                              <span className="inline-flex items-center gap-1 font-mono tabular-nums shrink-0">
                                {formatCurrencyAmount(r.price, currency)}
                                <ExternalLink className="w-3 h-3" aria-hidden="true" />
                              </span>
                            </a>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
