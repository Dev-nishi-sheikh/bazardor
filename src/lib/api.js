
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
  const data = await fetchAPI("/products");

  // API সরাসরি array অথবা object-এর ভেতরে products দিতে পারে
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.products)) return data.products;
  if (Array.isArray(data.data)) return data.data;

  return [];
}

export async function getCategories() {
  const data = await fetchAPI("/categories");

  if (Array.isArray(data)) return data;
  if (Array.isArray(data.categories)) return data.categories;
  if (Array.isArray(data.data)) return data.data;

  return [];
}

export async function getProduct(slug) {
  try {
    const product = await fetchAPI(
      `/products/${encodeURIComponent(slug)}`
    );

    if (product && !product.error) {
      return product;
    }
  } catch {
    // Details endpoint কাজ না করলে products list থেকে খুঁজব
  }

  try {
    const products = await getProducts();

    return (
      products.find(
        (product) =>
          product.slug === slug ||
          product.id === slug ||
          product._id === slug
      ) || null
    );
  } catch (error) {
    console.error("Product fetch failed:", error);
    return null;
  }
}

export async function getCategory(slug) {
  try {
    return await fetchAPI(
      `/categories/${encodeURIComponent(slug)}`
    );
  } catch {
    return null;
  }
}
