import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { travleContext } from "../../App";

const Header = () => {
  const [, logInUser] = useContext(travleContext);
  const { displayName, email, photoURL } = logInUser;

  return (
    <Navbar className="HeaderNav  d-fixed" collapseOnSelect expand="lg"  variant="dark">
      <Link className="Nab-brand" to="/home">
       BD Riders
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mx-auto">
          <Link className="navIteamCustomDesign" to="/home">
            Home
          </Link>
          <Link className="navIteamCustomDesign" to="/destination">
            Destination
          </Link>
          <Link className="navIteamCustomDesign" to="/blog">
            Blog
          </Link>
          <Link className="navIteamCustomDesign" to="/contract">
            Contract
          </Link>
        </Nav>
        <Nav className="mr-5">
          <div className="headerUserInfo">
            {photoURL && <img className="headerLogoImage" src={photoURL} alt="" srcset="" />}         
           
            {displayName && <span>{displayName}</span>}
          </div>
          {email && (
            <Link className="navIteamCustomDesign" eventKey={2} to="/logout">
              <FontAwesomeIcon className="icon-color" icon={faSignOutAlt} />
              &nbsp;&nbsp;Log Out
            </Link>
          )}
          {!email && (
            <Link className="navIteamCustomDesign" eventKey={2} to="/login">
              <FontAwesomeIcon className="icon-color" icon={faSignInAlt} />
              &nbsp;&nbsp;Log In
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
