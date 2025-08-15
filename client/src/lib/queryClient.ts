import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await fetch(`${queryKey[0]}`, {
          headers: {
            'Authorization': localStorage.getItem('adminToken') || ''
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      },
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// API request helper for mutations
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('adminToken') || '',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export { queryClient };
export default queryClient;