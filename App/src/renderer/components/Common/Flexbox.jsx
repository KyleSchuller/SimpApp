import styled from "styled-components";

const Flexbox = styled.div`
  display: flex;
  gap: ${(props) => (props.$gap ? props.$gap : "1em")};
  align-items: ${(props) => props.$align || "stretch"};
  justify-content: ${(props) => props.$justify || "flex-start"};
  flex-wrap: ${(props) => (props.$wrap ? "wrap" : "nowrap")};
`;

export default Flexbox;
