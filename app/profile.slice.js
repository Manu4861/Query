import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import {
  checkIsfollowing,
  follow,
  getAllProfiles,
  getProfile,
  update_follow_count,
} from './features/Feed'

export const fetchProfile = createAsyncThunk(
  'profiles/fetch',
  async (
    { currentUid, uid },
    { fulfillWithValue, rejectWithValue, dispatch },
  ) => {
    try {
      const profile = await getProfile(currentUid, uid)
      dispatch(addOne(profile))
      return fulfillWithValue(true)
    } catch (e) {
      return rejectWithValue(false)
    }
  },
)

export const fetchAllProfiles = createAsyncThunk(
  'profiles/fetchAll',
  async ({ follwingIds }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      follwingIds.map((Id) => {
        getAllProfiles(Id).then((profile) => {
          dispatch(addOne(profile))
        })
      })
      return fulfillWithValue(true)
    } catch (e) {
      return rejectWithValue(false)
    }
  },
)

export const followProfile = createAsyncThunk(
  'profiles/follow',
  async (
    { currentUid, uid },
    { fulfillWithValue, rejectWithValue, dispatch },
  ) => {
    try {
      await follow(currentUid, uid)
      const followersCount = await update_follow_count(currentUid, uid)
      const isFollowing = await checkIsfollowing(currentUid, uid)
      dispatch(
        updateOne({
          id: uid,
          changes: {
            followersCount,
            isFollowing: isFollowing,
          },
        }),
      )
      return fulfillWithValue(true)
    } catch (e) {
      return rejectWithValue(false)
    }
  },
)

export const ProfileAdapter = createEntityAdapter({
  selectId: (profile) => profile.uid,
})

export const ProfileSlice = createSlice({
  name: 'profiles',
  initialState: ProfileAdapter.getInitialState({ isLoading: false }),
  reducers: {
    addOne: ProfileAdapter.addOne,
    updateOne: ProfileAdapter.updateOne,
    addProfiles: ProfileAdapter.addMany,
  },
  extraReducers: {},
})

export const { addOne, updateOne } = ProfileSlice.actions
