import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import parse from 'html-react-parser';
import {
  asyncGetDetailDiscussion,
  asyncUpvoteDiscussion,
  asyncDownvoteDiscussion,
  asyncNeutralizeDiscussionVote,
  asyncAddComment,
} from '../states/discussions/thunk';
import { asyncReceiveUsers } from '../states/users/thunk';
import { postedAt } from '../utils';
import Modal from '../components/common/Modal';

export default function DetailDiscussionPage() {
  const { discussionId } = useParams();
  const dispatch = useDispatch();
  const detailDiscussion = useSelector(
    (state) => state.discussions.detailDiscussion
  );
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const [comment, setComment] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(asyncGetDetailDiscussion({ discussionId }));
    dispatch(asyncReceiveUsers());
  }, [dispatch, discussionId]);

  if (!detailDiscussion || !authUser || !users.length) {
    return <div>Loading...</div>;
  }

  const ownerUser = users.find((user) => user.id === detailDiscussion.ownerId);

  const handleUpvote = () => {
    if (detailDiscussion.upVotes.includes(authUser.id)) {
      dispatch(asyncNeutralizeDiscussionVote({ discussionId }));
      setModalMessage('Neutral vote successful');
    } else if (detailDiscussion.downVotes.includes(authUser.id)) {
      dispatch(asyncNeutralizeDiscussionVote({ discussionId }));
      dispatch(asyncUpvoteDiscussion({ discussionId }));
      setModalMessage('Upvote successful');
    } else {
      dispatch(asyncUpvoteDiscussion({ discussionId }));
      setModalMessage('Upvote successful');
    }
    setIsModalVisible(true);
  };

  const handleDownvote = () => {
    if (detailDiscussion.downVotes.includes(authUser.id)) {
      dispatch(asyncNeutralizeDiscussionVote({ discussionId }));
      setModalMessage('Neutral vote successful');
    } else if (detailDiscussion.upVotes.includes(authUser.id)) {
      dispatch(asyncNeutralizeDiscussionVote({ discussionId }));
      dispatch(asyncDownvoteDiscussion({ discussionId }));
      setModalMessage('Downvote successful');
    } else {
      dispatch(asyncDownvoteDiscussion({ discussionId }));
      setModalMessage('Downvote successful');
    }
    setIsModalVisible(true);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      dispatch(asyncAddComment({ discussionId, content: comment }));
      setComment('');
      setModalMessage('Comment added successfully');
      setIsModalVisible(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddComment();
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalMessage('');
  };

  return (
    <div className="min-h-[90vh] text-text px-10 py-4 flex flex-col justify-between">
      <div className="rounded-lg flex flex-col gap-4">
        <div className="bg-card1 px-8 py-6 flex flex-col gap-2">
          <div className="flex flex-row space-x-2 ">
            {detailDiscussion.tags.map((tag) => (
              <span key={tag} className="text-gray-400 text-sm">
                #{tag}
              </span>
            ))}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{detailDiscussion.title}</h1>
            <p className="text-text">{parse(detailDiscussion.body)}</p>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <button
              onClick={handleUpvote}
              className="flex items-center space-x-1"
            >
              <FaThumbsUp />
              <span>{detailDiscussion.upVotes.length}</span>
            </button>
            <button
              onClick={handleDownvote}
              className="flex items-center space-x-1"
            >
              <FaThumbsDown />
              <span>{detailDiscussion.downVotes.length}</span>
            </button>
            {ownerUser && (
              <div className="flex flex-row items-center gap-2">
                <p>Dibuat oleh</p>
                <img
                  src={ownerUser.avatar}
                  alt={ownerUser.name}
                  className="w-6 h-6 rounded-full"
                />
                <p>{ownerUser.name}</p>
                <p className="text-sm">
                  {postedAt(detailDiscussion.createdAt)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          {detailDiscussion.comments.map((comment) => {
            const commentUser = users.find(
              (user) => user.id === comment.ownerId
            );
            return (
              commentUser && (
                <div key={comment.id} className="flex items-center mb-4">
                  <img
                    src={commentUser.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-text font-semibold">
                      {commentUser.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {postedAt(comment.createdAt)}
                    </p>
                    <p className="text-text">{comment.content}</p>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      <div className="mt-4 flex items-center px-40">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-2 bg-card1 text-text rounded-lg focus:bg-text focus:text-bekgron"
          placeholder="Post your comment"
        />
        <button
          onClick={handleAddComment}
          className="ml-2 p-2 bg-text text-bekgron rounded-lg"
        >
          Add Comment
        </button>
      </div>
      <Modal
        text={modalMessage}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
    </div>
  );
}
