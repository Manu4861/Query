import React, { useEffect, useState } from 'react'
import { Center, HStack, Skeleton, Text, VStack } from 'native-base'
import Header from '../../components/Header'
import Question from '../../components/Question'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { useSelector, useDispatch } from 'react-redux'
import RefreshableSrollView from '../../components/RefreshableSrollView'
import { getQuestions, questionSelector } from '../../app/questions.slice'

const Questions = ({ navigation }) => {
  const questions = useSelector(questionSelector.selectAll)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(getQuestions())
    console.log('questions', questions)
  }, [dispatch])

  async function refresh() {
    setIsLoading(true)
    await dispatch(getQuestions())
    setIsLoading(false)
  }

  return (
    <VStack flex={1}>
      <Header
        title={'Questions for you'}
        titleStyle={{ paddingBottom: 10, fontSize: 25 }}
      />

      {isLoading ? (
        new Array(10).fill(1).map((_v, i) => {
          return (
            <VStack
              key={i}
              px={'5'}
              py={'3'}
              borderColor={'text.sec'}
              borderBottomWidth={0.2}
            >
              <Skeleton h={'5'} rounded="full" />
              <HStack
                py={2}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Skeleton h={'5'} w={'40%'} rounded="full" />
                <Skeleton h={'7'} w={'20%'} rounded="full" />
              </HStack>
            </VStack>
          )
        })
      ) : (
        <RefreshableSrollView onRefreshHandle={refresh}>
          {questions.map((res_questions) => {
            return (
              <Question
                data={res_questions}
                navigation={navigation}
                key={res_questions.qid}
              />
            )
          })}
        </RefreshableSrollView>
      )}
      {!isLoading && isEmpty(questions) ? (
        <Center
          alignItems={'center'}
          justifyContent={'flex-start'}
          py={'10'}
          height={'100%'}
        >
          <Text>No questions found right now !</Text>
        </Center>
      ) : null}
    </VStack>
  )
}

export default Questions
