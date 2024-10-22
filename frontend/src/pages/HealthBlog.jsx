import React from 'react';
import { motion } from 'framer-motion';

const HealthBlog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Benefits of a Balanced Diet',
      excerpt: 'A balanced diet is crucial for maintaining overall health. It provides the necessary nutrients...',
      image: 'https://via.placeholder.com/400x200', // Replace with actual image URLs
      date: '2024-10-15',
    },
    {
      id: 2,
      title: 'Exercise for Mental Health',
      excerpt: 'Regular physical activity is essential not only for physical health but also for mental well-being...',
      image: 'https://via.placeholder.com/400x200',
      date: '2024-10-14',
    },
    {
      id: 3,
      title: 'Staying Hydrated',
      excerpt: 'Water is vital for health. Learn how much you should drink daily and tips to stay hydrated...',
      image: 'https://via.placeholder.com/400x200',
      date: '2024-10-13',
    },
    // Add more posts as needed
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Health Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <span className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthBlog;
