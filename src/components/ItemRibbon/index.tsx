import React from "react";
import styled from "styled-components";

interface ItemRibbonProps {
  text: string;
}

const ItemRibbon: React.FC<ItemRibbonProps> = ({ text }) => {
  return (
    <ItemRibbonContainer>
      <ItemRibbonText>{text}</ItemRibbonText>
    </ItemRibbonContainer>
  );
};

const ItemRibbonContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  background-color: #e74c3c;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
`;

const ItemRibbonText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  line-height: 160px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;

export default ItemRibbon;
