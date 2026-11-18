import { X, AlertTriangle, Check, ExternalLink, Plus } from 'lucide-react';
import type { DeviceModel } from '../data/devices';
import {
  formatCurrencyAmount,
  getRegionalRetailers,
  type CurrencyCode,
} from '../utils/currency';

interface DeviceDetailModalProps {
  device: DeviceModel | null;
  currency: CurrencyCode;
  isCompared: boolean;
  compareDisabled: boolean;
  onClose: () => void;
  onToggleCompare: (device: DeviceModel) => void;
}

export function DeviceDetailModal({
  device,
  currency,
  isCompared,
  compareDisabled,
  onClose,
  onToggleCompare,
}: DeviceDetailModalProps) {
  if (!device) return null;

  const regionalRetailers = getRegionalRetailers(device, currency);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-3xl bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs text-slate-500">
              {device.brand} · {device.year} · {device.processorFamily}
            </div>
            <h2
              id="detail-modal-title"
              className="font-display text-lg sm:text-xl font-bold text-slate-900 truncate"
            >
              {device.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close specifications"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
            <div className="sm:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-[#F1F3F5]">
              <img
                src={device.image}
                alt={`${device.brand} ${device.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="sm:col-span-7 space-y-3">
              <p className="text-sm text-slate-700 leading-relaxed">
                {device.tagline}
              </p>
              <dl className="grid grid-cols-2 gap-3 text-xs border-t border-slate-100 pt-3">
                <div>
                  <dt className="text-slate-500">Processor</dt>
                  <dd className="font-semibold text-slate-900 mt-0.5">
                    {device.processor}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Memory</dt>
                  <dd className="font-mono font-semibold text-slate-900 mt-0.5 tabular-nums">
                    {device.ramSpec}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Storage</dt>
                  <dd className="font-mono font-semibold text-slate-900 mt-0.5 tabular-nums">
                    {device.storage}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Weight</dt>
                  <dd className="font-mono font-semibold text-slate-900 mt-0.5 tabular-nums">
                    {device.weight}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-slate-500">Display</dt>
                  <dd className="font-medium text-slate-900 mt-0.5">
                    {device.display}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-slate-500">Battery &amp; Charging</dt>
                  <dd className="font-mono text-slate-900 mt-0.5 tabular-nums">
                    {device.battery}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-slate-500">Ports &amp; Connectivity</dt>
                  <dd className="text-slate-900 mt-0.5">{device.connectivity}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Strengths & Honest Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900 mb-2.5">
                <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                <span>Where It Excels</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                {device.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span aria-hidden="true" className="text-emerald-700 font-bold">
                      +
                    </span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 mb-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700" aria-hidden="true" />
                <span>Known Cons &amp; Trade-offs</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-800 leading-relaxed">
                {device.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span aria-hidden="true" className="text-amber-700 font-bold">
                      −
                    </span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Retailer Links */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <h3 className="text-xs font-semibold text-slate-600">
                Trusted Online Retailers ({currency})
              </h3>
              <span className="text-[11px] text-slate-400">
                Official &amp; verified direct links open the product page; live seller discounts may vary at checkout
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {regionalRetailers.map((r, idx) => (
                <a
                  key={r.retailer}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`min-h-[52px] p-3 rounded-xl border flex items-center justify-between gap-2 transition-colors ${
                    idx === 0
                      ? 'bg-blue-700 hover:bg-blue-800 border-blue-700 text-white'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold truncate">{r.retailer}</div>
                    <div
                      className={`text-[11px] truncate ${
                        idx === 0 ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {idx === 0 ? 'Best price · ' : ''}
                      {r.isDirectProduct ? 'Direct product page' : 'Live store search'}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-sm font-bold tabular-nums shrink-0">
                    {formatCurrencyAmount(r.price, currency)}
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-slate-200 bg-[#F8F9FA] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onToggleCompare(device)}
            disabled={!isCompared && compareDisabled}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 border transition-colors cursor-pointer disabled:opacity-50 ${
              isCompared
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white text-slate-900 border-slate-300 hover:border-slate-400'
            }`}
          >
            {isCompared ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>Added to Compare</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add to Side-by-Side Compare</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
