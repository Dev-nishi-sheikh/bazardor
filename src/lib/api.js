
const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

async function fetchAPI(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${endpoint}`);
  }

  return res.json();
}

export async function getProducts() {
  return fetchAPI("/products");
}

export async function getCategories() {
  return fetchAPI("/categories");
}

export async function getProduct(slug) {
  try {
    return await fetchAPI(`/products/${slug}`);
  } catch {
    return null;
  }
}

export async function getCategory(slug) {
  try {
    return await fetchAPI(`/categories/${slug}`);
  } catch {
    return null;
  }
}
