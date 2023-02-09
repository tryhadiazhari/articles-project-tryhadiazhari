import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function Signup() {
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const { setUser, setToken } = useStateContext();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post("/users/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const {
                    response: {
                        data: {
                            meta: { message },
                        },
                    },
                } = err;

                setIsError(true);
                setErrorMessage(message);
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <Form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Nama Lengkap"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            ref={nameRef}
                            placeholder="Nama Lengkap"
                            isInvalid={!!errorMessage?.name}
                        />
                        {isError && (
                            <Form.Control.Feedback
                                type="invalid"
                                style={{
                                    display: "inline",
                                }}
                            >
                                {errorMessage?.name}
                            </Form.Control.Feedback>
                        )}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            type="email"
                            ref={emailRef}
                            placeholder="name@example.com"
                            isInvalid={!!errorMessage?.email}
                        />
                        {isError && (
                            <Form.Control.Feedback
                                type="invalid"
                                style={{
                                    display: "inline",
                                }}
                            >
                                {errorMessage?.email}
                            </Form.Control.Feedback>
                        )}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control
                            type="password"
                            ref={passwordRef}
                            placeholder="Password"
                            isInvalid={!!errorMessage?.password}
                        />
                        {isError && (
                            <Form.Control.Feedback
                                type="invalid"
                                style={{
                                    display: "inline",
                                }}
                            >
                                {errorMessage?.password}
                            </Form.Control.Feedback>
                        )}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingPasswordConfirm"
                        label="Repeat Password"
                    >
                        <Form.Control
                            type="password"
                            ref={passwordConfirmationRef}
                            placeholder="Repeat Password"
                            isInvalid={!!errorMessage?.password_confirmation}
                        />
                        {isError && (
                            <Form.Control.Feedback
                                type="invalid"
                                style={{
                                    display: "inline",
                                }}
                            >
                                {errorMessage?.password_confirmation}
                            </Form.Control.Feedback>
                        )}
                    </FloatingLabel>

                    <button className="btn btn-block btn-primary mt-3">
                        Login
                    </button>
                    <p className="message">
                        You have accounts? <Link to="/login">Login Here</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}
