import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Register user
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', userData);
      Cookies.set('token', response.data.token, { expires: 7, secure: true });
      // تأكد من إرجاع البيانات التي تحتوي على المستخدم والـ token
      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', loginData);
      Cookies.set('token', response.data.token, { expires: 7, secure: true });
      // تأكد من إرجاع البيانات التي تحتوي على المستخدم والـ token
      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
