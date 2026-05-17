import React from "react";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const sampleProducts = [
  {
    id: 1,
    name: "Linen Denim Jacket",
    price: 89,
    category: "Outerwear",
    image: "https://example.com/jacket.jpg",
    description: "A cozy jacket for layered looks.",
    rating: 4.8,
  },
];

const mockFetch = vi.fn((url, options = {}) => {
  if (options.method === "PATCH") {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ ...JSON.parse(options.body), id: 1 }),
    });
  }

  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(sampleProducts),
  });
});

describe("Shop page admin edit flow", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockFetch.mockClear();
  });

  it("opens edit dialog and sends patch request for a product", async () => {
    render(<App />);

    const shopNav = screen
      .getAllByText(/^Shop$/i)
      .find((node) => node.closest("a"));
    await userEvent.click(shopNav);
    expect(await screen.findByText("Linen Denim Jacket")).toBeInTheDocument();

    const editButton = await screen.findByRole("button", {
      name: /Edit product/i,
    });
    await userEvent.click(editButton);

    const nameInput = await screen.findByLabelText(/Name/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Linen Denim Blazer");

    await userEvent.click(
      screen.getByRole("button", { name: /Save Changes/i }),
    );

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/products/1",
        expect.objectContaining({ method: "PATCH" }),
      ),
    );

    expect(await screen.findByText(/Linen Denim Blazer/i)).toBeInTheDocument();
  });
});
