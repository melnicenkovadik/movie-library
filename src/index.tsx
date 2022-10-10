import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

const GlobalStyle = createGlobalStyle`
  body {
    --color-white: #fff;
    --color-black: #000;
    --color-purple: rgba(108, 99, 255, 0.81);
    --color-blue-dark: #0e0e41;
    --color-grey: #444;
    --color-yellow: #ffbe28;
    --typography-roboto: "Roboto", sans-serif;
    --font-medium: 500;
    --font-black: 900;
    --transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    background-color: var(--color-blue-dark);
    color: var(--color-white);
    font-weight: var(--font-medium);
    font-family: var(--typography-roboto);
    font-size: 16px;
    margin: 0;
    padding: 0;
  }

  .o-page {
    height: auto;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    width: 100%;
  }
`;

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    <GlobalStyle />
  </StrictMode>
);
