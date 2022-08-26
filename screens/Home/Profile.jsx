import React, { useState } from 'react'
import {
  Avatar,
  Center,
  Heading,
  VStack,
  HStack,
  Box,
  StatusBar,
  useColorMode,
  useColorModeValue,
  Spinner,
  Text,
  Button,
} from 'native-base'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import { Theme } from '../../Theme'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const Profile = ({ navigation }) => {
  const profile = useSelector((data) => data.firebase.profile)
  const { colorMode, toggleColorMode } = useColorMode()
  const firebase = useFirebase()
  const [loading, setLoading] = useState(false)

  /* Adaptive theme colors */
  const iconColor = useColorModeValue(
    Theme.colors.text.sec,
    Theme.colors.text.darksec,
  )
  const bgHigh = useColorModeValue('bg.high', 'bg.darkhigh')
  /*end of colors*/

  if (!isLoaded(profile) || isEmpty(profile) || loading) {
    return (
      <VStack flex={1} justifyContent={'center'} alignItems={'center'}>
        <Spinner size={'lg'} color={Theme.colors.app.pri} />
      </VStack>
    )
  } else {
    return (
      <VStack space={'10'} paddingY={'5'} paddingX={'7'} flex={1}>
        <StatusBar
          barStyle={colorMode == 'dark' ? 'light-content' : 'dark-content'}
          translucent
          backgroundColor={'transparent'}
        />

        <Center>
          <Avatar bg={'app.pri'} size={'xl'}>
            {profile.username.charAt(0)}
          </Avatar>
          <Heading mt={2} fontSize={25}>
            {profile.username}
          </Heading>
          <HStack space={10} mt={'5'}>
            <Button
              variant={'outline'}
              onPress={() =>
                navigation.navigate('Details', { intialRoute: 'Followers' })
              }
            >
              <Text fontWeight={'bold'} fontSize={15}>
                {profile.followersCount} Followers
              </Text>
            </Button>
            <Button
              fontSize={17}
              variant={'outline'}
              onPress={() =>
                navigation.navigate('Details', { intialRoute: 'Following' })
              }
            >
              <Text fontWeight={'bold'} fontSize={15}>
                {profile.followingCount} Following
              </Text>
            </Button>
          </HStack>
        </Center>
        <HStack width={'100%'} justifyContent={'space-between'}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('Details', { intialRoute: 'Answer' })
            }
          >
            <Box
              borderLeftWidth={5}
              borderLeftColor={'app.pri'}
              paddingX={'5'}
              paddingY={'5'}
              bg={bgHigh}
            >
              <Center>
                <Heading fontSize={16}>Answers</Heading>
                <Heading mt={'5'} fontSize={23} color={'app.pri'}>
                  {profile.answersCount}
                </Heading>
              </Center>
            </Box>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Questions')}
          >
            <Box
              borderLeftWidth={5}
              borderLeftColor={'app.pri'}
              paddingX={'5'}
              paddingY={'5'}
              bg={bgHigh}
            >
              <Center>
                <Heading fontSize={16}>Questions</Heading>
                <Heading mt={'5'} fontSize={23} color={'app.pri'}>
                  {profile.questionsCount}
                </Heading>
              </Center>
            </Box>
          </TouchableWithoutFeedback>
        </HStack>
        <Center flexDirection={'row'} justifyContent={'space-around'}>
          <Icon
            name="log-out-outline"
            size={30}
            onPress={async () => await firebase.logout()}
            color={iconColor}
          />
          <Icon
            name={colorMode == 'dark' ? 'sunny-outline' : 'moon-outline'}
            size={30}
            onPress={toggleColorMode}
            color={iconColor}
          />
        </Center>
      </VStack>
    )
  }
}

export default Profile
