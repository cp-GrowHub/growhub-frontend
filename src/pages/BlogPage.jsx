import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegFrownOpen } from 'react-icons/fa';
import useInput from '../hooks/useInput';
import SearchForm from '../components/common/SearchForm';
import OutlineButton from '../components/common/OutlineButton';
import BlogCard from '../components/Blog/BlogCard';
import { asyncReceiveUsers } from '../states/users/thunk';
import { asyncGetAllBlogs } from '../states/blogs/thunk';

function BlogPage() {
  const [keyword, onKeywordChange, resetKeyword] = useInput('');
  const [filter, setFilter] = useState('Latest');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs.blogs);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(asyncGetAllBlogs());
    dispatch(asyncReceiveUsers());
  }, [dispatch]);

  const calculateTagFrequency = (blogs) => {
    const tagFrequency = {};
    blogs.forEach((blog) => {
      blog.tags.forEach((tag) => {
        if (tagFrequency[tag]) {
          tagFrequency[tag] += 1;
        } else {
          tagFrequency[tag] = 1;
        }
      });
    });
    return tagFrequency;
  };

  const sortBlogsByTagFrequency = (blogs, tagFrequency) => {
    return blogs.sort((a, b) => {
      const aTagFrequency = a.tags.reduce(
        (acc, tag) => acc + (tagFrequency[tag] || 0),
        0
      );
      const bTagFrequency = b.tags.reduce(
        (acc, tag) => acc + (tagFrequency[tag] || 0),
        0
      );
      return bTagFrequency - aTagFrequency;
    });
  };

  const tagFrequency = calculateTagFrequency([...blogs]);
  const sortedBlogs = sortBlogsByTagFrequency([...blogs], tagFrequency);

  const filteredBlogs = useMemo(() => {
    let filtered = [...blogs];

    if (keyword) {
      filtered = filtered.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          (Array.isArray(blog.tags)
            ? blog.tags.some((tag) =>
                tag.toLowerCase().includes(keyword.toLowerCase())
              )
            : blog.tags
                ?.split(' ')
                .some((tag) =>
                  tag.toLowerCase().includes(keyword.toLowerCase())
                ))
      );
    }

    if (filter === 'Latest') {
      return filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    if (filter === 'Top') {
      return filtered.sort(
        (a, b) => b.body.split(' ').length - a.body.split(' ').length
      );
    }

    return filtered;
  }, [blogs, keyword, filter]);

  const handleCardClick = (blogId) => {
    navigate(`./${blogId}`);
  };

  const handleKeyDown = (event, blogId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCardClick(blogId);
    }
  };

  return (
    <div className="flex flex-col min-h-[90vh] pl-4 md:pl-0">
      <header className="bg-card1 flex flex-col md:flex-row gap-2 md:gap-0 p-3 md:px-10 justify-between items-center">
        <h1 className="text-text text-2xl font-semibold">Blog Page</h1>
        <SearchForm
          searchKeyword={keyword}
          onSearch={onKeywordChange}
          resetSearch={resetKeyword}
        />
      </header>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 md:flex-[5] p-4 md:p-6 md:px-10">
          <div className="flex flex-col text-text gap-6">
            <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-0">
              <div className="flex flex-row gap-4">
                <OutlineButton
                  text="Latest"
                  onClick={() => setFilter('Latest')}
                  isActive={filter === 'Latest'}
                />
                <OutlineButton
                  text="Top"
                  onClick={() => setFilter('Top')}
                  isActive={filter === 'Top'}
                />
              </div>
              <button
                className="text-bekgron bg-text px-6 p-2 rounded-3xl border-2 border-transparent hover:text-text hover:bg-bekgron hover:border-text"
                onClick={() => {
                  navigate('./createBlog');
                }}
              >
                + Create new blog
              </button>
            </div>
            {filteredBlogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 bg-card1 p-5 rounded-lg">
                <FaRegFrownOpen className="h-12 w-12 text-text" />
                <span className="text-center text-text font-bold md:text-xl">
                  No blogs found!
                </span>
              </div>
            ) : (
              <BlogCard blogs={filteredBlogs} users={users} />
            )}
          </div>
        </div>
        <div className="md:flex-[1] p-4 md:pt-10">
          <h2 className="text-text text-lg font-semibold">Trending Now</h2>
          {sortedBlogs.slice(0, 5).length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 bg-card1 p-5 rounded-lg">
              <FaRegFrownOpen className="h-12 w-12 text-text" />
              <span className="text-center text-text font-bold md:text-xl">
                No blogs found!
              </span>
            </div>
          ) : (
            sortedBlogs.slice(0, 5).map((blog) => (
              <div
                key={blog.id}
                className="my-2 text-text bg-card1 px-4 py-2 hover:bg-card2 cursor-pointer rounded-md"
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(blog.id)}
                onKeyDown={(event) => handleKeyDown(event, blog.id)}
              >
                <h3 className="text-md">{blog.title}</h3>
                <div className="flex space-x-2">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="text-gray-400 text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
