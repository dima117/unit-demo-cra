import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Application } from "./Application";
import { initStore } from "./store";

import "./index.css";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  const store = initStore();

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <Application />
      </Provider>
    </BrowserRouter>
  );
}
