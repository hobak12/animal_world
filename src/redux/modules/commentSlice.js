import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ver.1 Input에 title와 content만 추가 */
const initialState = {
  comment: [],
  isLoading: false,
  error: null,
};

// comments 받아오기 (BoardDetail에서 사용)
export const __getComments = createAsyncThunk(
  "comment/getComments",
  async (payload, thunkApi) => {
    try {
      const data = await axios.get(
        "http://localhost:3001/comment?_sort=time&_order=asc"
      );
      return thunkApi.fulfillWithValue(data.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// comment 추가 (CommentInput에서 사용)
export const __postComment = createAsyncThunk(
  "comment/postComment",
  async (payload, thunkApi) => {
    try {
      const data = await axios.post("http://localhost:3001/comment", payload);
      return thunkApi.fulfillWithValue(data.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// comment 삭제 (BoardDetail에서 사용)
export const __deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (payload, thunkApi) => {
    try {
      await axios.delete(`http://localhost:3003/comment/${payload}`);
      return thunkApi.fulfillWithValue(payload);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const __editComment = createAsyncThunk(
  "comment/editComment",
  async (payload, thunkApi) => {
    try {
      await axios.patch(`http://localhost:3003/comment/${payload.id}`, payload);
      return thunkApi.fulfillWithValue(payload);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__postComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = [...state.comment, action.payload];
    },
    [__postComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = state.comment.filter((del) => del.id !== action.payload);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__editComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__editComment.fulfilled]: (state, action) => {
      const { id, content } = action.payload;
      state.isLoading = false;
      state.comment = state.comment.map((item) =>
        item.id === id
          ? {
              ...item,
              content: content,
            }
          : item
      );
    },
    [__editComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default commentSlice.reducer;
