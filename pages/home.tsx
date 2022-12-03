import styled from "@emotion/styled";
import Link from "next/link";
import { Container } from "../src/styles/Container";

const CreateTitleText = styled.h2`
	margin-bottom: 150px;
`;
const CreateSnowBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	margin-bottom: 150px;
`;
const CreateNameText = styled.label`
	margin-bottom: 5px;
	color: white;
`;
const CreateNameInput = styled.input`
	width: 100%;
	height: 40px;
`;
const CreateButton = styled.button`
	width: 100%;
	height: 40px;
	margin-top: 50px;
`;
const ViewButton = styled.div`
	padding: 20px;
	background-color: #2d2d2d;
	a {
		color: white;
		text-decoration: none;
	}
`;

export default function Main() {
	return (
		<Container>
			<CreateTitleText>만들기</CreateTitleText>
			<CreateSnowBox>
				<CreateNameText>나의 눈사람 이름을 지어 볼까요?</CreateNameText>
				<CreateNameInput />
				<CreateButton onClick={() => console.log("clicked")}>
					눈사람 생성
				</CreateButton>
			</CreateSnowBox>
			<ViewButton>
				<Link href={"/"}>눈사람 친구 보러가기</Link>
			</ViewButton>
		</Container>
	);
}
