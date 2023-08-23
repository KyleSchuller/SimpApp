import React from "react";
import styled from "styled-components";

import Tippy, { useSingleton } from "@tippyjs/react";

import Card from "../Common/Card.jsx";
import Container from "../Common/Container.jsx";

import { filesAndDirectories } from "../../../shared/filesAndDirectories.js";

import File from "./_File.jsx";

const FileStatusWrapper = styled.div`
  display: flex;
  gap: 0.5em;
`;

function FileStatus() {
  const [source, target] = useSingleton();

  return (
    <section>
      <Container>
        <Card>
          <h2>File Status</h2>
          <Tippy singleton={source} delay={[null, 128]} moveTransition='transform var(--transition-xs) var(--in-delay) var(--in-function)' className='custom-tippy' hideOnClick={false}>
            <FileStatusWrapper>
              {filesAndDirectories.map((file) => (
                <File key={file.name} file={file} singleton={target} />
              ))}
            </FileStatusWrapper>
          </Tippy>
        </Card>
      </Container>
    </section>
  );
}

export default FileStatus;
