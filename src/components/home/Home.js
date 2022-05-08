import Heading from "../layout/Heading";
import Container from "react-bootstrap/Container";
import UniList from "./UniList";
import Row from "react-bootstrap/Row";

export default function Home() {
    return (
        <Container className="wrapper my-3 m-auto">
            <Heading title="Home" />
            <Row className="align-items-center py-5 main__block mx-auto">
                <UniList/>
            </Row>
        </Container>
    );
}