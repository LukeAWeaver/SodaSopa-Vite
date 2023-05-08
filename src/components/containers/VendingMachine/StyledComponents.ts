import styled from "styled-components";
import DailyComponent from "@/components/daily";
import SwapComponent from "@/components/ItemList";
import { AdminViewPanelButton, PurchaseSodaButton } from "@/components/Button";
import SodaCarousel from "@/components/SodaCarousel";

export const StyledSodaCarousel = styled(SodaCarousel)``;

interface StyledSwapProps {
  selected: boolean | null | undefined;
}
export const StyledSwapComponent = styled(SwapComponent)<StyledSwapProps>`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

export const StyledDailyComponent = styled(DailyComponent)`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

export const StyledAdminViewPanelButton = styled(AdminViewPanelButton)``;

export const StyledPurchaseSodaButton = styled(PurchaseSodaButton)``;

export const VendingMachineContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  min-width: 100%;
`;
