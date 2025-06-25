import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
  loading: false,
  success: false,
  blogs: [
    {
      title: "",
      author: "",
      profilePhoto: "",
      category: "",
      readTime: "",
      body: "",
      coverPhoto: "",
      date: "",
      comments: "",
    },
  ],
  blog: {
    title: "",
    author: "",
    profilePhoto: "",
    category: "",
    readTime: "",
    body: "",
    coverPhoto: "",
    date: "",
    comments: [],
  },
};

export const addBlog = createAsyncThunk("blog/add", async (data) => {
  const {
    title,
    author,
    profilePhoto,
    category,
    readTime,
    body,
    coverPhoto,
    date,
    comments,
  } = data;
  const response = await blogService.addBlog(
    title,
    author,
    profilePhoto,
    category,
    readTime,
    body,
    coverPhoto,
    date,
    comments
  );
  return response.data;
});

export const blogList = createAsyncThunk("blog/list", async () => {
  console.log("redux blogList");
  const response = await blogService.blogList();
  console.log("redux blogList response", response);
  return response.data;
});

export const getBlog = createAsyncThunk("blog/getBlog", async (id) => {
  const response = await blogService.getBlog(id);
  return response.data;
});

export const updateBlog = createAsyncThunk(
  "blog/update",
  async ({ id, blog }) => {
    console.log("id ", id, "blog", blog);
    const response = await blogService.updateBlog(id, blog);
    return response.data;
  }
);

export const deleteBlog = createAsyncThunk("blog/delete", async (id) => {
  const response = await blogService.deleteBlog(id);
  return response.data;
});

export const blogCommentCreate = createAsyncThunk(
  "blog/comments",
  async ({ id, addComment }) => {
    const response = await blogService.blogCommentCreate(id, addComment);
    return response.data;
  }
);

export const blogCommentDelete = createAsyncThunk(
  "blog/commentDelete",
  async (commentInfo) => {
    const { blogId, commentId } = commentInfo;
    const response = await blogService.blogCommentDelete(blogId, commentId);
    return response.data;
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    blogSearched(state, action) {
      console.log("blogSearched searchText", action.payload);
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //blogs list
      .addCase(blogList.pending, (state, action) => {
        console.log("blogSlice blogList.pending", action.payload);
        state.loading = true;
        state.success = false;
      })
      .addCase(blogList.fulfilled, (state, action) => {
        console.log("blogSlice blogList.fulfilled", action.payload);
        console.log(action.payload.blogs);
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.success = true;
      })
      .addCase(blogList.rejected, (state, action) => {
        console.log("blogSlice blogList.rejected", action.payload);
        state.loading = false;
        state.success = false;
      })

      //add blog
      .addCase(addBlog.pending, (state, action) => {
        console.log("blogSlice addBlog.pending", action.payload);
        state.loading = true;
        state.success = false;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        console.log("blogSlice addBlog.fulfilled", action.payload);
        console.log(action.payload.blog);
        state.loading = false;
        state.success = true;
      })
      .addCase(addBlog.rejected, (state, action) => {
        console.log("blogSlice addBlog.rejected", action.payload);
        state.loading = false;
        state.success = false;
      })

      // // Get One Blog
      .addCase(getBlog.pending, (state, action) => {
        console.log("blogSlice getBlog.pending", action.payload);
        state.loading = true;
        state.success = false;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        console.log("blogSlice getblog.fulfilled", action.payload);
        console.log(action.payload);
        state.loading = false;
        state.blog = action.payload;
        state.success = true;
      })
      .addCase(getBlog.rejected, (state, action) => {
        console.log("blogSlice getBlog.rejected", action.payload);
        state.loading = false;
        state.success = false;
      })

      // // Update One Blog
      .addCase(updateBlog.pending, (state, action) => {
        console.log("blogSlice updateBlog.pending", action.payload);
        state.loading = true;
        state.success = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        console.log("blogSlice updateBlog.fulfilled", action.payload);
        console.log(action.payload);
        state.loading = false;
        state.blog = action.payload.blog;
        state.success = true;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        console.log("blogSlice updateBlog.rejected", action.payload);
        state.loading = false;
        state.success = false;
      })

      // // Delete Blog
      .addCase(deleteBlog.pending, (state, action) => {
        console.log("blogSlice deleteBlog.pending", action.payload);
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        console.log("blogSlice deleteBlog.fulfilled", action.payload);
        console.log(action.payload);
        state.loading = false;
        state.blog = action.payload;
        state.success = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        console.log("blogSlice deleteBlog.rejected", action.payload);
        state.loading = false;
        state.success = false;
      })

      //Blog Comment Create
      .addCase(blogCommentCreate.pending, (state, action) => {
        console.log("blogSlice blogCommentCreate.pending", action.payload);
        state.loading = true;
        state.success = false;
      })
      .addCase(blogCommentCreate.fulfilled, (state, action) => {
        console.log(
          "blogSlice blogCommentCreate.fulfilled",
          action.payload.blog
        );
        console.log(action.payload);
        state.loading = false;
        state.blog = action.payload.blog;
        state.success = true;
      })
      .addCase(blogCommentCreate.rejected, (state, action) => {
        console.log("blogSlice blogCommentCreate.rejected", action.payload);
        state.loading = false;
        state.success = false;
      })

      //Blog Comment Delete
      .addCase(blogCommentDelete.pending, (state, action) => {
        console.log("blogSlice blogCommentDelete.pending", action.payload);
        state.loading = true;
      })
      .addCase(blogCommentDelete.fulfilled, (state, action) => {
        console.log(
          "blogSlice blogCommentDelete.fulfilled",
          action.payload.blog
        );
        console.log(action.payload);
        state.loading = false;
        state.blog = action.payload.blog;
        state.success = true;
      })
      .addCase(blogCommentDelete.rejected, (state, action) => {
        console.log("blogSlice blogCommentDelete.rejected", action.payload);
        state.loading = false;
      });
  },
});

export const { blogSearched } = blogSlice.actions;

export default blogSlice.reducer;
