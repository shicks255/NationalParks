import { RefObject, useEffect } from 'react';

function useClickOutside(
  refs: RefObject<HTMLDivElement | null>[],
  callback: (e: Event) => void
): void {
  useEffect(() => {
    const handle = (e: Event) => {
      let fire = true;

      refs.forEach((ref) => {
        if (!ref.current || ref.current.contains(e.target as Node)) {
          fire = false;
        }
      });

      if (fire) {
        callback(e);
      }
    };

    document.addEventListener('click', handle);
    return () => {
      document.removeEventListener('click', handle);
    };
  }, [refs, callback]);
}

export default useClickOutside;
