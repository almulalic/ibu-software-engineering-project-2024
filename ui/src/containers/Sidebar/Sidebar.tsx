import { Role } from "../../api/models";
import { Drawer, Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { set_drawer_open } from "../../store/appSlice";
import { AuditOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";

import "./Sidebar.scss";
import SubMenu from "antd/es/menu/SubMenu";
import { useState } from "react";
import MenuItem from "antd/es/menu/MenuItem";
import { set_create_modal_visible } from "../../store/eventPageSlice";

type MenuItem = Required<MenuProps>["items"][number];

export function Sidebar() {
	const { userInfo, isLoggedIn } = useSelector((state: RootState) => state.auth);
	const { isDrawerOpen } = useSelector((state: RootState) => state.app);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const onSidebarClose = () => {
		dispatch(set_drawer_open(false));
	};

	const onMenuItemClick = (e: any) => {
		let path = null;

		switch (e.key) {
			case "EVENT_PAGE_ALL":
				path = "/events";
				break;
			case "EVENT_PAGE_ATTENDING":
				path = "/me/events?selectedViewType=Attending+Events";
				break;
			case "EVENT_PAGE_LIKED":
				path = "/me/events?selectedViewType=Liked+Events";
				break;
			case "EVENT_ACTION_CREATE":
				path = "/events?create=true";
				break;
			case "EVENT_ACTION_EDIT":
				path = "/me/events?selectedViewType=Organized+Events&mode=edit";
				break;
			case "EVENT_ACTION_DELETE":
				path = "/me/events?selectedViewType=Organized+Events&mode=delete";
				break;
			case "ADMIN_ACTION_DASHBOARD":
				path = "/admin";
				break;
			case "USER_ACTION_LOGOUT":
				dispatch(logout());
				break;
		}

		if (path) {
			navigate(path);
			if (window.location.pathname.replace(/\?.*/, "") === path.replace(/\?.*/, "")) {
				window.location.reload();
			}
		}
	};

	return (
		<Drawer
			id="sidebar"
			className="sidebar"
			placement="right"
			closable={true}
			onClose={onSidebarClose}
			open={isDrawerOpen}
		>
			<Menu
				className="sidebar-menu"
				onClick={onMenuItemClick}
				defaultOpenKeys={["EVENT", "ADMIN", "USER"]}
				mode="inline"
			>
				<Menu.Item key="header" className="sidebar-menu-header">
					<div className="sidebar-menu-header-display-name">{userInfo?.displayName}</div>
					<div className="sidebar-menu-header-email">{userInfo?.email}</div>
				</Menu.Item>

				{isLoggedIn && (
					<SubMenu key="EVENT" icon={<CalendarOutlined />} title="Events">
						<Menu.Item key="EVENT_PAGE_ALL">All Events</Menu.Item>

						<Menu.ItemGroup key="EVENT_PAGE" title="Event Actions">
							<Menu.Item key="EVENT_PAGE_ATTENDING">Attending</Menu.Item>
							<Menu.Item key="EVENT_PAGE_LIKED">Liked</Menu.Item>
						</Menu.ItemGroup>
						{userInfo?.assignedRoles.includes(Role.ORGANIZER) && (
							<Menu.ItemGroup key="EVENTS_ACTION" title="Event Actions">
								<Menu.Item key="EVENT_ACTION_CREATE">Create</Menu.Item>
								<Menu.Item key="EVENT_ACTION_EDIT">Edit</Menu.Item>
								<Menu.Item key="EVENT_ACTION_DELETE">Delete</Menu.Item>
							</Menu.ItemGroup>
						)}
					</SubMenu>
				)}

				{isLoggedIn && userInfo?.assignedRoles.includes(Role.ADMIN) && (
					<SubMenu key="ADMIN" icon={<AuditOutlined />} title="Admin">
						<Menu.Item key="ADMIN_ACTION_DASHBOARD">Manage Organizers</Menu.Item>
					</SubMenu>
				)}

				{isLoggedIn && (
					<SubMenu key="USER" icon={<UserOutlined />} title="User">
						<Menu.Item key="USER_ACTION_EDIT">Edit Profile</Menu.Item>
						<Menu.Item key="USER_ACTION_LOGOUT">Log Out</Menu.Item>
					</SubMenu>
				)}
			</Menu>
		</Drawer>
	);
}
