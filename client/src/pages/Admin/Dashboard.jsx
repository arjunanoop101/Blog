import React, { useEffect } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import { useState } from "react";
import BlogTableItem from "../../components/Admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashBoardData, setDashBoardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetDashBoardData = async () => {
    try {
      const response = await axios.get("/api/admin/dashboard");
      if (response.status === 200) {
        const data = response.data;
        setDashBoardData(data);
      } else {
        toast.error("Failed to fetch dashboard data");
      }
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
    }
  };

  useEffect(() => {
    fetDashBoardData();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scake-105 transition-all">
            <img src={assets.dashboard_icon_1} alt="" />
            <p className="text-xl font-semibold text-gray-700">
              {dashBoardData.blogs}
            </p>
            <p className="text-gray-500 font-light">Blogs</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scake-105 transition-all">
            <img src={assets.dashboard_icon_2} alt="" />
            <p className="text-xl font-semibold text-gray-700">
              {dashBoardData.comments}
            </p>
            <p className="text-gray-500 font-light">Comments</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scake-105 transition-all">
            <img src={assets.dashboard_icon_3} alt="" />
            <p className="text-xl font-semibold text-gray-700">
              {dashBoardData.drafts}
            </p>
            <p className="text-gray-500 font-light">Drafts</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4 m-4 mt-6 text-gray-600 ">
          <img src={assets.dashboard_icon_4} alt="" />
          <p> Latest Blogs</p>
        </div>
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
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
              {dashBoardData.recentBlogs.map((blog, index) => {
                return (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetDashBoardData}
                    index={index + 1}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
