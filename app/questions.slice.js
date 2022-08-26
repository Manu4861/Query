import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { firebase } from '@react-native-firebase/firestore'
import { askQuestion, deleteQuestion } from './features/Feed'

export const postQuestion = createAsyncThunk(
  'questions/post',
  async ({ uid, question }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const result = await askQuestion(uid, question)
      return fulfillWithValue({ qid: result.id, ...result.data() })
    } catch (e) {
      rejectWithValue(e.message)
    }
  },
)

export const getQuestions = createAsyncThunk(
  'questions/getAll',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const firestore = firebase.firestore()
      const resquestions = await firestore.collection('questions').get()
      const questions = resquestions.docs.map((doc) => {
        return { qid: doc.id, ...doc.data() }
      })
      return fulfillWithValue(questions)
    } catch (e) {
      rejectWithValue(e.message)
    }
  },
)

export const removeQuestion = createAsyncThunk(
  'questions/remove',
  async ({ qid, currentUid }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const deletedId = await deleteQuestion(qid, currentUid)
      return fulfillWithValue(deletedId)
    } catch (e) {
      rejectWithValue(e.message)
    }
  },
)

export const questionsAdapter = createEntityAdapter({
  selectId: (question) => question.qid,
  sortComparer: (a, b) => {
    return b.createdAt - a.createdAt
  },
})

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: questionsAdapter.getInitialState({
    isPosting: false,
    isFetching: false,
    isDeleting: false,
  }),
  reducers: {
    updateAnswersCount: questionsAdapter.updateOne,
  },
  extraReducers: {
    [postQuestion.rejected]: (state) => {
      state.isPosting = false
    },
    [postQuestion.pending]: (state) => {
      state.isPosting = true
    },
    [postQuestion.fulfilled]: (state, { payload }) => {
      state.isPosting = false
      questionsAdapter.upsertOne(state, payload)
    },
    [getQuestions.rejected]: (state) => {
      state.isFetching = false
    },
    [getQuestions.pending]: (state) => {
      state.isFetching = true
    },
    [getQuestions.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      questionsAdapter.setAll(state, payload)
    },
    [removeQuestion.rejected]: (state) => {
      state.isDeleting = false
    },
    [removeQuestion.pending]: (state) => {
      state.isDeleting = true
    },
    [removeQuestion.fulfilled]: (state, { payload }) => {
      state.isDeleting = false
      questionsAdapter.removeOne(state, payload)
    },
  },
})

export const { insertOne } = questionsSlice.actions
export const questionSelector = questionsAdapter.getSelectors(
  (state) => state.questions,
)
