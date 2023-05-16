import React from "react";
import { MasterKey } from "@/types/items";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "@/store";

interface KeyDisplayProps {
  onSelect: (masterKey: MasterKey) => void;
}

const KeyDisplay = styled.div`
  background-color: #ccc;
  padding: 1rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const MasterKeyComponent: React.FC<KeyDisplayProps> = ({ onSelect }) => {
  const { inventory } = useSelector((state: RootState) => state.item);

  const { masterKey } = inventory;
  const handleClick = () => {
    onSelect(masterKey);
  };

  return <KeyDisplay onClick={handleClick}></KeyDisplay>;
};

export default MasterKeyComponent;
