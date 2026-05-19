/** Fallback matcher when a product has no image URL (e.g. new items from the form). */

import { imageUrlForCategoryLabel, imageUrlForKey } from "../Data/catalogImages.js";

const RULES = [
  { anyOf: ["puffer", "quilted jacket"], imageKey: "jacket-puffer" },
  { anyOf: ["denim jacket", "trucker"], imageKey: "jacket-denim" },
  { anyOf: ["leather bomber", "bomber"], imageKey: "jacket-leather-bomber" },
  { anyOf: ["varsity"], imageKey: "jacket-varsity" },
  { anyOf: ["windbreaker"], imageKey: "jacket-windbreaker" },
  { anyOf: ["vest"], imageKey: "jacket-vest" },
  { anyOf: ["velvet blazer"], imageKey: "blazer-velvet" },
  { anyOf: ["linen blazer"], imageKey: "blazer-linen" },
  { anyOf: ["pinstripe blazer"], imageKey: "blazer-pinstripe" },
  { anyOf: ["blazer"], imageKey: "blazer-navy" },
  { anyOf: ["trench"], imageKey: "coat-trench" },
  { anyOf: ["teddy", "sherpa coat"], imageKey: "coat-teddy" },
  { anyOf: ["parka"], imageKey: "coat-parka" },
  { anyOf: ["raincoat"], imageKey: "coat-rain" },
  { anyOf: ["peacoat"], imageKey: "coat-peacoat" },
  { anyOf: ["chino"], imageKey: "trousers-chino" },
  { anyOf: ["wide-leg", "wide leg"], imageKey: "trousers-wide-leg" },
  { anyOf: ["jeans", "denim"], imageKey: "trousers-jeans" },
  { anyOf: ["cargo"], imageKey: "trousers-cargo" },
  { anyOf: ["linen pant", "drawstring"], imageKey: "trousers-linen" },
  { anyOf: ["turtleneck"], imageKey: "top-turtleneck" },
  { anyOf: ["graphic tee", "oversized tee"], imageKey: "top-tee" },
  { anyOf: ["silk shirt", "button-down"], imageKey: "top-silk-shirt" },
  { anyOf: ["cardigan"], imageKey: "top-cardigan" },
  { anyOf: ["breton", "striped top"], imageKey: "top-breton" },
  { anyOf: ["shirt dress"], imageKey: "dress-shirt" },
  { anyOf: ["floral", "wrap midi"], imageKey: "dress-floral" },
  { anyOf: ["slip dress", "velvet dress"], imageKey: "dress-velvet-slip" },
  { anyOf: ["sweater dress"], imageKey: "dress-sweater" },
  { anyOf: ["maxi", "pleated"], imageKey: "dress-maxi" },
  { anyOf: ["dress"], imageKey: "dress-floral" },
  { anyOf: ["tote", "canvas bag"], imageKey: "accessory-tote" },
  { anyOf: ["cap", "baseball"], imageKey: "accessory-cap" },
  { anyOf: ["trouser", "pants"], imageKey: "trousers-chino" },
  { anyOf: ["tee", "shirt", "top"], imageKey: "top-tee" },
  { anyOf: ["jacket"], imageKey: "jacket-denim" },
  { anyOf: ["coat"], imageKey: "coat-trench" },
];

function matches(text, rule) {
  if (rule.allOf?.every((p) => text.includes(p))) return true;
  if (rule.anyOf?.some((p) => text.includes(p))) return true;
  return false;
}

export function getProductImageUrl(name = "", description = "", category = "") {
  const text = `${name} ${description} ${category}`.toLowerCase();
  for (const rule of RULES) {
    if (matches(text, rule)) return imageUrlForKey(rule.imageKey) ?? null;
  }
  return imageUrlForCategoryLabel(category);
}
