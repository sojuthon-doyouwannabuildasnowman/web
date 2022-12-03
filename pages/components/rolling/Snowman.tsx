import styled from "@emotion/styled";

const SnowmanBlock = styled.img`
  position: absolute;
  bottom: 275px;
  width: 240px;
  cursor: pointer;
  transition: 1s all;
`;

export const Snowman = () => {
  return <SnowmanBlock src="/snowmanHead.svg" onClick={onClickSnowman} />;
};
