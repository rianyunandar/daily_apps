import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Label, Textarea, Button, Card } from "flowbite-react";
import { useAuth } from "@/auth/auth";

const EditPost = () => {
  const router = useRouter();
  const { token } = useAuth();
  const postId = router.query.id;

  const [originalDescription, setOriginalDescription] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    if (postId) {
      const fetchPostDetails = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await fetch(
            `https://paace-f178cafcae7b.nevacloud.io/api/post/${postId}`,
            config
          );
          const postData = await response.json();
          console.log(postData);
          setOriginalDescription(postData.data.description);
        } catch (error) {
          console.error("Error fetching post details:", error);
        }
      };

      fetchPostDetails();
    }
  }, [postId, token]);

  const handleEditPost = async () => {
    try {
      const config = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: updatedDescription }),
      };

      await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/post/update/${postId}`,
        config
      );

      router.push(`/dashboard`);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
    <>
      <Card className="w-full">
        <div className="" id="textarea">
          <div className="mb-2 block">
            <Label htmlFor="edit-comment" value="Edit your message" />
          </div>
          <Textarea
            id="original-post"
            disabled
            rows={4}
            value={originalDescription}
          />
          <Textarea
            id="edit-post"
            placeholder="Update for your post..."
            required
            rows={4}
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
        </div>
        <Button
          className="bg-green-600 text-slate-50 py-3 w-full rounded-lg"
          onClick={handleEditPost}
        >
          Save Changes
        </Button>
      </Card>
    </>
  );
};

export default EditPost;
