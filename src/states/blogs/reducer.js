import { ActionType } from './action';

const initialState = {
  blogs: [],
  detailBlog: null,
};

const blogsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_BLOGS:
      return {
        ...state,
        blogs: action.payload.blogs,
      };
    case ActionType.CREATE_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload.blog],
      };
    case ActionType.UPDATE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.id === action.payload.blog.id ? action.payload.blog : blog
        ),
      };
    case ActionType.DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload.blogId),
      };
    case ActionType.RECEIVE_DETAIL_BLOG:
      return {
        ...state,
        detailBlog: action.payload.blog,
      };
    default:
      return state;
  }
};

export default blogsReducer;
