import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Info() {
  const router = useRouter();
  const { id } = router.query;

  const [head, setHead] = useState<number>(0);
  const [body, setBody] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isModal2, setIsModal2] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");

  const targetDate = new Date("2022-12-25 00:00:00");

  const doCopy = (text: any) => {
    // 흐음 1.
    if (navigator.clipboard) {
      // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("클립보드에 복사되었습니다.");
        })
        .catch(() => {
          alert("복사를 다시 시도해주세요.");
        });
    } else {
      // 흐름 2.
      if (!document.queryCommandSupported("copy")) {
        return alert("복사하기가 지원되지 않는 브라우저입니다.");
      }

      // 흐름 3.
      const textarea: any = document.createElement("textarea");
      textarea.value = text;
      textarea.style.top = 0;
      textarea.style.left = 0;
      textarea.style.position = "fixed";

      // 흐름 4.
      document.body.appendChild(textarea);
      // focus() -> 사파리 브라우저 서포팅
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      // 흐름 5.
      document.execCommand("copy");
      // 흐름 6.
      document.body.removeChild(textarea);
      alert("클립보드에 복사되었습니다.");
    }
  };

  const getReturnValues = (countDown: number) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    console.log(days, hours, minutes);

    return [hours + days * 24, minutes, seconds];
  };

  const Countdown = (targetDate: Date): Number[] => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
      countDownDate - new Date().getTime()
    );

    useEffect(() => {
      setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);
    }, [countDownDate]);

    return getReturnValues(countDown);
  };
  const [hours, minutes, seconds] = Countdown(targetDate);

  useEffect(() => {
    if (id === undefined) return;
    fetch("/api/snowman/" + id)
      .then((res) => res.json())
      .then((data) => {
        setHead(data.data.head + 1);
        setBody(data.data.body + 1);
        setName(data.data.name);
      });
  }, [id]);

  return (
    <Container>
      {isModal && (
        <Modal>
          {isModal2 ? (
            <Box2>
              <Title>굴릴 눈덩이를 선택해주세요.</Title>
              <ButtonBox>
                <Head
                  onClick={() => {
                    router.push({
                      pathname: "/rolling/" + id,
                      query: { userName: userName, section: "head" },
                    });
                  }}
                >
                  머리
                </Head>
                <Body
                  onClick={() => {
                    router.push({
                      pathname: "/rolling/" + id,
                      query: { userName: userName, section: "body" },
                    });
                  }}
                >
                  몸통
                </Body>
              </ButtonBox>
              <Prev2
                onClick={() => {
                  setIsModal2(false);
                  setUserName("");
                }}
              >
                이전
              </Prev2>
            </Box2>
          ) : (
            <Box>
              <Askname>내 이름을 알려주세요.</Askname>
              <AskInput
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="이름 입력"
              />
              <AskButtonBox>
                <Prev
                  onClick={() => {
                    setIsModal(false);
                    setUserName("");
                  }}
                >
                  이전
                </Prev>
                {userName === "" ? (
                  <NextOff>다음</NextOff>
                ) : (
                  <Next
                    onClick={() => {
                      setIsModal2(true);
                    }}
                  >
                    다음
                  </Next>
                )}
              </AskButtonBox>
            </Box>
          )}
        </Modal>
      )}
      <H2>마음이 전해지기까지</H2>
      <Status>
        {hours ? (
          <Timer>{hours + " : " + minutes + " : " + seconds}</Timer>
        ) : (
          <>D-Day 18</>
        )}
        <Statistics></Statistics>
      </Status>
      <Name>
        {name}
        <Image
          style={{ position: "absolute", right: "20px" }}
          onClick={() =>
            doCopy("https://doyouwannabuildasnowman.vercel.app/info/" + id)
          }
          src="/share.svg"
          alt="share"
          width={20}
          height={20}
        />
      </Name>
      <SnowmanBlock>
        <SnowmanSection
          src="/snowmanHead.svg"
          size={(head / (head + body)) * 100}
        />
        <SnowmanSection
          src="/snowmanBody.svg"
          size={(body / (head + body)) * 100}
        />
      </SnowmanBlock>
      <Contribute
        onClick={() => {
          setIsModal(true);
        }}
      >
        {name} 굴리기
      </Contribute>
      <Create>
        <Link href={"/home"}>내 눈사람 만들기</Link>
      </Create>
    </Container>
  );
}

const Modal = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 380px;
  height: 240px;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px 25px;
`;

const Box2 = styled.div`
  width: 380px;
  height: 240px;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px 25px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #131313;
  margin-bottom: 47px;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 20px;
`;

const Head = styled.div`
  width: 100px;
  height: 40px;

  background: #537d93;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div`
  width: 100px;
  height: 40px;

  background: #537d93;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Askname = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #131313;
  margin-bottom: 50px;
`;

const AskInput = styled.input`
  all: unset;
  margin-bottom: 54px;
  width: 100%;
  border-bottom: 1px solid #537d93;
  height: 33px;
  text-align: center;
  color: #131313;
`;

const AskButtonBox = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #537d93;
  width: 100%;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Prev = styled.div``;

const Prev2 = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #537d93;
  margin-left: auto;
  margin-top: 50px;
`;
const NextOff = styled.div`
  opacity: 0.4;
`;

const Next = styled.div``;

const Container = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  position: relative;
`;

const H2 = styled.h2`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  margin-top: 100px;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  border-bottom: 1px solid #fff;
  font-weight: 600;
  font-size: 36px;
  line-height: 43px;
  padding-bottom: 8px;
`;

const Timer = styled.div``;

const Statistics = styled.div``;

const Name = styled.div`
  width: 380px;
  height: 60px;
  background: rgba(217, 217, 217, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  margin-top: 40px;
`;

const Contribute = styled.div`
  width: 380px;
  height: 60px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #537d93;
  background: #ffffff;
  border-radius: 4px;
`;

const Create = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  margin-top: 20px;
  a {
    all: unset;
  }
`;

const SnowmanBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 382px;
  margin-top: 65px;
`;

interface SnowmanSectionProps {
  size: number;
}

const SnowmanSection = styled.img<SnowmanSectionProps>`
  height: ${({ size }) => size}%;
  &:nth-of-type(2n) {
    margin-top: -3px;
  }
`;
