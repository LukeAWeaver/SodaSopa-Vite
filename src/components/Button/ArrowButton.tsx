import React from "react";
import styled from "styled-components";

interface StyledArrowButtonProps {
  width: number;
}

const StyledArrowButton = styled.button<StyledArrowButtonProps>`
  font-size: 1.5rem;
  cursor: pointer;
  width: ${({ width }) => `${width}px`};
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
    <StyledArrowButton width={width} onClick={onClick}>
      {arrow}
    </StyledArrowButton>
  );
};

export default ArrowButton;
