import React, { useCallback, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography, Paper, Stack, CircularProgress } from "@mui/material";

import { RootState } from "@/store";
import { spendCoin } from "@/store/itemSlice";
import { setSoda, setSodaList } from "@/store/sodaSlice";
import { Soda } from "@/types/soda";
import { GET_SODAS } from "@/graphql/queries/getSodas";
import { UPDATE_SODA_QUANTITY } from "@/graphql/mutations/updateSodaQuantity";

import downloadJSON from "@/utils/downloadJSON";
import useVendingMachineError from "@/utils/vendingMachineError";

import ErrorComponent from "@/components/ErrorComponent";
import SodaCarousel from "@/components/SodaCarousel";
import ItemRibbon from "@/components/ItemRibbon";

import Logout from "../Logout";
import { AdminViewPanelButton, PurchaseSodaButton } from "@/components/Button";
import DailyComponent from "@/components/daily";
import ItemList from "@/components/ItemList";

const VendingMachine: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedItem } = useSelector((state: RootState) => state.item);
  const { selectedSoda, sodaList } = useSelector(
    (state: RootState) => state.soda,
  );
  const [updateSodaQuantity] = useMutation(UPDATE_SODA_QUANTITY);
  const { loading, error, data } = useQuery<{ getSodas: Soda[] }>(GET_SODAS);
  const { isError, errorMessage, triggerVendingMachineError } =
    useVendingMachineError();

  const filteredSodaList = sodaList.length > 0 ? sodaList : data?.getSodas;
  const hudWidth = innerWidth * 0.8;
  useEffect(() => {
    if (filteredSodaList && filteredSodaList.length > 1) {
      const sortedArrayList = [...filteredSodaList].sort((soda1, soda2) => {
        const timestampA = parseInt(soda1._id.substring(0, 8), 16);
        const timestampB = parseInt(soda2._id.substring(0, 8), 16);

        return timestampA - timestampB;
      });
      dispatch(setSodaList(sortedArrayList));
      dispatch(setSoda(sortedArrayList[0]));
    }
  }, [data]);

  useEffect(() => {
    if (!filteredSodaList && data?.getSodas) {
      setSodaList(data.getSodas);
    }
  }, [data]);

  if (!selectedItem) {
    return (
      <Paper elevation={5} sx={{ p: "10px", m: "1rem" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          no selected item
        </Typography>
      </Paper>
    );
  }
  const handlePurchaseButtonClick = () => {
    if (selectedItem.quantity < 1) {
      triggerVendingMachineError("I N S E R T   C O I N");
      return;
    }
    if (!selectedSoda) {
      triggerVendingMachineError("N O    S E L E C T E D   S O D A");
      return;
    }
    purchaseSodaSubmit(selectedSoda._id)
      .then(() => {
        dispatch(spendCoin({ quantityDelta: -1 }));
        toast.success("Soda Purchased!");
      })
      .catch(() => {
        toast.error("Internal Sever error");
      });
  };

  const purchaseSodaSubmit = useCallback(
    async (sodaId: string) => {
      try {
        const { data: soda } = await updateSodaQuantity({
          variables: { _id: sodaId, increment: 0 },
          refetchQueries: [{ query: GET_SODAS }],
        });
        downloadJSON(soda);
      } catch (err) {
        console.error("Error updating soda quantity:", err);
      }
    },
    [updateSodaQuantity],
  );

  const handleAdminViewButtonClick = () => {
    if (!selectedItem.quantity) {
      toast.warning("No keys remaining");
      return;
    }
    if (selectedItem.isMasterKey) {
      navigate("./AdminPanel");
    } else {
      toast.warning("Looks like some sort of keyhole..");
    }
  };

  if (loading)
    return (
      <p>
        Loading...
        <CircularProgress />
      </p>
    );
  if (error) return <p>Error: {error?.message}</p>;
  if (filteredSodaList == undefined || filteredSodaList.length == 0) {
    triggerVendingMachineError("no soda list");
  }
  return (
    <>
      <ToastContainer />
      <Logout />
      <Stack spacing={2} direction="column">
        {isError ||
        filteredSodaList == undefined ||
        filteredSodaList.length == 0 ? (
          <ErrorComponent text={errorMessage} />
        ) : (
          <SodaCarousel
            carouselWidth={hudWidth}
            sodaList={filteredSodaList}
            listLength={filteredSodaList.length}
          />
        )}
        <Stack direction="row" spacing={2}>
          <DailyComponent />
          <PurchaseSodaButton onClick={handlePurchaseButtonClick} />
          <AdminViewPanelButton onClick={handleAdminViewButtonClick} />
          <ItemList />
          <ItemRibbon
            text={selectedItem.name + " " + selectedItem.quantity.toString()}
            key={selectedItem.name}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default VendingMachine;
