import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";

const StyledAdminViewPanelButton = styled(Button)`
  color: white;
  height: 3rem;
  &:hover {
    background-color: darkblue;
  }
`;

interface AdminViewPanelButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const AdminViewPanelButton: React.FC<AdminViewPanelButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <StyledAdminViewPanelButton
      size="large"
      variant="contained"
      disabled={disabled}
      onClick={onClick}
    >
      [O]
    </StyledAdminViewPanelButton>
  );
};

export default AdminViewPanelButton;
