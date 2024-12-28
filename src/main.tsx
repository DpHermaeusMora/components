import { createRoot } from "react-dom/client";
import { Button } from "./lib/index.ts";

createRoot(document.getElementById("root")!).render(
  <>
    <Button />
  </>
);
