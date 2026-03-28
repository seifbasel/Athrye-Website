import Product from "@/types/product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "1854 Indian Head Gold Dollar",
    price: 12500,
    year: 1854,
    quantity: 2,
    condition: "MS-63",
    origin: "United States",
    material: "Gold",
    description:
      "A stunning example of the Type 2 Indian Head Gold Dollar, featuring the iconic small Indian head design. This piece exhibits exceptional luster and sharp strike, with original mint brilliance preserved through careful stewardship over 170 years.",
    main_image: {
      id: 1,
      image: "/coin1.jpg",
      alt_text: "Indian Head Gold Dollar",
      is_main: true,
      order: 1,
    },
    images: [
      {
        id: 1,
        image: "/coin1.jpg",
        alt_text: "Obverse",
        is_main: true,
        order: 1,
      },
      {
        id: 2,
        image: "/coin1.jpg",
        alt_text: "Reverse",
        is_main: false,
        order: 2,
      },
    ],
  },
  {
    id: "2",
    name: "Ancient Roman Aureus — Hadrian",
    price: 28000,
    year: 117,
    quantity: 1,
    condition: "XF-45",
    origin: "Roman Empire",
    material: "Gold",
    description:
      "An exceptionally preserved gold aureus from the reign of Emperor Hadrian (117–138 AD). The portrait displays remarkable detail with a bold, expressive strike characteristic of the Rome mint. A museum-quality example of ancient monetary art.",
    main_image: {
      id: 3,
      image: "/coin1.jpg",
      alt_text: "Roman Aureus",
      is_main: true,
      order: 1,
    },
    images: [
      {
        id: 3,
        image: "/coin1.jpg",
        alt_text: "Obverse",
        is_main: true,
        order: 1,
      },
      {
        id: 4,
        image: "/coin1.jpg",
        alt_text: "Reverse",
        is_main: false,
        order: 2,
      },
    ],
  },
  {
    id: "3",
    name: "1933 Saint-Gaudens Double Eagle",
    price: 185000,
    year: 1933,
    quantity: 1,
    condition: "MS-65",
    origin: "United States",
    material: "Gold",
    description:
      "One of the most legendary coins in American numismatics. This $20 Saint-Gaudens Double Eagle was struck but never officially released. An extraordinary collector's piece of immense historical significance.",
    main_image: {
      id: 5,
      image: "/coin1.jpg",
      alt_text: "Double Eagle",
      is_main: true,
      order: 1,
    },
    images: [
      {
        id: 5,
        image: "/coin1.jpg",
        alt_text: "Obverse",
        is_main: true,
        order: 1,
      },
    ],
  },
  {
    id: "4",
    name: "Byzantine Solidus — Justinian I",
    price: 8400,
    year: 540,
    quantity: 3,
    condition: "AU-55",
    origin: "Byzantine Empire",
    material: "Gold",
    description:
      "A beautifully preserved solidus of Emperor Justinian the Great, struck at Constantinople. Features the facing bust of the emperor in full regalia on the obverse and the winged Victory on the reverse.",
    main_image: {
      id: 6,
      image: "/coin1.jpg",
      alt_text: "Byzantine Solidus",
      is_main: true,
      order: 1,
    },
    images: [
      {
        id: 6,
        image: "/coin1.jpg",
        alt_text: "Obverse",
        is_main: true,
        order: 1,
      },
    ],
  },
  {
    id: "5",
    name: "1796 Draped Bust Quarter",
    price: 42000,
    year: 1796,
    quantity: 1,
    condition: "VF-30",
    origin: "United States",
    material: "Silver",
    description:
      "The first quarter dollar ever struck by the United States Mint, featuring the iconic Draped Bust of Liberty by Robert Scot. Only 6,146 pieces were minted, making this a cornerstone of any early American type set.",
    main_image: {
      id: 7,
      image: "/coin1.jpg",
      alt_text: "Draped Bust Quarter",
      is_main: true,
      order: 1,
    },
    images: [
      {
        id: 7,
        image: "/coin1.jpg",
        alt_text: "Obverse",
        is_main: true,
        order: 1,
      },
    ],
  },
  {
    id: "6",
    name: "Athenian Owl Tetradrachm",
    price: 6800,
    year: -440,
    quantity: 4,
    condition: "VF-35",
    origin: "Ancient Greece",
    material: "Silver",
    description:
      "A classic 'owl' tetradrachm from ancient Athens, circa 440 BC. The obverse features the helmeted head of Athena while the reverse displays the iconic owl with olive branch — the quintessential ancient Greek coin.",
    main_image: {
      id: 8,
      image: "/coin1.jpg",
      alt_text: "Athenian Owl",
      is_main: true,
      order: 1,
    },
    images: [
      {
        id: 8,
        image: "/coin1.jpg",
        alt_text: "Obverse",
        is_main: true,
        order: 1,
      },
    ],
  },
];

export const MOCK_CART_ITEMS = [
  {
    id: "1",
    name: "1854 Indian Head Gold Dollar",
    price: 12500,
    quantity: 1,
    imageUrl: "/coin1.jpg",
  },
  {
    id: "2",
    name: "Ancient Roman Aureus",
    price: 28000,
    quantity: 1,
    imageUrl: "/coin1.jpg",
  },
];

export const MOCK_FAVORITE_ITEMS = [
  {
    id: "1",
    name: "1854 Indian Head Gold Dollar",
    price: 12500,
    imageUrl: "/coin1.jpg",
    condition: "MS-63",
  },
  {
    id: "2",
    name: "Ancient Roman Aureus",
    price: 28000,
    imageUrl: "/coin1.jpg",
    condition: "XF-45",
  },
];
