import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  Avatar,
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  useTheme,
} from 'native-base'
import moment from 'moment'
import QModel from './QModel'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { removeAnswer } from '../app/answers.slice'
import FeedFooter from './FeedFooter'

const Feed = ({
  Answer,
  createdAt,
  aid,
  qid,
  uid,
  showQuestion,
  onFollow,
  username,
  isFollowing,
  followersCount,
  question,
}) => {
  const theme = useTheme()
  const containercolor = useColorModeValue('bg.high', 'bg.darkhigh')
  const avatarColor = useColorModeValue('bg.sec', 'bg.darksec')
  const navigation = useNavigation()
  const IconColor = useColorModeValue(
    theme.colors.text.sec,
    theme.colors.text.darksec,
  )
  const currentUid = useSelector((data) => data.firebase.auth.uid)
  const current_profile = useSelector((data) => data.firebase.profile)
  const parsedTime = moment(createdAt).fromNow()
  const [MoreActions, setMoreActions] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isFollowingProgress, setisFollowingProgress] = useState(false)
  const dispatch = useDispatch()

  async function onDeleteAns() {
    setIsDeleting(true)
    await dispatch(removeAnswer({ aid, qid, currentUid }))
    setMoreActions(false)
    setIsDeleting(false)
  }

  return (
    <VStack paddingX={'5'} bg={containercolor} marginTop={1}>
      <QModel
        uid={uid}
        aid={aid}
        qid={qid}
        isOpen={MoreActions}
        onDeleteAns={onDeleteAns}
        isLoading={isDeleting}
        onClose={() => setMoreActions(false)}
      />
      <HStack
        space={3}
        alignItems={'center'}
        py={'3'}
        justifyContent={'space-between'}
      >
        <Avatar bg={avatarColor} size={36} overflow={'hidden'}>
          <Icon name="person-sharp" size={40} color={IconColor} />
        </Avatar>

        <VStack bg={'transparent'} flex={1}>
          <Box fontSize={14} flexDirection={'row'} alignItems={'center'}>
            <Heading fontSize={'sm'}>
              {uid == currentUid ? current_profile.username : username}
            </Heading>
            {uid != currentUid && (
              <TouchableOpacity
                disabled={isFollowingProgress}
                style={{
                  marginLeft: 10,
                  alignSelf: 'center',
                }}
                onPress={async () => {
                  setisFollowingProgress(true)
                  await onFollow()
                  setisFollowingProgress(false)
                }}
              >
                <Text
                  color={isFollowing ? 'text.darksec' : 'text.link'}
                  opacity={isFollowing ? 0.3 : 1}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            )}
          </Box>
          <Text fontSize={12}>
            {uid == currentUid
              ? current_profile.followersCount
              : followersCount}{' '}
            Followers
          </Text>
        </VStack>
        <HStack justifyContent={'flex-end'}>
          {uid == currentUid && (
            <TouchableOpacity
              onPress={() => {
                setMoreActions(true)
              }}
            >
              <Icon
                name="ios-ellipsis-horizontal"
                color={IconColor}
                size={20}
              />
            </TouchableOpacity>
          )}
        </HStack>
      </HStack>

      <VStack bg={'transparent'} py={'0'}>
        {showQuestion && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Answers', {
                Nqid: qid,
              })
            }
          >
            <Heading fontSize={'md'}>{question?.question}</Heading>
          </TouchableOpacity>
        )}
        <Text
          fontWeight={'light'}
          fontSize={15}
          textBreakStrategy={'simple'}
          textAlign={'left'}
        >
          {Answer}
        </Text>
      </VStack>
      <FeedFooter aid={aid} uid={uid} />
      <HStack pb={'3'}>
        <Text color={'text.darksec'}>{parsedTime}</Text>
      </HStack>
    </VStack>
  )
}

export default Feed
