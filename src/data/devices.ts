export type DeviceCategory = 'laptop' | 'mobile';

export type LaptopProcessorFamily = 'Apple M-Series' | 'Intel Core' | 'AMD Ryzen';
export type MobileProcessorFamily =
  | 'Apple A-Series'
  | 'Snapdragon'
  | 'Google Tensor'
  | 'MediaTek Dimensity';

export type ProcessorFamily = LaptopProcessorFamily | MobileProcessorFamily;

export type LaptopUseCase =
  | 'Thin & Light'
  | 'Gaming'
  | 'Creator & Work'
  | 'Everyday Value';

export type MobileUseCase =
  | 'Camera Focus'
  | 'Battery Life'
  | 'Gaming & Speed'
  | 'Compact';

export type DeviceUseCase = LaptopUseCase | MobileUseCase;

export interface RetailerLink {
  retailer:
    | 'Amazon'
    | 'Best Buy'
    | 'B&H Photo'
    | 'Apple Store'
    | 'Samsung Store'
    | 'Google Store'
    | 'OnePlus Store'
    | 'ASUS Store';
  price: number;
  url: string;
  shippingNote: string;
  isDirectProduct?: boolean;
}

export interface RegionalPriceTiers {
  USD: [number, number, number];
  EUR: [number, number, number];
  GBP: [number, number, number];
  INR: [number, number, number];
}

export interface OfficialRegionalStore {
  name: string;
  urls: {
    USD: string;
    EUR: string;
    GBP: string;
    INR: string;
  };
}

export interface DeviceModel {
  id: string;
  category: DeviceCategory;
  useCases: DeviceUseCase[];
  brand: string;
  name: string;
  year: number;
  tagline: string;
  price: number;
  regionalPrices: RegionalPriceTiers;
  retailerQuery: string;
  officialStore?: OfficialRegionalStore;
  directRetailerUrls?: {
    USD?: Record<string, string>;
    EUR?: Record<string, string>;
    GBP?: Record<string, string>;
    INR?: Record<string, string>;
  };
  processor: string;
  processorFamily: ProcessorFamily;
  ramGb: number;
  ramSpec: string;
  storage: string;
  display: string;
  battery: string;
  weight: string;
  weightGrams: number;
  connectivity: string;
  image: string;
  pros: string[];
  cons: string[];
  retailers: RetailerLink[];
}

export const HERO_IMAGE = '/src/assets/images/hero_tech_studio_1794945331512.jpg';

const IMG_LAPTOP_ULTRABOOK = '/src/assets/images/laptop_ultrabook_studio_1794945332079.jpg';
const IMG_LAPTOP_WORKSTATION = '/src/assets/images/laptop_workstation_studio_1794945332512.jpg';
const IMG_MOBILE_FLAGSHIP = '/src/assets/images/mobile_flagship_studio_1794945332930.jpg';
const IMG_MOBILE_VALUE = '/src/assets/images/mobile_value_studio_1794945333294.jpg';

const amazonSearch = (q: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(q)}`;
const bestBuySearch = (q: string) =>
  `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(q)}`;
const bhSearch = (q: string) =>
  `https://www.bhphotovideo.com/c/search?q=${encodeURIComponent(q)}`;

export const DEVICES: DeviceModel[] = [
  // ========================
  // LAPTOPS (14 Models)
  // ========================
  {
    id: 'acer-aspire-5-r5',
    category: 'laptop',
    useCases: ['Everyday Value'],
    brand: 'Acer',
    name: 'Aspire 5 (15.6" Ryzen 5)',
    year: 2025,
    tagline: 'Practical everyday laptop with upgradeable storage and full-size ports',
    price: 479,
    regionalPrices: {
      USD: [479, 489, 499],
      EUR: [549, 569, 579],
      GBP: [449, 469, 479],
      INR: [47990, 47990, 49990],
    },
    retailerQuery: 'Acer Aspire 5 Ryzen 5 7530U',
    processor: 'AMD Ryzen 5 7530U',
    processorFamily: 'AMD Ryzen',
    ramGb: 8,
    ramSpec: '8 GB DDR4',
    storage: '512 GB NVMe SSD',
    display: '15.6" FHD IPS 60Hz (250 nits)',
    battery: '8.5 hrs · 50 Wh',
    weight: '1.78 kg',
    weightGrams: 1780,
    connectivity: 'USB-C, 2x USB-A, HDMI 2.1, Wi-Fi 6',
    image: IMG_LAPTOP_ULTRABOOK,
    pros: [
      'Quiet thermal profile for documents and web browsing',
      'Includes full HDMI and dual USB-A ports without dongles',
    ],
    cons: [
      'Dim 250-nit display washes out near sunny windows',
      '8 GB DDR4 RAM limits heavy browser tabs or creative apps',
      'Plastic chassis flexes slightly under palm pressure',
    ],
    retailers: [
      {
        retailer: 'Amazon',
        price: 479,
        url: amazonSearch('Acer Aspire 5 Ryzen 5 7530U'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'B&H Photo',
        price: 489,
        url: bhSearch('Acer Aspire 5 Ryzen 5'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Best Buy',
        price: 499,
        url: bestBuySearch('Acer Aspire 5 Ryzen 5'),
        shippingNote: 'Store pickup available',
      },
    ],
  },
  {
    id: 'lenovo-ideapad-slim-3-i5',
    category: 'laptop',
    useCases: ['Everyday Value', 'Thin & Light'],
    brand: 'Lenovo',
    name: 'IdeaPad Slim 3i (15" Core i5)',
    year: 2025,
    tagline: 'Dependable budget commuter with 16 GB RAM and tactile keyboard',
    price: 569,
    regionalPrices: {
      USD: [569, 579, 584],
      EUR: [599, 619, 629],
      GBP: [499, 529, 549],
      INR: [56990, 56990, 58990],
    },
    retailerQuery: 'Lenovo IdeaPad Slim 3i Core i5 16GB',
    processor: 'Intel Core i5-13420H',
    processorFamily: 'Intel Core',
    ramGb: 16,
    ramSpec: '16 GB LPDDR5',
    storage: '512 GB NVMe SSD',
    display: '15.6" FHD IPS Anti-Glare 60Hz',
    battery: '8 hrs · 47 Wh',
    weight: '1.62 kg',
    weightGrams: 1620,
    connectivity: 'USB-C (PD/DP), 2x USB-A, SD reader, HDMI',
    image: IMG_LAPTOP_ULTRABOOK,
    pros: [
      'Generous 16 GB LPDDR5 memory at an entry-level price',
      'Comfortable Lenovo keyboard with physical webcam shutter',
    ],
    cons: [
      'RAM is soldered and cannot be upgraded later',
      '45% NTSC color gamut looks muted for photo editing',
      'Average 47 Wh battery rarely stretches past a full workday',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 569,
        url: bestBuySearch('Lenovo IdeaPad Slim 3i Core i5 16GB'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'B&H Photo',
        price: 579,
        url: bhSearch('Lenovo IdeaPad Slim 3i 16GB'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 584,
        url: amazonSearch('Lenovo IdeaPad Slim 3i 16GB Core i5'),
        shippingNote: 'Live marketplace listing',
      },
    ],
  },
  {
    id: 'asus-vivobook-16-r7',
    category: 'laptop',
    useCases: ['Everyday Value', 'Creator & Work'],
    brand: 'ASUS',
    name: 'Vivobook 16 (Ryzen 7)',
    year: 2025,
    tagline: 'Large-screen productivity machine with 8-core Ryzen efficiency',
    price: 679,
    regionalPrices: {
      USD: [679, 689, 699],
      EUR: [749, 769, 799],
      GBP: [649, 669, 699],
      INR: [69990, 69990, 72990],
    },
    retailerQuery: 'ASUS Vivobook 16 Ryzen 7 16GB 1TB',
    processor: 'AMD Ryzen 7 7730U',
    processorFamily: 'AMD Ryzen',
    ramGb: 16,
    ramSpec: '16 GB DDR4',
    storage: '1 TB NVMe SSD',
    display: '16.0" WUXGA 16:10 IPS 60Hz',
    battery: '9.5 hrs · 42 Wh',
    weight: '1.88 kg',
    weightGrams: 1880,
    connectivity: 'USB-C 3.2, 3x USB-A, HDMI 1.4, Wi-Fi 6E',
    image: IMG_LAPTOP_WORKSTATION,
    pros: [
      '16:10 tall aspect ratio plus 1 TB SSD at an entry price',
      '180-degree lay-flat hinge and antimicrobial palm rest',
    ],
    cons: [
      'USB-C port lacks Thunderbolt 4 speeds',
      'Downward-firing speakers lack bass clarity',
      '42 Wh battery is undersized for a 16-inch chassis',
    ],
    retailers: [
      {
        retailer: 'Amazon',
        price: 679,
        url: amazonSearch('ASUS Vivobook 16 Ryzen 7 16GB 1TB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'B&H Photo',
        price: 689,
        url: bhSearch('ASUS Vivobook 16 Ryzen 7'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Best Buy',
        price: 699,
        url: bestBuySearch('ASUS Vivobook 16 Ryzen 7'),
        shippingNote: 'Live store listing',
      },
    ],
  },
  {
    id: 'macbook-air-m2-16',
    category: 'laptop',
    useCases: ['Thin & Light', 'Everyday Value'],
    brand: 'Apple',
    name: 'MacBook Air 13" (M2 · 16 GB)',
    year: 2024,
    tagline: 'Fanless aluminum ultrabook with silent endurance and unified memory',
    price: 799,
    regionalPrices: {
      USD: [799, 819, 899],
      EUR: [999, 1029, 1099],
      GBP: [899, 899, 949],
      INR: [89900, 89900, 99900],
    },
    retailerQuery: 'Apple MacBook Air 13 M2 16GB 256GB',
    officialStore: {
      name: 'Apple Store',
      urls: {
        USD: 'https://www.apple.com/shop/buy-mac/macbook-air',
        EUR: 'https://www.apple.com/de/shop/buy-mac/macbook-air',
        GBP: 'https://www.apple.com/uk/shop/buy-mac/macbook-air',
        INR: 'https://www.apple.com/in/shop/buy-mac/macbook-air',
      },
    },
    processor: 'Apple M2 (8-core CPU)',
    processorFamily: 'Apple M-Series',
    ramGb: 16,
    ramSpec: '16 GB Unified',
    storage: '256 GB SSD',
    display: '13.6" Liquid Retina 60Hz (500 nits)',
    battery: '15 hrs · 52.6 Wh',
    weight: '1.24 kg',
    weightGrams: 1240,
    connectivity: '2x Thunderbolt / USB 4, MagSafe 3, 3.5mm',
    image: IMG_LAPTOP_ULTRABOOK,
    pros: [
      'Completely silent fanless build with 15-hour battery life',
      'Bright 500-nit P3 display and best-in-class glass trackpad',
    ],
    cons: [
      '256 GB base SSD uses single-NAND speeds and fills fast',
      'Only supports 1 external display with the lid open',
      'No USB-A, HDMI, or SD card slot without a hub',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 799,
        url: bestBuySearch('MacBook Air 13 M2 16GB 256GB'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 819,
        url: amazonSearch('MacBook Air 13 M2 16GB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Apple Store',
        price: 899,
        url: 'https://www.apple.com/shop/buy-mac/macbook-air',
        shippingNote: 'Direct product page',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'lenovo-loq-15-rtx4050',
    category: 'laptop',
    useCases: ['Gaming', 'Everyday Value'],
    brand: 'Lenovo',
    name: 'LOQ 15 (Ryzen 7 · RTX 4050)',
    year: 2025,
    tagline: 'Entry 144Hz gaming laptop with dedicated RTX 4050 graphics and DDR5 memory',
    price: 799,
    regionalPrices: {
      USD: [799, 819, 829],
      EUR: [899, 899, 929],
      GBP: [749, 779, 799],
      INR: [84990, 84990, 89990],
    },
    retailerQuery: 'Lenovo LOQ 15 Ryzen 7 RTX 4050 16GB',
    processor: 'AMD Ryzen 7 7435HS',
    processorFamily: 'AMD Ryzen',
    ramGb: 16,
    ramSpec: '16 GB DDR5',
    storage: '512 GB NVMe SSD',
    display: '15.6" FHD IPS 144Hz G-Sync',
    battery: '4.5 hrs · 60 Wh',
    weight: '2.38 kg',
    weightGrams: 2380,
    connectivity: 'USB-C (DP 1.4), 3x USB-A, HDMI 2.1, RJ45 Ethernet',
    image: IMG_LAPTOP_WORKSTATION,
    pros: [
      'Dedicated RTX 4050 (105W) handles 1080p high-frame gaming',
      'Dual M.2 SSD slots and dual SO-DIMM RAM slots for easy upgrades',
    ],
    cons: [
      'Ryzen 7435HS lacks integrated graphics, limiting unplugged battery to ~4.5 hrs',
      'Heavy 2.38 kg chassis plus bulky 170W charging brick',
      'Fans become noticeably loud during sustained gaming sessions',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 799,
        url: bestBuySearch('Lenovo LOQ 15 Ryzen 7 RTX 4050 16GB'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'B&H Photo',
        price: 819,
        url: bhSearch('Lenovo LOQ 15 RTX 4050'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 829,
        url: amazonSearch('Lenovo LOQ 15 Ryzen 7 RTX 4050'),
        shippingNote: 'Live marketplace listing',
      },
    ],
  },
  {
    id: 'asus-zenbook-14-oled-ultra5',
    category: 'laptop',
    useCases: ['Thin & Light', 'Creator & Work'],
    brand: 'ASUS',
    name: 'Zenbook 14 OLED (Core Ultra 5)',
    year: 2025,
    tagline: 'Featherweight 120Hz OLED travel ultrabook with Intel Arc graphics',
    price: 849,
    regionalPrices: {
      USD: [849, 879, 899],
      EUR: [999, 999, 1049],
      GBP: [899, 899, 949],
      INR: [96990, 96990, 99990],
    },
    retailerQuery: 'ASUS Zenbook 14 OLED Core Ultra 5 16GB',
    officialStore: {
      name: 'ASUS Store',
      urls: {
        USD: 'https://www.asus.com/laptops/for-home/zenbook/asus-zenbook-14-oled-ux3405/',
        EUR: 'https://www.asus.com/laptops/for-home/zenbook/asus-zenbook-14-oled-ux3405/',
        GBP: 'https://www.asus.com/laptops/for-home/zenbook/asus-zenbook-14-oled-ux3405/',
        INR: 'https://www.asus.com/in/laptops/for-home/zenbook/asus-zenbook-14-oled-ux3405/',
      },
    },
    processor: 'Intel Core Ultra 5 125H',
    processorFamily: 'Intel Core',
    ramGb: 16,
    ramSpec: '16 GB LPDDR5X',
    storage: '512 GB PCIe 4.0 SSD',
    display: '14.0" 2.8K OLED 120Hz (600 nits HDR)',
    battery: '12 hrs · 75 Wh',
    weight: '1.20 kg',
    weightGrams: 1200,
    connectivity: '2x Thunderbolt 4, USB-A, HDMI 2.1, Wi-Fi 6E',
    image: IMG_LAPTOP_WORKSTATION,
    pros: [
      'Vibrant 120Hz OLED panel with deep contrast in a 1.2 kg shell',
      'Large 75 Wh battery paired with Thunderbolt 4 and HDMI',
    ],
    cons: [
      'Glossy OLED screen reflects harsh overhead office lights',
      '16 GB RAM is soldered and non-expandable',
      'Fans become audible under sustained multi-core rendering',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 849,
        url: bestBuySearch('ASUS Zenbook 14 OLED Core Ultra 5'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 879,
        url: amazonSearch('ASUS Zenbook 14 OLED Core Ultra 5 16GB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'ASUS Store',
        price: 899,
        url: 'https://www.asus.com/laptops/for-home/zenbook/asus-zenbook-14-oled-ux3405/',
        shippingNote: 'Direct product page',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'lenovo-yoga-7-2in1-r7',
    category: 'laptop',
    useCases: ['Creator & Work', 'Thin & Light'],
    brand: 'Lenovo',
    name: 'Yoga 7 14" (Ryzen 7 8840HS)',
    year: 2025,
    tagline: 'Convertible aluminum 2-in-1 with strong multi-core Ryzen performance',
    price: 899,
    regionalPrices: {
      USD: [899, 919, 929],
      EUR: [999, 1029, 1049],
      GBP: [899, 899, 929],
      INR: [94990, 94990, 99990],
    },
    retailerQuery: 'Lenovo Yoga 7 14 Ryzen 7 8840HS 16GB',
    processor: 'AMD Ryzen 7 8840HS',
    processorFamily: 'AMD Ryzen',
    ramGb: 16,
    ramSpec: '16 GB LPDDR5X',
    storage: '1 TB NVMe SSD',
    display: '14.0" WUXGA OLED Touch 60Hz',
    battery: '11.5 hrs · 71 Wh',
    weight: '1.49 kg',
    weightGrams: 1490,
    connectivity: '2x USB-C (USB4), USB-A, HDMI 2.1, microSD',
    image: IMG_LAPTOP_ULTRABOOK,
    pros: [
      'Fast Ryzen 7 8840HS handles code compilation and light 4K edits',
      'Full 1 TB SSD and microSD slot in a rigid 360-degree chassis',
    ],
    cons: [
      'Touchscreen digitizer layer adds subtle grain on white pages',
      '60Hz refresh rate feels dated next to 120Hz peers',
      'Slightly heavy at 1.49 kg to hold one-handed as a tablet',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 899,
        url: bestBuySearch('Lenovo Yoga 7 14 Ryzen 7 8840HS'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'B&H Photo',
        price: 919,
        url: bhSearch('Lenovo Yoga 7 14 Ryzen 7'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 929,
        url: amazonSearch('Lenovo Yoga 7 14 Ryzen 7 16GB 1TB'),
        shippingNote: 'Live marketplace listing',
      },
    ],
  },
  {
    id: 'macbook-air-m4-16',
    category: 'laptop',
    useCases: ['Thin & Light'],
    brand: 'Apple',
    name: 'MacBook Air 13" (M4 · 16 GB)',
    year: 2026,
    tagline: 'Latest Apple Silicon efficiency with dual-display support and Center Stage',
    price: 849,
    regionalPrices: {
      USD: [849, 899, 999],
      EUR: [1149, 1149, 1199],
      GBP: [999, 999, 999],
      INR: [99900, 99900, 99900],
    },
    retailerQuery: 'Apple MacBook Air 13 M4 16GB 256GB',
    officialStore: {
      name: 'Apple Store',
      urls: {
        USD: 'https://www.apple.com/shop/buy-mac/macbook-air',
        EUR: 'https://www.apple.com/de/shop/buy-mac/macbook-air',
        GBP: 'https://www.apple.com/uk/shop/buy-mac/macbook-air',
        INR: 'https://www.apple.com/in/shop/buy-mac/macbook-air',
      },
    },
    directRetailerUrls: {
      USD: {
        Amazon: 'https://www.amazon.com/dp/B0DZD9S5GC',
      },
      INR: {
        Flipkart:
          'https://www.flipkart.com/apple-macbook-air-m4-16-gb-256-gb-ssd-macos-sequoia-mc6t4hn-a/p/itm23b88b4f17849',
      },
    },
    processor: 'Apple M4 (10-core CPU)',
    processorFamily: 'Apple M-Series',
    ramGb: 16,
    ramSpec: '16 GB Unified',
    storage: '256 GB SSD',
    display: '13.6" Liquid Retina 60Hz (500 nits)',
    battery: '18 hrs · 53.8 Wh',
    weight: '1.24 kg',
    weightGrams: 1240,
    connectivity: '2x Thunderbolt 4, MagSafe 3, Wi-Fi 6E',
    image: IMG_LAPTOP_ULTRABOOK,
    pros: [
      'Leading single-core responsiveness and 18-hour battery runtime',
      'Supports two external 6K monitors even with the laptop open',
    ],
    cons: [
      '256 GB base storage is restrictive for Xcode or media libraries',
      'Still capped at a 60Hz LCD panel without ProMotion',
      'Upgrading to 512 GB or 24 GB adds steep storage-tier cost',
    ],
    retailers: [
      {
        retailer: 'Amazon',
        price: 849,
        url: 'https://www.amazon.com/dp/B0DZD9S5GC',
        shippingNote: 'Direct product page',
        isDirectProduct: true,
      },
      {
        retailer: 'Best Buy',
        price: 899,
        url: bestBuySearch('Apple MacBook Air 13 M4 16GB'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Apple Store',
        price: 999,
        url: 'https://www.apple.com/shop/buy-mac/macbook-air',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'asus-tuf-a15-rtx4060',
    category: 'laptop',
    useCases: ['Gaming', 'Creator & Work'],
    brand: 'ASUS',
    name: 'TUF Gaming A15 (Ryzen 7 · RTX 4060)',
    year: 2025,
    tagline: 'Full-wattage RTX 4060 gaming rig with large 90 Wh battery and MUX switch',
    price: 1049,
    regionalPrices: {
      USD: [1049, 1069, 1099],
      EUR: [1149, 1149, 1199],
      GBP: [999, 999, 1049],
      INR: [99990, 99990, 104990],
    },
    retailerQuery: 'ASUS TUF Gaming A15 RTX 4060 16GB 1TB',
    officialStore: {
      name: 'ASUS Store',
      urls: {
        USD: 'https://www.asus.com/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a15-2023/',
        EUR: 'https://www.asus.com/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a15-2023/',
        GBP: 'https://www.asus.com/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a15-2023/',
        INR: 'https://www.asus.com/in/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a15-2023/',
      },
    },
    processor: 'AMD Ryzen 7 7735HS',
    processorFamily: 'AMD Ryzen',
    ramGb: 16,
    ramSpec: '16 GB DDR5',
    storage: '1 TB NVMe SSD',
    display: '15.6" FHD IPS 144Hz (100% sRGB)',
    battery: '7.5 hrs light · 90 Wh',
    weight: '2.20 kg',
    weightGrams: 2200,
    connectivity: 'USB4, USB-C, 2x USB-A, HDMI 2.1, RJ45 Ethernet',
    image: IMG_LAPTOP_WORKSTATION,
    pros: [
      'Full 140W RTX 4060 GPU + 1 TB SSD delivers strong 1080p/1440p gaming value',
      'Large 90 Wh battery lasts over 7 hours on light productivity tasks',
    ],
    cons: [
      'Screen brightness tops out around 250–280 nits indoors',
      'Aggressive gamer lid aesthetics and plastic keyboard deck',
      '720p webcam produces soft, grainy video in dim rooms',
    ],
    retailers: [
      {
        retailer: 'Amazon',
        price: 1049,
        url: amazonSearch('ASUS TUF Gaming A15 RTX 4060 16GB 1TB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Best Buy',
        price: 1069,
        url: bestBuySearch('ASUS TUF Gaming A15 RTX 4060'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'ASUS Store',
        price: 1099,
        url: 'https://www.asus.com/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a15-2023/',
        shippingNote: 'Direct product page',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'hp-spectre-x360-14-ultra7',
    category: 'laptop',
    useCases: ['Thin & Light', 'Creator & Work'],
    brand: 'HP',
    name: 'Spectre x360 14 (Core Ultra 7)',
    year: 2025,
    tagline: 'Precision CNC convertible with 2.8K 120Hz OLED and haptic touchpad',
    price: 1199,
    regionalPrices: {
      USD: [1199, 1229, 1249],
      EUR: [1399, 1449, 1499],
      GBP: [1199, 1249, 1299],
      INR: [149990, 149990, 154990],
    },
    retailerQuery: 'HP Spectre x360 14 Core Ultra 7 16GB 1TB',
    processor: 'Intel Core Ultra 7 155H',
    processorFamily: 'Intel Core',
    ramGb: 16,
    ramSpec: '16 GB LPDDR5X',
    storage: '1 TB PCIe 4.0 SSD',
    display: '14.0" 2.8K OLED Touch 48–120Hz',
    battery: '12 hrs · 68 Wh',
    weight: '1.44 kg',
    weightGrams: 1440,
    connectivity: '2x Thunderbolt 4, USB-A, Wi-Fi 7, 9MP IR cam',
    image: IMG_LAPTOP_WORKSTATION,
    pros: [
      'Sharp 9MP webcam and crisp haptic ForcePad touchpad',
      'Includes tilt-sensitive stylus and USB-C hub in select kits',
    ],
    cons: [
      'Limited to 16 GB RAM on the base Core Ultra 7 configuration',
      'No built-in HDMI port or full-size SD slot',
      'Corner-mounted USB-C ports sit awkwardly on narrow desks',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 1199,
        url: bestBuySearch('HP Spectre x360 14 Core Ultra 7'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'B&H Photo',
        price: 1229,
        url: bhSearch('HP Spectre x360 14 Core Ultra 7'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 1249,
        url: amazonSearch('HP Spectre x360 14 Core Ultra 7 16GB 1TB'),
        shippingNote: 'Live marketplace listing',
      },
    ],
  },
  {
    id: 'asus-rog-zephyrus-g14-32',
    category: 'laptop',
    useCases: ['Gaming', 'Thin & Light', 'Creator & Work'],
    brand: 'ASUS',
    name: 'ROG Zephyrus G14 (Ryzen 9 · 32 GB)',
    year: 2025,
    tagline: 'CNC-milled 14" creator & gaming powerhouse with 32 GB RAM and RTX 4060',
    price: 1399,
    regionalPrices: {
      USD: [1399, 1479, 1599],
      EUR: [1699, 1699, 1799],
      GBP: [1499, 1549, 1599],
      INR: [179990, 179990, 184990],
    },
    retailerQuery: 'ASUS ROG Zephyrus G14 32GB RTX 4060',
    officialStore: {
      name: 'ASUS Store',
      urls: {
        USD: 'https://rog.asus.com/laptops/rog-zephyrus/rog-zephyrus-g14-series/',
        EUR: 'https://rog.asus.com/laptops/rog-zephyrus/rog-zephyrus-g14-series/',
        GBP: 'https://rog.asus.com/uk/laptops/rog-zephyrus/rog-zephyrus-g14-series/',
        INR: 'https://rog.asus.com/in/laptops/rog-zephyrus/rog-zephyrus-g14-series/',
      },
    },
    processor: 'AMD Ryzen 9 8945HS',
    processorFamily: 'AMD Ryzen',
    ramGb: 32,
    ramSpec: '32 GB LPDDR5X',
    storage: '1 TB PCIe 4.0 SSD',
    display: '14.0" 3K OLED 120Hz G-Sync',
    battery: '9 hrs · 73 Wh',
    weight: '1.50 kg',
    weightGrams: 1500,
    connectivity: '2x USB-C (1x USB4), 2x USB-A, HDMI 2.1, microSD',
    image: IMG_LAPTOP_WORKSTATION,
    pros: [
      '32 GB RAM + RTX 4060 GPU in a clean 1.5 kg aluminum chassis',
      'Color-calibrated 3K 120Hz OLED display and studio speakers',
    ],
    cons: [
      '32 GB RAM is soldered onto the motherboard (no future upgrade)',
      'Bottom chassis runs hot during 3D rendering or gaming',
      'Proprietary rectangular power brick required for full GPU wattage',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 1399,
        url: bestBuySearch('ASUS ROG Zephyrus G14 32GB RTX 4060'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 1479,
        url: amazonSearch('ASUS ROG Zephyrus G14 Ryzen 9 32GB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'ASUS Store',
        price: 1599,
        url: 'https://rog.asus.com/laptops/rog-zephyrus/rog-zephyrus-g14-series/',
        shippingNote: 'Direct product page',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'dell-xps-14-ultra7-32',
    category: 'laptop',
    useCases: ['Creator & Work', 'Thin & Light'],
    brand: 'Dell',
    name: 'XPS 14 (Core Ultra 7 · 32 GB)',
    year: 2025,
    tagline: 'Architectural CNC aluminum workstation with 32 GB memory and OLED panel',
    price: 1549,
    regionalPrices: {
      USD: [1549, 1579, 1589],
      EUR: [1799, 1849, 1899],
      GBP: [1599, 1649, 1699],
      INR: [205990, 205990, 212990],
    },
    retailerQuery: 'Dell XPS 14 Core Ultra 7 32GB 1TB',
    processor: 'Intel Core Ultra 7 155H',
    processorFamily: 'Intel Core',
    ramGb: 32,
    ramSpec: '32 GB LPDDR5X',
    storage: '1 TB NVMe SSD',
    display: '14.5" 3.2K OLED Touch 120Hz',
    battery: '11 hrs · 69.5 Wh',
    weight: '1.68 kg',
    weightGrams: 1680,
    connectivity: '3x Thunderbolt 4, microSD, 3.5mm audio',
    image: IMG_LAPTOP_WORKSTATION,
    pros: [
      'Rigid billet aluminum build with 3x Thunderbolt 4 ports',
      '32 GB fast memory handles Docker, VMs, and large spreadsheets',
    ],
    cons: [
      'Capacitive touch function row lacks physical tactile feedback',
      'Invisible glass haptic trackpad takes time to learn edges',
      'No USB-A or HDMI ports; adapter included in box',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 1549,
        url: bestBuySearch('Dell XPS 14 Core Ultra 7 32GB'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'B&H Photo',
        price: 1579,
        url: bhSearch('Dell XPS 14 32GB'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 1589,
        url: amazonSearch('Dell XPS 14 Core Ultra 7 32GB'),
        shippingNote: 'Live marketplace listing',
      },
    ],
  },
  {
    id: 'macbook-pro-14-m4-24',
    category: 'laptop',
    useCases: ['Creator & Work'],
    brand: 'Apple',
    name: 'MacBook Pro 14" (M4 · 24 GB)',
    year: 2026,
    tagline: 'ProMotion mini-LED reference display with 24 GB unified memory',
    price: 1749,
    regionalPrices: {
      USD: [1749, 1769, 1799],
      EUR: [2099, 2099, 2199],
      GBP: [1799, 1849, 1899],
      INR: [199900, 199900, 199900],
    },
    retailerQuery: 'Apple MacBook Pro 14 M4 24GB 1TB',
    officialStore: {
      name: 'Apple Store',
      urls: {
        USD: 'https://www.apple.com/shop/buy-mac/macbook-pro',
        EUR: 'https://www.apple.com/de/shop/buy-mac/macbook-pro',
        GBP: 'https://www.apple.com/uk/shop/buy-mac/macbook-pro',
        INR: 'https://www.apple.com/in/shop/buy-mac/macbook-pro',
      },
    },
    processor: 'Apple M4 (10-core CPU / 10-core GPU)',
    processorFamily: 'Apple M-Series',
    ramGb: 24,
    ramSpec: '24 GB Unified',
    storage: '1 TB SSD',
    display: '14.2" Liquid Retina XDR 120Hz (1000 nits)',
    battery: '22 hrs · 72.4 Wh',
    weight: '1.55 kg',
    weightGrams: 1550,
    connectivity: '3x Thunderbolt 4, HDMI 2.1, SDXC, MagSafe 3',
    image: IMG_LAPTOP_WORKSTATION,
    pros: [
      'Reference-grade 120Hz XDR mini-LED screen and 22-hour endurance',
      'Built-in HDMI 2.1 and full-speed SDXC card reader',
    ],
    cons: [
      'Base M4 chip has fewer GPU cores than M4 Pro for 3D workloads',
      'Noticeably thicker and heavier than the 13" Air',
      'RAM and SSD cannot be upgraded post-purchase',
    ],
    retailers: [
      {
        retailer: 'B&H Photo',
        price: 1749,
        url: bhSearch('MacBook Pro 14 M4 24GB 1TB'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 1769,
        url: amazonSearch('MacBook Pro 14 M4 24GB 1TB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Apple Store',
        price: 1799,
        url: 'https://www.apple.com/shop/buy-mac/macbook-pro',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'lenovo-thinkpad-p14s-ultra9-32',
    category: 'laptop',
    useCases: ['Creator & Work'],
    brand: 'Lenovo',
    name: 'ThinkPad P14s Gen 5 (Ultra 9 · 32 GB)',
    year: 2025,
    tagline: 'ISV-certified mobile engineering workstation with socketed RAM',
    price: 1899,
    regionalPrices: {
      USD: [1899, 1949, 1979],
      EUR: [1999, 2049, 2099],
      GBP: [1749, 1799, 1849],
      INR: [184990, 184990, 189990],
    },
    retailerQuery: 'Lenovo ThinkPad P14s Gen 5 Ultra 9 32GB',
    processor: 'Intel Core Ultra 9 185H',
    processorFamily: 'Intel Core',
    ramGb: 32,
    ramSpec: '32 GB DDR5 (Socketed)',
    storage: '1 TB PCIe 4.0 SSD',
    display: '14.5" 3K IPS Anti-Glare 120Hz',
    battery: '10 hrs · 75 Wh',
    weight: '1.61 kg',
    weightGrams: 1610,
    connectivity: '2x Thunderbolt 4, 2x USB-A, HDMI 2.1, RJ45 Ethernet',
    image: IMG_LAPTOP_WORKSTATION,
    pros: [
      'Dual SO-DIMM slots support upgrading up to 96 GB DDR5 later',
      'Includes full RJ45 Ethernet, matte 120Hz display, and TrackPoint',
    ],
    cons: [
      'Utilitarian black styling lacks the sleekness of consumer ultrabooks',
      'Under full CPU+GPU load, fan noise reaches ~44 dBA',
      '10-hour battery lags behind Apple Silicon competitors',
    ],
    retailers: [
      {
        retailer: 'B&H Photo',
        price: 1899,
        url: bhSearch('Lenovo ThinkPad P14s Gen 5 32GB'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 1949,
        url: amazonSearch('Lenovo ThinkPad P14s Gen 5 Ultra 9 32GB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Best Buy',
        price: 1979,
        url: bestBuySearch('Lenovo ThinkPad P14s 32GB'),
        shippingNote: 'Live store listing',
      },
    ],
  },

  // ========================
  // MOBILES (12 Models)
  // ========================
  {
    id: 'cmf-phone-1-dimensity',
    category: 'mobile',
    useCases: ['Battery Life'],
    brand: 'Nothing / CMF',
    name: 'CMF Phone 1 (8 GB)',
    year: 2025,
    tagline: 'Clean 120Hz AMOLED budget phone with modular backplate and microSD',
    price: 249,
    regionalPrices: {
      USD: [249, 259, 259],
      EUR: [239, 249, 259],
      GBP: [209, 219, 229],
      INR: [17999, 17999, 17999],
    },
    retailerQuery: 'CMF Phone 1 8GB 128GB',
    directRetailerUrls: {
      INR: {
        Flipkart:
          'https://www.flipkart.com/cmf-by-nothing-phone-1-black-128-gb/p/itme1c2b5bc503a6',
      },
    },
    processor: 'MediaTek Dimensity 7300',
    processorFamily: 'MediaTek Dimensity',
    ramGb: 8,
    ramSpec: '8 GB LPDDR4X',
    storage: '128 GB + microSD',
    display: '6.67" Super AMOLED 120Hz (2000 nits)',
    battery: '5,000 mAh · 33W wired',
    weight: '197 g',
    weightGrams: 197,
    connectivity: 'USB-C 2.0, 5G, Wi-Fi 6, microSDXC',
    image: IMG_MOBILE_VALUE,
    pros: [
      'Smooth 120Hz AMOLED screen and zero bloatware at an entry price',
      'Expandable microSD storage up to 2 TB',
    ],
    cons: [
      'No NFC chip — Google Wallet tap-to-pay will not work',
      'Lacks optical image stabilization (OIS) on main camera',
      'Single mono bottom speaker and basic IP52 splash resistance',
    ],
    retailers: [
      {
        retailer: 'Amazon',
        price: 249,
        url: amazonSearch('CMF Phone 1 8GB 128GB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Best Buy',
        price: 259,
        url: bestBuySearch('CMF Phone 1'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'B&H Photo',
        price: 259,
        url: bhSearch('CMF Phone 1'),
        shippingNote: 'Live store listing',
      },
    ],
  },
  {
    id: 'samsung-galaxy-a35-6gb',
    category: 'mobile',
    useCases: ['Battery Life'],
    brand: 'Samsung',
    name: 'Galaxy A35 5G (6 GB)',
    year: 2025,
    tagline: 'IP67 water-resistant daily driver with Gorilla Glass Victus+ front',
    price: 349,
    regionalPrices: {
      USD: [349, 359, 399],
      EUR: [349, 349, 379],
      GBP: [309, 309, 339],
      INR: [26999, 26999, 30999],
    },
    retailerQuery: 'Samsung Galaxy A35 5G Unlocked',
    officialStore: {
      name: 'Samsung Store',
      urls: {
        USD: 'https://www.samsung.com/us/smartphones/galaxy-a-series/',
        EUR: 'https://www.samsung.com/de/smartphones/galaxy-a/',
        GBP: 'https://www.samsung.com/uk/smartphones/galaxy-a/',
        INR: 'https://www.samsung.com/in/smartphones/galaxy-a/',
      },
    },
    processor: 'Snapdragon / Exynos 1380 Class (Octa)',
    processorFamily: 'Snapdragon',
    ramGb: 6,
    ramSpec: '6 GB LPDDR4X',
    storage: '128 GB + microSD',
    display: '6.6" Super AMOLED 120Hz',
    battery: '5,000 mAh · 25W wired',
    weight: '209 g',
    weightGrams: 209,
    connectivity: 'USB-C, 5G, NFC, IP67, microSDXC',
    image: IMG_MOBILE_VALUE,
    pros: [
      'IP67 water resistance and 4 years of promised OS updates',
      'Crisp 120Hz AMOLED display with NFC tap-to-pay',
    ],
    cons: [
      '6 GB RAM causes background apps to reload when multitasking',
      'Slow 25W charging takes ~85 minutes for a full charge',
      'Thick display bezels and heavy 209 g frame',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 349,
        url: bestBuySearch('Samsung Galaxy A35 5G Unlocked'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 359,
        url: amazonSearch('Samsung Galaxy A35 5G 128GB Unlocked'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Samsung Store',
        price: 399,
        url: 'https://www.samsung.com/us/smartphones/galaxy-a-series/',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'google-pixel-8a-8gb',
    category: 'mobile',
    useCases: ['Camera Focus', 'Compact'],
    brand: 'Google',
    name: 'Pixel 8a (8 GB)',
    year: 2025,
    tagline: 'Compact flagship camera performance with 7 years of software support',
    price: 399,
    regionalPrices: {
      USD: [399, 399, 499],
      EUR: [479, 479, 549],
      GBP: [429, 429, 499],
      INR: [39999, 39999, 52999],
    },
    retailerQuery: 'Google Pixel 8a 128GB Unlocked',
    officialStore: {
      name: 'Google Store',
      urls: {
        USD: 'https://store.google.com/product/pixel_8a',
        EUR: 'https://store.google.com/de/product/pixel_8a',
        GBP: 'https://store.google.com/gb/product/pixel_8a',
        INR: 'https://store.google.com/in/product/pixel_8a',
      },
    },
    directRetailerUrls: {
      INR: {
        Flipkart:
          'https://www.flipkart.com/google-pixel-8a-obsidian-128-gb/p/itm5a188f57f0d06',
      },
    },
    processor: 'Google Tensor G3',
    processorFamily: 'Google Tensor',
    ramGb: 8,
    ramSpec: '8 GB LPDDR5X',
    storage: '128 GB UFS 3.1',
    display: '6.1" Actua OLED 120Hz (2000 nits)',
    battery: '4,492 mAh · 18W wired / 7.5W Qi',
    weight: '188 g',
    weightGrams: 188,
    connectivity: 'USB-C 3.2, Wi-Fi 6E, NFC, IP67',
    image: IMG_MOBILE_FLAGSHIP,
    pros: [
      'Best still-camera processing and skin-tone accuracy in its tier',
      '7 years of guaranteed OS and security updates through 2031',
    ],
    cons: [
      '18W wired charging is among the slowest on the market',
      'Tensor G3 warms up noticeably during 5G video calls or gaming',
      'Chunkier symmetrical bezels than flagship Pixel models',
    ],
    retailers: [
      {
        retailer: 'Amazon',
        price: 399,
        url: amazonSearch('Google Pixel 8a 128GB Unlocked'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Best Buy',
        price: 399,
        url: bestBuySearch('Google Pixel 8a 128GB Unlocked'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Google Store',
        price: 499,
        url: 'https://store.google.com/product/pixel_8a',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'oneplus-13r-12gb',
    category: 'mobile',
    useCases: ['Battery Life', 'Gaming & Speed'],
    brand: 'OnePlus',
    name: 'OnePlus 13R (12 GB)',
    year: 2026,
    tagline: 'Flagship-tier Snapdragon 8 Gen 3 speed with massive 6,000 mAh battery',
    price: 549,
    regionalPrices: {
      USD: [549, 569, 599],
      EUR: [569, 569, 599],
      GBP: [499, 499, 549],
      INR: [42999, 42999, 42999],
    },
    retailerQuery: 'OnePlus 13R 12GB 256GB',
    officialStore: {
      name: 'OnePlus Store',
      urls: {
        USD: 'https://www.oneplus.com/us/oneplus-13r',
        EUR: 'https://www.oneplus.com/de/oneplus-13r',
        GBP: 'https://www.oneplus.com/uk/oneplus-13r',
        INR: 'https://www.oneplus.in/oneplus-13r',
      },
    },
    processor: 'Snapdragon 8 Gen 3',
    processorFamily: 'Snapdragon',
    ramGb: 12,
    ramSpec: '12 GB LPDDR5X',
    storage: '256 GB UFS 4.0',
    display: '6.78" LTPO AMOLED 120Hz',
    battery: '6,000 mAh · 80W SuperVOOC',
    weight: '206 g',
    weightGrams: 206,
    connectivity: 'USB-C, Wi-Fi 7, IR Blaster, IP65',
    image: IMG_MOBILE_VALUE,
    pros: [
      'Unmatched 6,000 mAh endurance and 80W charger included in box',
      '12 GB RAM + 256 GB UFS 4.0 storage at mid-range pricing',
    ],
    cons: [
      'Lacks wireless charging support',
      'IP65 splash rating instead of full IP68 submersion protection',
      '8MP ultrawide camera drops sharply in low-light scenes',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 549,
        url: bestBuySearch('OnePlus 13R 256GB Unlocked'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 569,
        url: amazonSearch('OnePlus 13R 12GB 256GB Unlocked'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'OnePlus Store',
        price: 599,
        url: 'https://www.oneplus.com/us/oneplus-13r',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'iphone-16e-8gb',
    category: 'mobile',
    useCases: ['Battery Life', 'Compact'],
    brand: 'Apple',
    name: 'iPhone 16e (8 GB)',
    year: 2026,
    tagline: 'A18 processor longevity and custom C1 modem battery efficiency',
    price: 599,
    regionalPrices: {
      USD: [599, 599, 599],
      EUR: [699, 699, 699],
      GBP: [599, 599, 599],
      INR: [59900, 59900, 59900],
    },
    retailerQuery: 'Apple iPhone 16e 128GB',
    officialStore: {
      name: 'Apple Store',
      urls: {
        USD: 'https://www.apple.com/shop/buy-iphone/iphone-16e',
        EUR: 'https://www.apple.com/de/shop/buy-iphone/iphone-16e',
        GBP: 'https://www.apple.com/uk/shop/buy-iphone/iphone-16e',
        INR: 'https://www.apple.com/in/shop/buy-iphone/iphone-16e',
      },
    },
    processor: 'Apple A18 (6-core)',
    processorFamily: 'Apple A-Series',
    ramGb: 8,
    ramSpec: '8 GB Unified',
    storage: '128 GB NVMe',
    display: '6.1" Super Retina XDR OLED 60Hz',
    battery: '26 hrs video · 20W wired / Qi',
    weight: '167 g',
    weightGrams: 167,
    connectivity: 'USB-C 2.0, 5G, Wi-Fi 6, IP68',
    image: IMG_MOBILE_FLAGSHIP,
    pros: [
      'Latest A18 silicon ensures 5+ years of smooth iOS updates',
      'Lightweight 167 g frame with long battery life for a 6.1" phone',
    ],
    cons: [
      'Single rear camera — no ultrawide or dedicated macro lens',
      '60Hz display lacks 120Hz scrolling smoothness',
      'No MagSafe magnetic ring; capped at slower 7.5W wireless charging',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 599,
        url: bestBuySearch('Apple iPhone 16e 128GB Unlocked'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 599,
        url: amazonSearch('iPhone 16e 128GB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Apple Store',
        price: 599,
        url: 'https://www.apple.com/shop/buy-iphone/iphone-16e',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'google-pixel-9-12gb',
    category: 'mobile',
    useCases: ['Camera Focus', 'Compact'],
    brand: 'Google',
    name: 'Pixel 9 (12 GB)',
    year: 2025,
    tagline: 'Refined satin aluminum flagship with 12 GB RAM and ultrasonic fingerprint',
    price: 649,
    regionalPrices: {
      USD: [649, 649, 799],
      EUR: [799, 799, 899],
      GBP: [699, 749, 799],
      INR: [74999, 74999, 79999],
    },
    retailerQuery: 'Google Pixel 9 128GB Unlocked',
    officialStore: {
      name: 'Google Store',
      urls: {
        USD: 'https://store.google.com/product/pixel_9',
        EUR: 'https://store.google.com/de/product/pixel_9',
        GBP: 'https://store.google.com/gb/product/pixel_9',
        INR: 'https://store.google.com/in/product/pixel_9',
      },
    },
    processor: 'Google Tensor G4',
    processorFamily: 'Google Tensor',
    ramGb: 12,
    ramSpec: '12 GB LPDDR5X',
    storage: '128 GB UFS 3.1',
    display: '6.3" Actua OLED 120Hz (2700 nits)',
    battery: '4,700 mAh · 27W wired / 15W Qi',
    weight: '198 g',
    weightGrams: 198,
    connectivity: 'USB-C 3.2, Wi-Fi 7, Satellite SOS, IP68',
    image: IMG_MOBILE_FLAGSHIP,
    pros: [
      'Upgraded 12 GB RAM and ultra-fast ultrasonic fingerprint sensor',
      'Bright 2,700-nit screen and reliable dual rear cameras',
    ],
    cons: [
      'Base 128 GB uses slower UFS 3.1 storage instead of UFS 4.0',
      'No dedicated telephoto zoom lens (reserved for Pro tier)',
      'Tensor G4 lags behind Snapdragon 8 Elite in sustained 3D gaming',
    ],
    retailers: [
      {
        retailer: 'Amazon',
        price: 649,
        url: amazonSearch('Google Pixel 9 128GB Unlocked'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Best Buy',
        price: 649,
        url: bestBuySearch('Google Pixel 9 128GB Unlocked'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Google Store',
        price: 799,
        url: 'https://store.google.com/product/pixel_9',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'samsung-galaxy-s25-12gb',
    category: 'mobile',
    useCases: ['Compact', 'Gaming & Speed'],
    brand: 'Samsung',
    name: 'Galaxy S25 (12 GB)',
    year: 2026,
    tagline: 'Pocket-friendly 6.2" flagship powered by Snapdragon 8 Elite',
    price: 749,
    regionalPrices: {
      USD: [749, 759, 799],
      EUR: [899, 899, 899],
      GBP: [799, 799, 799],
      INR: [79999, 79999, 80999],
    },
    retailerQuery: 'Samsung Galaxy S25 256GB Unlocked',
    officialStore: {
      name: 'Samsung Store',
      urls: {
        USD: 'https://www.samsung.com/us/smartphones/galaxy-s25/',
        EUR: 'https://www.samsung.com/de/smartphones/galaxy-s25/',
        GBP: 'https://www.samsung.com/uk/smartphones/galaxy-s25/',
        INR: 'https://www.samsung.com/in/smartphones/galaxy-s25/',
      },
    },
    processor: 'Snapdragon 8 Elite for Galaxy',
    processorFamily: 'Snapdragon',
    ramGb: 12,
    ramSpec: '12 GB LPDDR5X',
    storage: '256 GB UFS 4.0',
    display: '6.2" Dynamic LTPO AMOLED 2X 120Hz',
    battery: '4,000 mAh · 25W wired / 15W Qi2',
    weight: '162 g',
    weightGrams: 162,
    connectivity: 'USB-C 3.2, DeX, Wi-Fi 7, IP68',
    image: IMG_MOBILE_FLAGSHIP,
    pros: [
      'Compact 162 g ergonomics with flagship Snapdragon 8 Elite chip',
      'Triple camera array including 3x optical telephoto lens',
    ],
    cons: [
      '4,000 mAh battery struggles on heavy 5G navigation days',
      'Still capped at 25W wired charging speed without brick in box',
      'Camera hardware largely unchanged from previous generation',
    ],
    retailers: [
      {
        retailer: 'Amazon',
        price: 749,
        url: amazonSearch('Samsung Galaxy S25 256GB Unlocked'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Best Buy',
        price: 759,
        url: bestBuySearch('Samsung Galaxy S25 Unlocked'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Samsung Store',
        price: 799,
        url: 'https://www.samsung.com/us/smartphones/galaxy-s25/',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'iphone-16-8gb',
    category: 'mobile',
    useCases: ['Compact', 'Camera Focus'],
    brand: 'Apple',
    name: 'iPhone 16 (8 GB)',
    year: 2025,
    tagline: 'Balanced Apple flagship with Camera Control, MagSafe, and A18 chip',
    price: 799,
    regionalPrices: {
      USD: [799, 799, 799],
      EUR: [949, 949, 949],
      GBP: [799, 799, 799],
      INR: [79900, 79900, 79900],
    },
    retailerQuery: 'Apple iPhone 16 128GB',
    officialStore: {
      name: 'Apple Store',
      urls: {
        USD: 'https://www.apple.com/shop/buy-iphone/iphone-16',
        EUR: 'https://www.apple.com/de/shop/buy-iphone/iphone-16',
        GBP: 'https://www.apple.com/uk/shop/buy-iphone/iphone-16',
        INR: 'https://www.apple.com/in/shop/buy-iphone/iphone-16',
      },
    },
    processor: 'Apple A18 (6-core)',
    processorFamily: 'Apple A-Series',
    ramGb: 8,
    ramSpec: '8 GB Unified',
    storage: '128 GB NVMe',
    display: '6.1" Super Retina XDR OLED 60Hz',
    battery: '22 hrs video · 25W MagSafe',
    weight: '170 g',
    weightGrams: 170,
    connectivity: 'USB-C 2.0, Wi-Fi 7, MagSafe, IP68',
    image: IMG_MOBILE_FLAGSHIP,
    pros: [
      'Consistent 4K Dolby Vision video recording and MagSafe ecosystem',
      'Upgraded 48MP Fusion + 12MP Macro ultrawide cameras',
    ],
    cons: [
      '60Hz refresh rate feels sluggish beside 120Hz Android rivals',
      'USB-C port is limited to slow USB 2.0 (480 Mbps) transfer speeds',
      '128 GB base storage fills quickly with 48MP photos',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 799,
        url: bestBuySearch('Apple iPhone 16 128GB Unlocked'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 799,
        url: amazonSearch('iPhone 16 128GB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Apple Store',
        price: 799,
        url: 'https://www.apple.com/shop/buy-iphone/iphone-16',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'vivo-x200-pro-dimensity-16gb',
    category: 'mobile',
    useCases: ['Camera Focus', 'Battery Life', 'Gaming & Speed'],
    brand: 'Oppo',
    name: 'Find X8 Pro (Dimensity 9400 · 16 GB)',
    year: 2026,
    tagline: 'Periscope telephoto camera specialist with 16 GB RAM and silicon-carbon battery',
    price: 899,
    regionalPrices: {
      USD: [899, 929, 949],
      EUR: [1049, 1049, 1099],
      GBP: [949, 949, 999],
      INR: [99999, 99999, 99999],
    },
    retailerQuery: 'Oppo Find X8 Pro 16GB 512GB',
    processor: 'MediaTek Dimensity 9400',
    processorFamily: 'MediaTek Dimensity',
    ramGb: 16,
    ramSpec: '16 GB LPDDR5X',
    storage: '512 GB UFS 4.0',
    display: '6.78" Micro-Curved LTPO AMOLED 120Hz',
    battery: '5,910 mAh · 80W wired / 50W wireless',
    weight: '215 g',
    weightGrams: 215,
    connectivity: 'USB-C 3.2, Wi-Fi 7, IP68/IP69',
    image: IMG_MOBILE_VALUE,
    pros: [
      'Dual periscope telephoto lenses deliver sharp 3x and 6x optical portraits',
      'Huge 5,910 mAh silicon-carbon cell plus 16 GB RAM and 512 GB storage',
    ],
    cons: [
      'Limited official US carrier warranty support compared to Apple/Samsung',
      'Large protruding circular camera bump makes phone wobble on desks',
      '4 years of OS updates trails Google and Samsung’s 7-year pledge',
    ],
    retailers: [
      {
        retailer: 'Amazon',
        price: 899,
        url: amazonSearch('Oppo Find X8 Pro 16GB 512GB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'B&H Photo',
        price: 929,
        url: bhSearch('Oppo Find X8 Pro'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Best Buy',
        price: 949,
        url: bestBuySearch('Oppo Find X8 Pro'),
        shippingNote: 'Live store listing',
      },
    ],
  },
  {
    id: 'oneplus-13-16gb',
    category: 'mobile',
    useCases: ['Battery Life', 'Gaming & Speed'],
    brand: 'OnePlus',
    name: 'OnePlus 13 (16 GB)',
    year: 2026,
    tagline: 'High-capacity 16 GB flagship with IP69 durability and Aqua Touch display',
    price: 949,
    regionalPrices: {
      USD: [949, 969, 999],
      EUR: [999, 999, 1049],
      GBP: [899, 899, 949],
      INR: [69999, 69999, 69999],
    },
    retailerQuery: 'OnePlus 13 16GB 512GB',
    officialStore: {
      name: 'OnePlus Store',
      urls: {
        USD: 'https://www.oneplus.com/us/oneplus-13',
        EUR: 'https://www.oneplus.com/de/oneplus-13',
        GBP: 'https://www.oneplus.com/uk/oneplus-13',
        INR: 'https://www.oneplus.in/oneplus-13',
      },
    },
    processor: 'Snapdragon 8 Elite',
    processorFamily: 'Snapdragon',
    ramGb: 16,
    ramSpec: '16 GB LPDDR5X',
    storage: '512 GB UFS 4.0',
    display: '6.82" 2K LTPO AMOLED 120Hz (4500 nits peak)',
    battery: '6,000 mAh · 100W wired / 50W wireless',
    weight: '210 g',
    weightGrams: 210,
    connectivity: 'USB-C 3.2, Wi-Fi 7, IR Blaster, IP68/IP69',
    image: IMG_MOBILE_VALUE,
    pros: [
      '16 GB RAM + 512 GB storage for less than base 256 GB rivals',
      '0–100% wired charge in ~36 minutes with IP69 hot-water jet resistance',
    ],
    cons: [
      'Magnetic wireless charging requires a proprietary OnePlus case',
      'Tall 6.82" body is difficult to reach one-handed',
      '4 major Android updates is shorter than Pixel and Galaxy S25',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 949,
        url: bestBuySearch('OnePlus 13 16GB 512GB Unlocked'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 969,
        url: amazonSearch('OnePlus 13 16GB 512GB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'OnePlus Store',
        price: 999,
        url: 'https://www.oneplus.com/us/oneplus-13',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'google-pixel-9-pro-16gb',
    category: 'mobile',
    useCases: ['Camera Focus', 'Compact'],
    brand: 'Google',
    name: 'Pixel 9 Pro (16 GB)',
    year: 2025,
    tagline: 'Compact Pro-grade camera system with 5x periscope and 16 GB RAM',
    price: 999,
    regionalPrices: {
      USD: [999, 1049, 1099],
      EUR: [1099, 1099, 1199],
      GBP: [999, 999, 1099],
      INR: [109999, 109999, 109999],
    },
    retailerQuery: 'Google Pixel 9 Pro 256GB Unlocked',
    officialStore: {
      name: 'Google Store',
      urls: {
        USD: 'https://store.google.com/product/pixel_9_pro',
        EUR: 'https://store.google.com/de/product/pixel_9_pro',
        GBP: 'https://store.google.com/gb/product/pixel_9_pro',
        INR: 'https://store.google.com/in/product/pixel_9_pro',
      },
    },
    processor: 'Google Tensor G4',
    processorFamily: 'Google Tensor',
    ramGb: 16,
    ramSpec: '16 GB LPDDR5X',
    storage: '256 GB UFS 3.1',
    display: '6.3" Super Actua LTPO OLED 1–120Hz',
    battery: '4,700 mAh · 27W wired / 21W Pixel Stand',
    weight: '199 g',
    weightGrams: 199,
    connectivity: 'USB-C 3.2, UWB, Wi-Fi 7, IP68',
    image: IMG_MOBILE_FLAGSHIP,
    pros: [
      'True Pro triple camera + 42MP selfie in a manageable 6.3" size',
      '16 GB RAM keeps heavy camera & background tasks fluid',
    ],
    cons: [
      'Tensor G4 raw GPU performance trails Snapdragon 8 Elite by ~40%',
      'UFS 3.1 storage is slower for large video file transfers',
      'Slow 27W wired charging compared to 80W–100W rivals',
    ],
    retailers: [
      {
        retailer: 'Amazon',
        price: 999,
        url: amazonSearch('Google Pixel 9 Pro 256GB Unlocked'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Best Buy',
        price: 1049,
        url: bestBuySearch('Google Pixel 9 Pro 256GB'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Google Store',
        price: 1099,
        url: 'https://store.google.com/product/pixel_9_pro',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'iphone-16-pro-8gb',
    category: 'mobile',
    useCases: ['Camera Focus', 'Gaming & Speed', 'Compact'],
    brand: 'Apple',
    name: 'iPhone 16 Pro (8 GB · 256 GB)',
    year: 2025,
    tagline: 'Grade 5 titanium flagship with 4K 120fps ProRes and 5x tetraprism zoom',
    price: 1099,
    regionalPrices: {
      USD: [1099, 1099, 1099],
      EUR: [1329, 1329, 1329],
      GBP: [1099, 1099, 1099],
      INR: [129900, 129900, 129900],
    },
    retailerQuery: 'Apple iPhone 16 Pro 256GB',
    officialStore: {
      name: 'Apple Store',
      urls: {
        USD: 'https://www.apple.com/shop/buy-iphone/iphone-16-pro',
        EUR: 'https://www.apple.com/de/shop/buy-iphone/iphone-16-pro',
        GBP: 'https://www.apple.com/uk/shop/buy-iphone/iphone-16-pro',
        INR: 'https://www.apple.com/in/shop/buy-iphone/iphone-16-pro',
      },
    },
    processor: 'Apple A18 Pro (6-core)',
    processorFamily: 'Apple A-Series',
    ramGb: 8,
    ramSpec: '8 GB Unified',
    storage: '256 GB NVMe',
    display: '6.3" LTPO Super Retina XDR 120Hz',
    battery: '27 hrs video · 25W MagSafe / USB 3',
    weight: '199 g',
    weightGrams: 199,
    connectivity: 'USB-C 3.2 (10Gbps), Wi-Fi 7, UWB, IP68',
    image: IMG_MOBILE_FLAGSHIP,
    pros: [
      'Unmatched 4K 120fps video stabilization and external SSD recording',
      '120Hz ProMotion display with ultra-thin borders in Grade 5 titanium',
    ],
    cons: [
      'Limited to 8 GB RAM while Android flagships offer 12–16 GB',
      'Slower ~25W wired charging takes over 1 hour 40 minutes to 100%',
      'High starting price for the 256 GB tier',
    ],
    retailers: [
      {
        retailer: 'Best Buy',
        price: 1099,
        url: bestBuySearch('Apple iPhone 16 Pro 256GB Unlocked'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Amazon',
        price: 1099,
        url: amazonSearch('iPhone 16 Pro 256GB'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Apple Store',
        price: 1099,
        url: 'https://www.apple.com/shop/buy-iphone/iphone-16-pro',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
  {
    id: 'samsung-galaxy-s25-ultra-12gb',
    category: 'mobile',
    useCases: ['Camera Focus', 'Battery Life', 'Gaming & Speed'],
    brand: 'Samsung',
    name: 'Galaxy S25 Ultra (12 GB)',
    year: 2026,
    tagline: 'Anti-reflective titanium flagship with integrated S Pen and 5x/3x zoom',
    price: 1249,
    regionalPrices: {
      USD: [1249, 1299, 1299],
      EUR: [1449, 1449, 1449],
      GBP: [1249, 1249, 1249],
      INR: [129999, 129999, 129999],
    },
    retailerQuery: 'Samsung Galaxy S25 Ultra 256GB Unlocked',
    officialStore: {
      name: 'Samsung Store',
      urls: {
        USD: 'https://www.samsung.com/us/smartphones/galaxy-s25-ultra/',
        EUR: 'https://www.samsung.com/de/smartphones/galaxy-s25-ultra/',
        GBP: 'https://www.samsung.com/uk/smartphones/galaxy-s25-ultra/',
        INR: 'https://www.samsung.com/in/smartphones/galaxy-s25-ultra/',
      },
    },
    processor: 'Snapdragon 8 Elite for Galaxy',
    processorFamily: 'Snapdragon',
    ramGb: 12,
    ramSpec: '12 GB LPDDR5X',
    storage: '256 GB UFS 4.0',
    display: '6.9" Anti-Reflective LTPO AMOLED 120Hz',
    battery: '5,000 mAh · 45W wired / 15W Qi2',
    weight: '218 g',
    weightGrams: 218,
    connectivity: 'USB-C 3.2, DeX, S Pen, Wi-Fi 7, IP68',
    image: IMG_MOBILE_FLAGSHIP,
    pros: [
      'Gorilla Armor 2 anti-reflective coating cuts outdoor glare dramatically',
      'Built-in S Pen stylus and versatile 200MP + dual-telephoto optics',
    ],
    cons: [
      'S25 Ultra removed Bluetooth air-actions from the S Pen',
      'Bulky 6.9" footprint and sharp corners feel wide in small pockets',
      'Only 12 GB RAM in base models despite flagship pricing',
    ],
    retailers: [
      {
        retailer: 'Amazon',
        price: 1249,
        url: amazonSearch('Samsung Galaxy S25 Ultra 256GB Unlocked'),
        shippingNote: 'Live marketplace listing',
      },
      {
        retailer: 'Best Buy',
        price: 1299,
        url: bestBuySearch('Samsung Galaxy S25 Ultra 256GB'),
        shippingNote: 'Live store listing',
      },
      {
        retailer: 'Samsung Store',
        price: 1299,
        url: 'https://www.samsung.com/us/smartphones/galaxy-s25-ultra/',
        shippingNote: 'Direct product page · Official MSRP',
        isDirectProduct: true,
      },
    ],
  },
];

export const LAPTOP_PROCESSORS: LaptopProcessorFamily[] = [
  'Apple M-Series',
  'Intel Core',
  'AMD Ryzen',
];

export const MOBILE_PROCESSORS: MobileProcessorFamily[] = [
  'Apple A-Series',
  'Snapdragon',
  'Google Tensor',
  'MediaTek Dimensity',
];

export const LAPTOP_RAM_OPTIONS = [8, 16, 24, 32];
export const MOBILE_RAM_OPTIONS = [6, 8, 12, 16];

export const LAPTOP_USE_CASES: LaptopUseCase[] = [
  'Thin & Light',
  'Gaming',
  'Creator & Work',
  'Everyday Value',
];

export const MOBILE_USE_CASES: MobileUseCase[] = [
  'Camera Focus',
  'Battery Life',
  'Gaming & Speed',
  'Compact',
];

export const LAPTOP_BUDGET_PRESETS = [600, 900, 1200, 1600, 2000];
export const MOBILE_BUDGET_PRESETS = [350, 550, 800, 1000, 1300];
