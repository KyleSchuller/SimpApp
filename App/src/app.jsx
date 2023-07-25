import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

import Header from "./components/Header.jsx";
import Options from "./components/Options.jsx";
import Footer from "./components/Footer.jsx";

const StyledMain = styled.main`
  background-color: #ffffff;
`;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <StyledMain>
      <Options />
    </StyledMain>
    <Footer />
  </StrictMode>
);
