import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideNavBar.css";

const SideNavBar = () => {
	const [isExpanded, setExpendState] = useState(false);
	const menuItems = [
		{
			text: "Home",
			icon: "icons/home.png",
			path: "/",
		},
		{
			text: "Doodle",
			icon: "icons/doodle.png",
			path: "/doodle",
		},
		{
			text: "Gallery",
			icon: "icons/gallery.png",
			path: "/dashboard",
		},
	];
	return (
		<div
			className="side-nav-container-NX"
		>
			<div className="nav-upper">
				<div className="nav-menu">
					{menuItems.map(({ text, icon,path }) => (
						<Link
							key={text}
							to={path}
						>
							<img className="menu-item" src={icon} alt="" srcset="" />
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default SideNavBar;