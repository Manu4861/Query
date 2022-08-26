import 'react-native-get-random-values'
import { getFirebase, authIsReady } from 'react-redux-firebase'
import { firebase } from '@react-native-firebase/database'

export async function update_ACQ(qid) {
  const firestore = getFirebase().firestore()
  const questions = await firestore
    .collection('answers')
    .where('qid', '==', qid)
    .get()
  await firestore
    .collection('questions')
    .doc(qid)
    .update({ answersCount: questions.docs.length })
  return questions.docs.length
}

async function update_user_answersCount(uid) {
  const firestore = getFirebase().firestore()
  const userQuestions = await firestore
    .collection('answers')
    .where('uid', '==', uid)
    .get()
  await firestore
    .collection('users')
    .doc(uid)
    .update({ answersCount: userQuestions.docs.length })
}

async function update_user_questionsCount(uid) {
  const firestore = getFirebase().firestore()
  const questions = await firestore
    .collection('questions')
    .where('uid', '==', uid)
    .get()
  await firestore
    .collection('users')
    .doc(uid)
    .update({ questionsCount: questions.docs.length })
}

export async function askQuestion(uid, question) {
  const firestore = getFirebase().firestore()
  const res = await firestore.collection('questions').add({
    uid,
    question: question.trim(),
    createdAt: new Date(Date.now()).getTime(),
    answersCount: 0,
  })
  await update_user_questionsCount(uid)
  return res.get()
}

export function answerToQuestion(qid, uid, answer) {
  return new Promise(async (res, rej) => {
    try {
      const firestore = firebase.firestore()
      const response = await firestore.collection('answers').add({
        uid,
        qid,
        answer: answer.trim(),
        createdAt: new Date(Date.now()).getTime(),
        likesCount: 0,
      })
      const postedAns = await response.get()
      await update_ACQ(qid)
      await update_user_answersCount(uid)
      res({ aid: postedAns.id, ...postedAns.data() })
    } catch (e) {
      rej(e.message)
    }
  })
}

export function getAnswers(qid) {
  return new Promise(async (res, rej) => {
    try {
      const firestore = firebase.firestore()
      const response = await firestore
        .collection('answers')
        .where('qid', '==', qid)
        .get()
      const postedAns = response.docs.map((answer) => {
        return { aid: answer.id, ...answer.data() }
      })
      res(postedAns)
    } catch (e) {
      rej(e.message)
    }
  })
}

export async function checkIsfollowing(currentuid, uid) {
  const firestore = firebase.firestore()
  const response = await firestore
    .collection('follow')
    .where('uid', '==', currentuid)
    .where('fuid', '==', uid)
    .get()
  return response.docs.length
}

export async function checkIsLiked(currentuid, aid) {
  const firestore = firebase.firestore()
  const response = await firestore
    .collection('likes')
    .where('uid', '==', currentuid)
    .where('aid', '==', aid)
    .get()
  return response.docs.length
}

export async function getLikeDetail(aid, currentUid) {
  return new Promise(async (res, rej) => {
    try {
      const firestore = firebase.firestore()
      const response = await firestore
        .collection('likes')
        .where('aid', '==', aid)
        .get()
      const likes = response.docs.map((like) => {
        return { lid: like.id, ...like.data() }
      })

      Promise.all(likes).then((like) => {
        const likeObj = {}
        like.forEach((value) => Object.assign(likeObj, value))
        res(likeObj)
      })
    } catch (e) {
      rej(e)
    }
  })
}

export function getProfile(currentUid, uid) {
  return new Promise(async (res, rej) => {
    try {
      const firestore = firebase.firestore()
      const response = await firestore.collection('users').doc(uid).get()
      const isFollowing = await checkIsfollowing(currentUid, uid)
      res({ isFollowing, uid: response.id, ...response.data() })
    } catch (e) {
      rej(e.message)
    }
  })
}

export function getAllProfiles(omitId) {
  return new Promise(async (res, rej) => {
    try {
      const firestore = firebase.firestore()
      const response = await firestore.collection('users').doc(omitId)
      res({ isFollowing, uid: response.id, ...response.data() })
    } catch (e) {
      rej(e.message)
    }
  })
}

export async function deleteQuestion(qid, currentUid) {
  const firestore = getFirebase().firestore()
  const answers = await firestore
    .collection('answers')
    .where('qid', '==', qid)
    .get()
  //delete the answer to the question
  answers.docs.map(async (answer) => {
    await answer.ref.delete()
    await update_user_answersCount(answer.data().uid)
  })
  //update
  await firestore.collection('questions').doc(qid).delete()
  await update_user_questionsCount(currentUid)
  return qid
}

export async function deleteAnswer(aid, currentUid) {
  const firestore = getFirebase().firestore()
  await firestore.collection('answers').doc(aid).delete()
  await update_user_answersCount(currentUid)
  return aid
}

export async function follow(uid, fuid) {
  const firestore = getFirebase().firestore()
  const isExist = await firestore
    .collection('follow')
    .where('uid', '==', uid)
    .where('fuid', '==', fuid)
    .get()
  if (isExist.docs.length == 0)
    await firestore.collection('follow').add({ uid, fuid })
  else isExist.docs.forEach((doc) => doc.ref.delete())
}

export async function like(currentUid, aid) {
  const firestore = getFirebase().firestore()
  const isExist = await firestore
    .collection('likes')
    .where('uid', '==', currentUid)
    .where('aid', '==', aid)
    .get()

  if (isExist.docs.length == 0)
    await firestore.collection('likes').add({ uid: currentUid, aid })
  else isExist.docs.forEach((doc) => doc.ref.delete())
}

export async function update_follow_count(uid, fuid) {
  const firestore = getFirebase().firestore()
  const followersDoc = await firestore
    .collection('follow')
    .where('fuid', '==', fuid)
    .get()
  const followingDoc = await firestore
    .collection('follow')
    .where('uid', '==', uid)
    .get()
  await firestore
    .collection('users')
    .doc(uid)
    .update({ followingCount: followingDoc.docs.length })
  await firestore
    .collection('users')
    .doc(fuid)
    .update({ followersCount: followersDoc.docs.length })
  return followersDoc.docs.length
}

export async function update_likes_count(aid) {
  const firestore = getFirebase().firestore()
  const likeDocs = await firestore
    .collection('likes')
    .where('aid', '==', aid)
    .get()
  await firestore
    .collection('answers')
    .doc(aid)
    .update({ likesCount: likeDocs.docs.length })
  return likeDocs.docs.length
}

export async function fetchFollowingIds(currentUid) {
  const firestore = getFirebase().firestore()
  const res = await firestore
    .collection('follow')
    .where('uid', '==', currentUid)
    .get()

  const followingIds = res.docs.map((doc) => doc.data().fuid)
  return followingIds
}

export async function fetchFollowingFeeds(followingIds) {
  const firestore = getFirebase().firestore()
  const res = await firestore
    .collection('answers')
    .where('uid', 'in', followingIds)
    .get()
  return res
}
