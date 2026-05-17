import React from "react";
import { useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const formRef = useRef(null);

  // Generate explicit unique IDs for accurate accessible element mapping
  const nameId = useId();
  const priceId = useId();
  const categoryId = useId();
  const imageId = useId();
  const descId = useId();
  const ratingId = useId();
  const badgeId = useId();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    rating: "4",
  });
  const [status, setStatus] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ success: "", error: "", loading: true });

    try {
      await addProduct({
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
      });
      setStatus({
        success: "Product published successfully.",
        error: "",
        loading: false,
      });
      formRef.current?.reset();
      setFormData({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
        rating: "4",
      });
      navigate("/shop");
    } catch (error) {
      setStatus({
        success: "",
        error: error.message ?? "Unable to publish product.",
        loading: false,
      });
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-14 text-dried-thyme">
      {/* Page Heading */}
      <div className="mb-12">
        <p className="text-xs tracking-widest uppercase mb-2 opacity-60 font-semibold">
          Admin portal
        </p>
        <h1 className="text-5xl font-serif font-medium mb-3 lowercase">
          Add a product<span className="text-antique-rose">.</span>
        </h1>
        <p className="text-sm opacity-70">
          Fill in the details below to publish a new piece to the shop.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
        {/* Name and Price Inputs */}
        <div className="grid gap-10 md:grid-cols-2">
          <div className="block">
            <label
              htmlFor={nameId}
              className="block text-xs uppercase tracking-[0.35em] opacity-70 font-semibold"
            >
              Product name *
            </label>
            <input
              id={nameId}
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Linen Denim Jacket"
              required
              className="mt-2 w-full border-b border-dried-thyme/30 bg-transparent pb-2 text-base outline-none font-medium focus:border-dried-thyme transition-colors text-dried-thyme placeholder:text-dried-thyme/30"
            />
          </div>
          <div className="block">
            <label
              htmlFor={priceId}
              className="block text-xs uppercase tracking-[0.35em] opacity-70 font-semibold"
            >
              Price ($) *
            </label>
            <input
              id={priceId}
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="89"
              required
              className="mt-2 w-full border-b border-dried-thyme/30 bg-transparent pb-2 text-base outline-none font-medium focus:border-dried-thyme transition-colors text-dried-thyme placeholder:text-dried-thyme/30"
            />
          </div>
        </div>

        {/* Category and Image URL Inputs */}
        <div className="grid gap-10 md:grid-cols-2">
          <div className="block">
            <label
              htmlFor={categoryId}
              className="block text-xs uppercase tracking-[0.35em] opacity-70 font-semibold"
            >
              Category *
            </label>
            <input
              id={categoryId}
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="Outerwear"
              required
              className="mt-2 w-full border-b border-dried-thyme/30 bg-transparent pb-2 text-base outline-none font-medium focus:border-dried-thyme transition-colors text-dried-thyme placeholder:text-dried-thyme/30"
            />
          </div>
          <div className="block">
            <label
              htmlFor={imageId}
              className="block text-xs uppercase tracking-[0.35em] opacity-70 font-semibold"
            >
              Image URL *
            </label>
            <input
              id={imageId}
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              required
              className="mt-2 w-full border-b border-dried-thyme/30 bg-transparent pb-2 text-base outline-none font-medium focus:border-dried-thyme transition-colors text-dried-thyme placeholder:text-dried-thyme/30"
            />
          </div>
        </div>

        {/* Description Field */}
        <div className="block">
          <label
            htmlFor={descId}
            className="block text-xs uppercase tracking-[0.35em] opacity-70 font-semibold"
          >
            Description
          </label>
          <textarea
            id={descId}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="A short, evocative description..."
            rows="4"
            className="mt-2 w-full border-b border-dried-thyme/30 bg-transparent pb-2 text-base outline-none resize-none font-medium focus:border-dried-thyme transition-colors text-dried-thyme placeholder:text-dried-thyme/30"
          />
        </div>

        {/* Rating and Badge Inputs */}
        <div className="grid gap-10 md:grid-cols-2">
          <div className="block">
            <label
              htmlFor={ratingId}
              className="block text-xs uppercase tracking-[0.35em] opacity-70 font-semibold"
            >
              Rating
            </label>
            <input
              id={ratingId}
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              className="mt-2 w-full border-b border-dried-thyme/30 bg-transparent pb-2 text-base outline-none font-medium focus:border-dried-thyme transition-colors text-dried-thyme"
            />
          </div>
          <div className="block">
            <label
              htmlFor={badgeId}
              className="block text-xs uppercase tracking-[0.35em] opacity-70 font-semibold"
            >
              Badge
            </label>
            <select
              id={badgeId}
              name="badge"
              value="none"
              disabled
              className="mt-2 w-full border-b border-dried-thyme/30 bg-transparent pb-2 text-base outline-none cursor-not-allowed font-medium text-dried-thyme opacity-50"
            >
              <option>None</option>
            </select>
          </div>
        </div>

        {/* Action Controls Container */}
        <div className="flex flex-wrap gap-4 items-center pt-4">
          <button
            type="submit"
            disabled={status.loading}
            className="bg-dried-thyme text-champagne py-4 px-8 uppercase text-xs font-bold tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity rounded shadow"
          >
            {status.loading ? "Publishing…" : "Publish Product"}
          </button>
          <span className="text-xs tracking-wide opacity-60 font-semibold">
            or cancel and return once complete.
          </span>
        </div>

        {/* Status Messaging Feedback Labels */}
        {status.success && (
          <p className="text-sm font-semibold tracking-wide text-green-600 animate-fadeIn">
            {status.success}
          </p>
        )}
        {status.error && (
          <p className="text-sm font-semibold tracking-wide text-antique-rose animate-fadeIn">
            {status.error}
          </p>
        )}
      </form>
    </section>
  );
};

export default AddProduct;
