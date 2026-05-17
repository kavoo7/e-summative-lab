import { getProductImageUrl as matchImageFromText } from "./productImageMatch.js";

const INVALID_IMAGE_URLS = new Set(["https://unsplash.com", "http://unsplash.com"]);

import { imageUrlForCategoryLabel } from "../data/catalogImages.js";

const DEFAULT_IMAGE =
  imageUrlForCategoryLabel("Tops") ??
  "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800";

/** Use the catalog image when present; otherwise infer from product text. */
export function resolveProductImageUrl(
  image,
  name = "",
  category = "",
  _id = "",
  description = "",
) {
  const trimmed = typeof image === "string" ? image.trim() : "";
  if (trimmed && !INVALID_IMAGE_URLS.has(trimmed)) {
    return trimmed;
  }
  return matchImageFromText(name, description, category) || DEFAULT_IMAGE;
}

export function getFallbackImageUrl(name = "", category = "", _id = "", description = "") {
  return resolveProductImageUrl("", name, category, _id, description);
}

export function getProductImageUrl(name = "", description = "", category = "") {
  return matchImageFromText(name, description, category) || DEFAULT_IMAGE;
}

export function imageUrlForProduct(product) {
  return resolveProductImageUrl(
    product.image,
    product.name,
    product.category,
    product.id,
    product.description,
  );
}
