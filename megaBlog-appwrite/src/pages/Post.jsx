import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex justify-center mb-4 relative border rounded-xl p-2 mx-auto w-max">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.titlve}
                        className="rounded-xl h-64 sm:h-80"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 text-center">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css text-center">
                    {parse(post.content)}
                    {/* displays the post if the post exist this parse is a function in html-react-parse which parse an html component into the react component */}
                    </div>
                <div className="text-center">
                    {post.authorName}
                </div>
            </Container>
        </div>
    ) : null;
}