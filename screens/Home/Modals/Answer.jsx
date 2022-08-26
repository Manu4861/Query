import React, { useEffect, useState } from 'react'
import {
  Button,
  Center,
  Heading,
  Input,
  Text,
  Toast,
  useToast,
  VStack,
} from 'native-base'
import Header from '../../../components/Header'
import Icon from 'react-native-vector-icons/Ionicons'
import { Theme } from '../../../Theme'
import { useSelector, useDispatch } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'
import QAlert from '../../../components/QAlert'
import { createdAt } from 'expo-updates'
import { answerToQuestion } from '../../../app/features/Feed'
import QActionAlert from '../../../components/QActionAlert'
import { postAnswer } from '../../../app/answers.slice'

const Answer = ({ navigation, route }) => {
  const uid = useSelector(({ firebase }) => firebase.auth.uid)
  const [answer, setAnswer] = useState('')
  const [isUploaded, setisUpload] = useState(false)
  const { qid, question } = route.params
  const toast = useToast()
  const firestore = useFirestore()
  const dispatch = useDispatch()

  useEffect(() => {}, [])

  async function onAskQuestion() {
    setisUpload(true)
    console.log('qid', qid, 'answer', answer, 'uid', uid)
    try {
      await dispatch(postAnswer({ uid, answer, qid }))
      Toast.show({
        placement: 'bottom',
        duration: 2000,
        render: () => {
          return (
            <QActionAlert
              message={'Successfully Added Answer'}
              type={'success'}
            />
          )
        },
      })
      navigation.goBack()
    } catch (e) {
      console.log(e)
    }
    setisUpload(false)
  }

  return (
    <VStack flex={1}>
      <Header
        leftElement={
          <Button
            onPress={() => navigation.goBack()}
            variant={'ghost'}
            isDisabled={isUploaded}
          >
            <Icon
              name="ios-close"
              size={25}
              color={Theme.colors.text.darksec}
            />
          </Button>
        }
        title={'Answer'}
        titleStyle={{ fontSize: 26 }}
        rightElement={
          <Button
            onPress={onAskQuestion}
            variant={'ghost'}
            isDisabled={!answer || isUploaded}
          >
            <Icon name="ios-checkmark" color={Theme.colors.app.pri} size={30} />
          </Button>
        }
      />
      <VStack paddingX={4} py={'5'}>
        <Heading fontSize={18}>{question}</Heading>
        <Input
          isDisabled={isUploaded}
          onChangeText={(in_answer) => {
            setAnswer(in_answer)
          }}
          mt={'5'}
          fontSize={'lg'}
          multiline
          focusOutlineColor={'#cccc'}
          alignItems={'center'}
          value={answer}
          placeholder={'Type here your answer...'}
        />
      </VStack>
    </VStack>
  )
}

export default Answer
