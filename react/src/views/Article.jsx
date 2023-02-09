import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaTrashAlt } from "@react-icons/all-files/fa/FaTrashAlt";

export default function Users() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getArticle();
    }, []);

    const onClickTrash = (articles) => {
        if (
            !window.confirm("Are you sure you want move this article to trash?")
        ) {
            return;
        }
        axiosClient.put(`/article/${articles.id}`, articles).then(() => {
            setNotification("Article was move to trash");
            getArticle();
        });
    };

    const getArticle = () => {
        setLoading(true);
        axiosClient
            .get("/article/10/0")
            .then(({ data }) => {
                setLoading(false);
                setArticles(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };
    const [tab, setTab] = useState("publish");

    const moveToTrash = async (id, title, content, category) => {
        setLoading(true);
        try {
            await axiosClient.put(`/article/${id}`, {
                title,
                content,
                category,
                status: "trash",
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            getArticle();
        }
    };

    return (
        <div>
            <div
                style={{
                    margin: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Articles</h1>

                <Link className="btn-add btn btn-primary" to="">
                    Add new
                </Link>
            </div>

            <Card style={{ margin: "20px" }}>
                <Card.Body>
                    <Card.Text>
                        <Nav variant="tabs" defaultActiveKey="publish">
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="publish"
                                    onClick={() => setTab("publish")}
                                >
                                    Publish
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="draft"
                                    onClick={() => setTab("draft")}
                                >
                                    Draft
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="trash"
                                    onClick={() => setTab("trash")}
                                >
                                    Trash
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th
                                        className="text-center"
                                        style={{ width: "7%" }}
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            {loading && (
                                <tbody>
                                    <tr>
                                        <td colSpan="5" class="text-center">
                                            Loading...
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                            {!loading && (
                                <tbody>
                                    {articles
                                        .filter((item) => item.status === tab)
                                        .map((u, i) => (
                                            <tr key={u.id}>
                                                <td>{i + 1}</td>
                                                <td>{u.title}</td>
                                                <td>{u.category}</td>
                                                <td className="text-center">
                                                    <Link
                                                        className="btn-secondary btn-sm btn"
                                                        to={"/article/" + u.id}
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    &nbsp;
                                                    <button
                                                        className="btn-danger btn-sm btn"
                                                        onClick={() =>
                                                            moveToTrash(
                                                                u.id,
                                                                u.title,
                                                                u.content,
                                                                u.category
                                                            )
                                                        }
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            )}
                        </Table>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
