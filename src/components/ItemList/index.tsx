import CoinDisplay from "@/components/items/CoinBag";
import CoinDisplayComponent from "@/components/items/CoinBag";
import MasterKeyComponent from "@/components/items/MasterKey";
import { RootState } from "@/store";
import { setSelectedItem } from "@/store/itemSlice";
import { Item } from "@/types/items";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Typography, Grid, Stack, Paper } from "@mui/material";

const ItemListContainer = styled.div``;
interface MasterKeyDisplayProps {
  selected: boolean;
}
const MasterKeyDisplay = styled(MasterKeyComponent)<MasterKeyDisplayProps>``;

interface CoinDisplayProps {
  selected: boolean;
}

const CoinBagDisplay = styled(CoinDisplayComponent)<CoinDisplayProps>``;

const ItemList: React.FC = () => {
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
    <ItemListContainer>
      <MasterKeyComponent onSelect={handleButtonClick} />
      <CoinDisplay onSelect={handleButtonClick} />
    </ItemListContainer>
  );
};

export default ItemList;
