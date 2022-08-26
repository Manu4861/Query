import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { checkIsLiked } from './features/Feed'

export const getLikes = createAsyncThunk(
  'like/get',
  async (
    { aid, currentUid },
    { fulfillWithValue, rejectWithValue, dispatch },
  ) => {
    try {
      const liked = await checkIsLiked(currentUid, aid)
      dispatch(addOneLike({ aid, isLiked: liked == 1 ? true : false }))
      return fulfillWithValue(aid)
    } catch (e) {
      rejectWithValue(e.message)
    }
  },
)

export const likeAns = createAsyncThunk(
  'like/post',
  async ({ aid, isLiked }, { dispatch }) => {
    dispatch(updateOneLike({ id: aid, changes: { isLiked: !isLiked } }))
  },
)

const LikesAdapter = createEntityAdapter({
  selectId: (like) => {
    return like.aid
  },
})

export const LikeSlice = createSlice({
  name: 'likes',
  initialState: LikesAdapter.getInitialState({ isFetching: false }),
  reducers: {
    updateOneLike: LikesAdapter.updateOne,
    addOneLike: LikesAdapter.addOne,
    addLikes: LikesAdapter.addMany,
  },
  extraReducers: {
    [getLikes.fulfilled]: (state) => {
      state.isFetching = false
    },
    [getLikes.pending]: (state) => {
      state.isFetching = true
    },
  },
})

export const LikesSelector = LikesAdapter.getSelectors((state) => state.likes)

export const { addOneLike, addLikes, updateOneLike } = LikeSlice.actions
