import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.post("/api/blog/comments", { blogId: id });
      console.log("data from blog.jsx", res.data);
      setComments(res.data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      toast.error("Failed to fetch comments");
    }
  };

  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`/api/blog/${id}`);
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch blog:", error);
      toast.error("Failed to fetch blog");
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });

      if (res.status === 200) {
        toast.success("Comment added");
        setName("");
        setContent("");
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment");
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <>
      <div className="relative">
        <img
          className="absolute -top-50 -z-1 opacity"
          src={assets.gradientBackground}
          alt=""
        />
        <Navbar />
        <div className="text-center mt-20 text-gray-600">
          <p className="text-primary py-4 font-medium">
            Published on {Moment(data.createdAt).format("Do MMMM YYYY")}
          </p>
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
            {data.title}
          </h1>
          <h2 className="my-5 max-w-lg truncate mx-auto">{data.subtitle}</h2>
          <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
            Arjun Anoop
          </p>
        </div>

        <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
          <img src={data.image} alt="" className="rounded-3xl mb-5" />
          <div
            className="rich-text max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>

          {/* {comment seciton} */}
          <div className="mt-14 mb-10 max-w-3xl mx-auto">
            <p className="mb-4 font-semibold">Comments ({comments.length})</p>
            <div className="flex flex-col gap-4">
              {comments.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img src={assets.user_icon} alt="" className="w-6" />
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <p className="text-sm max-w-md ml-8">{item.content}</p>
                    <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                      {Moment(item.createdAt).fromNow()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            {/* comment section */}
            <p className="font-semibold mb-4">Add your comment</p>
            <form
              onSubmit={addComment}
              className="flex flex-col items-start gap-4 max-w-lg"
            >
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
                className="w-full p-2 border border-gray-300 outline-none"
                required
              />
              <textarea
                onChange={(e) => setContent(e.target.value)}
                placeholder="Comment"
                className="w-full p-2 border border-gray-300 outline-none h-48"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="my-24 max-w-3xl mx-auto">
            <p className="font-semibold my-4">
              Share this article on social media
            </p>
            <div className="flex">
              <img src={assets.facebook_icon} width={50} alt="" />
              <img src={assets.twitter_icon} width={50} alt="" />
              <img src={assets.googleplus_icon} width={50} alt="" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Blog;
