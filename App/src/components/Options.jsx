import React, { useContext } from "react";

import Card from "./_Card.jsx";
import Container from "./_Container.jsx";

import OptionField from "./OptionField.jsx";

import FilePathContext from "../context/FilePaths.js";

function Options() {
  const { filePaths } = useContext(FilePathContext);

  return (
    <section>
      <Container>
        <Card>
          <h2>Game Options</h2>
          <p>
            Lots of sliders and things to come here. Interacting with the sliders will change values in various files.
          </p>
          <OptionField
            label='Frame Rate Limit'
            description='Control the FPS (frames per second)'
            fields={[
              {
                name: "option FrameRateLimit\\s+integer\\s+\\d+",
                replace: "\\d+",
                file: filePaths["Ts4CommonRules.sgr"],
                isRegex: true,
              },
              {
                name: "prop \\$ConfigGroup FrameRateLimit\\s+\\d+",
                replace: "\\d+",
                file: filePaths["Ts4CommonRules.sgr"],
                isRegex: true,
              },
              {
                name: "setOption FrameRateLimit = \\d+",
                replace: "\\d+",
                file: filePaths["Ts4CommonRules.sgr"],
                isRegex: true,
              },
              {
                name: "frameratelimit = \\d+",
                replace: "\\d+",
                file: filePaths["Options.ini"],
                isRegex: true,
              },
            ]}
            type='range'
            min={12}
            max={360}
            required
          />
        </Card>
      </Container>
    </section>
  );
}

export default Options;
