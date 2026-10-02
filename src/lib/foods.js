const API_ROOT = "https://phi-lab-server.vercel.app/api/v1/lab/foods";
const CACHE_OPTIONS = { next: { revalidate: 300 } };

export async function getTopFoods() {
  const response = await fetch(`${API_ROOT}/top-foods`, CACHE_OPTIONS);
  if (!response.ok) {
    throw new Error(`Food list request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return Array.isArray(payload.data) ? payload.data : [];
}

export async function getFoodById(foodId) {
  const response = await fetch(
    `${API_ROOT}/${encodeURIComponent(foodId)}`,
    CACHE_OPTIONS,
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Food request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return payload.data ?? null;
}
