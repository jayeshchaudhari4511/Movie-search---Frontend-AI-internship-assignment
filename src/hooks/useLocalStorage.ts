import { useState, useCallback } from "react";

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (val: T) => void;
  removeValue: () => void;
}

/**
 * useLocalStorage – synced state with localStorage
 *
 * @param key           - localStorage key
 * @param initialValue  - default value when key is absent
 *
 * @example
 * const { value, setValue, removeValue } = useLocalStorage("token", "");
 */
const useLocalStorage = <T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> => {
  const [value, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (val: T) => {
      try {
        setStoredValue(val);
        localStorage.setItem(key, JSON.stringify(val));
      } catch (err) {
        console.error("useLocalStorage setValue error:", err);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      localStorage.removeItem(key);
    } catch (err) {
      console.error("useLocalStorage removeValue error:", err);
    }
  }, [key, initialValue]);

  return { value, setValue, removeValue };
};

export default useLocalStorage;
