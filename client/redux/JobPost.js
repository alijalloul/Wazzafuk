import { createSlice } from "@reduxjs/toolkit";

const baseURL = "http://192.168.0.8:5000";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postInfoById: null,
    postsInfo: [],
    currentPage: 1,
    numberOfPages: null,
    pending: false,
    error: false,
  },
  reducers: {
    startAPI: (state) => {
      state.pending = true;
    },
    changePageSuccess: (state, action) => {
      state.pending = false;
      state.currentPage = action.payload;
    },

    fetchSuccess: (state, action) => {
      state.pending = false;
      state.postsInfo = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
    },
    errorAPI: (state) => {
      state.pending = null;
      state.error = true;
    },
  },
});

export const changePage = async (page, dispatch) => {
  dispatch(postSlice.actions.startAPI());

  try {
    dispatch(postSlice.actions.changePageSuccess(page));
  } catch (error) {
    dispatch(postSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export const fetchPosts = async (page, dispatch) => {
  dispatch(postSlice.actions.startAPI());

  try {
    const res = await fetch(`${baseURL}/posts/${page}`, {
      method: "GET",
    });

    const data = await res.json();

    dispatch(postSlice.actions.fetchSuccess(data));
  } catch (error) {
    dispatch(postSlice.actions.errorAPI());
    console.log("error: ", error);
  }
};

export default postSlice.reducer;
