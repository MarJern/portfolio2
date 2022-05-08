import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, number } from "yup";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { DEFAULT_VALUES} from "../../constants/reg"
import FormError from "./FormError"

let userSchema = yup.object().shape({
	firstName: yup.string().required("Please enter your first name").min(3, "Your first name must be minimum 3 characters"),
	lastName: yup.string().required("Please enter your last name").min(4, "Your last name must be minimum 4 characters"),
	email: yup.string().required("Please enter your email address").email("Please enter a valid email address"),
	select: yup.string().required("Please choose subject").email("Please choose subject"),
	message: yup.string().required("Please enter your message").min(10, "The message must be at least 10 characters") ,
});

function ContactForm() {
	const [submitted, setSubmitted] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(userSchema),
	});

	function onSubmit(data) {
		console.log(data);
		setSubmitted(true);
		reset(DEFAULT_VALUES);
	}

	console.log(errors);

	return (
		<Container className="p-0">
			{submitted && <Alert variant="success">Success</Alert>}
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group>
					<Col sm={8} md={6} className="p-0">
						<Form.Control type="text" placeholder="First Name" {...register("firstName")} className="my-2" />
						{errors.firstName && <FormError>{errors.firstName.message}</FormError>}
					</Col>
					<Col sm={8} md={6} className="p-0">
						<Form.Control type="text" placeholder="Last Name" {...register("lastName")} className="my-2" />
						{errors.lastName && <FormError>{errors.lastName.message}</FormError>}
					</Col>
					<Col sm={8} md={6} className="p-0">
						<Form.Control type="text" placeholder="Email" {...register("email")} className="my-2" />
						{errors.email && <FormError>{errors.email.message}</FormError>}
					</Col>
					<Col sm={8} md={6} className="p-0">
						<Form.Select aria-label="Default select example" {...register("select")}>
							<option>Subject</option>
							<option value="love">Send Love</option>
							<option value="hate">Send hate</option>
						</Form.Select>
						{errors.select && <FormError>{errors.select.message}</FormError>}
					</Col>
					<Col sm={8} md={6} className="p-0">
						<Form.Control as ="textarea" type="text" placeholder="Write your message" {...register("message")} className="my-2 message" />
						{errors.message && <FormError>{errors.message.message}</FormError>}
					</Col>
					<Button variant="primary" type="submit">
						Send
					</Button>
				</Form.Group>
			</Form>
		</Container>
	);
}

export default ContactForm;