import { act } from "react";
import { test, expect } from "@jest/globals";
import { createRoot } from "react-dom/client";
import App from "./App";

test("renders learn react link", () => {
  const container = document.createElement("div");
  const root = createRoot(container);

  try {
    act(() => root.render(<App />));
    expect(container.querySelector("a")?.textContent).toMatch(/learn react/i);
  } finally {
    act(() => root.unmount());
  }
});
