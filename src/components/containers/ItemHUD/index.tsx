import React from "react";
import styled from "styled-components";

interface RibbonProps {
  imageSrc: string;
  text: string;
}

const RibbonWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
`;

const RibbonImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 3px;
`;

const RibbonText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const Ribbon: React.FC<RibbonProps> = ({ imageSrc, text }) => {
  return (
    <RibbonWrapper>
      <RibbonImage src={imageSrc} alt={text} />
      <RibbonText>{text}</RibbonText>
    </RibbonWrapper>
  );
};

export default Ribbon;
