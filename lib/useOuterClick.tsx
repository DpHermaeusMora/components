import { RefObject, useEffect } from "react";

export default async function useOuterClickEvent(
  refs: RefObject<HTMLElement>[],
  unmount: () => void
) {
  useEffect(() => {
    function unmountMenu(e: MouseEvent) {
      const allRefsNotContainsSource = refs.every((ref) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          return true;
        }
        return false;
      });
      if (allRefsNotContainsSource) {
        unmount();
      }
    }

    window.addEventListener("mousedown", unmountMenu);

    return () => {
      window.removeEventListener("mousedown", unmountMenu);
    };
  }, []);
}
