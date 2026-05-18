import React from "react";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const sampleProducts = [
  {
    id: 1,
    name: "Mini Backpack",
    price: 59,
    category: "Bags",
    image: "https://example.com/backpack.jpg",
    description: "A compact, urban carry-all.",
    rating: 4.6,
  },
];

const mockFetch = vi.fn((url, options = {}) => {
  if (options.method === "POST") {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ ...JSON.parse(options.body), id: 2 }),
    });
  }

  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(sampleProducts),
  });
});

describe("App routing and product pages", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockFetch.mockClear();
  });

  it("renders home page and navigates between routes", async () => {
    render(<App />);

    expect(screen.getByText(/april\./i)).toBeInTheDocument();
    expect(screen.getByText(/^Shop$/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/Shop the collection/i)).toBeInTheDocument(),
    );

    const shopNav = screen
      .getAllByText(/^Shop$/i)
      .find((node) => node.closest("a"));
    await userEvent.click(shopNav);
    expect(
      await screen.findByRole("heading", { name: /Shop/i }),
    ).toBeInTheDocument();

    const addProductNav = screen
      .getAllByText(/Add Product/i)
      .find((node) => node.closest("a"));
    await userEvent.click(addProductNav);
    expect(
      await screen.findByRole("heading", { name: /Add a product/i }),
    ).toBeInTheDocument();
  });

  it("posts a new product from the add product form", async () => {
    render(<App />);

    const addProductNav = screen
      .getAllByText(/Add Product/i)
      .find((node) => node.closest("a"));
    await userEvent.click(addProductNav);

    await userEvent.type(
      screen.getByPlaceholderText(/Linen Denim Jacket/i),
      "Linen Denim Jacket",
    );
    await userEvent.type(screen.getByPlaceholderText("89"), "89");
    await userEvent.type(screen.getByPlaceholderText("Outerwear"), "Outerwear");
    await userEvent.type(
      screen.getByPlaceholderText("https://..."),
      "https://example.com/jacket.jpg",
    );
    await userEvent.type(
      screen.getByPlaceholderText(/A short, evocative description/i),
      "A short, evocative description.",
    );

    await userEvent.click(
      screen.getByRole("button", { name: /Publish Product/i }),
    );

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/products",
        expect.objectContaining({ method: "POST" }),
      ),
    );

    expect(
      await screen.findByRole("heading", { name: /Shop/i }),
    ).toBeInTheDocument();
  });
});