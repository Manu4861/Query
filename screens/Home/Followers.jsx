import { View } from 'react-native'
import React from 'react'
import {
  Avatar,
  HStack,
  VStack,
  Text,
  Button,
  Center,
  Spinner,
  ScrollView,
} from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { firebase } from '@react-native-firebase/firestore'
import { useState } from 'react'
import { useEffect } from 'react'
import { followProfile } from '../../app/profile.slice'
import { checkIsfollowing } from '../../app/features/Feed'
import RefreshableSrollView from '../../components/RefreshableSrollView'

const Followers = () => {
  const [users, setUsers] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const currentUid = useSelector((state) => state.firebase.auth.uid)
  const firestore = firebase.firestore()
  const dispatch = useDispatch()
  async function fetchFollowers() {
    setIsLoading(true)
    firestore
      .collection('follow')
      .where('fuid', '==', currentUid)
      .get()
      .then((followSnap) => {
        followSnap.docs.forEach((followDoc) => {
          firestore
            .collection('users')
            .doc(followDoc.data().uid)
            .get()
            .then(async (userSnap) => {
              const isFollowing = await checkIsfollowing(
                currentUid,
                userSnap.id,
              )
              setUsers({
                ...users,
                [userSnap.id]: {
                  uid: userSnap.id,
                  isFollowing,
                  ...userSnap.data(),
                },
              })
            })
          setIsLoading(false)
        })
      })
  }

  useEffect(() => {
    fetchFollowers()
  }, [])

  if (isLoading)
    return (
      <Center mt={'1.5'}>
        <Spinner color={'app.pri'} size={'lg'} />
      </Center>
    )
  return (
    <VStack flex={1}>
      <ScrollView>
        {Object.values(users).map((user) => {
          return (
            <HStack key={user.uid} alignItems={'center'} px={'5'} py={1}>
              <Avatar size={'sm'} bg={'app.pri'}>
                {user.username.charAt(0)}
              </Avatar>
              <VStack px={'3'}>
                <Text>{user.username}</Text>
                <Text>{user.followersCount} Followers</Text>
              </VStack>
            </HStack>
          )
        })}
      </ScrollView>
    </VStack>
  )
}

export default Followers
