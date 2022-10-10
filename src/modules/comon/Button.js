import styled from "styled-components";
import rem from "../../utils/rem";

const Button = styled.button`
  background-color: var(--color-purple);
  border: none;
  border-radius: ${rem(4)};
  color: var(--color-white);
  cursor: pointer;
  font-size: ${rem(14)};
  font-weight: var(--font-medium);
  padding: ${rem(3)} ${rem(6)};
  text-transform: uppercase;
  margin-left: ${rem(2)};
  margin-right: ${rem(2)};
`;