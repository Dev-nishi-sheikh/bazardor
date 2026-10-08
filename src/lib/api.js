const BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function getProduct(slug) {
  const res = await fetch(`${BASE_URL}/products/${slug}`);

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function getCategory(slug) {
  const res = await fetch(`${BASE_URL}/categories/${slug}`);

  if (!res.ok) {
    return null;
  }

  return res.json();
}