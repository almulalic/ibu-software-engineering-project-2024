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
		value: "electronics",
		label: "Electronics",
	},
	{
		key: 1,
		value: "Clothing and Apparel",
		label: "Clothing and Apparel",
	},
	{
		key: 2,
		value: "Home and Garden",
		label: "Home and Garden",
	},
	{
		key: 3,
		value: "Books and Literature",
		label: "Books and Literature",
	},
	{
		key: 4,
		value: "Sports and Outdoors",
		label: "Sports and Outdoors",
	},
	{
		key: 5,
		value: "Health and Beauty",
		label: "Health and Beauty",
	},
	{
		key: 6,
		value: "Toys and Games",
		label: "Toys and Games",
	},
	{
		key: 7,
		value: "Automotive",
		label: "Automotive",
	},
	{
		key: 8,
		value: "Food and Grocery",
		label: "Food and Grocery",
	},
	{
		key: 9,
		value: "Music and Instruments",
		label: "Music and Instruments",
	},
	{
		key: 10,
		value: "Movies and Entertainment",
		label: "Movies and Entertainment",
	},
	{
		key: 11,
		value: "Computers and Accessories",
		label: "Computers and Accessories",
	},
	{
		key: 12,
		value: "Jewelry and Accessories",
		label: "Jewelry and Accessories",
	},
	{
		key: 13,
		value: "Pet Supplies",
		label: "Pet Supplies",
	},
	{
		key: 14,
		value: "Travel and Adventure",
		label: "Travel and Adventure",
	},
	{
		key: 15,
		value: "Fitness and Wellness",
		label: "Fitness and Wellness",
	},
	{
		key: 16,
		value: "Art and Collectibles",
		label: "Art and Collectibles",
	},
	{
		key: 17,
		value: "Crafts and Hobbies",
		label: "Crafts and Hobbies",
	},
	{
		key: 18,
		value: "Baby and Kids",
		label: "Baby and Kids",
	},
	{
		key: 19,
		value: "Office and Stationery",
		label: "Office and Stationery",
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
					<span className="navbar-main-menu-logo" onClick={() => navigate("/")}></span>
				</div>

				<div className="navbar-account-actions">
					{userInfo ? (
						<LoggedInUserMenu />
					) : (
						<>
							<Button
								className="account-action account-action-signup"
								size="large"
								type="text"
								onClick={() => navigate("/signup")}
							>
								Sign Up
							</Button>
							<Button
								className="account-action account-action-login"
								size="large"
								type="text"
								onClick={() => navigate("/login")}
							>
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
						<div className="navbar-fixed">
							<span className="navbar-main-menu-events" onClick={() => navigate(`/events`)}>
								All Events
							</span>
							<span className="vertical-line"></span>
						</div>
						<div className="navbar-categories">
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
					</div>
				)}
				<hr className="navbar-hr" />
			</div>
		</header>
	);
}
