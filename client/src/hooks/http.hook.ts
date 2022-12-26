import * as React from "react";

export const useHttp = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const request = React.useCallback(
    async (url: string, method: string = "GET", body: any, headers: any) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json; charset=utf-8";
        }
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "Something went wrong, try it later"
          );
        }
        setLoading(false);
        return data;
      } catch (error: any) {
        setLoading(false);
        setError(error?.message);
      }
    },
    []
  );

  const cleanError = React.useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    request,
    error,
    cleanError,
  };
};
