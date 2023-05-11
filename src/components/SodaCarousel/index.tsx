import React, { useState, useCallback, useMemo } from "react";
import { Soda } from "@/types/soda";
import SodaCard, { SodaCardProps } from "../SodaCard";
import styled from "styled-components";
import { setSoda } from "@/store/sodaSlice";
import { useDispatch } from "react-redux";
import { ArrowButton } from "@/components/Button";
import { DndContext } from "@dnd-kit/core";
import {
  paginateLeft,
  paginateRight,
  getGaussianBellCurvePosition,
  getdraggedIndex,
} from "@/utils/SodaCarousel";

// Define prop interfaces
interface ContainerProps {
  carouselWidth: number;
}

interface SodaCarouselWrapperProps {
  hudWidth: number;
}

interface StyledSodaCardProps extends SodaCardProps {
  relativeIndex: number;
  listLength: number;
  isSelected: boolean;
  index: number;
  hudWidth: number;
  selectedIndex: number;
  onSodaDrag: (index: number, mx: number) => void;
  currentDrag: number;
  dragAmount: number; // Add the dragAmount property
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  width: number;
  transform: string;
  opacity: string;
}

export interface SodaCarouselProps {
  carouselWidth: number;
  sodaList: Soda[];
  listLength: number;
}

// Define styled components
const Container = styled.div<ContainerProps>`
  align-items: center;
  height: 100%;
  display: flex;
  width: ${({ carouselWidth }) => `${carouselWidth}px`};
`;

const SodaCarouselWrapper = styled.div<SodaCarouselWrapperProps>`
  position: relative;
  height: 100%;
  width: ${({ hudWidth }) => `${hudWidth}px`};
`;

const StyledSodaCard = styled(SodaCard)<StyledSodaCardProps>`
  && {
    border-radius: 8px;
    padding: 2px;
    position: absolute;
    left: 0px;
    top: 0px;
    .soda-thumbnail {
      width: 100%;
    }
    .soda-info {
      text-align: center;
    }

    background-color: ${({ randomColor }) => randomColor};
    font-size: ${({ width }) => {
      return `${width / 4}%`;
    }};
    z-index: ${({ isSelected, theme }) => {
      return isSelected ? theme.zIndex.medium : "1";
    }};
    opacity: ${({ opacity }) => opacity};
    width: ${({ width }) => {
      return `${width}px`;
    }};

    transform: ${({ transform }) => {
      return transform;
    }};

    transition: transform 0.2s ease-out, width 0.2s ease-out,
      opacity 0.2s ease-out, font-size 0.2s ease-out;
  }
`;

const MemoizedStyledSodaCard = React.memo(
  StyledSodaCard,
  (prevProps, nextProps) => {
    return (
      prevProps.relativeIndex == nextProps.relativeIndex &&
      prevProps.dragAmount == nextProps.dragAmount
    );
  },
);

// SodaCarousel component
const SodaCarousel: React.FC<SodaCarouselProps> = ({
  carouselWidth,
  sodaList,
  listLength,
}) => {
  // State hooks
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [dragAmount, setDragAmount] = useState<number>(0);

  // Redux dispatch hook
  const dispatch = useDispatch();

  // Define derived constants
  const hudWidth = carouselWidth * 0.9;
  const arrowWidth = carouselWidth * 0.05;

  // Define memoized callbacks
  const handleSodaClick = useCallback(
    (sodaList: Soda[], selectedSoda: Soda) => {
      if (!sodaList) {
        return;
      }
      const index = sodaList.findIndex((soda) => soda._id == selectedSoda._id);
      if (index === -1) {
        return;
      }
      updateSelectedSoda(index);
    },
    [],
  );

  const updateSelectedSoda = (newIndex: number) => {
    setSelectedIndex(newIndex);
    dispatch(setSoda(sodaList[newIndex]));
  };

  const handleArrowClick = useCallback(
    (sodaList: Soda[], direction: "left" | "right") => {
      if (!sodaList) {
        return;
      }

      const newIndex =
        direction == "right"
          ? paginateRight(selectedIndex, listLength)
          : paginateLeft(selectedIndex, listLength);
      updateSelectedSoda(newIndex);
    },
    [sodaList, selectedIndex],
  );

  const handleDrag = useCallback((relativeIndex: number, mx: number) => {
    setDragAmount(mx);
  }, []);

  const getDeltaX = useCallback((draggedIndex: number) => {
    let xOffSet = draggedIndex;
    if (draggedIndex !== 0 && Math.abs(draggedIndex) > listLength / 2) {
      xOffSet = listLength - Math.abs(draggedIndex);
    }

    if (xOffSet == listLength / 2) {
      xOffSet = 0;
    }
    return xOffSet;
  }, []);

  const getDeltaY = useCallback((draggedIndex: number) => {
    let yOffSet = Math.abs(draggedIndex);
    if (yOffSet > listLength / 2) {
      yOffSet = listLength - yOffSet;
    }
    return yOffSet;
  }, []);
  const getNearPercentage = useCallback(
    (draggedRelativeIndex: number, spread: number) => {
      if (draggedRelativeIndex > listLength / 2) {
        draggedRelativeIndex = listLength - draggedRelativeIndex;
      }

      const nearPercentage = getGaussianBellCurvePosition(
        100,
        draggedRelativeIndex,
        spread,
      );
      return nearPercentage;
    },
    [],
  );
  // Helper function to generate soda card
  const generateSodaCard = useCallback(
    (soda: Soda, index: number) => {
      const spread = 1;
      const relativeIndex = index - selectedIndex;

      const draggedIndex = useMemo(
        () => getdraggedIndex(dragAmount, hudWidth, index),
        [dragAmount, hudWidth, index, listLength],
      );
      const draggedRelativeIndex = draggedIndex - selectedIndex;
      if (relativeIndex == 0 && draggedRelativeIndex == 1) {
        setSelectedIndex(index++);
        setDragAmount(0);
      }

      const yOffSet = getDeltaY(draggedIndex);
      const xOff = getDeltaX(draggedIndex) * 2;
      const nearPercentage = getNearPercentage(draggedRelativeIndex, spread);
      const width = 3 * nearPercentage;
      const opacityValue = `${nearPercentage}%`;
      const xCenter = hudWidth / 2 - width / 2;
      let dir = 1;
      if (draggedIndex !== 0 && Math.abs(draggedIndex) > listLength / 2) {
        dir = draggedIndex > 0 ? -1 : 1;
      }
      const x = xCenter + xOff * dir * (width / 2);

      const y = -330 - 80 * yOffSet;
      const transformValue = `translateX(${x}px) translateY(${y}px)`;
      return (
        <MemoizedStyledSodaCard
          key={soda._id}
          soda={soda}
          relativeIndex={relativeIndex}
          listLength={listLength}
          isSelected={index == selectedIndex}
          selectedIndex={selectedIndex}
          hudWidth={50}
          index={index}
          onSodaClick={() => handleSodaClick(sodaList, soda)}
          randomColor={soda.randomColor}
          onSodaDrag={handleDrag}
          dragAmount={dragAmount}
          setDragAmount={setDragAmount}
          updateSelectedSoda={updateSelectedSoda}
          opacity={opacityValue}
          width={width}
          transform={`${transformValue}`}
        />
      );
    },
    [selectedIndex, dragAmount, hudWidth, listLength],
  );

  return (
    <Container carouselWidth={carouselWidth}>
      <ArrowButton
        width={arrowWidth}
        onClick={() => handleArrowClick(sodaList, "left")}
        direction="left"
      />
      <SodaCarouselWrapper hudWidth={hudWidth}>
        <DndContext>{sodaList?.map(generateSodaCard)}</DndContext>
      </SodaCarouselWrapper>
      <ArrowButton
        width={arrowWidth}
        onClick={() => handleArrowClick(sodaList, "right")}
        direction="right"
      />
    </Container>
  );
};

export default SodaCarousel;
