import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

function UniItem({ id, name, price, rating }) {
	return (
        <Col>
            <Card style={{ width: "18rem" }} className="m-1 shadow">
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">rating: {rating}</Card.Subtitle>
                    <Card.Text>Price: ${price}</Card.Text>
                    <Button variant="dark"><Link to={`detail/${id}`}>Se details</Link></Button>
                </Card.Body>
            </Card>
        </Col>
	);
}

UniItem.propTypes = {
	price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
};

export default UniItem;