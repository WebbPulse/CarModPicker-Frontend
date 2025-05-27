import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
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
