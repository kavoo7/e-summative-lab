/**
 * Each entry maps an imageKey → Pexels photo ID chosen to match the product name.
 * Titles verified via pexels.com/photo/{id}. Run `npm run fetch-catalog-images -- --force` after edits.
 */

const pexels = (id, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=1000&fit=crop`;

/** Prefer bundled files from `npm run fetch-catalog-images` when present. */
export const localCatalogPath = (imageKey) => `/catalog/${imageKey}.jpg`;

/**
 * @type {Record<string, { id: number, label: string }>}
 * label = Pexels photo title (for maintainers)
 */
export const CATALOG_IMAGE_SOURCES = {
  "jacket-puffer": { id: 7037975, label: "Man in Blue Puffer Hoodie Jacket" },
  "jacket-denim": { id: 6276009, label: "Denim Jacket with Silver Buttons (close-up)" },
  "jacket-leather-bomber": { id: 3748221, label: "Man in Black Leather Jacket" },
  "jacket-varsity": { id: 13438105, label: "Man Wearing a Varsity Jacket" },
  "jacket-windbreaker": { id: 590029, label: "Person in Black Jacket Outdoors by Lake" },
  "jacket-vest": { id: 2435583, label: "Girl Wearing Beige Vest" },

  "blazer-navy": { id: 3727468, label: "Woman in Blue Blazer" },
  "blazer-velvet": { id: 11198744, label: "Woman in Red Blazer" },
  "blazer-linen": { id: 3184328, label: "Man in Beige Blazer" },
  "blazer-pinstripe": { id: 6050427, label: "Man in Gray Suit" },

  "coat-trench": { id: 7405796, label: "Woman in Beige Trench Coat" },
  "coat-teddy": { id: 6712145, label: "Woman in White Plush Winter Coat" },
  "coat-parka": { id: 715546, label: "Man in Black Full-zip Winter Jacket" },
  "coat-rain": { id: 20746475, label: "Woman in Yellow Coat (autumn)" },
  "coat-peacoat": { id: 2448525, label: "Woman in Brown Wool Coat" },

  "trousers-chino": { id: 9930085, label: "Khaki Pants Close-up" },
  "trousers-wide-leg": { id: 5714343, label: "Woman in Oversized Wide Pants" },
  "trousers-jeans": { id: 8638592, label: "Woman in Blue Denim Jeans" },
  "trousers-cargo": { id: 19815823, label: "Model in Cargo Pants" },
  "trousers-linen": { id: 5705070, label: "Person in White Pants" },

  "top-turtleneck": { id: 6788920, label: "Woman in White Knitted Sweater" },
  "top-tee": { id: 4709284, label: "Woman in White T-shirt" },
  "top-silk-shirt": { id: 7574104, label: "Woman in Beige Dress Shirt" },
  "top-cardigan": { id: 7172863, label: "Woman in Green Knit Top" },
  "top-breton": { id: 9518019, label: "Blue and White Striped Shirt" },

  "dress-shirt": { id: 9863234, label: "Woman in White Dress" },
  "dress-floral": { id: 792725, label: "White and Red Floral Midi Dress" },
  "dress-velvet-slip": { id: 9887409, label: "Woman in Green Dress" },
  "dress-sweater": { id: 33042614, label: "Woman in Beige Dress" },
  "dress-maxi": { id: 32394174, label: "Elegant Evening Gown" },

  "accessory-tote": { id: 5926240, label: "Person Holding Shopping Bags" },
  "accessory-cap": { id: 10689440, label: "Assorted Caps on Shelves" },
};

/** @type {Record<string, string>} */
export const CATALOG_IMAGES = Object.fromEntries(
  Object.entries(CATALOG_IMAGE_SOURCES).map(([key, { id }]) => [key, pexels(id)]),
);

export const PRODUCT_CATEGORIES = [
  {
    id: "jackets",
    label: "Jackets",
    description: "Layering pieces from puffers to denim.",
    defaultImageKey: "jacket-denim",
  },
  {
    id: "blazers",
    label: "Blazers",
    description: "Tailored structure for work and evenings.",
    defaultImageKey: "blazer-navy",
  },
  {
    id: "coats",
    label: "Coats",
    description: "Outerwear for rain, cold, and long commutes.",
    defaultImageKey: "coat-trench",
  },
  {
    id: "trousers",
    label: "Trousers",
    description: "Chinos, denim, and relaxed wide-leg cuts.",
    defaultImageKey: "trousers-chino",
  },
  {
    id: "tops",
    label: "Tops",
    description: "Knits, tees, and shirts for everyday rotation.",
    defaultImageKey: "top-tee",
  },
  {
    id: "dresses",
    label: "Dresses",
    description: "Day-to-evening silhouettes in linen and silk.",
    defaultImageKey: "dress-floral",
  },
  {
    id: "accessories",
    label: "Accessories",
    description: "Bags and small essentials to finish the look.",
    defaultImageKey: "accessory-tote",
  },
];

const CATEGORY_LABELS = Object.fromEntries(
  PRODUCT_CATEGORIES.map((c) => [c.id, c.label]),
);

export const CATEGORY_LABELS_LIST = PRODUCT_CATEGORIES.map((c) => c.label);

export function imageUrlForKey(imageKey, { preferLocal = true } = {}) {
  if (preferLocal && imageKey) return localCatalogPath(imageKey);
  return CATALOG_IMAGES[imageKey] ?? null;
}

export function imageUrlForCategoryLabel(categoryLabel) {
  const cat = PRODUCT_CATEGORIES.find((c) => c.label === categoryLabel);
  if (!cat) return null;
  return imageUrlForKey(cat.defaultImageKey);
}

export function categoryLabelFromId(categoryId) {
  return CATEGORY_LABELS[categoryId] ?? categoryId;
}