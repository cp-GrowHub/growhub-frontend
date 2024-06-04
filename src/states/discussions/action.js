const ActionType = {
  RECEIVE_DISCUSSIONS: 'discussions/RECEIVE_DISCUSSIONS',
  CREATE_DISCUSSION: 'discussions/CREATE_DISCUSSION',
  RECEIVE_DETAIL_DISCUSSION: 'discussions/RECEIVE_DETAIL_DISCUSSION',
  ADD_COMMENT: 'discussions/ADD_COMMENT',
  DELETE_DISCUSSION: 'discussions/DELETE_DISCUSSION',
  DELETE_COMMENT: 'discussions/DELETE_COMMENT',
  UPVOTE_DISCUSSION: 'discussions/UPVOTE_DISCUSSION',
  DOWNVOTE_DISCUSSION: 'discussions/DOWNVOTE_DISCUSSION',
  NEUTRALIZE_DISCUSSION_VOTE: 'discussions/NEUTRALIZE_DISCUSSION_VOTE',
  UPVOTE_COMMENT: 'discussions/UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'discussions/DOWNVOTE_COMMENT',
  NEUTRALIZE_COMMENT_VOTE: 'discussions/NEUTRALIZE_COMMENT_VOTE',
};

function receiveDiscussionsActionCreator(discussions) {
  return {
    type: ActionType.RECEIVE_DISCUSSIONS,
    payload: {
      discussions,
    },
  };
}

function createDiscussionActionCreator(discussion) {
  return {
    type: ActionType.CREATE_DISCUSSION,
    payload: {
      discussion,
    },
  };
}

function receiveDetailDiscussionActionCreator(discussion) {
  return {
    type: ActionType.RECEIVE_DETAIL_DISCUSSION,
    payload: {
      discussion,
    },
  };
}

function addCommentActionCreator(discussionId, comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      discussionId,
      comment,
    },
  };
}

function deleteDiscussionActionCreator({ discussionId }) {
  return {
    type: ActionType.DELETE_DISCUSSION,
    payload: {
      discussionId,
    },
  };
}

function deleteCommentActionCreator({ commentId, discussionId }) {
  return {
    type: ActionType.DELETE_COMMENT,
    payload: {
      commentId,
      discussionId,
    },
  };
}

function upvoteDiscussionActionCreator({ discussionId }) {
  return {
    type: ActionType.UPVOTE_DISCUSSION,
    payload: {
      discussionId,
    },
  };
}

function downvoteDiscussionActionCreator({ discussionId }) {
  return {
    type: ActionType.DOWNVOTE_DISCUSSION,
    payload: {
      discussionId,
    },
  };
}

function neutralizeDiscussionVoteActionCreator({ discussionId }) {
  return {
    type: ActionType.NEUTRALIZE_DISCUSSION_VOTE,
    payload: {
      discussionId,
    },
  };
}

function upvoteCommentActionCreator({ discussionId, commentId }) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: {
      discussionId,
      commentId,
    },
  };
}

function downvoteCommentActionCreator({ discussionId, commentId }) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: {
      discussionId,
      commentId,
    },
  };
}

function neutralizeCommentVoteActionCreator({ discussionId, commentId }) {
  return {
    type: ActionType.NEUTRALIZE_COMMENT_VOTE,
    payload: {
      discussionId,
      commentId,
    },
  };
}

export {
  ActionType,
  receiveDiscussionsActionCreator,
  createDiscussionActionCreator,
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
};
