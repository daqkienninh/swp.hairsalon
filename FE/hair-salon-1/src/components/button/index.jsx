import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // Navigate to the home page
  };
  return (
    <StyledWrapper>
      <button onClick={handleClick} className="home-button">
        <svg
          className="svgIcon"
          viewBox="0 0 104 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100.5 40.75V96.5H66V68.5V65H62.5H43H39.5V68.5V96.5H3.5V40.75L52 4.375L100.5 40.75Z"
            stroke="black"
            strokeWidth={7}
          />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;

  .home-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgb(252, 252, 252);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    padding: 8px;
  }

  .home-button:hover {
    background-color: rgb(223, 223, 223);
  }

  .svgIcon {
    width: 100%;
    height: 100%;
  }
`;

export default Card;
