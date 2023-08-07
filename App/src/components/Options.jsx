import React, { Fragment, useContext } from "react";
import styled, { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, light, thin, duotone, icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import Card from "./_Card.jsx";
import Container from "./_Container.jsx";

import OptionField from "./OptionField.jsx";

import FilePathContext from "../context/FilePaths.js";

const Affix = styled.span`
  font-size: calc(var(--font-size) / var(--type-scale));
  font-weight: 400;
`;

function Options() {
  const { filePaths } = useContext(FilePathContext);

  return (
    <section>
      <Container>
        <Card>
          <h2>Game Options</h2>
          <p>Interacting with the options below will update the values directly in the game files.</p>
          <OptionField
            id='frameRateLimit'
            label='Frame Rate Limit'
            description='Define the frame rate limit in frames per second (FPS). Higher values will negatively impact performance.'
            tooltipSuffix={<Affix> FPS</Affix>}
            fields={[
              {
                name: "option FrameRateLimit\\s+integer\\s+\\d+",
                replace: "\\d+",
                file: filePaths["Ts4CommonRules.sgr"],
              },
              {
                name: "prop \\$ConfigGroup FrameRateLimit\\s+\\d+",
                replace: "\\d+",
                file: filePaths["Ts4CommonRules.sgr"],
              },
              {
                name: "setOption FrameRateLimit = \\d+",
                replace: "\\d+",
                file: filePaths["Ts4CommonRules.sgr"],
              },
              {
                name: "frameratelimit = \\d+",
                replace: "\\d+",
                file: filePaths["Options.ini"],
              },
            ]}
            min={12}
            max={360}
            notches={[
              { value: 12 },
              { value: 30 },
              { value: 60, label: "Recommended" },
              { value: 120 },
              { value: 200, label: "Default" },
              { value: 240 },
              { value: 360 },
            ]}
          />
        </Card>
      </Container>
    </section>
  );
}

export default Options;
