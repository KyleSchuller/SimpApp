import React from "react";

import Card from "./_Card.jsx";
import Container from "./_Container.jsx";

import OptionField from "./OptionField.jsx";

function Options() {
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
              { option: "FrameRateLimit", name: "integer", file: "Ts4CommonRules.sgr" },
              { option: "FrameRateLimit", name: "prop $ConfigGroup FrameRateLimit", file: "Ts4CommonRules.sgr" },
              { name: "setOption FrameRateLimit", file: "Ts4CommonRules.sgr" },
              { name: "frameratelimit", file: "Options.ini" },
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
