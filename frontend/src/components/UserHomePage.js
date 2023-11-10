import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import "./UserHomePage.css"
import Home from './Home';
import { useLocation,Link} from "react-router-dom";
import TopNavBar from './TopNavBar';
//import SideNavBar from './Header/SideNavBar';
// import SideNavBar from './SideNavBar'

function UserHomePage() { // Remove props from the function arguments
  const navigate = useNavigate();

  const token = !!localStorage.getItem('artToken');
  if(!token){
    navigate("/");
  }

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
    <div >
        {/* <SideNavBar /> */}
        <div >
          <TopNavBar  />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/tutorial" element={<Tutorials />} />
            <Route path="/serverTut" element={<ServerTutorials />} />
            <Route
              path="/dashboard"
              element={<Dashboard photos={photos} handleUploadSuccess={handleUploadSuccess} />}
            /> */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default UserHomePage;
