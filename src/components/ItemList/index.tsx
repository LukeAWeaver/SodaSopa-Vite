import CoinDisplay from "@/components/items/CoinBag";
import CoinDisplayComponent from "@/components/items/CoinBag";
import MasterKeyComponent from "@/components/items/MasterKey";
import { RootState } from "@/store";
import { setSelectedItem } from "@/store/itemSlice";
import { Item } from "@/types/items";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Typography, Grid, Stack, Paper } from "@mui/material";

const ItemListContainer = styled(Stack)``;

interface ItemListProps {
  selected: boolean;
}

const StyledCoinComponent = styled(CoinDisplayComponent)<ItemListProps>`
  width: ${({ selected }) => {
    return `${selected ? 4 : 2}rem`;
  }};
`;
const StyledMasterKeyComponent = styled(MasterKeyComponent)<ItemListProps>`
  width: ${({ selected }) => {
    return `${selected ? 4 : 2}rem`;
  }};
`;

const ItemList: React.FC = (selected) => {
  const { selectedItem } = useSelector((state: RootState) => state.item);
  const dispatch = useDispatch();
  const handleButtonClick = (item: Item) => {
    dispatch(setSelectedItem(item));
  };
  if (!selectedItem) {
    return (
      <Paper elevation={5} sx={{ p: "10px", m: "1rem" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          no selected item
        </Typography>
      </Paper>
    );
  }

  return (
    <ItemListContainer spacing={2} direction={"row"}>
      <MasterKeyComponent onSelect={handleButtonClick} />
      <CoinDisplay onSelect={handleButtonClick} />
    </ItemListContainer>
  );
};

export default ItemList;
