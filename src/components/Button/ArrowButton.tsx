import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";

interface StyledArrowButtonProps {
  width: number;
}

const StyledArrowButton = styled(Button)<StyledArrowButtonProps>`
  color: white;
  height: 3rem;
  width: ${({ width }) => `${width}px`};
  background-color: cornflowerblue;
  &:hover {
    background-color: darkblue;
  }
`;

interface ArrowButtonProps {
  onClick: () => void;
  direction: string;
  width: number;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  onClick,
  direction,
  width,
}) => {
  const arrow = direction == "left" ? <>&larr;</> : <>&rarr;</>;
  return (
    <StyledArrowButton
      size="large"
      variant="contained"
      width={width}
      onClick={onClick}
    >
      {arrow}
    </StyledArrowButton>
  );
};

export default ArrowButton;
