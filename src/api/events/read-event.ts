interface ReadEventParams {
  id: string;
}

export const ReadEventPath = (id: string) => `/api/events/${id}`;

export const ReadEventAPI = async ({ id }: ReadEventParams) => {
  const response = await fetch(ReadEventPath(id));
  return response.json();
};
