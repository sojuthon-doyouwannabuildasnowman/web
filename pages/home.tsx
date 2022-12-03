import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import home_snow from "../public/home_snow.png";
import { Container } from "../src/styles/Container";

const ImageBox = styled.div`
  position: absolute;
  bottom: 00px;
  left: 0;
  z-index: -1;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;
const CreateTitleText = styled.h2`
  font-weight: 500;
  color: #537d93;
`;
const CreateSnowBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 380px;
  padding: 46px 22px 32px;
  border-radius: 10px;
  background-color: #537d93;
`;
const CreateNameText = styled.label`
  margin-bottom: 20px;
  color: white;
`;
const CreateNameInput = styled.input`
  width: 100%;
  height: 40px;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid white;
  text-align: center;
  color: white;

  .active {
    /* border-bottom: 1px solid #FF9393; */
  }

  &::placeholder {
    color: white;
    opacity: 0.4;
  }

  &:focus {
    outline: none;
  }
`;
const CreateButton = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid #537d93;
  border-radius: 4px;
  margin-top: 20px;
  background-color: white;
  color: #537d93;
`;
const ViewButton = styled.div`
  width: 380px;
  height: 60px;
  line-height: 60px;
  border-radius: 4px;
  text-align: center;
  background-color: #537d93;
  color: white;
`;
const CreateViewName = styled.span`
  margin-top: 10px;
  font-size: 12px;
  color: #ff9393;
  visibility: visible;
`;
const BrText = styled.p`
  margin: 40px 0;
  color: #537d93;
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  background-color: #000000;
  opacity: 0.6;
  z-index: 999;
`;
const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 380px;
  height: 240px;
  padding: 30px;
  border-radius: 10px;
  background-color: white;
  text-align: center;
  font-weight: 500;
  z-index: 9999;
`;
const ModalTitleText = styled.span`
  width: 100%;
`;

const FriendNameInput = styled.input`
  width: 100%;
  height: 40px;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid #537d93;
  text-align: center;
  color: #537d93;
  margin-top: 50px;

  .active {
    /* border-bottom: 1px solid #FF9393; */
  }

  &::placeholder {
    color: #537d93;
    opacity: 0.4;
  }

  &:focus {
    outline: none;
  }
`;
const SelectBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 30px;
`;
const SelectButton = styled.button`
  border: transparent;
  background-color: transparent;
  font-size: 16px;
  color: #537d93;

  &.disabled {
    opacity: 0.4;
  }
`;

export default function Main() {
  const router = useRouter();
  const [changeName, setChangeName] = useState("");
  const [changeFriend, setChangeFriend] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [errText, setErrText] = useState(false);
  const [errText2, setErrText2] = useState(false);
  const onChange = (e: any) => {
    setErrText(false);
    setChangeName(e.target.value);
  };
  const onChangeFriend = (e: any) => {
    setErrText2(false);
    setChangeFriend(e.target.value);
  };

  const checkName = () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: changeName,
      }),
    };
    fetch("/api/snowman/validation", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        if (data.data === 0) {
          nameValue();
        } else {
          setErrText(true);
        }
      });
  };
  const checkName2 = () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: changeFriend,
      }),
    };
    fetch("/api/snowman/validation", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        if (data.data !== 0) {
          router.push("/info/" + data.data);
        } else {
          setErrText2(true);
        }
      });
  };

  const nameValue = () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: changeName,
      }),
    };
    fetch("/api/snowman", options)
      .then((res) => res.json())
      .then((data) => {
        router.push("/info/" + data.data);
      });
  };

  const clickIsModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      {isModal && (
        <>
          <ModalContainer onClick={clickIsModal}></ModalContainer>
          <ModalBox>
            <ModalTitleText>친구의 눈사람 이름을 입력해주세요.</ModalTitleText>
            <FriendNameInput
              onChange={onChangeFriend}
              placeholder="이름 입력"
              value={changeFriend}
            />
            {errText2 && (
              <CreateViewName>입력한 이름의 눈사람이 없어요.</CreateViewName>
            )}
            <SelectBtnBox>
              <SelectButton onClick={clickIsModal}>이전</SelectButton>
              <SelectButton
                onClick={checkName2}
                className={!changeFriend ? "disabled" : ""}
              >
                다음
              </SelectButton>
            </SelectBtnBox>
          </ModalBox>
        </>
      )}
      <Container>
        <ImageBox>
          <Image src={home_snow} alt="snowman"></Image>
        </ImageBox>
        <CreateTitleText>나의 눈사람 만들기</CreateTitleText>
        <CreateSnowBox>
          <CreateNameText>나의 눈사람 이름을 지어 볼까요?</CreateNameText>
          <CreateNameInput
            onChange={onChange}
            placeholder="이름 입력"
            value={changeName}
          />
          {errText && (
            <CreateViewName>이미 존재하는 이름이예요.</CreateViewName>
          )}
          <CreateButton onClick={checkName}>눈사람 만들기</CreateButton>
        </CreateSnowBox>
        <BrText>OR</BrText>
        <ViewButton onClick={clickIsModal}>눈사람 친구 보러가기</ViewButton>
      </Container>
    </>
  );
}
