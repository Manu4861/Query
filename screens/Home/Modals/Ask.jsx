import React, { useEffect, useRef, useState } from 'react'
import { Button, Center, Input, Text, Toast, VStack } from 'native-base'
import Header from '../../../components/Header'
import Icon from 'react-native-vector-icons/Ionicons'
import { Theme } from '../../../Theme'
import { useSelector, useDispatch } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'
import QActionAlert from '../../../components/QActionAlert'
import { askQuestion } from '../../../app/features/Feed'
import { postQuestion } from '../../../app/questions.slice'

const Ask = ({ navigation }) => {
  const uid = useSelector(({ firebase }) => firebase.auth.uid)
  const [question, setQuestion] = useState('')
  const [isUploaded, setisUpload] = useState(false)
  const dispatch = useDispatch()
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  async function onAskQuestion() {
    setisUpload(true)
    try {
      await dispatch(postQuestion({ uid, question }))
      Toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <QActionAlert
              message={'Question added successfully'}
              type={'success'}
            />
          )
        },
      })

      navigation.goBack()
    } catch (e) {
      Toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <QActionAlert message={'Something went wrong!'} type={'error'} />
          )
        },
      })
      setisUpload(false)
    }
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
        title={'Ask Question'}
        titleStyle={{ fontSize: 26 }}
        rightElement={
          <Button
            onPress={onAskQuestion}
            variant={'ghost'}
            isDisabled={!question || isUploaded}
          >
            <Icon name="ios-checkmark" color={Theme.colors.app.pri} size={30} />
          </Button>
        }
      />
      <Center paddingX={5} py={'10'}>
        <Text fontSize={'md'}>
          Ask your question starts with How, When, What etc...
        </Text>
        <Input
          value={question}
          onChangeText={(in_question) => setQuestion(in_question)}
          mt={'2'}
          fontSize={'lg'}
          editable
          multiline
          isDisabled={isUploaded}
          keyboardType={'twitter'}
          ref={inputRef}
        />
      </Center>
    </VStack>
  )
}

export default Ask
