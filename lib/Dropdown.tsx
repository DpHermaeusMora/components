import { useCallback, useEffect, useRef, useState } from "react";
import useOuterClick from "./useOuterClick";

type Props = {
  onUnmount?: () => void;
  renderBurger: (
    toggle: (visible?: boolean) => void,
    isMenuOpen: boolean
  ) => JSX.Element;
  className?: string;
  menuClassName?: string;
  children: (toggle: (visible?: boolean) => void) => React.ReactNode;
  alwaysOpen?: boolean;
};

const Dropdown: React.FC<Props> = ({
  onUnmount,
  children,
  renderBurger,
  className,
  menuClassName,
  alwaysOpen = false,
}) => {
  const burgerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(alwaysOpen);
  useOuterClick([burgerRef, menuRef], () => {
    if (!alwaysOpen) {
      setIsMenuOpen(false);
      if (typeof onUnmount === "function") {
        onUnmount();
      }
    }
  });

  useEffect(() => {
    if (!isMenuOpen) {
      if (typeof onUnmount === "function") {
        onUnmount();
      }
    }
  }, [isMenuOpen]);

  const toggle = useCallback(
    (visible = !isMenuOpen) => {
      setIsMenuOpen(visible);
    },
    [isMenuOpen]
  );

  return (
    <div
      className={`${isMenuOpen ? `!block` : `block`} ${className}`}
      ref={burgerRef}
    >
      {renderBurger(toggle, isMenuOpen)}
      {isMenuOpen
        ? children(toggle) && (
            <div className="relative">
              <div className={`menu ${menuClassName}`} ref={menuRef}>
                {children(toggle)}
              </div>
            </div>
          )
        : null}
    </div>
  );
};

export default Dropdown;
