import { Button, Center, Spinner, useTheme, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Feed from '../../components/Feed'
import Icon from 'react-native-vector-icons/Ionicons'
import Question from '../../components/Question'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import RefreshableSrollView from '../../components/RefreshableSrollView'
import { useDispatch } from 'react-redux'
import { answersSelector, getAnswerByQId } from '../../app/answers.slice'
import { questionSelector } from '../../app/questions.slice'
import { followProfile } from '../../app/profile.slice'

const Answers = ({ navigation, route }) => {
  const { Nqid } = route.params
  const theme = useTheme()
  const answers = useSelector(answersSelector.selectAll)
  const isLoadingAnswer = useSelector((state) => state.answers.isFetching)
  const isLoadingLikes = useSelector((state) => state.likes.entities)
  const currentUid = useSelector((state) => state.firebase.auth.uid)
  const profiles = useSelector((state) => state.profiles.entities)
  const question = useSelector((state) =>
    questionSelector.selectById(state, Nqid),
  )

  const dispatch = useDispatch()

  async function loadAnswers() {
    dispatch(getAnswerByQId({ qid: Nqid, currentUid }))
  }

  useEffect(() => {
    dispatch(getAnswerByQId({ qid: Nqid, currentUid }))
  }, [])

  async function onFollow(uid) {
    await dispatch(followProfile({ currentUid, uid }))
  }

  return (
    <VStack flex={1}>
      <Header
        leftElement={
          <Button variant={'ghost'} onPress={() => navigation.goBack()}>
            <Icon
              name="ios-arrow-back"
              size={25}
              style={{ paddingVertical: 3 }}
              color={theme.colors.text.darksec}
            />
          </Button>
        }
        title={'Answers'}
      />
      <RefreshableSrollView
        onRefreshHandle={() => {
          {
            loadAnswers()
          }
        }}
      >
        <Question
          data={{
            question: question.question,
            answersCount: question.answersCount,
            createdAt: question.createdAt,
            qid: Nqid,
            isReadable: true,
          }}
          navigation={navigation}
        />

        {/* fetching answers to questions */}
        <VStack paddingBottom={1}>
          {isLoadingAnswer ||
          !isLoaded(isLoadingLikes) ||
          !isLoaded(profiles) ? (
            <Center py={10}>
              <Spinner size={'lg'} color={'app.pri'} />
            </Center>
          ) : (
            Object.values(answers).map(
              ({ answer, aid, createdAt, uid }, index) => {
                return (
                  <Feed
                    Answer={answer}
                    key={index}
                    username={profiles[uid]?.username}
                    followersCount={profiles[uid]?.followersCount}
                    isFollowing={profiles[uid]?.isFollowing}
                    createdAt={createdAt}
                    aid={aid}
                    qid={Nqid}
                    navigation={navigation}
                    uid={uid}
                    onFollow={() => onFollow(uid)}
                  />
                )
              },
            )
          )}
        </VStack>
      </RefreshableSrollView>
    </VStack>
  )
}

export default Answers
