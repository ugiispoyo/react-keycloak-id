import * as React from "react";
import {
	createContext,
	useEffect,
	useState,
	useCallback,
	useContext
} from "react";
import Keycloak from "keycloak-js";
import type T_Keycloack from "keycloak-js";
import type { KeycloakInitOptions } from 'keycloak-js'

export interface I_UseReactKeycloakId extends T_Keycloack {

	/** Countdown time if used onCountdown of token or refresh token */
	countDown: {
		remains: number;
		minutes: number;
		seconds: number;
	};

	/** onCountdown if you want to using countdown time of token or refresh token
	 *
	 * @example
	 const { onCountDown } = useReactKeycloackId();
			useEffect(() => {
				const interval = setInterval(() => onCountDown("refresh-token"), 1000);
				return () => clearInterval(interval);
		}, []);
	 *
	 */
	onCountDown: (from?: "token" | "refresh-token") => void;

	/**
	 * This function is used to refresh the token when the token has run out which can be used for other functions that require tokens. by using this function you no longer need to manually create a refresh token. you just put functions that require a token into the arguments of this function. there are two arguments inside this function.
		1. Callback function `[cb]: any[]`, which can be used to put your function and can be multiple functions.
		2. Options Object `{onError?: (err: boolean) => void; minValidity?: number | 5}`. this is optional.
	 *
	 * @example
	 * 
		const { keycloakOnClick } = useReactKeycloackId()

		const testClick1 = () => {
			console.log("1")
		}
		const testClick2 = () => {
			console.log("2")
		}

		const onErrorRefreshToken = (err: boolean) => {
			if(err) {
				dataKeycloak.logout()
			}
		}

		function onErrorRefreshToken(err: boolean) {
			if(err) {
					console.log("Token was expired ", err)
					// dataKeycloak.logout()
			}
		}

		const options = {
			onError: onErrorRefreshToken
			minValidity: 150
		}

		return (
			<button onClick={() => keycloakOnClick([testClick1, testClick2], options)}>Click Me For Refresh Token (If expired)</button>
		)
	 * 
	 */
	keycloakOnClick: ([...cb]: any[], options?: optionKeycloakOnClick) => Promise<void>;
}

export type optionKeycloakOnClick = {
	onError?: (err: boolean) => void;
	minValidity?: number | 5
}

export interface I_InitKeycloak {
	init: {
		url: string;
		realm: string;
		clientId: string;
	}
}

export interface TReactKeycloackProvider extends I_InitKeycloak {
	children: JSX.Element;
	loadingComponent?: JSX.Element | string;
	errorComponent?: JSX.Element | string;
	initOptions?: KeycloakInitOptions
}

const ReactKeycloackCTX = createContext<T_Keycloack | null>(null);

export const useReactKeycloackId = (): I_UseReactKeycloakId => {

	const dataKeycloak = useContext(ReactKeycloackCTX)
	const [countDown, setCountDown] = useState<{
		remains: number;
		minutes: number;
		seconds: number
	}>({
		remains: 0,
		minutes: 0,
		seconds: 0,
	});

	const onCountDown = (from: "token" | "refresh-token" = "refresh-token") => {
		const d = new Date();
		const expFrom = from === "token" ? dataKeycloak?.idTokenParsed?.exp : dataKeycloak?.refreshTokenParsed?.exp
		const $remains = Math.floor(expFrom - d.getTime() / 1000);
		const $remainsMM = Math.floor($remains / 60);
		const $remainsMS = $remains - 60 * $remainsMM;

		if ($remains > 1 || $remainsMM > 1) {
			setCountDown({
				remains: $remains,
				minutes: $remainsMM,
				seconds: parseInt(s($remainsMS))
			})
		} else {
			setCountDown({
				remains: 0,
				minutes: 0,
				seconds: 0
			})
		}
	}

	function s(val: number): string {
		if (val < 10) {
			return "0" + val;
		} else {
			return val.toString();
		}
	}

	async function keycloakOnClick([...cb]: any[], options?: optionKeycloakOnClick) {
		const isExpired = dataKeycloak.isTokenExpired();
		if (isExpired) {
			dataKeycloak.updateToken(options?.minValidity || 5).then((success) => {
				if (success) {
					cb.forEach(s => s.apply())
				}
			}).catch((e) => {
				console.error("Error refresh token ", e)
				if (typeof options?.onError !== 'undefined') {
					options?.onError(e)
				}
			})
		} else {
			cb.forEach(s => s.apply())
		}
	}

	const allData = {
		...dataKeycloak,
		onCountDown,
		countDown,
		keycloakOnClick,
	} as I_UseReactKeycloakId

	return allData
}

export const ReactKeycloackIdProvider = ({
	init,
	children,
	loadingComponent,
	errorComponent,
	initOptions
}: TReactKeycloackProvider) => {

	const [dataKeycloak, setDataKeycloak] = useState<T_Keycloack | null>(null);
	const [isError, setIsError] = useState<boolean>(false);
	const keycloakInitOptions: KeycloakInitOptions = {
		onLoad: "login-required",
		checkLoginIframe: false,
		...initOptions
	}

	const initKey = useCallback(() => {
		const initKeycloak = new Keycloak(init);
		initKeycloak
			.init(keycloakInitOptions)
			.then((authenticated) => {
				if (authenticated) {
					setDataKeycloak(initKeycloak);
				}
				setDataKeycloak(initKeycloak);
			})
			.catch((e) => {
				console.error("Error init keycloak: ", e);
				setIsError(true);
			});
	}, []);

	useEffect(() => {
		initKey();
	}, [initKey]);

	return (
		<>
			{isError ? (
				<>
					{
						errorComponent ?
							errorComponent
							: "Something went error!"
					}
				</>
			) : dataKeycloak ? (
				<ReactKeycloackCTX.Provider value={dataKeycloak}>
					{children}
				</ReactKeycloackCTX.Provider>
			) : (
				<>
					{
						loadingComponent ?
							loadingComponent
							: "Loading..."
					}
				</>
			)}
		</>
	);
};