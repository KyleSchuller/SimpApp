import React, { Fragment, useContext } from "react";
import styled from "styled-components";

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

const MonoSpace = styled.span`
  display: inline-block;
  font-family: var(--font-custom--path), var(--font-system--mono);
  font-size: calc(var(--font-size) / var(--type-scale));
  font-weight: 600;
`;

function Options({ systemInfo }) {
  const { filePaths } = useContext(FilePathContext);

  return (
    <section>
      <Container>
        <Card>
          <h2>Game Options</h2>
          <p>Interacting with the options below will update the values directly in the game files.</p>
          {/* <pre>{JSON.stringify(systemInfo, null, 2)}</pre> */}
          <OptionField
            id='frameRateLimit'
            label='Frame Rate Limit'
            description='Set the frame rate limit in frames per second (FPS).'
            extraDetails={
              <Fragment>
                60 FPS is recommended.
                <br />
                200 FPS is The Sims 4 default.
                <br />
                Higher values negatively impact performance.
                <br />
                Your screen supports up to{" "}
                {systemInfo && <MonoSpace>{systemInfo.graphicsData.displays[0].currentRefreshRate} FPS</MonoSpace>}.
              </Fragment>
            }
            valueSuffix={<Affix> FPS</Affix>}
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
            max={
              systemInfo && systemInfo.graphicsData.displays[0].currentRefreshRate > 240
                ? systemInfo.graphicsData.displays[0].currentRefreshRate
                : 240
            }
            notches={[
              { value: 60, label: <FontAwesomeIcon icon={icon({ name: "thumbs-up", style: "duotone" })} /> },
              {
                value: systemInfo && systemInfo.graphicsData.displays[0].currentRefreshRate,
                label: <FontAwesomeIcon icon={icon({ name: "microchip", style: "duotone" })} />,
              },
              {
                value: 200,
                label: (
                  <FontAwesomeIcon
                    icon={icon({ name: "diamond-half", style: "duotone" })}
                    style={{ transform: "scaleX(0.6)" }}
                  />
                ),
              },
            ]}
          />
        </Card>
      </Container>
    </section>
  );
}

export default Options;
