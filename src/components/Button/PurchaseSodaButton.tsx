import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";

const StyledPurchaseButton = styled(Button)`
  color: white;
  height: 3rem;
  background-color: cornflowerblue;
  &:hover {
    background-color: darkblue;
  }
`;

interface PurchaseButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const PurchaseSoda: React.FC<PurchaseButtonProps> = ({ onClick, disabled }) => {
  return (
    <StyledPurchaseButton
      size="large"
      variant="contained"
      onClick={onClick}
      disabled={disabled}
    >
      BUY
    </StyledPurchaseButton>
  );
};

export default PurchaseSoda;
