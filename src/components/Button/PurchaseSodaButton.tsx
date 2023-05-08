import React from "react";
import styled from "styled-components";

const StyledPurchaseButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  padding: 12px 24px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

interface PurchaseButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const PurchaseSoda: React.FC<PurchaseButtonProps> = ({ onClick, disabled }) => {
  return (
    <StyledPurchaseButton onClick={onClick} disabled={disabled}>
      DISPENSE
    </StyledPurchaseButton>
  );
};

export default PurchaseSoda;
