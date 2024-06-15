import { Login } from "../pages";
import { ReactElement } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { Role } from "../api/models/UserInfo";

interface ICustomRouteProps {
	permissions: Role[];
	title: string;
	children: ReactElement;
}

export default function AuthorizedRoute({ permissions, title, children }: ICustomRouteProps) {
	const { userInfo } = useSelector((state: RootState) => state.auth);

	if (permissions.length !== 0) {
		if (userInfo) {
			if (userInfo.assignedRoles.every((x) => !permissions.includes(x))) {
				return <Login />;
			}
		} else {
			return <Login />;
		}
	}

	document.title = `EventPort | ${title}`;

	return children;
}
