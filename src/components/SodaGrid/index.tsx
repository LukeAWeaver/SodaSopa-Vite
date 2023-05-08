import React, { useState } from "react";
import { Soda } from "@/types/soda";
import SodaCard from "@/components/SodaCard";
import styled from "styled-components";

interface SodaGridProps {
  sodas: Soda[];
  onSodaSelected: (soda: Soda) => void;
}

const SodaGrid: React.FC<SodaGridProps> = ({ sodas, onSodaSelected }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleSodaClick = (soda: Soda) => {
    onSodaSelected(soda);
  };

  const handleArrowClick = (direction: number) => {
    if (sodas) {
      const newIndex =
        (selectedIndex + direction + sodas.length) % sodas.length;
      setSelectedIndex(newIndex);
      handleSodaClick(sodas[newIndex]);
    }
  };

  const Container = styled.div`
    display: flex;
    align-items: center;
  `;

  const ArrowButton = styled.button`
    font-size: 1.5rem;
    cursor: pointer;
  `;

  const SodaGridContainer = styled.div`
    display: flex;
    overflow: hidden;
    width: 1000px; // Adjust this value based on the total width of 3 SodaCard components
    position: relative;

    .soda-cards {
      display: flex;
      margin-left: ${(props) => selectedIndex * -333}px;
      transition: margin-left 0.3s ease;
    }
  `;

  return (
    <Container>
      <ArrowButton onClick={() => handleArrowClick(-1)}>&larr;</ArrowButton>
      <SodaGridContainer>
        <div className="soda-cards">
          {sodas?.map((soda, index) => (
            <SodaCard
              key={soda._id}
              soda={soda}
              isSelected={index === selectedIndex}
              onSodaClick={function (): void {
                throw new Error("Function not implemented.");
              }}
              relativeIndex={0}
              randomColor={""}
            />
          ))}
        </div>
      </SodaGridContainer>
      <ArrowButton onClick={() => handleArrowClick(1)}>&rarr;</ArrowButton>
    </Container>
  );
};

export default SodaGrid;
