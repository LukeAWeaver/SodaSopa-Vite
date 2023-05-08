import React from "react";

interface RestockButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const RestockSoda: React.FC<RestockButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      RESTOCK
    </button>
  );
};

export default RestockSoda;
