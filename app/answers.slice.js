import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { firebase } from '@react-native-firebase/firestore'
import { fetchProfile } from './profile.slice'
import {
  answerToQuestion,
  checkIsLiked,
  deleteAnswer,
  fetchFollowingFeeds,
  fetchFollowingIds,
  getAnswers,
  like,
  update_ACQ,
  update_likes_count,
} from './features/Feed'
import { questionsAdapter, questionsSlice } from './questions.slice'
import { getLikes, updateOneLike } from './likes.slice'

export const postAnswer = createAsyncThunk(
  'answers/post',
  async (
    { qid, uid, answer },
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const response = await answerToQuestion(qid, uid, answer)
      const answersCount = await update_ACQ(qid)
      dispatch(
        questionsSlice.actions.updateAnswersCount({
          id: qid,
          changes: { answersCount },
        }),
      )
      return fulfillWithValue({ answersCount, response })
    } catch (e) {
      rejectWithValue(e.message)
    }
  },
)

export const getAnswerByQId = createAsyncThunk(
  'answer/getByQId',
  async (
    { currentUid, qid },
    { fulfillWithValue, rejectWithValue, dispatch },
  ) => {
    try {
      const firestore = firebase.firestore()
      const response = await firestore
        .collection('answers')
        .where('qid', '==', qid)
        .get()
      const postedAns = response.docs.map((answer) => {
        dispatch(fetchProfile({ currentUid, uid: answer.data().uid }))
        dispatch(getLikes({ aid: answer.id, currentUid }))
        return { aid: answer.id, ...answer.data() }
      })
      return fulfillWithValue(postedAns)
    } catch (e) {
      rejectWithValue(e.message)
    }
  },
)

export const getFeeds = createAsyncThunk(
  'answer/getFeeds',
  async (
    { currentUid, followingIds, qid },
    { fulfillWithValue, rejectWithValue, dispatch },
  ) => {
    try {
      const response = await fetchFollowingFeeds(followingIds)
      const postedAns = response.docs.map((answer) => {
        dispatch(fetchProfile({ currentUid, uid: answer.data().uid }))
        dispatch(getLikes({ aid: answer.id, currentUid }))
        return { aid: answer.id, ...answer.data() }
      })

      return fulfillWithValue(postedAns)
    } catch (e) {
      rejectWithValue(e.message)
    }
  },
)

export const likeAnswer = createAsyncThunk(
  'answer/getByQId',
  async (
    { aid, currentUid, uid },
    { fulfillWithValue, rejectWithValue, dispatch },
  ) => {
    try {
      await like(currentUid, aid)
      const likesCount = await update_likes_count(aid)
      const isLiked = await checkIsLiked(currentUid, aid)
      dispatch(updateOneLike({ id: aid, changes: { isLiked } }))
      return fulfillWithValue(true)
    } catch (e) {
      rejectWithValue(e.message)
    }
  },
)

export const removeAnswer = createAsyncThunk(
  'answer/remove',
  async (
    { aid, qid, currentUid },
    { fulfillWithValue, rejectWithValue, dispatch },
  ) => {
    try {
      await deleteAnswer(aid, currentUid)
      const answersCount = await update_ACQ(qid)
      dispatch(
        questionsSlice.actions.updateAnswersCount({
          id: qid,
          changes: { answersCount },
        }),
      )
      dispatch(remove(aid))

      return fulfillWithValue(aid)
    } catch (e) {
      rejectWithValue(e.message)
    }
  },
)

const AnswersAdapter = createEntityAdapter({
  selectId: (answer) => answer.aid,
  sortComparer: (a, b) => {
    return a.createdAt - b.createdAt
  },
})

export const AnswersSlice = createSlice({
  name: 'answers',
  initialState: AnswersAdapter.getInitialState({
    isPosting: false,
    err: null,
    isFetching: false,
    isDeleting: false,
  }),
  reducers: {
    remove: AnswersAdapter.removeOne,
    updateOne: AnswersAdapter.updateOne,
  },
  extraReducers: {
    [postAnswer.pending]: (state) => {
      state.isPosting = true
    },
    [postAnswer.fulfilled]: (state, { payload }) => {
      state.isPosting = false
      AnswersAdapter.upsertOne(state, payload.response)
    },
    [postAnswer.rejected]: (state) => {
      state.err = 'something went wrong'
    },
    [getAnswerByQId.pending]: (state) => {
      state.isFetching = true
    },
    [getAnswerByQId.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      AnswersAdapter.setAll(state, payload)
    },
    [getAnswerByQId.rejected]: (state) => {
      state.err = 'something went wrong'
    },
    [getFeeds.pending]: (state) => {
      state.isFetching = true
    },
    [getFeeds.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      AnswersAdapter.setAll(state, payload)
    },
    [getFeeds.rejected]: (state) => {
      state.err = 'something went wrong'
    },
  },
})

export const answersSelector = AnswersAdapter.getSelectors(
  (state) => state.answers,
)

export const { remove, updateOne } = AnswersSlice.actions
