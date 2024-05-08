export const BASE_AUTH_URL = process.env.REACT_APP_BASE_AUTH_URL;
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
export const ACCESS_TOKEN_NAME = "accessToken";
export const REFRESH_TOKEN_NAME = "refreshToken";

export const widthThresholds = [
	{
		name: "xxl",
		width: 1920,
		maxCards: 10,
	},
	{
		name: "xl",
		width: 1600,
		maxCards: 4,
	},
	{
		name: "lg",
		width: 1200,
		maxCards: 4,
	},
	{
		name: "md",
		width: 992,
		maxCards: 3,
	},
	{
		name: "sm",
		width: 768,
		maxCards: 2,
	},
	{
		name: "xs",
		width: 576,
		maxCards: 1,
	},
];
