import Grid from "./Grid";
import UploadForm from "./UploadForm";
import Button from "./Button";
import SideNavBar from "./Header/SideNavBar";
import "./Dashboard.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Home from './Home';
import { useLocation,Link} from "react-router-dom";
import TopNavBar from './TopNavBar';


const Dashboard = ({photos,handleUploadSuccess}) => {
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);

  // Function to toggle the visibility of the UploadForm
  const toggleFormVisibility = () => {
    setIsUploadFormVisible(!isUploadFormVisible);
  };

  const location = useLocation();
  const userDetails = location.state?.userDetails;
  
  console.log("Helo userDetails",userDetails);

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
			className="side-nav-container-NX2"
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
      <div className="dashbody">
      <Grid photos={photos} />
      {isUploadFormVisible && <UploadForm setUpdateUI={handleUploadSuccess} />}
      <Button onButtonClick={toggleFormVisibility} />
    </div>
    </>
    // </div>
  );
};

export default Dashboard;