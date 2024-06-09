import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function BlogCard({ blogs, users }) {
  const navigate = useNavigate();

  const handleCardClick = (blogId) => {
    navigate(`./${blogId}`);
  };

  const handleKeyDown = (event, blogId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCardClick(blogId);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog) => {
        if (!blog) return null;

        const user = users.find((user) => user.id === blog.ownerId);

        if (!user || !blog.tags) return null;

        const tagsArray = Array.isArray(blog.tags)
          ? blog.tags
          : blog.tags.split(' ').filter((tag) => tag);

        return (
          <div
            key={blog.id}
            className="bg-card1 rounded-lg hover:bg-card2 cursor-pointer p-4 flex flex-col gap-2"
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(blog.id)}
            onKeyDown={(event) => handleKeyDown(event, blog.id)}
          >
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-sm">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="px-10">
              <h2 className="text-text text-2xl font-bold">{blog.title}</h2>
              <div className="flex space-x-2">
                {tagsArray.map((tag) => (
                  <span key={tag} className="text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const blogShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
});

const userShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
});

BlogCard.propTypes = {
  blogs: PropTypes.arrayOf(blogShape).isRequired,
  users: PropTypes.arrayOf(userShape).isRequired,
};
