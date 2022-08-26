import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feeds from './Feeds'
import { Theme } from '../../Theme'
import Icon from 'react-native-vector-icons/Ionicons'
import Search from './Search'
import Questions from './Questions'
import Profile from './Profile'
import { useColorMode } from 'native-base'

const Tab = createBottomTabNavigator()

const Home = () => {
  const { colorMode } = useColorMode()
  const iconSize = 28
  return (
    <Tab.Navigator
      safeAreaInsets={{ bottom: 10, top: 10 }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor:
            colorMode == 'dark'
              ? Theme.colors.bg.darkhigh
              : Theme.colors.bg.high,
          borderWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: Theme.colors.app.pri,
        tabBarInactiveTintColor:
          colorMode == 'dark'
            ? Theme.colors.text.darksec
            : Theme.colors.text.sec,
      }}
      initialRouteName="Feeds"
    >
      <Tab.Screen
        options={{
          tabBarIcon: (props) => {
            return (
              <Icon
                name={props.focused ? 'home' : 'home-outline'}
                color={props.color}
                size={iconSize}
              />
            )
          },
        }}
        name="Feeds"
        component={Feeds}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => {
            return (
              <Icon name="ios-search" color={props.color} size={iconSize} />
            )
          },
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => {
            return (
              <Icon
                name={props.focused ? 'create' : 'create-outline'}
                color={props.color}
                size={iconSize}
              />
            )
          },
        }}
        name="Questions"
        component={Questions}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => {
            return (
              <Icon
                name="person-circle-outline"
                size={props.size + 5}
                color={props.color}
              />
            )
          },
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  )
}

export default Home
