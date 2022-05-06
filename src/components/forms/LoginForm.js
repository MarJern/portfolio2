import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "./FormError";
import { LOGIN_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext"

const url = LOGIN_URL + TOKEN_PATH;

const schema = yup.object().shape({
	username: yup.string().required("Please enter your username").min(2, "Your username must contain minimum 2 characters"),
	password: yup.string().required("Please enter your password").min(6, "Your password must contain minimum 6 characters"),
});

export default function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const navigate = useNavigate();

	const { register, 
		handleSubmit, 
		formState: { errors },
	}= useForm({
		resolver: yupResolver(schema),
	});

	const [, setAuth] = useContext(AuthContext);

	async function onSubmit(data) {
		setSubmitting(true);
		setLoginError(null);

		// console.log(data);

		try {
			const response = await axios.post(url, data);
			console.log("response", response.data);
			setAuth(response.data);
			navigate.push("/admin");
		} catch (error) {
			console.log("error", error);
			setLoginError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {loginError && <FormError>{loginError}</FormError>}
                    <Form.Group>
                    <fieldset disabled={submitting}>
                        <Col sm={4} md={6} className="p-0">
                            <Form.Control placeholder="Username" {...register('username')} className="my-2" />
                            {errors.username && <FormError>{errors.username.message}</FormError>}
                        </Col>

                        <Col sm={4} md={6} className="p-0">
                            <Form.Control placeholder="Password" {...register('password')} type="password" className="my-2" />
                            {errors.password && <FormError>{errors.password.message}</FormError>}
                        </Col>
                        <Button>{submitting ? "Logging in..." : "Login"}</Button>
                    </fieldset>
                    </Form.Group>
                </Form>
            </Container>
	);
}