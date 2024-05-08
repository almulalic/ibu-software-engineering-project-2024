import { useNavigate } from "react-router-dom";
import { Role, UserInfo } from "../api/models/UserInfo";
import { useEffect } from "react";
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
	}, [userInfo, requiredRoles, history]);
};
