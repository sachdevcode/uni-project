import { createRoot } from "react-dom/client";
import Widget from "./Widget.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const event = rootElement.getAttribute("data-event");
  const accountId = rootElement.getAttribute("data-accountID");

  createRoot(rootElement).render(
    <Widget
      event={event || "defaultEvent"}
      accountId={accountId || "defaultAccountId"}
    />
  );
} else {
  console.error("Root element not found");
}
