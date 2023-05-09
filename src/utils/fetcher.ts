interface EndpointOptions {
  data?: Record<string, unknown>;
}

export async function fetcher(
  endpoint: string,
  { method, data, ...customConfig }: EndpointOptions & RequestInit = {
    method: 'GET',
  },
) {
  const headers: RequestInit['headers'] = {};

  if (data) {
    headers['Content-Type'] = 'application/json';
  }

  const config: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    ...customConfig,
  };

  // Remove leading slash
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
      config,
    );

    const data = await response.json();

    return response.status < 400 ? data : Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
