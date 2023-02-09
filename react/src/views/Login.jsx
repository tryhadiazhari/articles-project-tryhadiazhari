import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const { setUser, setToken } = useStateContext();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("/users/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setIsError(false);
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

                    {/* <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    /> */}
                    <button className="btn btn-block btn-primary mt-3">
                        Login
                    </button>
                    <p className="message">
                        Not registered?{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}
