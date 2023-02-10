interface DeleteEventParams {
  id: string;
}

interface DeleteEventReturn {
  success: boolean;
  data: string;
}

export const DeleteEventPath = (id: string) => `/api/events/${id}`;

export const DeleteEventAPI = async ({
  id,
}: DeleteEventParams): Promise<DeleteEventReturn> => {
  const response = await fetch(DeleteEventPath(id), {
    method: 'DELETE',
  });

  return response.json();
};
