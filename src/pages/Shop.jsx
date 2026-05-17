import React from "react";
import { useId, useMemo, useState } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Shop = ({ addToCart }) => {
  const searchId = useId();

  // Create distinct accessible unique IDs for form element connections
  const nameInputId = useId();
  const priceInputId = useId();
  const categoryInputId = useId();
  const ratingInputId = useId();
  const imageInputId = useId();
  const descInputId = useId();

  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    rating: "4",
  });
  const [saving, setSaving] = useState(false);

  const { products, loading, error, updateProduct } = useProducts();

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesSearch =
        normalizedQuery === "" ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        (product.description &&
          product.description.toLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesSearch;
    });
  }, [products, category, searchQuery]);

  const handleEditOpen = (product) => {
    setEditingProduct(product);
    setFormValues({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      description: product.description || "",
      rating: product.rating?.toString() || "4",
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!editingProduct) return;
    setSaving(true);
    try {
      await updateProduct(editingProduct.id, {
        name: formValues.name,
        price: Number(formValues.price),
        category: formValues.category,
        image: formValues.image,
        description: formValues.description,
        rating: Number(formValues.rating),
      });
      setEditingProduct(null);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 text-dried-thyme">
      {/* Title Header */}
      <div className="mb-12">
        <p className="text-xs tracking-widest uppercase mb-2 font-medium opacity-80">
          The Collection
        </p>
        <h2 className="text-5xl font-serif font-medium mb-2 lowercase">
          shop<span className="text-antique-rose">.</span>
        </h2>
        <p className="text-sm opacity-70">
          {filteredProducts.length} pieces available
        </p>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="border-t border-b border-bisque/30 py-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-64">
          <label htmlFor={searchId} className="sr-only">
            Search products
          </label>
          <div className="flex items-center border-b border-dried-thyme/30 pb-2">
            <svg
              className="w-4 h-4 mr-2 opacity-60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              id={searchId}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="bg-transparent border-none outline-none w-full text-sm placeholder:text-dried-thyme/40 text-dried-thyme"
            />
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-6 text-xs tracking-widest uppercase font-semibold">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setCategory(cat)}
              className={`${
                category === cat
                  ? "border-b-2 border-dried-thyme pb-1 text-dried-thyme"
                  : "pb-1 opacity-60 hover:opacity-100 transition-opacity"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid Grid */}
      {loading ? (
        <p className="text-center text-sm font-semibold tracking-widest uppercase opacity-60">
          Loading products…
        </p>
      ) : error ? (
        <p className="text-center text-sm text-antique-rose font-semibold tracking-wider">
          {error}
        </p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-sm opacity-60">
          No products match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              onEdit={handleEditOpen}
            />
          ))}
        </div>
      )}

      {/* Dialog Modal Box - Accessible & Aligned with Test assertions */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/40 backdrop-blur-sm px-4 py-10 flex items-center justify-center">
          <div className="mx-auto w-full max-w-2xl rounded-2xl bg-champagne border border-bisque p-8 shadow-2xl text-dried-thyme">
            <h3 className="text-2xl font-serif mb-6">Edit product</h3>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor={nameInputId}
                    className="block text-[10px] font-bold uppercase tracking-[0.25em] opacity-70"
                  >
                    Name
                  </label>
                  <input
                    id={nameInputId}
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="mt-2 w-full border-b border-dried-thyme/30 bg-transparent pb-1 text-sm outline-none font-medium focus:border-dried-thyme transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor={priceInputId}
                    className="block text-[10px] font-bold uppercase tracking-[0.25em] opacity-70"
                  >
                    Price
                  </label>
                  <input
                    id={priceInputId}
                    name="price"
                    type="number"
                    value={formValues.price}
                    onChange={handleInputChange}
                    className="mt-2 w-full border-b border-dried-thyme/30 bg-transparent pb-1 text-sm outline-none font-medium focus:border-dried-thyme transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor={categoryInputId}
                    className="block text-[10px] font-bold uppercase tracking-[0.25em] opacity-70"
                  >
                    Category
                  </label>
                  <input
                    id={categoryInputId}
                    name="category"
                    value={formValues.category}
                    onChange={handleInputChange}
                    className="mt-2 w-full border-b border-dried-thyme/30 bg-transparent pb-1 text-sm outline-none font-medium focus:border-dried-thyme transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor={ratingInputId}
                    className="block text-[10px] font-bold uppercase tracking-[0.25em] opacity-70"
                  >
                    Rating
                  </label>
                  <input
                    id={ratingInputId}
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formValues.rating}
                    onChange={handleInputChange}
                    className="mt-2 w-full border-b border-dried-thyme/30 bg-transparent pb-1 text-sm outline-none font-medium focus:border-dried-thyme transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor={imageInputId}
                  className="block text-[10px] font-bold uppercase tracking-[0.25em] opacity-70"
                >
                  Image URL
                </label>
                <input
                  id={imageInputId}
                  name="image"
                  value={formValues.image}
                  onChange={handleInputChange}
                  className="mt-2 w-full border-b border-dried-thyme/30 bg-transparent pb-1 text-sm outline-none font-medium focus:border-dried-thyme transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor={descInputId}
                  className="block text-[10px] font-bold uppercase tracking-[0.25em] opacity-70"
                >
                  Description
                </label>
                <textarea
                  id={descInputId}
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-2 w-full border border-dried-thyme/20 rounded-md bg-transparent p-3 text-sm outline-none font-medium focus:border-dried-thyme transition-colors resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t border-bisque/30">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-xs font-bold tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-dried-thyme text-champagne px-5 py-2 text-xs font-bold tracking-widest uppercase rounded shadow hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Shop;
