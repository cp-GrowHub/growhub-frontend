import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { asyncReceiveUsers } from '../states/users/thunk';
import { asyncDeleteBlog, asyncGetDetailBlog } from '../states/blogs/thunk';
import Modal from '../components/common/Modal';
import ConfirmDeleteModal from '../components/common/ConfirmDeleteModal';
import useDelete from '../hooks/useDelete';
import useCopyLink from '../hooks/useCopyLink';

export default function DetailBlogPage() {
  const { blogId } = useParams();
  const dispatch = useDispatch();

  const { isCopiedModalVisible, setIsCopiedModalVisible, handleCopyLink } =
    useCopyLink(blogId, 'blog');
  const { isDeleteModalVisible, setIsDeleteModalVisible, handleDelete } =
    useDelete(blogId, asyncDeleteBlog, 'blogId', '/blog');

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

  if (!ownerBlog) {
    return <div>Loading...</div>;
  }

  const isOwner = authUser && detailBlog.ownerId === authUser.id;

  return (
    <div className="flex flex-col md:flex-row min-h-[90vh] text-text pl-4 pt-2 gap-2 md:gap-8 md:p-4">
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
              <h1 className="text-xl md:text-2xl font-bold">
                {detailBlog.title}
              </h1>
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
            <p className="text-sm md:text-base">{parse(detailBlog.body)}</p>
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
        <div className="flex flex-col gap-4 py-2 md:py-4">
          {isOwner && (
            <button
              className="py-2 px-4 bg-red-900 text-text rounded-lg hover:bg-red-700 hover:text-text"
              onClick={() => setIsDeleteModalVisible(true)}
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
      <Modal
        text="Copied!"
        isVisible={isCopiedModalVisible}
        onClose={() => setIsCopiedModalVisible(false)}
        color="bg-green-500"
      />
      <ConfirmDeleteModal
        isVisible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
