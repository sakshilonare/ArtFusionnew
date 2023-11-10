import React from 'react'
import "./Header.css"
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import SideNavBar from './SideNavBar'
import { NavLink, useLocation} from 'react-router-dom'
//import "./Header.css"


const Header = () => {
  const location = useLocation();
  const isTutorialPage = location.pathname === '/tutorial';
  const isServerTutPage = location.pathname === '/serverTut';
  
  return (
    <header className={isTutorialPage || isServerTutPage ? 'tutorial-header' : 'default-header'}>
      <Navbar className='navbar1'>
        {/* <SideNavBar></SideNavBar> */}
        <Navbar.Brand href="/">ArtFusion</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='ml-auto'>
          <Nav.Link><NavLink to="/">Home</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/about">About</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/tutorial">Tutorials</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/serverTut">Tutorials 2</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/login">Login</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/register"><Button variant="light">Signup</Button></NavLink></Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </header>
    

  )
}
// export default Header
// function Header() {
//   return (
//     <div className="container-fluid h-100">
//       <div className="row h-100">
//         {/* <div className="col-2" id="green">
//           <h4>Sidebar</h4>
//           <a href="#">Link 1</a><br />
//           <br />
//           <a href="#">Link 2</a><br />
//           <br />
//           <a href="#">Link 3</a><br />
//           <br />
//           <a href="#">Link 4</a><br />
//           <br />
//         </div> */}
//         <SideNavBar/>
//         <div className="col-10" style={{ padding: 0 }}>
//           <nav className="navbar navbar-expand-lg navbar-light bg-primary">
//             <a className="navbar-brand" href="#">Navbar</a>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//               <div className="navbar-nav">
//                 <a className="nav-item nav-link active" href="#">Home</a>
//                 <a className="nav-item nav-link" href="#">Features</a>
//                 <a className="nav-item nav-link" href="#">Price</a>
//                 <a className="nav-item nav-link" href="#">About</a>
//               </div>
//             </div>
//           </nav>
//           <p style={{ padding: "15px", textAlign: "justify" }}>
//             Bootstrap is a free and open-source
//             tool collection for creating responsive
//             websites and web applications.
//             It is the most popular HTML, CSS, and
//             JavaScript framework for developing
//             responsive, mobile-first web sites.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

export default Header;
