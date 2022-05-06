import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Contact from "../contact/Contact";
import Detail from "../detail/Detail";
import Login from "../login/Login";
import { AuthProvider } from "../../context/AuthContext";
import CreateNav from "./Nav";

function Layout() {
	return (
        <AuthProvider>
            <Router>
                    <CreateNav/>
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/detail/:id" exact element={<Detail />} />
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/contact" exact element={<Contact />} />
                    </Routes>
            </Router>
        </AuthProvider>
	);
}

export default Layout;