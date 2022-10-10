import styled from "styled-components";
import rem from "../../utils/rem";

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  gap: ${rem(10)};
  flex-direction: column;
`;
