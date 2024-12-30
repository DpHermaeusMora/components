import { useEffect, useRef, useState, useMemo } from "react";
import SVGSearch from "../assets/search.svg?react";
import SVGTimes from "../assets/times.svg?react";

interface Props {
  initialQuery?: string;
  onSearch: (query: string) => void;
  containerClassName?: ((isFocus: boolean) => string) | string;
  inputClassName?: string;
  iconSize?: number;
}

export default function Searchbar(props: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(props.initialQuery || "");

  const containerClassName = useMemo(
    () =>
      props.containerClassName === undefined ||
      props.containerClassName === null
        ? `pl-4 pr-4  flex items-center flex-auto rounded-3xl h-10 relative ${
            isFocused ? `shadow-focus` : `around-shadow`
          }`
        : typeof props.containerClassName === "function"
        ? props.containerClassName(isFocused)
        : props.containerClassName,
    [props.containerClassName, isFocused]
  );
  const inputClassName = useMemo(
    () =>
      `ml-3 border-none bg-transparent w-[calc(100%-55px)] h-full outline-none`,
    [props.inputClassName]
  );

  const iconSize = useMemo(() => props.iconSize || 30, [props.iconSize]);

  useEffect(() => {
    setQuery(props.initialQuery || "");
  }, [props.initialQuery]);

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "a" && (e.metaKey || e.ctrlKey)) {
      return;
    }
    if (e.key === "Enter") {
      setIsFocused(false);
      props.onSearch(query);
    }
    if (e.key === " ") {
      e.stopPropagation();
    }
    if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  }

  return (
    <div className={containerClassName}>
      <SVGSearch width={iconSize} height={iconSize} />
      <input
        ref={inputRef}
        autoComplete="off"
        type="text"
        placeholder="search"
        className={inputClassName}
        onKeyUp={handleKeyUp}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onClick={() => {
          inputRef.current?.focus();
        }}
      />
      {query ? (
        <div
          className="cursor-pointer absolute right-3"
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
        >
          <SVGTimes width={iconSize} height={iconSize} />
        </div>
      ) : null}
    </div>
  );
}
