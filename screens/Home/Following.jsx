import { View } from 'react-native'
import React from 'react'
import {
  Avatar,
  HStack,
  VStack,
  Text,
  Center,
  Spinner,
  ScrollView,
} from 'native-base'
import { useSelector } from 'react-redux'
import { firebase } from '@react-native-firebase/firestore'
import { useState } from 'react'
import { useEffect } from 'react'
import RefreshableSrollView from '../../components/RefreshableSrollView'

const Following = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const currentUid = useSelector((state) => state.firebase.auth.uid)
  const firestore = firebase.firestore()
  async function fetchFollowers() {
    setIsLoading(true)
    firestore
      .collection('follow')
      .where('uid', '==', currentUid)
      .get()
      .then((followSnap) => {
        followSnap.docs.forEach((followDoc) => {
          firestore
            .collection('users')
            .doc(followDoc.data().fuid)
            .get()
            .then((userSnap) => {
              setUsers((prev) => [
                ...prev,
                { uid: userSnap.id, ...userSnap.data() },
              ])
              setIsLoading(false)
            })
        })
      })
  }

  useEffect(() => {
    fetchFollowers()
    setIsLoading(false)
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
        {users.map((user) => {
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

export default Following
