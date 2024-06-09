import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveUsers } from '../states/users/thunk';
import { asyncDeleteBlog, asyncGetDetailBlog } from '../states/blogs/thunk';

export default function DetailBlogPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const detailBlog = useSelector((state) => state.blogs.detailBlog);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncGetDetailBlog({ blogId }));
    dispatch(asyncReceiveUsers());
  }, [dispatch, blogId]);

  if (!detailBlog || !users.length) {
    return <div>Loading...</div>;
  }

  const ownerBlog = users.find((user) => user.id === detailBlog.ownerId);

  const handleDeleteOnClick = (blogId) => {
    dispatch(asyncDeleteBlog({ blogId }));
    navigate('/blog');
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/shared/blog/${blogId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('Link copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy link: ', err);
      });
  };

  if (!ownerBlog) {
    return <div>Loading...</div>;
  }

  const isOwner = authUser && detailBlog.ownerId === authUser.id;

  return (
    <div className="flex flex-row min-h-[90vh] text-text gap-8 p-4">
      <div className="bg-card1 flex-[4] rounded-2xl">
        <div className="p-8 flex flex-col gap-2">
          <div className="flex items-center">
            <img
              src={ownerBlog.avatar}
              alt={ownerBlog.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <p className="font-bold">{ownerBlog.name}</p>
              <p className="text-sm">
                {new Date(detailBlog.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-2xl font-bold">{detailBlog.title}</h1>
              <div className="flex space-x-2">
                {detailBlog.tags.map((tag) => {
                  return (
                    <span key={tag} className="text-sm text-gray-400">
                      #{tag}
                    </span>
                  );
                })}
              </div>
            </div>
            <p>{detailBlog.body}</p>
          </div>
        </div>
      </div>
      <div className="flex-[1] flex flex-col">
        <div className="bg-card1 px-6 pt-6 pb-8 flex flex-col gap-1 rounded-xl">
          <div className="flex flex-row items-center">
            <img
              src={ownerBlog.avatar}
              alt={ownerBlog.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="font-semibold">{ownerBlog.name}</span>
          </div>
          <div>
            <span className="text-sm">{ownerBlog.bio}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-10 py-4">
          {isOwner && (
            <button
              className="py-2 px-4 bg-red-900 text-text rounded-lg hover:bg-red-700 hover:text-text"
              onClick={() => handleDeleteOnClick(blogId)}
            >
              Delete Blog
            </button>
          )}
          <button
            className="py-2 px-4 bg-text text-bekgron rounded-lg hover:bg-bekgron hover:text-text hover:border"
            onClick={handleCopyLink}
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}
