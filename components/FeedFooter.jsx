import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { Box, HStack, Skeleton, Spinner, Text } from 'native-base'
import { useState } from 'react'
import { Theme } from '../Theme'
import { useEffect } from 'react'
import { checkIsLiked, like, update_likes_count } from '../app/features/Feed'
import { isLoaded } from 'react-redux-firebase'

const FeedFooter = React.memo(({ uid, aid }) => {
  const currentUid = useSelector((state) => state.firebase.auth.uid)
  const [isLiking, setIsLiking] = useState(false)
  const [isLiked, setIsLiked] = useState(undefined)
  const [likesCount, setLikesCount] = useState(undefined)

  useEffect(() => {
    async function loadLike() {
      setIsLiked(await onCheckIsLike())
      setLikesCount(await update_likes_count(aid))
    }
    loadLike()
  }, [])

  async function onCheckIsLike() {
    const likesDocs = await checkIsLiked(currentUid, aid)
    if (likesDocs == 0) return false
    else return true
  }

  async function onLike() {
    setIsLiking(true)
    await like(currentUid, aid)
    await onCheckIsLike()
    setLikesCount(await update_likes_count(aid))
    setIsLiked(!isLiked)
    setIsLiking(false)
  }

  if (!isLoaded(isLiked, likesCount))
    return (
      <HStack alignItems={'center'} py={'3'}>
        <Skeleton width={8} height={8} borderRadius={'full'} />
        <Skeleton width={6} mx={'2'} height={5} borderRadius={'md'} />
      </HStack>
    )
  return (
    <HStack space={'4'} alignItems={'center'} py={'3'}>
      <Box flexDirection={'row'} alignItems={'center'}>
        <TouchableOpacity
          onPress={async () => {
            onLike()
          }}
          disabled={isLiking}
        >
          <Icon
            style={{ opacity: isLiking ? 0.7 : 1 }}
            name={isLiked ? 'heart' : 'heart-outline'}
            size={25}
            color={isLiked ? Theme.colors.app.pri : Theme.colors.text.sec}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            ml={'2'}
            fontSize={'md'}
            fontWeight={'bold'}
            color={'text.darksec'}
          >
            {likesCount}
          </Text>
        </TouchableOpacity>
      </Box>
    </HStack>
  )
})

export default FeedFooter
