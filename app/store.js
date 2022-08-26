import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { firebase } from '@react-native-firebase/firestore'
import { fetchProfile, ProfileSlice } from './profile.slice'
import { AnswersSlice } from './answers.slice'
import { getQuestions, postQuestion, questionsSlice } from './questions.slice'
import { LikeSlice } from './likes.slice'

export const fetchFeeds = createAsyncThunk(
  'fetch/Feeds',
  async (userId, thunkAPI) => {
    try {
      const firestore = firebase.firestore()
      firestore
        .collection('follow')
        .where('uid', '==', userId)
        .onSnapshot((follow) => {
          follow.forEach(async (snap) => {
            const ffeed = firestore
              .collection('answers')
              .where('uid', '==', snap.data().fuid)
            ffeed.onSnapshot((feedsnap) => {
              feedsnap.forEach((feed) => {
                thunkAPI.dispatch(fetchProfile(feed.data().uid))
                thunkAPI.dispatch(
                  feeds.actions.add({ id: feed.id, ...feed.data() }),
                )
              })
            })
          })
        })
      return thunkAPI.fulfillWithValue(true)
    } catch (e) {
      return thunkAPI.rejectWithValue('Something went wrong!')
    }
  },
)

const feeds = createSlice({
  name: 'feeds',
  initialState: {
    isLoading: false,
    data: {},
  },
  reducers: {
    add: (state, action) => {
      const { id } = action.payload
      state.data[id] = action.payload
    },
    intialize: (state) => {
      state.data = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.fulfilled, (state) => {
      state.isLoading = false
    }),
      builder.addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true
      }),
      builder.addCase(fetchFeeds.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    [feeds.name]: feeds.reducer,
    [ProfileSlice.name]: ProfileSlice.reducer,
    [AnswersSlice.name]: AnswersSlice.reducer,
    [questionsSlice.name]: questionsSlice.reducer,
    [LikeSlice.name]: LikeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

store.dispatch(getQuestions())
