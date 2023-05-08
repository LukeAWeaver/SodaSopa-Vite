import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { setSelectedItem } from "@/store/itemSlice";
import CoinDisplay from "@/components/items/CoinBag";
import MasterKeyComponent from "@/components/items/MasterKey";

import { Item } from "@/types/items";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20%;
`;

const ItemSelection: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleButtonClick = (item: Item) => {
    dispatch(setSelectedItem(item));
    navigate("/VendingMachine");
  };

  return (
    <Container>
      <MasterKeyComponent onSelect={handleButtonClick} />
      <CoinDisplay onSelect={handleButtonClick} />
    </Container>
  );
};

export default ItemSelection;
