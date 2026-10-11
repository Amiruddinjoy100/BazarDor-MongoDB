import "server-only";

const BASE_URL = (process.env.BAZARDOR_API_URL || "https://api.abcz.workers.dev/api/bazardor").replace(/\/$/, "");

async function getData(path) {
  const response = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 900 }, signal: AbortSignal.timeout(12000) });
  if (!response.ok) throw new Error(`BazarDor API error: ${response.status} (${path})`);
  const body = await response.json();
  // Some API mirrors wrap their arrays; the original assignment uses bare arrays.
  if (Array.isArray(body)) return body;
  if (Array.isArray(body?.data)) return body.data;
  if (Array.isArray(body?.data?.products)) return body.data.products;
  if (Array.isArray(body?.data?.categories)) return body.data.categories;
  if (Array.isArray(body?.products)) return body.products;
  if (Array.isArray(body?.categories)) return body.categories;
  throw new Error(`Unexpected BazarDor API response for ${path}`);
}

export async function getProducts() { return getData("/products"); }
export async function getCategories() { return getData("/categories"); }
export async function getCategoryProducts(slug) { return getData(`/products?category=${encodeURIComponent(slug)}`); }
export async function getProduct(slug) {
  // Slug routes are required by the assignment; individual API lookups accept an ID.
  // Fetching the list avoids assuming the slug equals the numeric product ID.
  const products = await getProducts();
  return products.find((p) => p.slug === slug || String(p.id) === slug) || null;
}
