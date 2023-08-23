import React, { Fragment } from "react";

import Head from "./Head.jsx";
import Main from "./Main.jsx";
import Foot from "./Foot.jsx";

function AppWrapper({ children }) {
  return (
    <Fragment>
      <Head />
      <Main>{children}</Main>
      <Foot />
    </Fragment>
  );
}

export default AppWrapper;
