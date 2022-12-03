import { css } from "@emotion/react";

export const reset = css`
	* {
		box-sizing: border-box;
	}
	html,
	body {
		margin: 0;
		padding: 0;
	}
	html {
		background-color: #537d93;
	}
	body {
		max-width: 428px;
		height: 100vh;
		margin: 0 auto;
		overflow: hidden;
		font-family: Pretendard;
	}
`;
