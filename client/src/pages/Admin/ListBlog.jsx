import { useEffect, useState } from "react";
import { blog_data } from "../../assets/assets";
import BlogTableItem from "../../components/Admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import { resolvePath } from "react-router-dom";
BlogTableItem;
// import { dashboard_data } from "../../assets/assets";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog/all");
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        setBlogs(data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="  flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1>All blogs</h1>
      <div className=" mt-4 h-4/5 relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm  text-gray-500">
          <thead className="text-xs text-gray-700 uppercase text-left">
            <tr>
              <th scope="col" className="px-6 py-3 xl:px-6">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => {
              return (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
