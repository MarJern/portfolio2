import Heading from "../layout/Heading";
import ContactForm from "../forms/ContactForm";
import Container from "react-bootstrap/Container";

export default function Contact() {
    return (
        <Container className="wrapper">
            <Heading title="Contact Us" />
            <ContactForm />
        </Container>
    );
}