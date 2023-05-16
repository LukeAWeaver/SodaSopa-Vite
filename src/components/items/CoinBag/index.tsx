import React from "react";
import { CoinBag } from "@/types/items";
import styled from "styled-components";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const CoinBagDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #654321; // dark brown color
  border-radius: 0 0 50% 50%; // create a semi-circular shape
  padding: 2rem;
  width: 2rem; // adjust width as needed
  height: 2rem; // adjust height as needed
  text-align: center;
  position: relative;
  cursor: pointer;
`;

const Drawstring = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 2px;
  background-color: #000; // black drawstring

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 50%;
    height: 100%;
  }

  &:before {
    left: 0;
    border-top-left-radius: 100% 50%;
  }

  &:after {
    right: 0;
    border-top-right-radius: 100% 50%;
  }
`;

interface CoinDisplayProps {
  onSelect: (coinBag: CoinBag) => void;
}

const CoinDisplay: React.FC<CoinDisplayProps> = ({ onSelect }) => {
  const { inventory } = useSelector((state: RootState) => state.item);
  const { coinBag } = inventory;

  const handleClick = () => {
    onSelect(coinBag);
  };
  return (
    <>
      <CoinBagDisplay onClick={handleClick}>
        <Drawstring />
      </CoinBagDisplay>
    </>
  );
};

export default CoinDisplay;
