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

export default function Article() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getArticle();
    }, []);

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
            if (
                !window.confirm(
                    "Are you sure you want move this posts to trash?"
                )
            ) {
                return;
            }

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

    const deleted = async (id) => {
        setLoading(true);
        try {
            if (
                !window.confirm("Are you sure you want to delete this posts?")
            ) {
                return;
            }

            await axiosClient.delete(`/article/${id}`);
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
                <h1>Posts</h1>

                <Link className="btn-add btn btn-primary" to="/article/new">
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
                                    Published
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="drafts"
                                    onClick={() => setTab("draft")}
                                >
                                    Drafts
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="trashed"
                                    onClick={() => setTab("trash")}
                                >
                                    Trashed
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
                                        style={{ width: "9%" }}
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
                                    {articles.filter(
                                        (item) => item.status === tab
                                    ).length > 0 ? (
                                        articles
                                            .filter(
                                                (item) => item.status === tab
                                            )
                                            .map((u, i) => (
                                                <tr key={u.id}>
                                                    <td>{i + 1}</td>
                                                    <td>{u.title}</td>
                                                    <td>{u.category}</td>
                                                    <td className="text-center">
                                                        <div className="row px-0">
                                                            <div className="col-auto ms-auto">
                                                                <Link
                                                                    className="btn-secondary btn-sm btn"
                                                                    to={
                                                                        "/article/" +
                                                                        u.id
                                                                    }
                                                                >
                                                                    <FaEdit />
                                                                </Link>
                                                            </div>
                                                            <div className="col-auto me-auto">
                                                                {tab ===
                                                                "trash" ? (
                                                                    <button
                                                                        className="btn-danger btn-sm btn"
                                                                        onClick={() =>
                                                                            deleted(
                                                                                u.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <FaTrashAlt />
                                                                    </button>
                                                                ) : (
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
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="text-center"
                                                style={{ fontStyle: "italic" }}
                                            >
                                                Tidak ada data tersedia
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            )}
                        </Table>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
