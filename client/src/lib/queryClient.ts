import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    // Try to parse JSON error first
    let errorMessage = res.statusText;
    try {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorJson = await res.json();
        errorMessage = errorJson.message || errorJson.error || JSON.stringify(errorJson);
      } else {
        const text = await res.text();
        if (text) errorMessage = text;
      }
    } catch (e) {
      // If we can't parse the error response, fall back to the status text
      console.error('Error parsing error response:', e);
    }
    
    // Handle specific error codes
    if (res.status === 429) {
      throw new Error(`Rate limit exceeded. Please try again later.`);
    } else if (res.status === 503) {
      throw new Error(`Service temporarily unavailable. Please try again later.`);
    } else {
      throw new Error(`Error ${res.status}: ${errorMessage}`);
    }
  }
}

// Function to get the base API URL
function getApiBaseUrl() {
  // For production (deployed version), we use relative URLs
  // This ensures API calls work regardless of the domain
  return import.meta.env.VITE_API_URL || ''; 
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // If the URL starts with /api/ and we have a base URL, prepend it
  const fullUrl = url.startsWith('/api/') && getApiBaseUrl() 
    ? `${getApiBaseUrl()}${url}` 
    : url;
    
  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    
    // If the URL starts with /api/ and we have a base URL, prepend it
    const fullUrl = url.startsWith('/api/') && getApiBaseUrl() 
      ? `${getApiBaseUrl()}${url}` 
      : url;
      
    const res = await fetch(fullUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
