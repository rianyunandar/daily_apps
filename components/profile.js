import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { Avatar, Button, Card } from "flowbite-react";
import {
  BsHeart,
  BsHeartFill,
  BsPencil,
  BsTrash,
  BsChat,
} from "react-icons/bs";
import { useRouter } from "next/router";

const renderPost = (post, handleLike, handleUnlike, deletePost) => {
  const { user, id, created_at, description, likes_count, replies_count } =
    post;

  return (
    <div key={id} className="w-full shadow-sm my-2">
      <div className="flex gap-8 w-full mt-6">
        <Avatar
          alt="Bonnie image"
          className="mb-3 rounded-full shadow-lg"
          height="96"
          src="/images/people/profile-picture-3.jpg"
          width="96"
        />
        <div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.email} - ({new Date(created_at).toLocaleDateString("en-US")})
          </span>
        </div>
      </div>
      <p className="my-4 w-full">{description}</p>

      <div className="flex space-x-3 lg:mt-6 mb-8">
        {likes_count ? (
          <Button onClick={() => handleUnlike(id)} className="like-button">
            <BsHeartFill />
            {likes_count} Like
          </Button>
        ) : (
          <Button onClick={() => handleLike(id)} className="like-button">
            <BsHeart />
            {likes_count} Like
          </Button>
        )}

        <Link className="reply-button" href={`/reply/${id}`}>
          <Button>
            <BsChat />
            {replies_count} Replies
          </Button>
        </Link>
      </div>

      <div className="flex gap-3 w-full">
        <Link className="edit-button" href={`/page/${id}`}>
          <Button>
            <BsPencil /> Edit
          </Button>
        </Link>
        <Button onClick={() => deletePost(id)} className="delete-button">
          <BsTrash /> Delete
        </Button>
      </div>
    </div>
  );
};

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const router = useRouter();

  const getMe = async () => {
    try {
      const token = Cookies.get("user_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
        config
      );
      const data = await response.json();
      setName(data.data.name);
      setEmail(data.data.email);
      setDob(data.data.dob);
      setPhone(data.data.phone);
      setId(data.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const getMyPosts = async () => {
    try {
      const token = Cookies.get("user_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
        config
      );
      const data = await response.json();
      setMyPosts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  const deletePost = async (idData) => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      };
      await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${idData}`,
        config
      );
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (likeId) => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      };
      await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/likes/post/${likeId}`,
        config
      );
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (unlikeId) => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      };
      await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/unlikes/post/${unlikeId}`,
        config
      );
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className="w-full">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <Avatar
            alt="Bonnie image"
            className="mb-3 rounded-full shadow-lg"
            height="96"
            src="/images/people/profile-picture-3.jpg"
            width="96"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {email}
          </span>
        </div>
        <div>
          <p>Email: {email}</p>
          <p>Date of Birth: {dob}</p>
          <p>phone: {phone}</p> 
        </div>
      </Card>

      <ul className="w-full">
        <Card>
          <div className="flex flex-col items-center pb-10">
            {myPosts &&
              myPosts
                .filter((res) => res.user.id === id)
                .map((filteredPost) =>
                  renderPost(filteredPost, handleLike, handleUnlike, deletePost)
                )}
          </div>
        </Card>
      </ul>
    </>
  );
};

export default Profile;
