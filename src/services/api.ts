import axios from 'axios';

// If using HTTP-only cookies for authentication:
// 1. The browser automatically sends the cookie with requests to your backend.
// 2. Client-side JavaScript cannot (and does not need to) access the cookie's value directly.
// 3. Therefore, you don't manually set an 'Authorization: Bearer <token>' header.

const apiClient = axios.create({
  baseURL: '/api', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  // Important: This allows cookies to be sent with requests.
  // This is necessary if your frontend and backend are on different origins (ports, subdomains)
  // or if you want to be explicit about sending credentials.
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    // If you need to add any custom headers or modify the request, do so here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// The response interceptor is useful for global error handling,
// such as redirecting on a 401 Unauthorized response.
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error('Unauthorized, potentially redirecting to login...');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;