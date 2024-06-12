import axios from 'axios';
import store from '../states/index';
import { asyncUnsetAuthUser } from '../states/authUser/thunk';

const api = (() => {
  const BASE_URL = '/api';
  const QUOTES_URL = 'https://stoic.tekloon.net';

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const quotesInstance = axios.create({
    baseURL: QUOTES_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        if (
          status === 401 &&
          (data.message === 'Token has expired' ||
            data.message === 'Token is no longer valid' ||
            data.message === 'Invalid token')
        ) {
          // Jika status 401 dan pesan adalah 'Token is no longer valid', unset auth user
          store.dispatch(asyncUnsetAuthUser());
        }
      }
      return Promise.reject(error);
    }
  );

  const apiRequest = async (method, endpoint, data) => {
    try {
      const response = await instance({
        method,
        url: endpoint,
        data,
      });

      const responseData = response.data;
      if (responseData.status !== 'success') {
        throw new Error(responseData.message);
      }
      return responseData;
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };

  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };

  const putAccessToken = (accessToken) => {
    return localStorage.setItem('accessToken', accessToken);
  };

  const clearAccessToken = () => {
    localStorage.removeItem('accessToken');
  };

  const getQuote = async () => {
    try {
      const response = await quotesInstance.get('/stoic-quote');
      return {
        author: response.data.author,
        quote: response.data.quote,
      };
    } catch (error) {
      throw new Error(error.message || 'Something went wrong');
    }
  };

  /**
   * Register a new user with the provided information.
   *
   * @param {Object} param0 - An object containing user registration information.
   * @param {string} param0.firstName - The first name of the user.
   * @param {string} param0.lastName - The last name of the user.
   * @param {string} param0.email - The email address of the user.
   * @param {string} param0.password - The password for the user account.
   * @returns {Promise<string>} - Returns a promise that resolves to the userId of the newly registered user.
   */
  const register = async ({ firstName, lastName, email, password }) => {
    const response = await apiRequest('POST', '/register', {
      firstName,
      lastName,
      email,
      password,
    });

    return response.data.userId; // '8zTi5KTvOgXnskPT'
  };

  /**
   * Login a user with the provided credentials.
   *
   * @param {Object} param0 - An object containing user login information.
   * @param {string} param0.email - The email address of the user.
   * @param {string} param0.password - The password for the user account.
   * @returns {Promise<string>} - Returns a promise that resolves to the access token.
   */
  const login = async ({ email, password }) => {
    const response = await apiRequest('POST', '/login', {
      email,
      password,
    });

    putAccessToken(response.data.token);
    return response.data.token; // 'sebuahtokenKE1023QkSj'
  };

  /**
   * Get all users.
   *
   * @returns {Promise<Array>} - Returns a promise that resolves to an array of users.
   */
  const getAllUsers = async () => {
    const response = await apiRequest('GET', '/users');

    return response.data.users; // [{}]
  };

  /**
   * Get the profile of the authenticated user.
   *
   * @returns {Promise<Object>} - Returns a promise that resolves to the user's profile.
   */
  const getOwnProfile = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/users/me');

    return response.data.user; // {}
  };

  /**
   * Update the profile of the authenticated user.
   *
   * @param {Object} param0 - An object containing user profile information.
   * @param {string} param0.firstName - The first name of the user.
   * @param {string} param0.lastName - The last name of the user.
   * @param {string} param0.bio - The bio of the user.
   * @param {string} param0.email - The email address of the user.
   * @returns {Promise<Object>} - Returns a promise that resolves to the updated user profile.
   */
  const updateOwnProfile = async ({ firstName, lastName, bio, email }) => {
    const response = await apiRequest('PUT', '/users/me/edit', {
      firstName,
      lastName,
      bio,
      email,
    });

    return response.data.user;
  };

  /**
   * Get all todos of the authenticated user.
   *
   * @returns {Promise<Array>} - Returns a promise that resolves to an array of todos.
   */
  const getTodosByUser = async () => {
    const token = getAccessToken();
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await apiRequest('GET', '/todos');

    return response.data.todos;
  };

  /**
   * Create a new todo.
   *
   * @param {Object} param0 - An object containing todo information.
   * @param {string} param0.name - The name of the todo.
   * @param {boolean} param0.highPriority - The priority level of the todo.
   * @param {string} param0.priority - The priority level of the todo.
   * @returns {Promise<Object>} - Returns a promise that resolves to the created todo.
   */
  const createTodo = async ({ name, highPriority, priority }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('POST', '/todos', {
      name,
      highPriority,
      priority,
    });

    return response.data.todo;
  };

  /**
   * Update an existing todo.
   *
   * @param {Object} param0 - An object containing updated todo information.
   * @param {boolean} param0.highPriority - The priority level of the todo.
   * @param {string} param0.priority - The priority level of the todo.
   * @param {boolean} param0.finished - Whether the todo is finished.
   * @param {string} param0.todoId - The ID of the todo to update.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const updateTodo = async ({ finished, todoId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('PUT', `/todos/${todoId}`, {
      finished,
    });

    return response.data.todo;
  };

  /**
   * Delete an existing todo.
   *
   * @param {Object} param0 - An object containing the ID of the todo to delete.
   * @param {string} param0.todoId - The ID of the todo to delete.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const deleteTodo = async ({ todoId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('DELETE', `/todos/${todoId}`);

    return response.message;
  };

  /**
   * Get all goals of the authenticated user.
   *
   * @returns {Promise<Array>} - Returns a promise that resolves to an array of goals.
   */
  const getGoalsByUser = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/goals');

    return response.data.goals;
  };

  /**
   * Create a new goal.
   *
   * @param {Object} param0 - An object containing goal information.
   * @param {string} param0.name - The name of the goal.
   * @param {string} param0.deadline - The deadline of the goal.
   * @returns {Promise<Object>} - Returns a promise that resolves to the created goal.
   */
  const createGoal = async ({ name, deadline }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('POST', '/goals', { name, deadline });

    return response.data.goal;
  };

  /**
   * Update an existing goal.
   *
   * @param {Object} param0 - An object containing updated goal information.
   * @param {boolean} param0.finished - Whether the goal is finished.
   * @param {string} param0.goalId - The ID of the goal to update.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const updateGoal = async ({ finished, goalId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('PUT', `/goals/${goalId}`, { finished });

    return response.data.goal;
  };

  /**
   * Delete an existing goal.
   *
   * @param {Object} param0 - An object containing the ID of the goal to delete.
   * @param {string} param0.goalId - The ID of the goal to delete.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const deleteGoal = async ({ goalId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('DELETE', `/goals/${goalId}`);

    return response.message;
  };

  /**
   * Get all notes of the authenticated user.
   *
   * @returns {Promise<Array>} - Returns a promise that resolves to an array of notes.
   */
  const getNotesByUser = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/notes');

    return response.data.notes;
  };

  /**
   * Create a new note.
   *
   * @param {Object} param0 - An object containing note information.
   * @param {string} param0.title - The title of the note.
   * @param {string} param0.body - The body of the note.
   * @param {boolean} param0.archived - Whether the note is archived.
   * @returns {Promise<Object>} - Returns a promise that resolves to the created note.
   */
  const createNote = async ({ title, body, archived }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('POST', '/notes', {
      title,
      body,
      archived,
    });

    return response.data.note;
  };

  /**
   * Get the details of a specific note.
   *
   * @param {Object} param0 - An object containing the ID of the note to retrieve.
   * @param {string} param0.noteId - The ID of the note to retrieve.
   * @returns {Promise<Object>} - Returns a promise that resolves to the note details.
   */
  const getDetailNote = async ({ noteId }) => {
    const response = await apiRequest('GET', `/notes/${noteId}`);

    return response.data.note;
  };

  /**
   * Edit an existing note.
   *
   * @param {Object} param0 - An object containing updated note information.
   * @param {string} param0.title - The title of the note.
   * @param {string} param0.body - The body of the note.
   * @param {boolean} param0.archived - Whether the note is archived.
   * @param {string} param0.noteId - The ID of the note to update.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const editNote = async ({ title, body, archived, noteId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('PUT', `/notes/${noteId}/edit`, {
      title,
      body,
      archived,
    });

    return response.data.note;
  };

  /**
   * Delete an existing note.
   *
   * @param {Object} param0 - An object containing the ID of the note to delete.
   * @param {string} param0.noteId - The ID of the note to delete.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const deleteNote = async ({ noteId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('DELETE', `/notes/${noteId}`);

    return response.message;
  };

  /**
   * Get all discussions.
   *
   * @returns {Promise<Array>} - Returns a promise that resolves to an array of discussions.
   */
  const getDiscussions = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/discussions');

    return response;
  };

  /**
   * Create a new discussion.
   *
   * @param {Object} param0 - An object containing discussion information.
   * @param {string} param0.title - The title of the discussion.
   * @param {string} param0.body - The body of the discussion.
   * @param {Array<string>} param0.tags - The tags of the discussion.
   * @returns {Promise<Object>} - Returns a promise that resolves to the created discussion.
   */
  const createDiscussion = async ({ title, body, tags }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('POST', `/discussions`, {
      title,
      body,
      tags,
    });

    return response;
  };

  /**
   * Get the details of a specific discussion.
   *
   * @param {Object} param0 - An object containing the ID of the discussion to retrieve.
   * @param {string} param0.discussionId - The ID of the discussion to retrieve.
   * @returns {Promise<Object>} - Returns a promise that resolves to the discussion details.
   */
  const getDetailDiscussion = async ({ discussionId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', `/discussions/${discussionId}`);

    return response;
  };

  /**
   * Add a comment to a discussion.
   *
   * @param {Object} param0 - An object containing comment information.
   * @param {string} param0.content - The content of the comment.
   * @param {string} param0.discussionId - The ID of the discussion to add the comment to.
   * @returns {Promise<Object>} - Returns a promise that resolves to the created comment.
   */
  const addComment = async ({ content, discussionId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest(
      'POST',
      `/discussions/${discussionId}/comments`,
      { content }
    );

    return response;
  };

  /**
   * Delete a discussion.
   *
   * @param {Object} param0 - An object containing the ID of the discussion to delete.
   * @param {string} param0.discussionId - The ID of the discussion to delete.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const deleteDiscussion = async ({ discussionId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('DELETE', `/discussions/${discussionId}`);

    return response;
  };

  /**
   * Delete a comment from a discussion.
   *
   * @param {Object} param0 - An object containing the IDs of the discussion and comment to delete.
   * @param {string} param0.discussionId - The ID of the discussion.
   * @param {string} param0.commentId - The ID of the comment to delete.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const deleteComment = async ({ discussionId, commentId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest(
      'DELETE',
      `/discussions/${discussionId}/comments/${commentId}`
    );

    return response;
  };

  /**
   * Upvote a discussion.
   *
   * @param {Object} param0 - An object containing the ID of the discussion to upvote.
   * @param {string} param0.discussionId - The ID of the discussion to upvote.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const upvoteDiscussion = async ({ discussionId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest(
      'POST',
      `/discussions/${discussionId}/upvote`
    );

    return response;
  };

  /**
   * Downvote a discussion.
   *
   * @param {Object} param0 - An object containing the ID of the discussion to downvote.
   * @param {string} param0.discussionId - The ID of the discussion to downvote.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const downvoteDiscussion = async ({ discussionId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest(
      'POST',
      `/discussions/${discussionId}/downvote`
    );

    return response;
  };

  /**
   * Neutralize vote on a discussion.
   *
   * @param {Object} param0 - An object containing the ID of the discussion to neutralize vote.
   * @param {string} param0.discussionId - The ID of the discussion to neutralize vote.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const neutralizeDiscussion = async ({ discussionId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest(
      'POST',
      `/discussions/${discussionId}/neutral-vote`
    );

    return response;
  };

  /**
   * Upvote a comment.
   *
   * @param {Object} param0 - An object containing the IDs of the discussion and comment to upvote.
   * @param {string} param0.discussionId - The ID of the discussion.
   * @param {string} param0.commentId - The ID of the comment to upvote.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const upvoteComment = async ({ discussionId, commentId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest(
      'POST',
      `/discussions/${discussionId}/comments/${commentId}/upvote`
    );

    return response;
  };

  /**
   * Downvote a comment.
   *
   * @param {Object} param0 - An object containing the IDs of the discussion and comment to downvote.
   * @param {string} param0.discussionId - The ID of the discussion.
   * @param {string} param0.commentId - The ID of the comment to downvote.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const downvoteComment = async ({ discussionId, commentId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest(
      'POST',
      `/discussions/${discussionId}/comments/${commentId}/downvote`
    );

    return response;
  };

  /**
   * Neutralize vote on a comment.
   *
   * @param {Object} param0 - An object containing the IDs of the discussion and comment to neutralize vote.
   * @param {string} param0.discussionId - The ID of the discussion.
   * @param {string} param0.commentId - The ID of the comment to neutralize vote.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const neutralizeComment = async ({ discussionId, commentId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest(
      'POST',
      `/discussions/${discussionId}/comments/${commentId}/neutral-vote`
    );

    return response;
  };

  /**
   * Create a new blog.
   *
   * @param {Object} param0 - An object containing blog information.
   * @param {string} param0.title - The title of the blog.
   * @param {string} param0.body - The body of the blog.
   * @param {Array<string>} param0.tags - The tags of the blog.
   * @returns {Promise<Object>} - Returns a promise that resolves to the created blog.
   */
  const createBlog = async ({ title, body, tags }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('POST', '/blogs/add', {
      title,
      body,
      tags,
    });

    return response;
  };

  /**
   * Get all blogs.
   *
   * @returns {Promise<Array>} - Returns a promise that resolves to an array of blogs.
   */
  const getAllBlogs = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/blogs');

    return response;
  };

  /**
   * Get the details of a specific blog.
   *
   * @param {Object} param0 - An object containing the ID of the blog to retrieve.
   * @param {string} param0.blogId - The ID of the blog to retrieve.
   * @returns {Promise<Object>} - Returns a promise that resolves to the blog details.
   */
  const getDetailBlog = async ({ blogId }) => {
    const response = await apiRequest('GET', `/blogs/${blogId}`);

    return response;
  };

  /**
   * Edit an existing blog.
   *
   * @param {Object} param0 - An object containing updated blog information.
   * @param {string} param0.title - The title of the blog.
   * @param {string} param0.body - The body of the blog.
   * @param {Array<string>} param0.tags - The tags of the blog.
   * @param {string} param0.blogId - The ID of the blog to update.
   * @returns {Promise<Object>} - Returns a promise that resolves to the updated blog.
   */
  const editBlog = async ({ title, body, tags, blogId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('PUT', `/blogs/${blogId}`, {
      title,
      body,
      tags,
    });

    return response;
  };

  /**
   * Delete an existing blog.
   *
   * @param {Object} param0 - An object containing the ID of the blog to delete.
   * @param {string} param0.blogId - The ID of the blog to delete.
   * @returns {Promise<string>} - Returns a promise that resolves to a success message.
   */
  const deleteBlog = async ({ blogId }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('DELETE', `/blogs/${blogId}/delete`);

    return response;
  };

  return {
    getAccessToken,
    putAccessToken,
    clearAccessToken,
    register,
    login,
    getAllUsers,
    getOwnProfile,
    updateOwnProfile,
    getTodosByUser,
    createTodo,
    updateTodo,
    deleteTodo,
    getGoalsByUser,
    createGoal,
    updateGoal,
    deleteGoal,
    getNotesByUser,
    createNote,
    getDetailNote,
    editNote,
    deleteNote,
    getDiscussions,
    createDiscussion,
    getDetailDiscussion,
    addComment,
    deleteDiscussion,
    deleteComment,
    upvoteDiscussion,
    downvoteDiscussion,
    neutralizeDiscussion,
    upvoteComment,
    downvoteComment,
    neutralizeComment,
    createBlog,
    getAllBlogs,
    getDetailBlog,
    editBlog,
    deleteBlog,
    getQuote,
  };
})();

export default api;
