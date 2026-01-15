// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = import.meta.env.VITE_API_URL;

export const fetchAPI = async (
  url,
  method = "GET",
  data = null,
  token = null
) => {
  try {
    const headers = { "Content-Type": "application/json" };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const options = {
      method,
      headers,
      // mode: "no-cors",
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}/${url}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message || result?.error || "Something went wrong"
      );
    }

    return result;
  } catch (error) {
    throw new Error(error?.message || error?.error || "Something went wrong");
  }
};
