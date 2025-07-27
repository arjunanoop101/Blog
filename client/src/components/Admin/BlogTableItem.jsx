import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);
  console.log(isPublished);
  const { axios } = useAppContext();
  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    try {
      const response = await axios.post(`/api/blog/delete`, { id: blog._id });
      if (response.status === 200) {
        toast.success("Blog deleted successfully");
        await fetchBlogs();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const onClickHandler = async () => {
    try {
      const response = await axios.post(`/api/blog/toggle-publish`, {
        id: blog._id,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Blog updated successfully");
        await fetchBlogs();
      } else {
        toast.error("Failed to update blog");
      }
    } catch (error) {
      toast.error("Failed to update blog");
    }
  };
  return (
    <tr className="border-y border-grau-3--">
      <th className="px-4 py-2">{index}</th>
      <td className="px-4 py-2">{title}</td>
      <td className="px-4 py-2 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-4 py-2 max-sm:hidden">
        <p
          className={`${blog.isPublished ? "text-green-600" : "text-red-600"}`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-sx gap-3">
        <button
          onClick={onClickHandler}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          alt=""
          className="w-8 hover:scale-110 transition-all cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
