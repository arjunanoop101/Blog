import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, name, content } = comment;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();
  const approveComment = async () => {
    try {
      const response = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (response.status === 200) {
        toast.success("Comment approved");
        fetchComments();
      } else {
        toast.error("Failed to approve comment");
      }
    } catch (error) {
      toast.error("Failed to approve comment");
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!confirm) return;
      const response = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      if (response.status === 200) {
        toast.success("Comment deleted");
        fetchComments();
      } else {
        toast.error("Failed to delete comment");
      }
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };
  console.log(comment);
  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog : {blog}</b>
        <br />
        <br />
        <b className="font-medium text-gray-600">Name : {name || "N/A"}</b>
        <br />
        <br />
        <b className="font-medium text-gray-600">
          Comment : {content || "N/A"}
        </b>
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt=""
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
