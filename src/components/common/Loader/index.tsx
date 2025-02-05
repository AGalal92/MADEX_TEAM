import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="load-row">
        <span />
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  );
};

export default Loader;

// Styled Components
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height to center vertically */
  width: 100vw; /* Full viewport width to center horizontally */
  background-color: rgba(255, 255, 255, 0.9); /* Optional: Add a semi-transparent background */
  backdrop-filter: blur(5px); /* Optional: Add a blur effect for a modern look */

  .load-row {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .load-row span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #f76002;
    border-radius: 50px;
    animation: up-down6 0.5s ease-in infinite alternate;
  }

  .load-row span:nth-child(2) {
    background: #e85b04c4;
    animation-delay: 0.16s;
  }

  .load-row span:nth-child(3) {
    background: #e85b0491;
    animation-delay: 0.32s;
  }

  .load-row span:nth-child(4) {
    background: #e85b0456;
    animation-delay: 0.48s;
  }

  @keyframes up-down6 {
    0% {
      transform: translateY(-10px);
    }

    100% {
      transform: translateY(10px);
    }
  }
`;