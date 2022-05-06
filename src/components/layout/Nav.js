import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function CreateNav() {
	const [auth, setAuth] = useContext(AuthContext);

	const navigate = useNavigate();

	function logout() {
		setAuth(null);
		navigate.push("/");
	}

	return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Js Frameworks CA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/" className="nav-link">
                        Home
                    </NavLink>
                    <NavLink to="/detail/:id" className="nav-link">
                        Detail
                    </NavLink>
                    <NavLink to="/contact" className="nav-link">
                        Contact
                    </NavLink>
                    {auth ? (
                        <>
                            <NavLink to="/admin" className="nav-link">Admin</NavLink><button onClick={logout} className="btn">Log out</button>
                        </>
                    ) : (
                        <NavLink to="/login" className="nav-link">Login</NavLink>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
	);
}

export default CreateNav;