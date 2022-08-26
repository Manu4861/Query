import {
  Box,
  VStack,
  Text,
  Center,
  Spinner,
  useColorModeValue,
  useTheme,
  HStack,
  Skeleton,
} from 'native-base'
import { StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../components/Logo'
import { isLoaded } from 'react-redux-firebase'
import { useSelector, useDispatch } from 'react-redux'
import Feed from '../../components/Feed'
import RefreshableSrollView from '../../components/RefreshableSrollView'
import { getFeeds } from '../../app/answers.slice'
import { followProfile } from '../../app/profile.slice'
import { fetchFollowingIds } from '../../app/features/Feed'

const Feeds = ({ navigation, isProfile }) => {
  const containercolor = useColorModeValue('bg.high', 'bg.darkhigh')
  const querybtncolor = useColorModeValue('bg.sec', 'text.sec')
  const statusbarStyle = useColorModeValue('dark-content', 'light-content')
  const theme = useTheme()

  const currentUid = useSelector((data) => data.firebase.auth.uid)
  const feeds = useSelector(
    (data) => data.answers.entities,
    (a, b) => {
      return b.createdAt - a.createdAt
    },
  )
  const profiles = useSelector((data) => data.profiles.entities)
  const questions = useSelector((data) => data.questions.entities)
  const [loading, setLoading] = useState(true)
  const [followingIds, setFollowingIds] = useState([])
  const dispatch = useDispatch()

  async function loadIds() {
    setLoading(true)
    if (isProfile) setFollowingIds([currentUid])
    else {
      const fIds = await fetchFollowingIds(currentUid)
      setFollowingIds([...fIds])
    }
  }
  async function loadData() {
    setLoading(true)
    if (followingIds.length !== 0)
      await dispatch(getFeeds({ currentUid, followingIds }))
    setLoading(false)
  }

  async function onFollow(uid) {
    await dispatch(followProfile({ currentUid, uid }))
  }

  useEffect(() => {
    loadIds()
  }, [])

  useEffect(() => {
    loadData(followingIds)
  }, [followingIds])

  return (
    <VStack flex={1}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={statusbarStyle}
      />
      {!isProfile && (
        <Box
          bg={containercolor}
          width={'100%'}
          paddingTop={StatusBar.currentHeight + 5}
          paddingX={'5'}
          paddingBottom={'3'}
          borderBottomColor={'text.darksec'}
          borderBottomWidth={0.2}
        >
          <Logo color={theme.colors.app.pri} />
        </Box>
      )}
      <RefreshableSrollView
        onRefreshHandle={async () => {
          await loadIds()
          await loadData()
        }}
      >
        {/* Ask Query Button */}
        {!isProfile && (
          <Box py={'2'} justifyContent="center" alignItems={'center'}>
            <TouchableOpacity onPress={() => navigation.navigate('Ask')}>
              <Box
                w={'80'}
                height={10}
                background={querybtncolor}
                paddingX={'9'}
                paddingY={'2'}
                borderRadius={5}
              >
                <Text fontSize={'md'}>Ask query...</Text>
              </Box>
            </TouchableOpacity>
          </Box>
        )}

        {/* onLoading Indicator */}
        {loading
          ? new Array(4).fill(0).map((_, i) => {
              return (
                <VStack mt={'1'} key={i} paddingX={'5'}>
                  <Skeleton
                    width={45}
                    height={45}
                    my={'3'}
                    borderRadius={'full'}
                  />
                  <Skeleton.Text />
                  <HStack></HStack>
                </VStack>
              )
            })
          : Object.values(feeds).map((feed, index) => {
              if (followingIds.includes(feed.uid))
                return (
                  <Feed
                    key={index}
                    aid={feed.aid}
                    qid={feed.qid}
                    uid={feed.uid}
                    Answer={feed.answer}
                    createdAt={feed.createdAt}
                    question={questions[feed.qid]}
                    username={profiles[feed.uid]?.username}
                    isFollowing={profiles[feed.uid]?.isFollowing}
                    followersCount={profiles[feed.uid]?.followersCount}
                    showQuestion
                    onFollow={() => onFollow(feed.uid)}
                  />
                )
            })}
        {followingIds == 0 && (
          <Center flex={1} alignItems={'center'}>
            <Text>No Feeds Right Now !</Text>
          </Center>
        )}
      </RefreshableSrollView>
    </VStack>
  )
}

export default Feeds
