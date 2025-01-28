export const API_BASE_URL = 'http://localhost:1111/api';

export const AUTH = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  UPDATE_PROFILE: `${API_BASE_URL}/auth/update-profile`,
};

export const USER = {
  VALIDATE_USER: `${API_BASE_URL}/auth/user`,
  GET_PROFILE: `${API_BASE_URL}/user/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/user/update-profile`,
};

export const POSTS = {
  GET_ALL: `${API_BASE_URL}/posts`,
  CREATE: `${API_BASE_URL}/posts/create`,
  UPDATE: `${API_BASE_URL}/posts/update`,
  DELETE: `${API_BASE_URL}/posts/delete`,
};