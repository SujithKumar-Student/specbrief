import type { DeviceCategory, DeviceModel } from '../data/devices';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rateFromUsd: number;
  locale: string;
  budgetSnapUnit: number;
  bounds: Record<
    DeviceCategory,
    {
      min: number;
      max: number;
      step: number;
      defaultBudget: number;
      presets: number[];
    }
  >;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    label: 'USD ($)',
    rateFromUsd: 1,
    locale: 'en-US',
    budgetSnapUnit: 50,
    bounds: {
      laptop: {
        min: 400,
        max: 2400,
        step: 50,
        defaultBudget: 1200,
        presets: [600, 900, 1200, 1600, 2000],
      },
      mobile: {
        min: 200,
        max: 1400,
        step: 50,
        defaultBudget: 800,
        presets: [350, 550, 800, 1000, 1300],
      },
    },
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    label: 'EUR (€)',
    rateFromUsd: 1.08,
    locale: 'en-IE',
    budgetSnapUnit: 50,
    bounds: {
      laptop: {
        min: 450,
        max: 2400,
        step: 50,
        defaultBudget: 1250,
        presets: [650, 950, 1250, 1750, 2150],
      },
      mobile: {
        min: 200,
        max: 1500,
        step: 50,
        defaultBudget: 900,
        presets: [350, 600, 900, 1100, 1400],
      },
    },
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    label: 'GBP (£)',
    rateFromUsd: 0.96,
    locale: 'en-GB',
    budgetSnapUnit: 50,
    bounds: {
      laptop: {
        min: 400,
        max: 2000,
        step: 50,
        defaultBudget: 1100,
        presets: [550, 850, 1100, 1550, 1850],
      },
      mobile: {
        min: 200,
        max: 1300,
        step: 50,
        defaultBudget: 800,
        presets: [350, 550, 800, 1000, 1250],
      },
    },
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    label: 'INR (₹)',
    rateFromUsd: 98,
    locale: 'en-IN',
    budgetSnapUnit: 5000,
    bounds: {
      laptop: {
        min: 40000,
        max: 225000,
        step: 5000,
        defaultBudget: 110000,
        presets: [55000, 85000, 110000, 160000, 200000],
      },
      mobile: {
        min: 15000,
        max: 140000,
        step: 2500,
        defaultBudget: 75000,
        presets: [25000, 45000, 75000, 100000, 130000],
      },
    },
  },
};

export const CURRENCY_LIST: CurrencyConfig[] = [
  CURRENCIES.USD,
  CURRENCIES.EUR,
  CURRENCIES.GBP,
  CURRENCIES.INR,
];

export function convertBudgetBetweenCurrencies(
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
): number {
  if (fromCurrency === toCurrency) return amount;
  const fromRate = CURRENCIES[fromCurrency].rateFromUsd;
  const toCfg = CURRENCIES[toCurrency];
  const usdEquivalent = amount / fromRate;
  const rawTarget = usdEquivalent * toCfg.rateFromUsd;
  return Math.max(
    toCfg.budgetSnapUnit,
    Math.round(rawTarget / toCfg.budgetSnapUnit) * toCfg.budgetSnapUnit,
  );
}

export function formatCurrencyAmount(
  amount: number,
  currency: CurrencyCode,
): string {
  const cfg = CURRENCIES[currency];
  return `${cfg.symbol}${Math.round(amount).toLocaleString(cfg.locale)}`;
}

export interface RegionalRetailerLink {
  retailer: string;
  price: number;
  url: string;
  shippingNote: string;
  isDirectProduct: boolean;
}

export function getRegionalRetailers(
  device: DeviceModel,
  currency: CurrencyCode,
): RegionalRetailerLink[] {
  if (currency === 'USD') {
    const directMap = device.directRetailerUrls?.USD ?? {};
    return [...device.retailers]
      .map((r) => {
        const directUrl = directMap[r.retailer];
        const isDirect = Boolean(directUrl || r.isDirectProduct);
        return {
          retailer: r.retailer,
          price: r.price,
          url: directUrl ?? r.url,
          shippingNote: directUrl ? 'Direct product page' : r.shippingNote,
          isDirectProduct: isDirect,
        };
      })
      .sort((a, b) => {
        if (a.price !== b.price) return a.price - b.price;
        return Number(b.isDirectProduct) - Number(a.isDirectProduct);
      });
  }

  const q = encodeURIComponent(device.retailerQuery);
  const prices = device.regionalPrices[currency];
  const directMap = device.directRetailerUrls?.[currency] ?? {};

  const regionalStores: Record<
    Exclude<CurrencyCode, 'USD'>,
    [
      { retailer: string; url: string; shippingNote: string; isDirectProduct: boolean },
      { retailer: string; url: string; shippingNote: string; isDirectProduct: boolean },
      { retailer: string; url: string; shippingNote: string; isDirectProduct: boolean },
    ]
  > = {
    EUR: [
      {
        retailer: 'Amazon DE',
        url: directMap['Amazon DE'] ?? `https://www.amazon.de/s?k=${q}`,
        shippingNote: directMap['Amazon DE']
          ? 'Direct product page'
          : 'Live marketplace listing',
        isDirectProduct: Boolean(directMap['Amazon DE']),
      },
      {
        retailer: 'MediaMarkt',
        url:
          directMap['MediaMarkt'] ??
          `https://www.mediamarkt.de/de/search.html?query=${q}`,
        shippingNote: directMap['MediaMarkt']
          ? 'Direct product page'
          : 'Live store listing',
        isDirectProduct: Boolean(directMap['MediaMarkt']),
      },
      device.officialStore
        ? {
            retailer: device.officialStore.name,
            url: device.officialStore.urls.EUR,
            shippingNote: 'Direct product page · Official MSRP',
            isDirectProduct: true,
          }
        : {
            retailer: 'Cyberport',
            url:
              directMap['Cyberport'] ??
              `https://www.cyberport.de/tools/search-results.html?q=${q}`,
            shippingNote: 'Live store listing',
            isDirectProduct: Boolean(directMap['Cyberport']),
          },
    ],
    GBP: [
      {
        retailer: 'Amazon UK',
        url: directMap['Amazon UK'] ?? `https://www.amazon.co.uk/s?k=${q}`,
        shippingNote: directMap['Amazon UK']
          ? 'Direct product page'
          : 'Live marketplace listing',
        isDirectProduct: Boolean(directMap['Amazon UK']),
      },
      {
        retailer: 'Currys',
        url: directMap['Currys'] ?? `https://www.currys.co.uk/search?q=${q}`,
        shippingNote: directMap['Currys']
          ? 'Direct product page'
          : 'Live store listing',
        isDirectProduct: Boolean(directMap['Currys']),
      },
      device.officialStore
        ? {
            retailer: device.officialStore.name,
            url: device.officialStore.urls.GBP,
            shippingNote: 'Direct product page · Official MSRP',
            isDirectProduct: true,
          }
        : {
            retailer: 'John Lewis',
            url:
              directMap['John Lewis'] ??
              `https://www.johnlewis.com/search?search-term=${q}`,
            shippingNote: 'Live store listing',
            isDirectProduct: Boolean(directMap['John Lewis']),
          },
    ],
    INR: [
      {
        retailer: 'Flipkart',
        url: directMap['Flipkart'] ?? `https://www.flipkart.com/search?q=${q}`,
        shippingNote: directMap['Flipkart']
          ? 'Direct product page'
          : 'Live marketplace listing',
        isDirectProduct: Boolean(directMap['Flipkart']),
      },
      {
        retailer: 'Amazon India',
        url: directMap['Amazon India'] ?? `https://www.amazon.in/s?k=${q}`,
        shippingNote: directMap['Amazon India']
          ? 'Direct product page'
          : 'Live marketplace listing',
        isDirectProduct: Boolean(directMap['Amazon India']),
      },
      device.officialStore
        ? {
            retailer: device.officialStore.name,
            url: device.officialStore.urls.INR,
            shippingNote: 'Direct product page · Official MSRP',
            isDirectProduct: true,
          }
        : {
            retailer: 'Reliance Digital',
            url:
              directMap['Reliance Digital'] ??
              `https://www.reliancedigital.in/search?q=${q}`,
            shippingNote: 'Live store listing',
            isDirectProduct: Boolean(directMap['Reliance Digital']),
          },
    ],
  };

  const stores = regionalStores[currency];

  return stores
    .map((store, idx) => ({
      retailer: store.retailer,
      price: prices[idx] ?? prices[0],
      url: store.url,
      shippingNote: store.shippingNote,
      isDirectProduct: store.isDirectProduct,
    }))
    .sort((a, b) => {
      if (a.price !== b.price) return a.price - b.price;
      return Number(b.isDirectProduct) - Number(a.isDirectProduct);
    });
}

export function getBestLocalPrice(
  device: DeviceModel,
  currency: CurrencyCode,
): number {
  const links = getRegionalRetailers(device, currency);
  return links[0]?.price ?? device.regionalPrices[currency][0];
}
