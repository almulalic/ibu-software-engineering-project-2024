import { Button } from "antd";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { LoggedInUserMenu } from "../../components/LoggedInUserMenu/LoggedInUserMenu";

import "./Navbar.scss";

const items = [
	{
		key: 0,
		label: "Electronics",
		value: "Electronics",
	},
	{
		key: 1,
		label: "Automotive",
		value: "Automotive",
	},
	{
		key: 2,
		label: "Travel And Adventure",
		value: "Traven And Adventure",
	},
];

export function Navbar() {
	const navigate = useNavigate();
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

	const { userInfo } = useSelector((state: RootState) => state.auth);

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
		<header className="navbar">
			<div className="navbar-account-header">
				<div className="navbar-main-menu">
					<span className="navbar-main-menu-logo" onClick={() => navigate("/")}>
						EVENTPORT
					</span>
					<span className="navbar-main-menu-events" onClick={() => navigate(`/events`)}>
						All Events
					</span>
				</div>

				<div className="navbar-account-actions">
					{userInfo ? (
						<LoggedInUserMenu />
					) : (
						<>
							<Button
								className="account-action account-action-signup"
								size="large"
								type="primary"
								onClick={() => navigate("/signup")}
							>
								Sign Up
							</Button>
							<Button className="account-action account-action-login" size="large" onClick={() => navigate("/login")}>
								Log In
							</Button>
						</>
					)}
				</div>
			</div>
			<div className="navbar-categories-header">
				<hr className="navbar-hr" />
				{viewportWidth < 576 ? (
					<div className="navbar-categories-menu">
						<span className="navbar-main-menu-item">
							<span className="navbar-categories-menu-item" onClick={() => navigate(`/events`)}>
								Events
							</span>
						</span>
					</div>
				) : (
					<div className="navbar-categories-menu">
						{items.map((x) => (
							<span
								key={x.key.toString()}
								className="navbar-categories-menu-item"
								onClick={() =>
									navigate({
										pathname: "/events",
										search: `?${createSearchParams({ categories: [x.value] })}`,
									})
								}
							>
								{x.label}
							</span>
						))}
					</div>
				)}
				<hr className="navbar-hr" />
			</div>
		</header>
	);
}
