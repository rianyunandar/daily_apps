import React, { useEffect, useState } from "react";
import { Button, Label, Textarea } from "flowbite-react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Reply = () => {
  const router = useRouter();
  const { id } = router.query;
  const [replies, setReplies] = useState([]);
  const [description, setDescription] = useState("");

  const fetchData = async (url, config, updateFunction) => {
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      updateFunction(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReplies = () => {
    const token = Cookies.get("user_token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    fetchData(
      `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
      config,
      setReplies
    );
  };

  useEffect(() => {
    getReplies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApiRequest = async (url, method, data = {}) => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        method: method.toUpperCase(),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: method.toUpperCase() === "GET" ? null : JSON.stringify(data),
      };

      await fetch(url, config);
      getReplies();
    } catch (error) {
      console.log(error);
    }
  };

  const addReply = (e) => {
    e.preventDefault();
    handleApiRequest(
      `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
      "post",
      { description }
    );
    setDescription("");
  };

  const handleDelete = (deleteId) => {
    handleApiRequest(
      `https://paace-f178cafcae7b.nevacloud.io/api/replies/delete/${deleteId}`,
      "delete"
    );
  };

  return (
    <div className="w-full">
      <form
        onSubmit={addReply}
        className="flex flex-col gap-4 max-w-md"
        id="textarea"
      >
        <Label htmlFor="comment" value="Replies Post" />
        <Textarea
          id="comment"
          placeholder="reply post..."
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" color="info">
          Reply
        </Button>
      </form>
      <div className="shadow-xl mt-3">
        {replies.length > 0 ? (
          replies.map((reply) => (
            <div key={reply.id} className="bg-zinc-100 p-3 mb-4 rounded-lg">
              <h2 className="text-xl font-semibold">{reply.user.name}</h2>
              <p>{new Date(reply.created_at).toLocaleDateString("en-US")}</p>
              <p>{reply.description}</p>
              {reply.is_own_reply && (
                <button
                  type="button"
                  value={reply.id}
                  onClick={(e) => handleDelete(e.target.value)}
                  className="bg-red-600 rounded-lg py-2 px-4 text-slate-50 mt-2"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="mt-5">There is no Reply yet🥺...</p>
        )}
      </div>
    </div>
  );
};

export default Reply;
