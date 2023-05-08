import React, { useCallback } from "react";
import { Soda } from "@/types/soda";
import styled from "styled-components";
import { Vector2, useDrag } from "@use-gesture/react"; // Import the useDrag hook

const SodaCardContainer = styled.div<{
  isSelected: boolean;
  randomColor: string;
}>`
  background-color: ${({ randomColor }) => randomColor};
  cursor: pointer;
  transition: transform 0.3s;
`;

export interface SodaCardProps {
  className?: string;
  soda: Soda;
  isSelected: boolean;
  onSodaClick: () => void;
  onSodaDrag: (index: number, mx: number) => void;
  relativeIndex: number;
  randomColor: string;
  setDragAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SodaCard: React.FC<SodaCardProps> = ({
  className,
  soda,
  isSelected,
  onSodaClick,
  onSodaDrag,
  randomColor,
  relativeIndex,
  setDragAmount,
  setSelectedIndex,
}) => {
  const [dragging, setDragging] = React.useState(false);

  const handleClick = useCallback(() => {
    if (!dragging) onSodaClick();
  }, [dragging, onSodaClick]);

  const handleDrag = useCallback(
    ({ movement: [mx] }: { movement: Vector2 }) => {
      onSodaDrag(relativeIndex, mx);
    },
    [onSodaDrag, relativeIndex],
  );

  const handleDragEnd = useCallback(() => {
    setDragAmount(0);
    setDragging(false);
  }, [setDragAmount]);

  const bind = useDrag(({ down, movement: [mx, _] }) => {
    if (down) {
      if (Math.abs(mx) > 70) handleDrag({ movement: [mx, 0] });
    } else if (dragging) {
      handleDragEnd();
    } else {
      handleDragEnd();
    }
  });

  return (
    <SodaCardContainer
      {...bind()} // Add the event listeners from the useDrag hook
      randomColor={randomColor}
      className={className}
      isSelected={isSelected}
      onClick={handleClick}
    >
      <img
        src={"https://via.placeholder.com/200"}
        alt={soda.name}
        className="soda-thumbnail"
      />
      {isSelected && (
        <div className="soda-info">
          <h3>{soda.name}</h3>
          <p>{soda.description}</p>
          <p>stock: {soda.quantity}</p>
        </div>
      )}
    </SodaCardContainer>
  );
};
export default SodaCard;
