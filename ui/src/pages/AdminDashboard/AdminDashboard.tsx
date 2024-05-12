import { useState } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useAuthCheck } from "../../utils";
import Page from "../../containers/Page/Page";
import { Role } from "../../api/models/UserInfo";
import { useNavigate } from "react-router-dom";
import { AuthAPIService } from "../../api/services";
import { AutoComplete, Card, Checkbox, Col, Row, Segmented, message } from "antd";

import "./AdminDashboard.scss";

interface EditableUser {
	id: string;
	assignedRoles: Role[];
	email: string;
	displayName: string;
	creationDate: string;
	firstName: string;
	lastName: string;
}
export function AdminDashboard() {
	const { userInfo } = useSelector((state: RootState) => state.auth);

	useAuthCheck([Role.ADMIN]);

	const [usersSearchList, setUsersSearchList] = useState();
	const [usersList, setUsersList] = useState([]);
	const [selectedUser, setSelectedUser] = useState({
		id: "",
		assignedRoles: [],
		email: "",
		displayName: "",
		creationDate: "",
		firstName: "",
		lastName: "",
	} as EditableUser);

	const [messageApi, contextHolder] = message.useMessage();
	const [checkboxState, setCheckboxState] = useState(
		Object.values(Role).map((role) => (selectedUser!.assignedRoles.includes(role) ? role : ""))
	);

	const adminOptions = ["Manage Roles", { label: "Manage Users", value: "Manage Users", disabled: true }];

	async function getSuggestedUsers(search: string) {
		const response = await AuthAPIService.getUsers(search);

		if (response.status === 200) {
			if (response.data.length > 0) {
				setUsersList(response.data);
				setUsersSearchList(response.data.map((x: any) => ({ value: `${x.email} (${x.displayName})` })));
			}
		} else {
			messageApi.error(response.data.message || response.data);
		}
	}

	const onTypeChange = async (type: any) => {};

	const onSearchChange = async (text: string) => {
		getSuggestedUsers(text);
	};

	const onUserSelect = (text: string) => {
		const user = usersList.find((x: any) => x.email === text.replace(/ *\(.*\) */, ""));

		if (user) {
			setSelectedUser(user);
			setCheckboxState(Object.values(Role).map((role) => ((user as any).assignedRoles.includes(role) ? role : "")));
		}
	};

	const onCheckboxClick = async (roles: any) => {
		const response = await AuthAPIService.changeRoles(selectedUser.id, roles);

		if (response.status === 200) {
			setCheckboxState(Object.values(Role).map((role) => (roles.includes(role) ? role : "")));
			messageApi.success("Successfully edited role!");
		} else {
			messageApi.error(response.data.message || response.data);
		}
	};

	return (
		<Page id="admin-dashboard">
			<div className="admin-dashboard-content">
				<div className="admin-dashboard-event-type-picker">
					<Segmented options={adminOptions} block onChange={onTypeChange} />
				</div>

				<div className="admin-dashboard-search-container">
					<AutoComplete
						options={usersSearchList}
						onSelect={onUserSelect}
						onSearch={onSearchChange}
						placeholder="Find user by email, display, first or last name..."
						size="large"
						className="admin-dashboard-search"
						allowClear
					/>
				</div>

				<div className="admin-dashboard-selected-user">
					{selectedUser !== null && (
						<Card title="User Information" className="admin-dashboard-selected-user-card">
							<div className="admin-dashboard-selected-user-card-items">
								<div className="admin-dashboard-selected-user-card-item">
									<span className="admin-dashboard-selected-user-card-label">Email: </span>
									{selectedUser!.email || "-"}
								</div>
								<div className="admin-dashboard-selected-user-card-item">
									<span className="admin-dashboard-selected-user-card-label">Display Name: </span>
									{selectedUser!.displayName || "-"}
								</div>
								<div className="admin-dashboard-selected-user-card-item">
									<span className="admin-dashboard-selected-user-card-label">Full Name: </span>
									{selectedUser!.firstName ? `${selectedUser!.firstName} ${selectedUser!.lastName}` : "-"}
								</div>
								<div className="admin-dashboard-selected-user-card-item">
									<span className="admin-dashboard-selected-user-card-label">Created Date: </span>
									{selectedUser!.creationDate || "-"}
								</div>
								<div className="admin-dashboard-selected-user-roles">
									<span className="admin-dashboard-selected-user-roles-label">User Roles:</span>
									<Checkbox.Group
										options={Object.values(Role)}
										value={checkboxState}
										disabled={selectedUser.email === ""}
										onChange={onCheckboxClick}
									/>
								</div>
							</div>
						</Card>
					)}
				</div>

				{contextHolder}
			</div>
		</Page>
	);
}
