import React from "react";
import styled from "styled-components";

const StyledErrorComponent = styled.div`
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
`;

interface ErrorComponentProps {
  text: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ text }) => {
  return <StyledErrorComponent>{text}</StyledErrorComponent>;
};

export default ErrorComponent;
