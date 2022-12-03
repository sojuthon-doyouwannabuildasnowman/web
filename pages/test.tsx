import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";

interface SnowProps {
  marginLeft: number;
}

const snowAnimation = keyframes`
  0%{
    opacity:0;
    transform:translateY(0);
  }
  20%{
    opacity:1;
    transform:translate(-15px,20vh);
  }
  40%{
    opacity:1;
    transform:translate(15px,40vh);
  }
  60%{
    opacity:1;
    transform:translate(-15px,60vh);
  }
  80%{
    opacity:1;
    transform:translate(0px,80vh);
  }
  100%{
    opacity:1;
    transform:translateY(100vh);
  }
`;

const Block = styled.div`
  width: 768px;
  height: 100vh;
  margin: 0 auto;
  background-color: #333;
`;
const Snow = styled.div<SnowProps>`
  width: 10px;
  height: 10px;
  margin-left: ${({ marginLeft }) => marginLeft}px;
  background-color: #fff;
  border-radius: 50%;
  opacity: 0;
  animation: ${snowAnimation} 5s linear infinite;
  &:nth-of-type(5n) {
    width: 7px;
    height: 7px;
    animation-duration: 6s;
    animation-delay: 0s;
  }
  &:nth-of-type(5n + 1) {
    animation-duration: 6s;
    animation-delay: 1s;
  }
  &:nth-of-type(5n + 2) {
    width: 7px;
    height: 7px;
    animation-duration: 6s;
    animation-delay: 2s;
  }
  &:nth-of-type(5n + 3) {
    animation-duration: 6s;
    animation-delay: 3s;
  }
  &:nth-of-type(5n + 4) {
    animation-duration: 6s;
    animation-delay: 4s;
  }
`;

export default function Onboarding() {
  const [windowWidth, setWindowWidth] = useState(0);
  const randomPosition = useCallback(() => {
    return Math.floor(Math.random() * windowWidth);
  }, [windowWidth]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <Block>
      {new Array(600).fill(0).map((_, i) => {
        return <Snow key={i} marginLeft={randomPosition()} />;
      })}
    </Block>
  );
}
