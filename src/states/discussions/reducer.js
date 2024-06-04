import { ActionType } from './action';

const initialState = {
  discussions: [],
  detailDiscussion: null,
};

const discussionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_DISCUSSIONS:
      return {
        ...state,
        discussions: action.payload.discussions,
      };
    case ActionType.CREATE_DISCUSSION:
      return {
        ...state,
        discussions: [...state.discussions, action.payload.discussion],
      };
    case ActionType.RECEIVE_DETAIL_DISCUSSION:
      return {
        ...state,
        detailDiscussion: action.payload.discussion,
      };
    case ActionType.ADD_COMMENT:
      return {
        ...state,
        detailDiscussion: {
          ...state.detailDiscussion,
          comments: [
            ...state.detailDiscussion.comments,
            action.payload.comment,
          ],
        },
        discussions: state.discussions.map((discussion) =>
          discussion.id === action.payload.discussionId
            ? {
                ...discussion,
                comments: [...discussion.comments, action.payload.comment],
              }
            : discussion
        ),
      };
    case ActionType.DELETE_DISCUSSION:
      return {
        ...state,
        discussions: state.discussions.filter(
          (discussion) => discussion.id !== action.payload.discussionId
        ),
      };
    case ActionType.DELETE_COMMENT:
      return {
        ...state,
        detailDiscussion: {
          ...state.detailDiscussion,
          comments: state.detailDiscussion.comments.filter(
            (comment) => comment.id !== action.payload.commentId
          ),
        },
        discussions: state.discussions.map((discussion) =>
          discussion.id === action.payload.discussionId
            ? {
                ...discussion,
                comments: discussion.comments.filter(
                  (comment) => comment.id !== action.payload.commentId
                ),
              }
            : discussion
        ),
      };
    case ActionType.UPVOTE_DISCUSSION:
      return {
        ...state,
        detailDiscussion: {
          ...state.detailDiscussion,
          upVotes: [...state.detailDiscussion.upVotes, action.payload.userId],
          downVotes: state.detailDiscussion.downVotes.filter(
            (id) => id !== action.payload.userId
          ),
        },
        discussions: state.discussions.map((discussion) =>
          discussion.id === action.payload.discussionId
            ? {
                ...discussion,
                upVotes: [...discussion.upVotes, action.payload.userId],
                downVotes: discussion.downVotes.filter(
                  (id) => id !== action.payload.userId
                ),
              }
            : discussion
        ),
      };
    case ActionType.DOWNVOTE_DISCUSSION:
      return {
        ...state,
        detailDiscussion: {
          ...state.detailDiscussion,
          downVotes: [
            ...state.detailDiscussion.downVotes,
            action.payload.userId,
          ],
          upVotes: state.detailDiscussion.upVotes.filter(
            (id) => id !== action.payload.userId
          ),
        },
        discussions: state.discussions.map((discussion) =>
          discussion.id === action.payload.discussionId
            ? {
                ...discussion,
                downVotes: [...discussion.downVotes, action.payload.userId],
                upVotes: discussion.upVotes.filter(
                  (id) => id !== action.payload.userId
                ),
              }
            : discussion
        ),
      };
    case ActionType.NEUTRALIZE_DISCUSSION_VOTE:
      return {
        ...state,
        detailDiscussion: {
          ...state.detailDiscussion,
          upVotes: state.detailDiscussion.upVotes.filter(
            (id) => id !== action.payload.userId
          ),
          downVotes: state.detailDiscussion.downVotes.filter(
            (id) => id !== action.payload.userId
          ),
        },
        discussions: state.discussions.map((discussion) =>
          discussion.id === action.payload.discussionId
            ? {
                ...discussion,
                upVotes: discussion.upVotes.filter(
                  (id) => id !== action.payload.userId
                ),
                downVotes: discussion.downVotes.filter(
                  (id) => id !== action.payload.userId
                ),
              }
            : discussion
        ),
      };
    case ActionType.UPVOTE_COMMENT:
      return {
        ...state,
        detailDiscussion: {
          ...state.detailDiscussion,
          comments: state.detailDiscussion.comments.map((comment) =>
            comment.id === action.payload.commentId
              ? {
                  ...comment,
                  upVotes: [...comment.upVotes, action.payload.userId],
                  downVotes: comment.downVotes.filter(
                    (id) => id !== action.payload.userId
                  ),
                }
              : comment
          ),
        },
      };
    case ActionType.DOWNVOTE_COMMENT:
      return {
        ...state,
        detailDiscussion: {
          ...state.detailDiscussion,
          comments: state.detailDiscussion.comments.map((comment) =>
            comment.id === action.payload.commentId
              ? {
                  ...comment,
                  downVotes: [...comment.downVotes, action.payload.userId],
                  upVotes: comment.upVotes.filter(
                    (id) => id !== action.payload.userId
                  ),
                }
              : comment
          ),
        },
      };
    case ActionType.NEUTRALIZE_COMMENT_VOTE:
      return {
        ...state,
        detailDiscussion: {
          ...state.detailDiscussion,
          comments: state.detailDiscussion.comments.map((comment) =>
            comment.id === action.payload.commentId
              ? {
                  ...comment,
                  upVotes: comment.upVotes.filter(
                    (id) => id !== action.payload.userId
                  ),
                  downVotes: comment.downVotes.filter(
                    (id) => id !== action.payload.userId
                  ),
                }
              : comment
          ),
        },
      };
    default:
      return state;
  }
};

export default discussionsReducer;
