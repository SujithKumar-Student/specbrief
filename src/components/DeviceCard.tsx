import { useState } from 'react';
import {
  AlertTriangle,
  ExternalLink,
  Check,
  Plus,
  Laptop,
  Smartphone,
  Info,
} from 'lucide-react';
import type { DeviceModel } from '../data/devices';
import {
  formatCurrencyAmount,
  getRegionalRetailers,
  type CurrencyCode,
} from '../utils/currency';

interface DeviceCardProps {
  device: DeviceModel;
  currency: CurrencyCode;
  isCompared: boolean;
  compareDisabled: boolean;
  onToggleCompare: (device: DeviceModel) => void;
  onInspect: (device: DeviceModel) => void;
}

export function DeviceCard({
  device,
  currency,
  isCompared,
  compareDisabled,
  onToggleCompare,
  onInspect,
}: DeviceCardProps) {
  const [imgError, setImgError] = useState(false);

  const regionalRetailers = getRegionalRetailers(device, currency);
  const lowestPrice = regionalRetailers[0]?.price ?? device.price;

  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-900/5">
      <div>
        {/* 4:3 Studio Product Photo */}
        <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F1F3F5] mb-4">
          {!imgError ? (
            <img
              src={device.image}
              alt={`${device.brand} ${device.name}`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-slate-400">
              {device.category === 'laptop' ? (
                <Laptop className="w-10 h-10 mb-2" aria-hidden="true" />
              ) : (
                <Smartphone className="w-10 h-10 mb-2" aria-hidden="true" />
              )}
              <span className="text-xs font-medium text-slate-500">
                {device.brand} {device.name}
              </span>
            </div>
          )}
        </div>

        {/* Unboxed Zero-Pill Metadata Line */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-1.5">
          <span className="font-medium text-slate-700">{device.brand}</span>
          <span aria-hidden="true">·</span>
          <span>{device.useCases[0]}</span>
          <span aria-hidden="true">·</span>
          <span>{device.processorFamily}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{device.ramGb} GB RAM</span>
        </div>

        {/* Title & Lowest Price */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display text-lg font-semibold text-slate-900 leading-snug">
            {device.name}
          </h3>
          <div className="text-right shrink-0">
            <div className="font-mono text-lg font-semibold text-slate-900 tabular-nums">
              {formatCurrencyAmount(lowestPrice, currency)}
            </div>
            <div className="text-[11px] text-slate-500">best price</div>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {device.tagline}
        </p>

        {/* Core Specifications Grid */}
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 py-3 border-y border-slate-100 text-xs mb-4">
          <div>
            <dt className="text-slate-500 mb-0.5">Processor</dt>
            <dd className="font-medium text-slate-900 truncate" title={device.processor}>
              {device.processor}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500 mb-0.5">Memory (RAM)</dt>
            <dd className="font-mono font-medium text-slate-900 tabular-nums truncate">
              {device.ramSpec}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500 mb-0.5">Storage</dt>
            <dd className="font-mono font-medium text-slate-900 tabular-nums truncate">
              {device.storage}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500 mb-0.5">Display</dt>
            <dd className="font-medium text-slate-900 truncate" title={device.display}>
              {device.display}
            </dd>
          </div>
        </dl>

        {/* Key Pros & Honest Cons */}
        <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 mb-4">
          <div className="bg-emerald-50/50 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900 mb-2">
              <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
              <span>Pros &amp; Key Strengths</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
              {device.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="text-emerald-700 font-mono font-bold leading-4 shrink-0"
                  >
                    +
                  </span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/60 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" aria-hidden="true" />
              <span>Known Cons &amp; Trade-offs</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
              {device.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="text-amber-700 font-mono font-bold leading-4 shrink-0"
                  >
                    −
                  </span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trusted Online Retailer Buy Links */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2 text-xs mb-2">
            <span className="font-medium text-slate-500">
              Trusted Retailers ({currency})
            </span>
            <span className="text-[11px] text-slate-400">
              Standard retail / MSRP
            </span>
          </div>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {regionalRetailers.map((link, index) => (
              <a
                key={link.retailer}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] sm:min-h-[40px] px-3 py-2 flex items-center justify-between gap-2 bg-white hover:bg-slate-50 transition-colors text-xs group focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-blue-700"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-medium text-slate-900 group-hover:text-blue-700 truncate">
                      {link.retailer}
                    </span>
                    {index === 0 && (
                      <span className="text-[11px] font-medium text-emerald-700 shrink-0">
                        · Best price
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {link.isDirectProduct ? 'Direct product page' : 'Live store search'}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {formatCurrencyAmount(link.price, currency)}
                  </span>
                  <ExternalLink
                    className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700"
                    aria-hidden="true"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-2 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => onToggleCompare(device)}
          disabled={!isCompared && compareDisabled}
          className={`flex-1 min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 border transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-blue-700 ${
            isCompared
              ? 'bg-blue-700 text-white border-blue-700 hover:bg-blue-800'
              : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400 hover:bg-slate-50'
          }`}
        >
          {isCompared ? (
            <>
              <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>In Compare</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Compare</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onInspect(device)}
          className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 bg-[#F8F9FA] hover:bg-slate-100 border border-slate-200 inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          <Info className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Full Specs</span>
        </button>
      </div>
    </article>
  );
}
