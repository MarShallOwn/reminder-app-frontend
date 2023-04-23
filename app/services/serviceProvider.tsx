export const serviceProvider = (endpoint: string, options = {}) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, options).then(
    (response) => {
      if (response.ok) return response;

      /*
      return response.json().then((response) => {
        throw new Error(response.error);
      });
      */

      return Promise.reject(response);
    }
  );
};
