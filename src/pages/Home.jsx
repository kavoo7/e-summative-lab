import React, { useState, useEffect, useMemo } from "react";
import { useId } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { imageUrlForKey } from "../data/catalogImages";
import { HOME_FEATURE, HOME_HERO } from "../data/homeFeature";
import { resolveProductImageUrl } from "../utils/productImages";

function ColorWash({ className = "left-0 top-0 w-64 h-64 bg-blush/30" }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl -z-10 ${className}`}
      aria-hidden
    />
  );
}

function StatCard({ label, value, accent }) {
  const bg =
    accent === "blush"
      ? "bg-blush/35 border-blush/60"
      : "bg-bisque/50 border-bisque/80";
  return (
    <div className={`rounded-xl border px-4 py-3 ${bg}`}>
      <span className="block uppercase tracking-widest text-[10px] mb-1 text-dried-thyme/60">
        {label}
      </span>
      <strong className="text-2xl font-serif text-dried-thyme">{value}</strong>
    </div>
  );
}

const Home = () => {
  const [useFallbackImage, setUseFallbackImage] = useState(false);
  const sectionId = useId();
  const { products, loading, error } = useProducts();

  const featured = useMemo(() => {
    const match = products.find((p) => p.id === HOME_FEATURE.productId);
    return match ?? products[0] ?? null;
  }, [products]);

  useEffect(() => {
    setUseFallbackImage(false);
  }, [featured?.id, featured?.image]);

  const featuredImageSrc = featured
    ? resolveProductImageUrl(
        useFallbackImage ? "" : imageUrlForKey(HOME_FEATURE.imageKey),
        featured.name,
        featured.category,
        featured.id,
        HOME_FEATURE.description,
      )
    : "";

  return (
    <section className="relative max-w-6xl mx-auto px-6 py-14 md:py-20 overflow-hidden">
      <ColorWash />
      <ColorWash className="right-0 top-32 bg-antique-rose/25 w-56 h-56" />
      <ColorWash className="left-1/3 bottom-0 bg-dried-thyme/10 w-72 h-72" />

      <div className="relative mb-14 md:mb-16 max-w-3xl">
        <p className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase mb-4 text-dried-thyme/80 font-semibold">
          <span className="h-px w-8 bg-antique-rose" aria-hidden />
          {HOME_HERO.eyebrow}
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-semibold tracking-tight mb-5 text-dried-thyme leading-[1.08]">
          Wear colour with{" "}
          <span className="text-antique-rose italic">quiet confidence</span>.
        </h1>
        <p className="text-base md:text-lg leading-8 text-dried-thyme/75 mb-9 max-w-2xl">
          {HOME_HERO.subcopy}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/shop"
            className="bg-dried-thyme text-champagne py-3.5 px-7 uppercase text-xs tracking-widest font-semibold rounded-sm shadow-md shadow-dried-thyme/25 hover:bg-dried-thyme/90 hover:shadow-lg hover:shadow-dried-thyme/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            Shop the collection
          </Link>
          <Link
            to="/add-product"
            className="border-2 border-antique-rose/60 text-dried-thyme py-3.5 px-7 uppercase text-xs tracking-widest font-semibold rounded-sm bg-champagne/80 hover:bg-blush/40 hover:border-antique-rose transition-all duration-200"
          >
            Add product
          </Link>
        </div>
      </div>

      <div
        id={sectionId}
        className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-stretch"
      >
        <div className="space-y-5 rounded-2xl border border-bisque/80 bg-gradient-to-br from-champagne via-bisque/30 to-blush/25 p-6 md:p-8 shadow-sm">
          <p className="uppercase tracking-[0.35em] text-[10px] text-antique-rose font-bold">
            Featured storefront
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-dried-thyme">
            Currently in view
          </h2>
          <p className="text-sm text-dried-thyme/70 leading-7">
            One piece, styled for the season—swap inventory anytime and the shop
            stays in sync with your catalog.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard
              label="Products"
              value={String(products.length)}
              accent="bisque"
            />
            <StatCard
              label="Status"
              value={loading ? "Loading…" : error ? "Offline" : "Online"}
              accent="blush"
            />
          </div>
        </div>

        {featured ? (
          <article className="group relative rounded-3xl overflow-hidden border-2 border-antique-rose/25 bg-gradient-to-br from-blush/50 via-bisque/40 to-champagne p-5 md:p-6 shadow-lg shadow-antique-rose/15 hover:shadow-xl hover:shadow-antique-rose/20 transition-shadow duration-300">
            <div className="absolute top-5 left-5 z-10">
              <span className="inline-block bg-antique-rose text-champagne text-[10px] uppercase tracking-[0.3em] font-bold px-3 py-1.5 rounded-full shadow-sm">
                {HOME_FEATURE.badge}
              </span>
            </div>
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-5 ring-2 ring-champagne/80 ring-offset-2 ring-offset-bisque/50 shadow-inner">
              <img
                src={featuredImageSrc}
                alt={featured.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                onError={() => setUseFallbackImage(true)}
                loading="lazy"
              />
            </div>
            <ColorWash className="pointer-events-none absolute -bottom-8 -right-8 bg-dried-thyme/5 w-40 h-40" />
            <div className="relative space-y-3">
              <p className="uppercase tracking-[0.35em] text-[10px] text-antique-rose font-semibold">
                Spotlight
              </p>
              <h3 className="text-2xl md:text-3xl font-serif text-dried-thyme">
                {featured.name}
              </h3>
              <p className="text-sm text-dried-thyme/75 leading-7">
                {HOME_FEATURE.description}
              </p>
              <div className="flex items-center justify-between gap-4 text-sm font-medium border-t border-antique-rose/20 pt-4 mt-2">
                <span className="text-lg font-serif text-dried-thyme">
                  ${Number(featured.price).toFixed(2)}
                </span>
                <span className="uppercase tracking-[0.35em] text-[10px] text-antique-rose bg-blush/50 px-3 py-1 rounded-full">
                  {featured.category}
                </span>
              </div>
              <Link
                to="/shop"
                className="inline-block mt-2 text-xs uppercase tracking-widest font-semibold text-antique-rose hover:text-dried-thyme transition-colors"
              >
                View in shop →
              </Link>
            </div>
          </article>
        ) : (
          <div className="rounded-3xl p-8 bg-gradient-to-br from-bisque/80 to-blush/40 border border-bisque text-dried-thyme/70">
            No featured product available yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
