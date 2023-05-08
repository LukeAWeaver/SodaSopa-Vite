import styled from "styled-components";
import SodaGrid from "@/components/SodaGrid";
import { GET_SODAS } from "@/graphql/queries/getSodas";
import { useMutation } from "@apollo/client";
import { UPDATE_SODA_QUANTITY } from "@/graphql/mutations/updateSodaQuantity";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Soda } from "@/types/soda";
import { setSoda } from "@/store/sodaSlice";

import { RestockSodaButton } from "@/components/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3 equal columns
  grid-gap: 10px; // space between grid items
  padding: 10px;
`;

const GridItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f5f5f5;
`;
const AdminPanel: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedSoda, sodaList } = useSelector(
    (state: RootState) => state.soda,
  );
  const { selectedItem } = useSelector((state: RootState) => state.item);
  const [updateSodaQuantity] = useMutation(UPDATE_SODA_QUANTITY);
  const navigate = useNavigate();

  if (!selectedItem || !selectedSoda) return <></>;

  const onRestock = async () => {
    if (!selectedItem.quantity) {
      toast.warning("no key");
      return;
    }
    try {
      await updateSodaQuantity({
        variables: {
          _id: selectedSoda._id,
          increment: 1,
        },
        refetchQueries: [{ query: GET_SODAS }],
      });
    } catch (error: any) {
      console.error("Error restocking soda:", error.message);
    }
  };

  const toVendingMachine = () => {
    navigate("/VendingMachine");
  };

  return (
    <GridContainer>
      <RestockSodaButton onClick={onRestock} />
      <button onClick={toVendingMachine}>back</button>
      <SodaGrid
        sodas={sodaList}
        onSodaSelected={(soda: Soda) => dispatch(setSoda(soda))}
      />
    </GridContainer>
  );
};

export default AdminPanel;
