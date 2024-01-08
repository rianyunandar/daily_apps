import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Label, Textarea, Button, Card } from "flowbite-react";
import Cookies from "js-cookie";

const EditPost = () => {
  const router = useRouter();
  const postId = router.query.id; // Assuming you're using Next.js dynamic routes

  const [originalDescription, setOriginalDescription] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    // Fetch the original post details for editing
    const fetchPostDetails = async () => {
      try {
        const token = Cookies.get("user_token");
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
        setOriginalDescription(postData.description);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleEditPost = async () => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: updatedDescription }),
      };

      await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/post/${postId}`,
        config
      );

      // Redirect to the post details page or any other page after editing
      router.push(`/post/${postId}`);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
    <>
      <Card>
        <div className="max-w-md" id="textarea">
          <div className="mb-2 block">
            <Label htmlFor="edit-comment" value="Edit your message" />
          </div>
          <Textarea
            id="edit-comment"
            placeholder="Edit your post..."
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
