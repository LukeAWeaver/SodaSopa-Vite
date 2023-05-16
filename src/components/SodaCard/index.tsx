import React, { useCallback } from "react";
import { Soda } from "@/types/soda";
import styled from "styled-components";
import { Vector2, useDrag } from "@use-gesture/react"; // Import the useDrag hook
import { Typography, Grid, Stack, Paper } from "@mui/material";

const SodaCardContainer = styled.div<{
  isSelected: boolean;
  randomColor: string;
}>``;

export interface SodaCardProps {
  className?: string;
  soda: Soda;
  isSelected: boolean;
  onSodaClick: () => void;
  onSodaDrag: (index: number, mx: number) => void;
  relativeIndex: number;
  randomColor: string;
  setDragAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  updateSelectedSoda: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  listLength: number;
  draggedRelativeIndex: number;
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
  updateSelectedSoda,
  index,
  listLength,
  draggedRelativeIndex,
}) => {
  const [dragging, setDragging] = React.useState(false);

  const handleClick = useCallback(() => {
    if (!dragging) onSodaClick();
  }, [dragging, onSodaClick]);

  const handleDrag = useCallback(
    ({ movement: [mx] }: { movement: Vector2 }) => {
      onSodaDrag(draggedRelativeIndex, mx);
    },
    [onSodaDrag, draggedRelativeIndex],
  );

  const handleDragEnd = useCallback(() => {
    setDragAmount(0);
    setDragging(false);
  }, [setDragAmount]);

  const bind = useDrag(({ down, movement: [mx, _] }) => {
    const dir = mx > 0 ? -1 : 1;
    if (down) {
      handleDrag({ movement: [mx, 0] });
    } else {
      if (Math.abs(mx) > 170) {
        const proposedIndex = index + dir;
        const newIndex = proposedIndex == listLength ? 0 : listLength - 1;
        console.log("new soda selected", newIndex);
        updateSelectedSoda(newIndex);
      }
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
      <Stack>
        <img
          src={"https://via.placeholder.com/200"}
          alt={soda.name}
          className="soda-thumbnail"
        />
        {isSelected && (
          <Stack className="soda-info">
            <Typography align="center" variant="h5">
              {soda.name}
            </Typography>
            <Typography paragraph align="center" variant="body1">
              {soda.description}
            </Typography>
            <Typography align="center" gutterBottom variant="overline">
              stock: {soda.quantity}
            </Typography>
          </Stack>
        )}
      </Stack>
    </SodaCardContainer>
  );
};
export default SodaCard;
