export const API_URL = "http://localhost:8000";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers = new Headers(options.headers);

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Set default Content-Type to application/json if not provided
  // and if the body is not URLSearchParams or FormData (which set their own content types)
  if (
    !headers.has("Content-Type") &&
    options.body &&
    !(options.body instanceof URLSearchParams) &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
}
