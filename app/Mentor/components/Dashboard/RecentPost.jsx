import React from "react";
import styles from "./styles.module.css"

const posts = [
  {
    id: 1,
    title: "New Features in React 19",
    description: "Explore the upcoming changes and improvements in React 19.",
    image: "https://source.unsplash.com/200x150/?technology,code",
  },
  {
    id: 2,
    title: "Tailwind CSS Best Practices",
    description: "A guide to writing clean and efficient Tailwind CSS.",
    image: "https://source.unsplash.com/200x150/?design,ui",
  },
  {
    id: 3,
    title: "JavaScript Performance Optimization",
    description: "Techniques to improve JS performance in web apps.",
    image: "https://source.unsplash.com/200x150/?javascript,performance",
  },
];

const RecentPosts = () => {
  return (
    <div id={styles.recentPosts} className="bg-white w-[50%] p-6 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
        <button className="px-4 py-2 text-sm font-medium bg-[#e0e7ff] text-indigo-700 rounded-lg">
          View All
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-[#f9fafb] p-4 rounded-lg flex gap-4 items-center shadow-sm"
          >
            {/* Image */}
            <img src={post.image} alt={post.title} className="w-20 h-20 rounded-lg object-cover" />

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-md font-medium text-gray-900">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.description}</p>
            </div>

            {/* Approve Button */}
            <button className="px-4 py-2 text-sm font-medium bg-[#22c55e] text-white rounded-lg hover:bg-green-600 transition">
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
