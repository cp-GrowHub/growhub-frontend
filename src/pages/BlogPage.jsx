import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    <div className="flex flex-col min-h-[90vh]">
      <header className="bg-card1 flex flex-row p-3 px-10 justify-between items-center">
        <div className="flex items-center text-text">
          <h1 className="text-2xl font-semibold">Blog Page</h1>
        </div>
        <SearchForm
          searchKeyword={keyword}
          onSearch={onKeywordChange}
          resetSearch={resetKeyword}
        />
      </header>
      <div className="flex flex-row">
        <div className="flex-[5] p-6 px-10">
          <div className="flex flex-col text-text gap-3">
            <div className="flex flex-row justify-between">
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
                  navigate('./createDiscussion');
                }}
              >
                + Create new blog
              </button>
            </div>
            <div>
              <BlogCard blogs={filteredBlogs} users={users} />
            </div>
          </div>
        </div>
        <div className="flex-[1] pt-10">
          <div>
            <h2 className="text-text text-lg font-semibold">trending now</h2>
            {sortedBlogs.slice(0, 5).map((blog) => (
              <div
                key={blog.id}
                className="my-2 text-text bg-card1 px-4 py-2 hover:bg-card2"
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(blog.id)}
                onKeyDown={(event) => handleKeyDown(event, blog.id)}
              >
                <h3 className="text-md ">{blog.title}</h3>
                <div className="flex space-x-2">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="text-gray-400 text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
