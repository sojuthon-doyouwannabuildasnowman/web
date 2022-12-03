import styled from "@emotion/styled";
import Link from "next/link";
import { Container } from "../src/styles/Container";

const ImageBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;

	width: 400px;
	height: 400px;
	margin-bottom: 100px;
	background-color: #2d2d2d;
`;
const AppContentBox = styled.div`
	width: 400px;
`;
const AppContentText = styled.span``;
const CreateButton = styled.div`
	margin-top: 100px;
	a {
		padding: 15px;
		text-decoration: none;
		background-color: #2d2d2d;
		color: white;
	}
`;
export default function OnBoarding() {
	return (
		<>
			<Container>
				<AppContentBox>
					<AppContentText>
						앱에 대한 설명입니다. 앱에 대한 설명입니다. 앱에 대한
						설명입니다. 앱에 대한 설명입니다.
					</AppContentText>
				</AppContentBox>
				<CreateButton>
					<Link href={"/home"}>눈사람을 만들어볼까요?</Link>
				</CreateButton>
			</Container>
		</>
	);
}
