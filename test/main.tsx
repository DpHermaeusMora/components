import React from "react";
import { createRoot } from "react-dom/client";
import { Dropdown, Searchbar } from "../lib/index";
import "../lib/index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <Dropdown
      menuClassName={`left-0 top-3`}
      renderBurger={(toggleMenu, isMenuOpen) => (
        <button
          onClick={() => {
            toggleMenu();
          }}
        >
          click here to search
        </button>
      )}
    >
      {(toggleMenu) => (
        <Searchbar
          onSearch={(query: string) => {
            console.log(query);
            toggleMenu();
          }}
          initialQuery={"Hello, World!"}
        />
      )}
    </Dropdown>
  </>
);
