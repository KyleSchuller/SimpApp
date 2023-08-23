import React, { Fragment, useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import Container from "../Common/Container.jsx";
import Card from "../Common/Card.jsx";
import { Tabber, TabberContent } from "../Common/Tabber/Tabber.jsx";

import OptionField from "./Field.jsx";

import FilePathContext from "../../context/filePaths.js";

const Affix = styled.span`
  font-size: calc(var(--font-size) / var(--type-scale));
  font-weight: 400;
`;

const MonoSpace = styled.span`
  display: inline-block;
  font-family: var(--font-custom--path), var(--font-system--mono);
  font-size: calc(var(--font-size) / var(--type-scale));
  font-weight: 600;
  word-spacing: -0.75ch;
`;

const defaultIcon = <FontAwesomeIcon icon={icon({ name: "diamond", style: "solid" })} style={{ transform: "scaleX(0.6)" }} />;
const defaultRecommendedIcon = <FontAwesomeIcon icon={icon({ name: "star", style: "solid" })} />;
const recommendedIcon = <FontAwesomeIcon icon={icon({ name: "thumbs-up", style: "solid" })} />;
const hardwareIcon = <FontAwesomeIcon icon={icon({ name: "gear", style: "solid" })} />;

function Options({ systemInfo }) {
  const { filePaths } = useContext(FilePathContext);

  // Load initial state from localStorage or set default
  const [selectedTab, setSelectedTab] = useState(localStorage.getItem("selectedTab") || "Medium");

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  // console.log(systemInfo);

  return (
    <section>
      <Container>
        <Card>
          <h2>Game Options</h2>
          <p>Interacting with the options below will update the values directly in the game files.</p>
          <OptionField
            id='FrameRateLimit'
            type='slider'
            label='Frame Rate Limit'
            description='Set the frame rate limit in frames per second (FPS).'
            extraDetails={
              <Fragment>
                <MonoSpace>60 FPS</MonoSpace> recommended {recommendedIcon}
                <br />
                {systemInfo && <MonoSpace>{systemInfo.graphicsData.displays[0].currentRefreshRate} FPS</MonoSpace>} hardware limit {hardwareIcon}
                <br />
                <MonoSpace>200 FPS</MonoSpace> TS4 default {defaultIcon}
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
            max={systemInfo && systemInfo.graphicsData.displays[0].currentRefreshRate > 240 ? systemInfo.graphicsData.displays[0].currentRefreshRate : 240}
            notches={[
              { value: 60, label: recommendedIcon },
              {
                value: systemInfo && systemInfo.graphicsData.displays[0].currentRefreshRate,
                label: hardwareIcon,
              },
              {
                value: 200,
                label: defaultIcon,
              },
            ]}
          />

          <Tabber title='LightingQuality' description='Description for LightingQuality' tooltip='Tooltip for LightingQuality'>
            <TabberContent title='Low'>
              <OptionField
                id='LightingQuality_Low_ShadowMapSize'
                type='slider'
                label='Shadow Map Size'
                description='Set the size of the shadow map in pixels.'
                extraDetails={
                  <Fragment>
                    <MonoSpace>1024</MonoSpace> default and recommended {defaultRecommendedIcon}
                  </Fragment>
                }
                fields={[
                  {
                    name: "(?<=setting \\$Low[\\s\\S]*?prop \\$ConfigGroup ShadowMapSize )\\d+",
                    replace: "\\d+",
                    file: filePaths["GraphicsRules.sgr"],
                  },
                ]}
                min={1024}
                max={5120}
                step={1024}
                notches={[
                  {
                    value: 1024,
                    label: defaultRecommendedIcon,
                  },
                ]}
              />
              {/* More Low LightingQuality options to come here */}
            </TabberContent>
            <TabberContent title='Medium'>
              <OptionField
                id='LightingQuality_Medium_ShadowMapSize'
                type='slider'
                label='Shadow Map Size'
                description='Set the size of the shadow map in pixels.'
                extraDetails={
                  <Fragment>
                    <MonoSpace>1024</MonoSpace> TS4 default {defaultIcon}
                    <br />
                    <MonoSpace>2048</MonoSpace> recommended {recommendedIcon}
                  </Fragment>
                }
                fields={[
                  {
                    name: "(?<=setting \\$Medium[\\s\\S]*?prop \\$ConfigGroup ShadowMapSize )\\d+",
                    replace: "\\d+",
                    file: filePaths["GraphicsRules.sgr"],
                  },
                ]}
                min={1024}
                max={5120}
                step={1024}
                notches={[
                  {
                    value: 1024,
                    label: defaultIcon,
                  },
                  {
                    value: 2048,
                    label: recommendedIcon,
                  },
                ]}
              />
              {/* More Medium LightingQuality options to come here */}
            </TabberContent>
            <TabberContent title='High'>
              <OptionField
                id='LightingQuality_High_ShadowMapSize'
                type='slider'
                label='Shadow Map Size'
                description='Set the size of the shadow map in pixels.'
                extraDetails={
                  <Fragment>
                    <MonoSpace>1024</MonoSpace> TS4 default {defaultIcon}
                    <br />
                    <MonoSpace>3072</MonoSpace> recommended {recommendedIcon}
                  </Fragment>
                }
                fields={[
                  {
                    name: "(?<=setting \\$High[\\s\\S]*?prop \\$ConfigGroup ShadowMapSize )\\d+",
                    replace: "\\d+",
                    file: filePaths["GraphicsRules.sgr"],
                  },
                ]}
                min={1024}
                max={5120}
                step={1024}
                notches={[
                  {
                    value: 1024,
                    label: defaultIcon,
                  },
                  {
                    value: 3072,
                    label: recommendedIcon,
                  },
                ]}
              />
              {/* More High LightingQuality options to come here */}
            </TabberContent>
            <TabberContent title='Very High'>
              <OptionField
                id='LightingQuality_VeryHigh_ShadowMapSize'
                type='slider'
                label='Shadow Map Size'
                description='Set the size of the shadow map in pixels.'
                extraDetails={
                  <Fragment>
                    <MonoSpace>2048</MonoSpace> TS4 default {defaultIcon}
                    <br />
                    <MonoSpace>4096</MonoSpace> recommended {recommendedIcon}
                  </Fragment>
                }
                fields={[
                  {
                    name: "(?<=setting \\$VeryHigh[\\s\\S]*?prop \\$ConfigGroup ShadowMapSize )\\d+",
                    replace: "\\d+",
                    file: filePaths["GraphicsRules.sgr"],
                  },
                ]}
                min={1024}
                max={5120}
                step={1024}
                notches={[
                  {
                    value: 2048,
                    label: defaultIcon,
                  },
                  {
                    value: 4096,
                    label: recommendedIcon,
                  },
                ]}
              />
              {/* More VeryHigh LightingQuality options to come here */}
            </TabberContent>
          </Tabber>
        </Card>
      </Container>
    </section>
  );
}

export default Options;
