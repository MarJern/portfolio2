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
console.log(url);

const schema = yup.object().shape({
	username: yup.string().required("Please enter your username").min(2, "Your username must contain minimum 2 characters"),
	password: yup.string().required("Please enter your password").min(6, "Your password must contain minimum 6 characters"),
});

export default function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [, setAuth] = useContext(AuthContext);

	async function onSubmit(data) {
		setSubmitting(true);
		setLoginError(null);

		try {
			const response = await axios.post(url, data);
			console.log("response", response.data);
			setAuth(response.data);
			navigate("/admin");
		} catch (error) {
			console.log("error", error);
			setLoginError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
	
		<Container >
			{loginError && <div className="error">{loginError}</div>}
			<Form disabled={submitting} onSubmit={handleSubmit(onSubmit)}>
				<Form.Group>
					<fieldset>
					<Col sm={8} md={6} className="form__component">
						<Form.Control for="username" type="search" name="username" placeholder="Brukernavn" {...register('username')} id="title"/>
						{errors.username && <FormError>{errors.username.message}</FormError>}
					</Col>
					<Col sm={8} md={6} className="mt-2">
						<Form.Control for="password" type="password" name="password" placeholder="Passord" {...register('password')} id="password"/>
						{errors.password && <FormError>{errors.password.message}</FormError>}
					</Col>
					<Button type="submit">{submitting ? "Logging in..." : "Login"}</Button>
				</fieldset>
				</Form.Group>
			</Form>
		</Container>
		
	);

}
