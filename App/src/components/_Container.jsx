import styled from "styled-components";

const Container = styled.div`
  inline-size: 100vw;
  max-inline-size: 100vw;

  margin-inline: auto;
  padding-block: ${(props) => (props.$padding ? props.$padding : "unset")};
  padding-inline: 1rem;

  @media (min-width: 1400px) {
    max-inline-size: 1400px;
  }
`;

export default Container;
