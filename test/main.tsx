import React from "react";
import { createRoot } from "react-dom/client";
import { Searchbar } from "../lib/index";
import "../lib/index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <Searchbar
      onSearch={(query: string) => {
        console.log(query);
      }}
      initialQuery={"Hello, World!"}
    />
  </>
);
