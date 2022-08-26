import React from 'react'
import {
  Heading,
  HStack,
  Text,
  useColorModeValue,
  useTheme,
  VStack,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { QButton } from './QButton'
import { removeQuestion } from '../app/questions.slice'
import { useState } from 'react'

const Question = ({
  data: { qid, question, createdAt, isReadable, answersCount, uid },
  navigation,
  style,
}) => {
  const [deleting, setDeleting] = useState(false)
  const theme = useTheme()
  const parsedTime = moment(createdAt).fromNow()
  const containerBg = useColorModeValue('bg.high', 'bg.darkhigh')
  const currentUid = useSelector((data) => data.firebase.auth.uid)
  const dispatch = useDispatch()

  async function onDelete() {
    setDeleting(true)
    await dispatch(removeQuestion({ qid, currentUid }))
    setDeleting(false)
  }

  return (
    <TouchableOpacity
      disabled={isReadable || deleting}
      onPress={() =>
        navigation.navigate('Answers', {
          question,
          Nqid: qid,
          answersCount,
          createdAt,
          uid,
        })
      }
    >
      <VStack
        borderColor={'text.sec'}
        borderBottomWidth={1}
        bg={containerBg}
        px={'5'}
        py={'3'}
        style={style}
        opacity={deleting ? 0.5 : 1}
      >
        <Heading py={'1'} fontSize={'md'}>
          {question}
        </Heading>
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          pb={'1'}
          bg={'transparent'}
        >
          <VStack bg={'transparent'}>
            <Text>
              {answersCount ? answersCount + ' Answers' : 'No answers yet'}
            </Text>
            <Text textAlign={'left'} color={'text.sec'}>
              {parsedTime}
            </Text>
          </VStack>
          <HStack space={'3'}>
            <QButton
              size={'xs'}
              onPress={() =>
                navigation.navigate('Answer', {
                  question: question,
                  qid: qid,
                })
              }
              color={theme.colors.text.link}
              iconName="ios-pencil"
              title={'Answer'}
              isDisabled={deleting}
            />
            {currentUid == uid && (
              <QButton
                size={'xs'}
                title={'Delete'}
                color={theme.colors.text.failure}
                iconName={'trash'}
                onPress={onDelete}
                isDisabled={deleting}
              />
            )}
          </HStack>
        </HStack>
      </VStack>
    </TouchableOpacity>
  )
}

export default Question
