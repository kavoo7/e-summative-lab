import React, { useState } from "react";
import { ShoppingBag, Edit3 } from "lucide-react";
import { resolveProductImageUrl } from "../utils/productImages";

const ProductCard = ({ product, addToCart, onEdit }) => {
  const [imageError, setImageError] = useState(false);

  const badgeText = product.badge || "";
  const isSale =
    badgeText.toUpperCase() === "SALE" ||
    (product.price < 300 && product.price > 200);
  const isNew =
    badgeText.toUpperCase() === "NEW" || (product.rating >= 4.5 && !isSale);

  const activeImageSrc = imageError
    ? resolveProductImageUrl("", product.name, product.category, product.id, product.description)
    : resolveProductImageUrl(
        product.image,
        product.name,
        product.category,
        product.id,
        product.description,
      );

  return (
    <div className="group flex flex-col h-full relative font-sans text-dried-thyme">
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isSale && (
          <span className="bg-antique-rose text-champagne text-[10px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm shadow-sm">
            Sale
          </span>
        )}
        {isNew && (
          <span className="bg-blush text-dried-thyme text-[10px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm shadow-sm">
            New
          </span>
        )}
      </div>

      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-bisque/10 mb-4 group-hover:opacity-95 transition-all duration-300 flex items-center justify-center border border-bisque/10">
        <img
          src={activeImageSrc}
          alt={product.name}
          className="object-cover w-full h-full"
          onError={() => setImageError(true)}
          loading="lazy"
        />

        <button
          onClick={() => addToCart(product)}
          data-testid={`product-${product.id}`}
          className="absolute bottom-4 right-4 bg-champagne text-dried-thyme p-3 rounded-full hover:bg-dried-thyme hover:text-champagne transition-colors shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-200"
          aria-label="Add to Cart"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>

        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="absolute top-4 right-4 bg-champagne border border-bisque/40 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dried-thyme hover:text-champagne duration-200"
            aria-label="Edit product"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-col flex-grow px-1">
        <h3 className="text-sm font-semibold tracking-wide mb-1 opacity-90">
          {product.name}
        </h3>
        <p className="text-xs font-bold font-serif opacity-70 mt-auto">
          ${Number(product.price).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;