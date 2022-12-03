import styled from "@emotion/styled";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

interface PointProps {
  point: number;
}

const Section = styled.section`
  position: relative;
  width: 428px;
  height: 100vh;
  background-color: #537d93;
  overflow: hidden;
`;
const GroundBlock = styled.div`
  display: flex;
  justify-content: center;
  background-image: url("/ground.svg");
`;
const Ground = styled.img`
  position: absolute;
  bottom: 0;
  height: 354px;
`;
const PointBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 110px;
  color: #fff;
`;
const Text = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 10px;
`;
const Point = styled.div`
  font-weight: 600;
  font-size: 36px;
`;
const Snowman = styled.img<PointProps>`
  position: absolute;
  bottom: 275px;
  width: 240px;
  cursor: pointer;
  transition: 0.8s all ease-out;
  transform: rotate(${({ point }) => point}deg);
  z-index: 2;
`;
const SnowmanShadow = styled.img`
  position: absolute;
  bottom: 261px;
  z-index: 1;
`;
const Exit = styled.img`
  position: absolute;
  top: 73px;
  right: 25px;
  cursor: pointer;
`;
const BackgroundTree = styled.div<PointProps>`
  position: absolute;
  bottom: ${({ point }) => 270 + point / 10}px;
  width: 500px;
  height: 700px;
  background-image: url("/tree.svg");
  background-position-x: center;
  background-position-y: bottom;
  background-repeat: repeat-x;
  background-size: calc(${({ point }) => 350 - point / 2}%);
`;
const BlackGround = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
  cursor: pointer;
`;
const Desc = styled.div`
  position: absolute;
  bottom: 550px;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
`;
const BorderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/snowmanBorder.svg");
  background-size: cover;
  width: 240px;
  height: 240px;
  position: absolute;
  bottom: 275px;
`;
const ClickIcon = styled.img``;
const TouchText = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #fff;
  margin-top: 5px;
`;

const pointChange = debounce(
  (
    id: any,
    userName: any,
    section: any,
    point: number,
    prevPoint: number,
    setpostPoint: Function
  ) => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contributor: userName,
        snowman_id: id,
        section: section,
        amount: point - prevPoint,
      }),
    };
    fetch("/api/transaction", options)
      .then((res) => res.json())
      .then((data) => {
        setpostPoint(point);
      });
  },
  500
);

export default function Rolling() {
  const router = useRouter();
  const { id, userName, section } = router.query;
  const [point, setPoint] = useState(0);
  const [prevPoint, setPrevPoint] = useState(0);
  const [displayBlackGround, setDisplayBlackGround] = useState(true);

  const onClickSnowman = useCallback(() => {
    setPoint(point + 1);
  }, [point]);

  const exitButtonHandler = () => {
    router.push("/");
  };

  useEffect(() => {
    if (point === 0) return;
    pointChange(id, userName, section, point, prevPoint, setPrevPoint);
  }, [point]);

  return (
    <Section>
      {displayBlackGround && (
        <BlackGround
          onClick={() => {
            setDisplayBlackGround(false);
          }}
        >
          <Desc>눈덩이를 굴려주세요</Desc>
          <BorderBlock>
            <ClickIcon src="/clickIcon.svg" />
            <TouchText>Touch</TouchText>
          </BorderBlock>
        </BlackGround>
      )}

      <PointBlock>
        <Text>친구를 향한 나의 마음</Text>
        <Point>{point}</Point>
      </PointBlock>
      <GroundBlock>
        <Ground src="/ground.svg" />
        <Snowman
          src={section === "head" ? "/snowmanHead.svg" : "/snowmanBody.svg"}
          onClick={onClickSnowman}
          point={point * 36}
        />
        <SnowmanShadow src="/snowmanShadow.svg" />
        <BackgroundTree point={point} />
      </GroundBlock>
      <Exit src="/exitIcon.svg" onClick={exitButtonHandler} />
    </Section>
  );
}
