import Heading from "../layout/Heading";
import LoginForm from "../forms/LoginForm"
import Container from "react-bootstrap/Container";

export default function Login() {
    return (
        <Container className="wrapper">
            <Heading title="Login Page" />
            <LoginForm />
        </Container>
    );
}