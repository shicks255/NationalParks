import { RefObject, useEffect } from 'react';

function useClickOutside(
  ref: RefObject<HTMLDivElement | null>,
  callback: (e: Event) => void
): void {
  useEffect(() => {
    function handle(e: Event) {
      if (!ref.current || !ref.current.contains(e.target as Node)) {
        callback(e);
      }
    }

    document.addEventListener('click', handle);
    return () => {
      document.removeEventListener('click', handle);
    };
  }, [ref, callback]);
}

export default useClickOutside;
