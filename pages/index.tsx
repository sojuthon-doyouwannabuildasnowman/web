import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import onBoardingImg from "../public/onboarding.png";
import { Container } from "../src/styles/Container";

const BoardingContainer = styled(Container)`
	justify-content: flex-end;
`;

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
const AppContentBox = styled.div`
	width: 300px;
	padding-bottom: 40px;
	border-bottom: 1px solid #537d93;
	text-align: center;
`;
const AppContentText = styled.span`
	font-size: 33px;
	color: #537d93;
`;
const AppContentSmallBox = styled.div`
	margin-top: 40px;
	text-align: center;
`;
const AppContentSmallText = styled.span`
	font-size: 16px;
	color: #537d93;
`;
const CreateButton = styled.div`
	width: 380px;
	margin-top: 100px;
	margin-bottom: 100px;
	a {
		display: block;
		text-align: center;
		width: 100%;
		height: 60px;
		border-radius: 4px;
		line-height: 60px;
		font-size: 16px;
		text-decoration: none;
		background-color: #537d93;
		color: white;
	}
`;
export default function OnBoarding() {
	return (
		<>
			<BoardingContainer>
				<ImageBox>
					<Image src={onBoardingImg} alt="snowman"></Image>
				</ImageBox>
				<AppContentBox>
					<AppContentText>
						Do you wanna
						<br />
						Build a Snowman?
					</AppContentText>
				</AppContentBox>
				<AppContentSmallBox>
					<AppContentSmallText>
						크리스마스가 다가오면
						<br />
						어릴적 친구들과 만들었던 눈사람이 생각나요
						<br />
						<br />
						다시 동심으로 돌아가 친구와 함께
						<br />
						눈사람을 만들어보는거 어떨까요?
					</AppContentSmallText>
				</AppContentSmallBox>
				<CreateButton>
					<Link href={"/home"}>눈사람을 만들어볼까요?</Link>
				</CreateButton>
			</BoardingContainer>
		</>
	);
}
