import { useNavigate } from "react-router-dom";
import { Role, UserInfo } from "../api/models/UserInfo";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useMaxCards = (containerRef: React.RefObject<HTMLDivElement>, cardWidth: number): number => {
	const getSize = (ref: React.RefObject<HTMLDivElement>): any | null => {
		const element = ref.current;
		return element ? { width: element.offsetWidth, height: element.offsetHeight } : null;
	};

	const containerSize = getSize(containerRef);

	if (cardWidth && containerSize) {
		return Math.floor(containerSize.width / cardWidth);
	}

	return 0;
};

export const useAuthCheck = (requiredRoles: Role[]) => {
	const navigate = useNavigate();
	const { userInfo } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
			return;
		}

		if (requiredRoles.length > 0) {
			const hasRequiredRole = requiredRoles.some((role) => userInfo.assignedRoles.includes(role));

			if (!hasRequiredRole) {
				navigate("/");
			}
		}
	}, [userInfo, requiredRoles]);
};

export const usePrevious = (value: any, initialValue: any) => {
	const ref = useRef(initialValue);
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};

export const useEffectDebugger = (effectHook: any, dependencies: any, dependencyNames = []) => {
	const previousDeps = usePrevious(dependencies, []);

	const changedDeps = dependencies.reduce((accum: any, dependency: any, index: any) => {
		if (dependency !== previousDeps[index]) {
			const keyName = dependencyNames[index] || index;
			return {
				...accum,
				[keyName]: {
					before: previousDeps[index],
					after: dependency,
				},
			};
		}

		return accum;
	}, {});

	if (Object.keys(changedDeps).length) {
		console.log("[use-effect-debugger] ", changedDeps);
	}

	useEffect(effectHook, dependencies);
};
