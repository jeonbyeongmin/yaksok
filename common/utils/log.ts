export const logOnBrowser = (error: unknown) => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(error);
};
