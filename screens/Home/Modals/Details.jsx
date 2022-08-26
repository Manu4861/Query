import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Followers from '../Followers'
import { HStack, useColorModeValue, VStack } from 'native-base'
import { Theme } from '../../../Theme'
import Icon from 'react-native-vector-icons/Ionicons'
import Following from '../Following'
import Feeds from '../Feeds'

const TopTab = createMaterialTopTabNavigator()

const ProfileAswers = () => {
  return <Feeds isProfile />
}
const Tabs = ({ intialRoute }) => {
  const tabBarBgColor = useColorModeValue(
    Theme.colors.bg.high,
    Theme.colors.bg.darkhigh,
  )
  const tabLabelColor = useColorModeValue(
    Theme.colors.text.pri,
    Theme.colors.text.darkpri,
  )

  return (
    <TopTab.Navigator
      initialRouteName={intialRoute}
      screenOptions={{
        tabBarStyle: { backgroundColor: tabBarBgColor },
        tabBarLabelStyle: { color: tabLabelColor, fontSize: 10 },
        tabBarIndicatorStyle: { backgroundColor: Theme.colors.app.pri },
      }}
      backBehavior={'history'}
    >
      <TopTab.Screen name="Followers" component={Followers} />
      <TopTab.Screen name="Following" component={Following} />
      <TopTab.Screen name="Answer" component={ProfileAswers} />
    </TopTab.Navigator>
  )
}

const Details = ({ route, navigation }) => {
  const { intialRoute } = route.params
  const IconColor = useColorModeValue(
    Theme.colors.text.sec,
    Theme.colors.text.darksec,
  )
  const HeaderColor = useColorModeValue(
    Theme.colors.bg.high,
    Theme.colors.bg.darkhigh,
  )

  return (
    <VStack flex={0.9} marginTop={'auto'}>
      <HStack py={'3'} px={'3'} bg={HeaderColor}>
        <Icon
          onPress={() => navigation.popToTop()}
          name={'ios-close'}
          size={20}
          color={IconColor}
        />
      </HStack>
      <Tabs intialRoute={intialRoute} />
    </VStack>
  )
}

export default Details
