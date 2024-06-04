import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  createBlogActionCreator,
  updateBlogActionCreator,
  deleteBlogActionCreator,
  receiveBlogsActionCreator,
  receiveDetailBlogActionCreator,
} from './action';
import api from '../../utils/api';

function asyncCreateBlog({ title, body, tags }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.createBlog({ title, body, tags });
      const { blog } = response.data;
      dispatch(createBlogActionCreator(blog));
      alert(response.message);
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpdateBlog({ title, body, tags, blogId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.editBlog({ title, body, tags, blogId });
      const { blog } = response.data;
      dispatch(updateBlogActionCreator(blog));
      alert(response.message);
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteBlog({ blogId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.deleteBlog({ blogId });
      dispatch(deleteBlogActionCreator({ blogId }));
      alert(response.message);
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetAllBlogs() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.getAllBlogs();
      const { blogs } = response.data;
      dispatch(receiveBlogsActionCreator(blogs));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncGetDetailBlog({ blogId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.getDetailBlog({ blogId });
      const { blog } = response.data;
      dispatch(receiveDetailBlogActionCreator(blog));
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  asyncCreateBlog,
  asyncUpdateBlog,
  asyncDeleteBlog,
  asyncGetAllBlogs,
  asyncGetDetailBlog,
};
