import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { set_create_modal_visible } from "../../store/eventPageSlice";
import { set_drawer_open } from "../../store/appSlice";
import { Role } from "../../api/models/UserInfo";
import { useEffect, useState } from "react";

import "./LoggedInUserMenu.scss";

export const LoggedInUserMenu = () => {
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
	const { isLoggedIn, userInfo } = useSelector((state: RootState) => state.auth);

	const dispatch = useDispatch<AppDispatch>();
	const location = useLocation();
	const navigate = useNavigate();

	const myEventsItems: MenuProps["items"] = [
		{
			label: <a href="/me/events">My Events</a>,
			key: "0",
		},
		{
			type: "divider",
		},
		...(isLoggedIn && userInfo?.assignedRoles.includes(Role.ORGANIZER)
			? [
					{
						label: <a href="/me/events?selectedViewType=Organized+Events&mode=edit">Edit Event</a>,
						key: "2",
					},
					{
						label: <a href="/me/events?selectedViewType=Organized+Events&mode=delete">Delete Event</a>,
						key: "3",
					},
			  ]
			: []),
	];

	const handleCreateEvent = () => {
		if (location.pathname !== "/events") {
			navigate("/events");
		}

		dispatch(set_create_modal_visible(true));
	};

	useEffect(() => {
		const handleResize = () => {
			const newViewportWidth = window.innerWidth;
			setViewportWidth(newViewportWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div id="logged-in-user-menu">
			{viewportWidth >= 992 ? (
				<>
					<Dropdown className="logged-in-user-action-dropdown" menu={{ items: myEventsItems }}>
						<a onClick={(e) => e.preventDefault()}>
							<Space>
								<span className="logged-in-user-action-text">My Events</span>
								<DownOutlined />
							</Space>
						</a>
					</Dropdown>

					{isLoggedIn && userInfo?.assignedRoles.includes(Role.ORGANIZER) && (
						<Button className="account-action account-action-login" size="large" onClick={() => handleCreateEvent()}>
							Create Event
						</Button>
					)}

					<div className="logged-in-user-menu-compact">
						<MenuOutlined onClick={(e) => dispatch(set_drawer_open(true))} />
					</div>
				</>
			) : (
				<div className="logged-in-user-menu-compact">
					<MenuOutlined onClick={(e) => dispatch(set_drawer_open(true))} />
				</div>
			)}
		</div>
	);
};
