import { useEffect, useRef } from "react";

/**
 * useDebounce – delays invoking a callback until after `delay` ms have elapsed
 * since the last invocation.
 *
 * @param callback - The function to debounce
 * @param delay    - Delay in ms (default: 500)
 * @param deps     - Dependency array that re-starts the debounce timer
 *
 * @example
 * useDebounce(() => fetchResults(query), 400, [query]);
 */
const useDebounce = (
  callback: () => void,
  delay: number = 500,
  deps: unknown[] = []
): void => {
  const callbackRef = useRef(callback);

  // Always keep the ref pointing at the latest callback
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = setTimeout(() => callbackRef.current(), delay);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);
};

export default useDebounce;
