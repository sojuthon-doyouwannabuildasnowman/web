import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import home_snow from "../public/home_snow.png";
import { Container } from "../src/styles/Container";

const ImageBox = styled.div`
	position: absolute;
	bottom: 0;
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
	a {
		color: white;
		text-decoration: none;
	}
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

export default function Main() {
	const [changeName, setChangeName] = useState("");
	const onChange = (e: any) => {
		setChangeName(e.target.value);
	};
	const nameValue = () => {
		console.log(changeName);
	};
	return (
		<>
			<Container>
				<ImageBox>
					<Image src={home_snow} alt="snowman"></Image>
				</ImageBox>
				<CreateTitleText>나의 눈사람 만들기</CreateTitleText>
				<CreateSnowBox>
					<CreateNameText>
						나의 눈사람 이름을 지어 볼까요?
					</CreateNameText>
					<CreateNameInput
						onChange={onChange}
						placeholder="이름 입력"
						value={changeName}
					/>
					<CreateViewName>이미 존재하는 이름이예요.</CreateViewName>
					<CreateButton onClick={nameValue}>
						눈사람 만들기
					</CreateButton>
				</CreateSnowBox>
				<BrText>OR</BrText>
				<ViewButton>
					<Link href={"/"}>눈사람 친구 보러가기</Link>
				</ViewButton>
			</Container>
		</>
	);
}
