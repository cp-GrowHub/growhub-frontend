const ActionType = {
  RECEIVE_BLOGS: 'blogs/RECEIVE_BLOGS',
  CREATE_BLOG: 'blogs/CREATE_BLOG',
  UPDATE_BLOG: 'blogs/UPDATE_BLOG',
  DELETE_BLOG: 'blogs/DELETE_BLOG',
  RECEIVE_DETAIL_BLOG: 'blogs/RECEIVE_DETAIL_BLOG',
};

function receiveBlogsActionCreator(blogs) {
  return {
    type: ActionType.RECEIVE_BLOGS,
    payload: {
      blogs,
    },
  };
}

function createBlogActionCreator(blog) {
  return {
    type: ActionType.CREATE_BLOG,
    payload: {
      blog,
    },
  };
}

function updateBlogActionCreator(blog) {
  return {
    type: ActionType.UPDATE_BLOG,
    payload: {
      blog,
    },
  };
}

function deleteBlogActionCreator({ blogId }) {
  return {
    type: ActionType.DELETE_BLOG,
    payload: {
      blogId,
    },
  };
}

function receiveDetailBlogActionCreator(blog) {
  return {
    type: ActionType.RECEIVE_DETAIL_BLOG,
    payload: {
      blog,
    },
  };
}

export {
  ActionType,
  receiveBlogsActionCreator,
  createBlogActionCreator,
  updateBlogActionCreator,
  deleteBlogActionCreator,
  receiveDetailBlogActionCreator,
};
