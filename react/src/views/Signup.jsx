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
                // const response = err.response;
                // if (response && response.status === 422) {
                //     setErrors(response.data.errors);
                // }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                {/* <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
          <button className="btn btn-block">Signup</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form> */}

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
