import React from "react";
import styled from "styled-components";

const StyledAdminViewPanelButton = styled.button`
  background-color: #ffaf50;
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
    background-color: #ffa049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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
    <StyledAdminViewPanelButton onClick={onClick} disabled={disabled}>
      [O]
    </StyledAdminViewPanelButton>
  );
};

export default AdminViewPanelButton;
