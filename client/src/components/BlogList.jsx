import React, { useContext } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { useState } from "react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (!Array.isArray(blogs)) return [];

    if (input === "") {
      return blogs;
    }

    return blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(input.toLowerCase()) ||
        blog.category?.toLowerCase().includes(input.toLowerCase())
    );
  };

  console.log("blogs from context", blogs);

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-600 ${
                menu === item && `text-white px-4 pt-0.5`
              }`}
            >
              {item}
              {menu === item && (
                <div className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"></div>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
