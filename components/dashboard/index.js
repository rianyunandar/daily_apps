import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Card, Label, Textarea, Avatar } from "flowbite-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useAuth } from "@/auth/auth";

export default function Home() {
  const { token, userData } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPostDescription, setNewPostDescription] = useState("");
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
        config
      );
      const data = await response.json();
      setPosts(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (token && userData) {
      fetchPosts();
    }
  }, [token, userData]);

  const addNewPost = async () => {
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: newPostDescription }),
      };

      await fetch("https://paace-f178cafcae7b.nevacloud.io/api/post", config);

      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/likes/post/${postId}`,
        config
      );

      fetchPosts();
      router.reload();
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/unlikes/post/${postId}`,
        config
      );

      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const config = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${postId}`,
        config
      );

      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (postId) => {
    try {
      router.push(`/post/${postId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewPost();
        }}
        className="flex w-full flex-col gap-4"
      >
        <div id="textarea">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Your message" />
          </div>
          <Textarea
            id="comment"
            placeholder="Leave a comment..."
            required
            rows={4}
            value={newPostDescription}
            onChange={(e) => setNewPostDescription(e.target.value)}
          />
        </div>
        <Button
          className="bg-red-600 text-slate-50 py-3 w-full rounded-lg"
          type="submit"
          color="failure"
        >
          Post
        </Button>
      </form>

      <Card>
        <div className="flex flex-col items-center">
          {posts &&
            posts.map((post, index) => (
              <div className="w-full" key={index}>
                <div className="flex gap-8 w-full">
                  <Avatar
                    alt="User image"
                    className="mb-3 rounded-full shadow-lg"
                    height="96"
                    src="/images/people/profile-picture-3.jpg"
                    width="96"
                  />
                  <div className="flex flex-col">
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {post.user.name}
                    </h5>
                    <p>{post.user.email}</p>
                    <div className="flex mt-2 gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.created_at).toLocaleDateString("en-US")}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="my-4 w-full">{post.description}</p>
                <div className="flex space-x-3 mb-8">
                  {post.is_like_post ? (
                    <Button
                      onClick={() => handleUnlike(post.id)}
                      className="inline-flex items-center rounded-lg border-2 px-4 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                    >
                      &#10084;
                      {post.likes_count} Like
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleLike(post.id)}
                      className="inline-flex items-center rounded-lg border-2 px-4 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                    >
                      &#10084;
                      {post.likes_count} Like
                    </Button>
                  )}

                  <Link
                    href={`/reply/${post.id}`}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                    <div className="flex items-center">
                      &#9993;
                      {post.replies_count} Replies
                    </div>
                  </Link>
                  {userData && post.user.id === userData.id && (
                    <Button
                      className="bg-yellow-300 text-slate-800 py-3 w-12 rounded-lg"
                      onClick={() => handleEdit(post.id)}
                    >
                      &#9998;
                    </Button>
                  )}

                  {userData && post.user.id === userData.id && (
                    <Button
                      className="bg-red-400 text-slate-800 py-3 w-12 rounded-lg"
                      onClick={() => handleDelete(post.id)}
                    >
                      &#9747;
                    </Button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </Card>
    </>
  );
}
