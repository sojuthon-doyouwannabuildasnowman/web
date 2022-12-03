import styled from "@emotion/styled";

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

const CreateNameInput = styled.input`
	width: 100%;
	height: 40px;
	background-color: transparent;
	border: 0;
	border-bottom: 1px solid #537d93;
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
const CreateViewName = styled.span`
	margin-top: 10px;
	font-size: 12px;
	color: #ff9393;
	visibility: visible;
`;

export default function Modal() {
	return (
		<>
			<ModalContainer
				onClick={() => console.log("clicked")}
			></ModalContainer>
			<ModalBox>
				<ModalTitleText>
					친구의 눈사람 이름을 입력해주세요.
				</ModalTitleText>
				<CreateNameInput />
				<CreateViewName>이미 존재하는 이름이예요.</CreateViewName>
			</ModalBox>
		</>
	);
}
