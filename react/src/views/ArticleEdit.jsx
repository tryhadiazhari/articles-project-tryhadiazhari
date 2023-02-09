import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export default function ArticleEdit() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [article, setArticle] = useState({
        id: null,
        title: "",
        content: "",
        category: "",
        status: "",
    });

    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/article/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setArticle(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (id) {
            axiosClient
                .put(`/article/${id}`, article)
                .then(() => {
                    navigate("/article");
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
        } else {
            axiosClient
                .post("/article", article)
                .then(() => {
                    navigate("/article");
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
        }
    };

    return (
        <>
            <div
                style={{
                    margin: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Edit Article</h1>
            </div>
            <Card style={{ margin: "20px" }}>
                <Card.Body>
                    <Card.Text>
                        {!loading && (
                            <form onSubmit={onSubmit}>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={article.title}
                                        onChange={(ev) =>
                                            setArticle({
                                                ...article,
                                                title: ev.target.value,
                                            })
                                        }
                                        isInvalid={!!errorMessage?.title}
                                    />
                                </Form.Group>
                                {isError && (
                                    <Form.Control.Feedback
                                        type="invalid"
                                        style={{
                                            display: "inline",
                                        }}
                                    >
                                        {errorMessage?.title}
                                    </Form.Control.Feedback>
                                )}
                                <Form.Group className="mt-3">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="content"
                                        placeholder="Content"
                                        value={article.content}
                                        style={{
                                            height: "200px",
                                            resize: "none",
                                        }}
                                        onChange={(ev) =>
                                            setArticle({
                                                ...article,
                                                content: ev.target.value,
                                            })
                                        }
                                        isInvalid={!!errorMessage?.content}
                                    />
                                </Form.Group>
                                {isError && (
                                    <Form.Control.Feedback
                                        className="mb-3"
                                        type="invalid"
                                        style={{
                                            display: "block",
                                        }}
                                    >
                                        {errorMessage?.content}
                                    </Form.Control.Feedback>
                                )}
                                <Form.Group className="mt-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="category"
                                        value={article.category}
                                        placeholder="Category"
                                        onChange={(ev) =>
                                            setArticle({
                                                ...article,
                                                category: ev.target.value,
                                            })
                                        }
                                        isInvalid={!!errorMessage?.category}
                                    />
                                </Form.Group>
                                {isError && (
                                    <Form.Control.Feedback
                                        className="mb-3"
                                        type="invalid"
                                        style={{
                                            display: "block",
                                        }}
                                    >
                                        {errorMessage?.category}
                                    </Form.Control.Feedback>
                                )}

                                <div className="mt-3">
                                    <button
                                        className="btn btn-success"
                                        name="publish"
                                        onClick={() =>
                                            setArticle({
                                                ...article,
                                                status: "publish",
                                            })
                                        }
                                    >
                                        Publish
                                    </button>
                                    &nbsp;
                                    <button
                                        className="btn btn-warning"
                                        name="draft"
                                        onClick={() =>
                                            setArticle({
                                                ...article,
                                                status: "draft",
                                            })
                                        }
                                    >
                                        Draft
                                    </button>
                                </div>
                            </form>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}
