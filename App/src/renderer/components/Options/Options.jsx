import React, { Fragment, useContext, useState, useEffect } from "react";
import styled from "styled-components";

import Tippy, { useSingleton } from "@tippyjs/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, light, thin, duotone, icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import Card from "../Common/Card.jsx";
import Container from "../Common/Container.jsx";

import OptionField from "../OptionField.jsx";

import FilePathContext from "../../context/FilePaths.js";

const TabContainer = styled.div`
  --tab-corner: 0.75em;

  display: flex;
  flex-wrap: wrap;
  gap: 0.25em 0.5em;

  & > * {
    margin: unset;
  }

  & *:not(:last-child) {
    margin-block-end: unset;
  }
`;
const TabDescription = styled.div`
  min-width: 100%;
`;
const TabWrapper = styled.div`
  min-width: 100%;
  margin-block-start: 0.25em;
`;
const TabNavigation = styled.div`
  display: flex;
  gap: 1px;
  align-items: stretch;
  background-color: var(--stone-300);
  border-radius: var(--tab-corner) var(--tab-corner) 0 0;

  & > * {
    background-color: var(--stone-100);
    border: unset;
    border-radius: unset;
    flex: 1;
    margin: unset;
    outline: unset;
    padding: 0.5em;

    &:first-child {
      border-radius: calc(var(--tab-corner) - 1px) 0 0 0;
    }
    &:last-child {
      border-radius: 0 calc(var(--tab-corner) - 1px) 0 0;
    }

    &:not(.active) {
      background-color: var(--stone-200);
    }
    &:focus-visible {
      z-index: 1;
    }
  }
`;
const TabContent = styled.div`
  background-color: var(--stone-100);
  border-radius: 0 0 var(--tab-corner) var(--tab-corner);
  min-width: 100%;
  padding: 1em;
  padding-block-end: unset;
`;

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

          <TabContainer>
            <h3 className='h5'>LightingQuality</h3>
            <Tippy content='Tooltip for LightingQuality' className='custom-tippy'>
              <FontAwesomeIcon icon={icon({ name: "info-circle", style: "regular" })} style={{ marginBlock: "auto" }} />
            </Tippy>
            <TabDescription>Description for LightingQuality</TabDescription>
            <TabWrapper>
              <TabNavigation role='tablist'>
                <button role='tab' aria-selected={selectedTab === "Low"} className={selectedTab === "Low" ? "active" : null} onClick={() => setSelectedTab("Low")} id='lighting-tab-nav-low' aria-controls='lighting-tab-panel-low'>
                  Low
                </button>
                <button role='tab' aria-selected={selectedTab === "Medium"} className={selectedTab === "Medium" ? "active" : null} onClick={() => setSelectedTab("Medium")} id='lighting-tab-nav-medium' aria-controls='lighting-tab-panel-medium'>
                  Medium
                </button>
                <button role='tab' aria-selected={selectedTab === "High"} className={selectedTab === "High" ? "active" : null} onClick={() => setSelectedTab("High")} id='lighting-tab-nav-high' aria-controls='lighting-tab-panel-high'>
                  High
                </button>
                <button role='tab' aria-selected={selectedTab === "VeryHigh"} className={selectedTab === "VeryHigh" ? "active" : null} onClick={() => setSelectedTab("VeryHigh")} id='lighting-tab-nav-veryhigh' aria-controls='lighting-tab-panel-veryhigh'>
                  Very High
                </button>
              </TabNavigation>

              {selectedTab === "Low" && (
                <TabContent role='tabpanel' id='lighting-tab-panel-low' aria-labelledby='lighting-tab-nav-low'>
                  <OptionField
                    id='LightingQuality_Low_ShadowMapSize'
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
                </TabContent>
              )}
              {selectedTab === "Medium" && (
                <TabContent role='tabpanel' id='lighting-tab-panel-medium' aria-labelledby='lighting-tab-nav-medium'>
                  <OptionField
                    id='LightingQuality_Medium_ShadowMapSize'
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
                </TabContent>
              )}
              {selectedTab === "High" && (
                <TabContent role='tabpanel' id='lighting-tab-panel-high' aria-labelledby='lighting-tab-nav-high'>
                  <OptionField
                    id='LightingQuality_High_ShadowMapSize'
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
                </TabContent>
              )}
              {selectedTab === "VeryHigh" && (
                <TabContent role='tabpanel' id='lighting-tab-panel-veryhigh' aria-labelledby='lighting-tab-nav-veryhigh'>
                  <OptionField
                    id='LightingQuality_VeryHigh_ShadowMapSize'
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
                </TabContent>
              )}
            </TabWrapper>
          </TabContainer>
        </Card>
      </Container>
    </section>
  );
}

export default Options;
