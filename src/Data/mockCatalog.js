/**
 * Curated catalog grouped by category; each product uses an imageKey from catalogImages.js.
 * Run `npm run sync-db` to write this into db.json for json-server.
 */

import {
  CATALOG_IMAGES,
  PRODUCT_CATEGORIES,
  imageUrlForKey,
} from "./catalogImages.js";

export { PRODUCT_CATEGORIES, CATALOG_IMAGES };

export const STORE_INFO = {
  id: 1,
  name: "april.",
  description: "Quiet-luxury wardrobe essentials with conscious styling.",
  phone_number: "1-800-555-0199",
  email: "hello@april.studio",
};

/** @param {string} imageKey */
const withImage = (product) => ({
  ...product,
  image: imageUrlForKey(product.imageKey),
});

const catalogByCategory = [
  {
    category: "Jackets",
    products: [
      {
        id: "1",
        name: "Color-Blocked Puffer Jacket",
        description:
          "A bold multicolor puffer with lightweight insulation and a high collar for cold commutes.",
        price: 298,
        rating: 4.6,
        reviews: 124,
        isFavorite: true,
        badge: "NEW",
        imageKey: "jacket-puffer",
      },
      {
        id: "2",
        name: "Classic Denim Trucker Jacket",
        description:
          "Mid-wash denim trucker jacket with button closure and a relaxed, easy layer-over-everything fit.",
        price: 189,
        rating: 4.7,
        reviews: 412,
        isFavorite: true,
        badge: "",
        imageKey: "jacket-denim",
      },
      {
        id: "3",
        name: "Black Leather Bomber Jacket",
        description:
          "Structured leather bomber with ribbed cuffs and a clean zip front for evening and street looks.",
        price: 445,
        rating: 4.8,
        reviews: 198,
        isFavorite: false,
        badge: "SALE",
        imageKey: "jacket-leather-bomber",
      },
      {
        id: "4",
        name: "Retro Varsity Jacket",
        description:
          "Wool-blend varsity jacket with contrast sleeves and striped rib trim in a nostalgic cut.",
        price: 265,
        rating: 4.4,
        reviews: 156,
        isFavorite: false,
        badge: "",
        imageKey: "jacket-varsity",
      },
      {
        id: "5",
        name: "Lightweight Windbreaker",
        description:
          "Packable windbreaker shell that blocks breeze and light rain—ideal for travel and trail days.",
        price: 148,
        rating: 4.3,
        reviews: 287,
        isFavorite: false,
        badge: "",
        imageKey: "jacket-windbreaker",
      },
      {
        id: "6",
        name: "Quilted Puffer Vest",
        description:
          "Sleeveless quilted vest for layering over knits and hoodies without bulk at the arms.",
        price: 118,
        rating: 4.5,
        reviews: 203,
        isFavorite: true,
        badge: "",
        imageKey: "jacket-vest",
      },
    ],
  },
  {
    category: "Blazers",
    products: [
      {
        id: "7",
        name: "Navy Tailored Blazer",
        description:
          "Single-breasted navy blazer with sharp shoulders and a refined length for office and events.",
        price: 325,
        rating: 4.7,
        reviews: 241,
        isFavorite: true,
        badge: "",
        imageKey: "blazer-navy",
      },
      {
        id: "8",
        name: "Burgundy Velvet Evening Blazer",
        description:
          "Rich burgundy velvet blazer with a soft drape made for dinners, galleries, and date nights.",
        price: 385,
        rating: 4.9,
        reviews: 97,
        isFavorite: true,
        badge: "NEW",
        imageKey: "blazer-velvet",
      },
      {
        id: "9",
        name: "Cream Linen Summer Blazer",
        description:
          "Breathable cream linen blazer with a relaxed silhouette for warm-weather tailoring.",
        price: 289,
        rating: 4.5,
        reviews: 134,
        isFavorite: false,
        badge: "",
        imageKey: "blazer-linen",
      },
      {
        id: "10",
        name: "Charcoal Pinstripe Blazer",
        description:
          "Charcoal pinstripe blazer with a modern power shoulder and double-button front.",
        price: 360,
        rating: 4.6,
        reviews: 178,
        isFavorite: false,
        badge: "",
        imageKey: "blazer-pinstripe",
      },
    ],
  },
  {
    category: "Coats",
    products: [
      {
        id: "11",
        name: "Camel Wool Trench Coat",
        description:
          "Classic double-breasted trench in camel wool with a belted waist and storm flap details.",
        price: 520,
        rating: 4.8,
        reviews: 312,
        isFavorite: true,
        badge: "",
        imageKey: "coat-trench",
      },
      {
        id: "12",
        name: "Cream Teddy Sherpa Coat",
        description:
          "Plush sherpa teddy coat in cream with oversized buttons and deep pockets for winter warmth.",
        price: 348,
        rating: 4.7,
        reviews: 428,
        isFavorite: true,
        badge: "SALE",
        imageKey: "coat-teddy",
      },
      {
        id: "13",
        name: "Black Quilted Long Parka",
        description:
          "Longline quilted parka with a hood and matte black shell built for freezing city winters.",
        price: 395,
        rating: 4.6,
        reviews: 267,
        isFavorite: false,
        badge: "",
        imageKey: "coat-parka",
      },
      {
        id: "14",
        name: "Yellow Hooded Raincoat",
        description:
          "Waterproof yellow raincoat with a hood and snap front—bright protection for wet commutes.",
        price: 215,
        rating: 4.4,
        reviews: 189,
        isFavorite: false,
        badge: "",
        imageKey: "coat-rain",
      },
      {
        id: "15",
        name: "Burgundy Wool Peacoat",
        description:
          "Heavy wool peacoat in burgundy with anchor buttons and a structured nautical silhouette.",
        price: 465,
        rating: 4.8,
        reviews: 221,
        isFavorite: true,
        badge: "",
        imageKey: "coat-peacoat",
      },
    ],
  },
  {
    category: "Trousers",
    products: [
      {
        id: "16",
        name: "Beige Slim Chino Trousers",
        description:
          "Slim-fit chinos in sand beige with a clean taper—an everyday staple for smart casual outfits.",
        price: 92,
        rating: 4.5,
        reviews: 534,
        isFavorite: false,
        badge: "",
        imageKey: "trousers-chino",
      },
      {
        id: "17",
        name: "High-Waist Wide-Leg Trousers",
        description:
          "Flowing high-waist wide-leg trousers with pressed creases and a flattering drape.",
        price: 128,
        rating: 4.6,
        reviews: 367,
        isFavorite: true,
        badge: "",
        imageKey: "trousers-wide-leg",
      },
      {
        id: "18",
        name: "Mid-Wash Flared Jeans",
        description:
          "Retro mid-wash jeans with a flared leg and classic five-pocket styling.",
        price: 118,
        rating: 4.5,
        reviews: 612,
        isFavorite: false,
        badge: "NEW",
        imageKey: "trousers-jeans",
      },
      {
        id: "19",
        name: "Khaki Cargo Utility Pants",
        description:
          "Relaxed cargo pants in khaki with reinforced pockets and a durable cotton twill weave.",
        price: 108,
        rating: 4.3,
        reviews: 298,
        isFavorite: false,
        badge: "",
        imageKey: "trousers-cargo",
      },
      {
        id: "20",
        name: "White Linen Drawstring Pants",
        description:
          "Airy white linen pants with a drawstring waist—made for beach towns and summer weekends.",
        price: 98,
        rating: 4.4,
        reviews: 241,
        isFavorite: false,
        badge: "",
        imageKey: "trousers-linen",
      },
    ],
  },
  {
    category: "Tops",
    products: [
      {
        id: "21",
        name: "Cream Ribbed Turtleneck",
        description:
          "Fine ribbed turtleneck sweater in warm cream—soft, close fit, and ideal under blazers.",
        price: 95,
        rating: 4.7,
        reviews: 489,
        isFavorite: true,
        badge: "",
        imageKey: "top-turtleneck",
      },
      {
        id: "22",
        name: "White Oversized Graphic Tee",
        description:
          "Oversized cotton tee with a minimal front graphic and dropped shoulders for relaxed styling.",
        price: 48,
        rating: 4.4,
        reviews: 812,
        isFavorite: false,
        badge: "",
        imageKey: "top-tee",
      },
      {
        id: "23",
        name: "Ivory Silk Button-Down Shirt",
        description:
          "Fluid ivory silk shirt with mother-of-pearl buttons and a polished drape for work or evening.",
        price: 185,
        rating: 4.8,
        reviews: 276,
        isFavorite: true,
        badge: "",
        imageKey: "top-silk-shirt",
      },
      {
        id: "24",
        name: "Sage Cropped Cardigan",
        description:
          "Soft cropped cardigan in muted sage green with horn buttons and a cozy open knit.",
        price: 115,
        rating: 4.6,
        reviews: 398,
        isFavorite: false,
        badge: "SALE",
        imageKey: "top-cardigan",
      },
      {
        id: "25",
        name: "Navy Breton Striped Top",
        description:
          "Classic navy-and-white Breton stripe top with a boat neckline and three-quarter sleeves.",
        price: 68,
        rating: 4.6,
        reviews: 645,
        isFavorite: true,
        badge: "",
        imageKey: "top-breton",
      },
    ],
  },
  {
    category: "Dresses",
    products: [
      {
        id: "26",
        name: "Ivory Linen Shirt Dress",
        description:
          "Relaxed ivory linen shirt dress with a belted waist—effortless for vacations and warm afternoons.",
        price: 148,
        rating: 4.6,
        reviews: 354,
        isFavorite: false,
        badge: "",
        imageKey: "dress-shirt",
      },
      {
        id: "27",
        name: "Floral Wrap Midi Dress",
        description:
          "Flattering wrap midi dress in a delicate floral print with a flutter hem and tie waist.",
        price: 168,
        rating: 4.7,
        reviews: 512,
        isFavorite: true,
        badge: "NEW",
        imageKey: "dress-floral",
      },
      {
        id: "28",
        name: "Emerald Velvet Slip Dress",
        description:
          "Bias-cut emerald velvet slip dress with thin straps—an elegant choice for evening events.",
        price: 225,
        rating: 4.9,
        reviews: 187,
        isFavorite: true,
        badge: "",
        imageKey: "dress-velvet-slip",
      },
      {
        id: "29",
        name: "Camel Knit Sweater Dress",
        description:
          "Cozy camel sweater dress in a soft knit with a midi length and subtle side slit.",
        price: 185,
        rating: 4.5,
        reviews: 423,
        isFavorite: false,
        badge: "",
        imageKey: "dress-sweater",
      },
      {
        id: "30",
        name: "Champagne Pleated Maxi Dress",
        description:
          "Floor-length pleated chiffon maxi in champagne with a fitted bodice and flowing skirt.",
        price: 255,
        rating: 4.8,
        reviews: 156,
        isFavorite: true,
        badge: "",
        imageKey: "dress-maxi",
      },
    ],
  },
  {
    category: "Accessories",
    products: [
      {
        id: "31",
        name: "Sage Canvas Tote Bag",
        description:
          "Roomy sage canvas tote with interior pocket—designed for market runs and daily carry.",
        price: 52,
        rating: 4.5,
        reviews: 289,
        isFavorite: false,
        badge: "",
        imageKey: "accessory-tote",
      },
      {
        id: "32",
        name: "Rose Washed Baseball Cap",
        description:
          "Unstructured six-panel cap in washed antique rose cotton with an adjustable strap.",
        price: 32,
        rating: 4.4,
        reviews: 412,
        isFavorite: false,
        badge: "NEW",
        imageKey: "accessory-cap",
      },
    ],
  },
];

export const MOCK_PRODUCTS = catalogByCategory.flatMap(({ category, products }) =>
  products.map((p) => withImage({ ...p, category })),
);