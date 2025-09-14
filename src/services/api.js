const API_KEY = "210f5799aa0592be4e4a08c4bc9f4e9e";
const BASE_URL = "https://api.themoviedb.org/3";

// Alternative CORS proxy
const CORS_PROXY = "https://api.allorigins.win/get?url=";

const apiRequest = async (endpoint) => {
  try {
    const apiUrl = `${BASE_URL}${endpoint}`;
    const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(apiUrl)}`;

    console.log("Making API request via AllOrigins proxy");

    const response = await fetch(proxiedUrl);

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const proxyData = await response.json();

    // AllOrigins wraps the response in a 'contents' field
    if (!proxyData.contents) {
      throw new Error("Invalid proxy response");
    }

    const data = JSON.parse(proxyData.contents);
    console.log("API Response received");

    return data.results || data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw new Error(`Failed to load movies: ${error.message}`);
  }
};

export const getPopularMovies = async () => {
  return await apiRequest(`/movie/popular?api_key=${API_KEY}`);
};

export const searchMovies = async (query) => {
  if (!query?.trim()) {
    throw new Error("Search query cannot be empty");
  }

  return await apiRequest(
    `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
};
