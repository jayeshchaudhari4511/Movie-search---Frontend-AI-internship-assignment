import { useState, useEffect } from "react";

/**
 * useFetch – generic data-fetching hook
 *
 * @param fetchFn  - An async function that returns data of type T
 * @param deps     - Optional dependency array that re-triggers the fetch
 *
 * @example
 * const { data, loading, error, refetch } = useFetch(() => getUsers());
 */
const useFetch = <T>(
  fetchFn: () => Promise<T>,
  deps: unknown[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { execute(); }, deps);

  return { data, loading, error, refetch: execute };
};

export default useFetch;
