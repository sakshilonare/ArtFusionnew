import React from "react";
import "./Doodle.css";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import Home from './Home';
import { useLocation,Link} from "react-router-dom";
import TopNavBar from './TopNavBar';

export const Doodle = () => {
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

    <>
    <div
			className="side-nav-container-NX1"
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
    <div className="paintboard">
      <div className="doodle">
                  <svg width="100%" height="100%">
                  <defs>
                      <pattern
                      id="polka-dots"
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      patternUnits="userSpaceOnUse"
                      >
                      <circle fill="#be9ddf" cx="25" cy="25" r="3"></circle>
                      </pattern>
                  </defs>
                  <text x="52%" y="55%" textAnchor="middle">
                      Doodle
                  </text>
                  </svg>
              {/* <div className="text-wrapper">Doodle</div> */}
              <Link className="text-wrapper-2" to="/paintboard">
                Express yourself digitally !!
              </Link>
      </div>
    </div>
        </>
  );
};
