import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  createDiscussionActionCreator,
  receiveDiscussionsActionCreator,
  receiveDetailDiscussionActionCreator,
  addCommentActionCreator,
  deleteDiscussionActionCreator,
  deleteCommentActionCreator,
  upvoteDiscussionActionCreator,
  downvoteDiscussionActionCreator,
  neutralizeDiscussionVoteActionCreator,
  upvoteCommentActionCreator,
  downvoteCommentActionCreator,
  neutralizeCommentVoteActionCreator,
} from './action';
import api from '../../utils/api';

function asyncGetDiscussions() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.getDiscussions();
      const { discussions } = response.data;
      dispatch(receiveDiscussionsActionCreator(discussions));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateDiscussion({ title, body, tags }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.createDiscussion({ title, body, tags });
      const { discussion } = response.data;
      dispatch(createDiscussionActionCreator(discussion));
      alert(response.message);
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetDetailDiscussion({ discussionId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.getDetailDiscussion({ discussionId });
      const { discussion } = response.data;
      dispatch(receiveDetailDiscussionActionCreator(discussion));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ discussionId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.addComment({ discussionId, content });
      const { comment } = response.data;
      dispatch(addCommentActionCreator(discussionId, comment));
      alert(response.message);
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteDiscussion({ discussionId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.deleteDiscussion({ discussionId });
      dispatch(deleteDiscussionActionCreator({ discussionId }));
      alert(response.message);
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteComment({ discussionId, commentId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.deleteComment({ discussionId, commentId });
      dispatch(deleteCommentActionCreator({ discussionId, commentId }));
      alert(response.message);
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpvoteDiscussion({ discussionId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.upvoteDiscussion({ discussionId });
      dispatch(upvoteDiscussionActionCreator({ discussionId }));
      dispatch(asyncGetDetailDiscussion({ discussionId }));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDownvoteDiscussion({ discussionId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.downvoteDiscussion({ discussionId });
      dispatch(downvoteDiscussionActionCreator({ discussionId }));
      dispatch(asyncGetDetailDiscussion({ discussionId }));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncNeutralizeDiscussionVote({ discussionId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.neutralizeDiscussion({ discussionId });
      dispatch(neutralizeDiscussionVoteActionCreator({ discussionId }));
      dispatch(asyncGetDetailDiscussion({ discussionId }));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpvoteComment({ discussionId, commentId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.upvoteComment({ discussionId, commentId });
      dispatch(upvoteCommentActionCreator({ discussionId, commentId }));
      alert(response.message);
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDownvoteComment({ discussionId, commentId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.downvoteComment({ discussionId, commentId });
      dispatch(downvoteCommentActionCreator({ discussionId, commentId }));
      alert(response.message);
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncNeutralizeCommentVote({ discussionId, commentId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.neutralizeComment({
        discussionId,
        commentId,
      });
      dispatch(neutralizeCommentVoteActionCreator({ discussionId, commentId }));
      alert(response.message);
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  asyncGetDiscussions,
  asyncCreateDiscussion,
  asyncGetDetailDiscussion,
  asyncAddComment,
  asyncDeleteDiscussion,
  asyncDeleteComment,
  asyncUpvoteDiscussion,
  asyncDownvoteDiscussion,
  asyncNeutralizeDiscussionVote,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralizeCommentVote,
};
