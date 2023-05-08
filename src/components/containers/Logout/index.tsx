import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout();
    navigate("/");
  };

  return <StyledButton onClick={handleLogout}>Logout</StyledButton>;
};

export default Logout;
