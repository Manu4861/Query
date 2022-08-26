import React, { useEffect } from 'react'
import { isLoaded, firebaseConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './screens/Login'
import Signup from './screens/Signup'
import { NativeBaseProvider } from 'native-base'
import { Theme } from './Theme'
import Home from './screens/Home'
import Ask from './screens/Home/Modals/Ask'
import Answer from './screens/Home/Modals/Answer'
import Answers from './screens/Home/Answers'
import { useWindowDimensions } from 'react-native'
import Details from './screens/Home/Modals/Details'
const Stack = createStackNavigator()

export default function App() {
  firebaseConnect()
  const auth = useSelector((data) => data.firebase.auth)
  const user = useSelector((data) => data.firebase.auth.isEmpty)
  const { width, height } = useWindowDimensions()

  if (!isLoaded(auth)) {
    return null
  } else {
    return (
      <NavigationContainer>
        <NativeBaseProvider theme={Theme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: true,
              cardOverlayEnabled: true,
              cardStyleInterpolator: ({ current }) => ({
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [width, 0],
                      }),
                    },
                  ],
                },
              }),
            }}
            defaultScreenOptions={{}}
          >
            {user ? (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </>
            ) : (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Answers" component={Answers} />
                <Stack.Group
                  screenOptions={{
                    presentation: 'transparentModal',
                    animationEnabled: true,
                    cardOverlayEnabled: true,
                    cardStyleInterpolator: ({ current }) => ({
                      cardStyle: {
                        opacity: current.progress.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [0, 0.5, 1],
                        }),
                        transform: [
                          {
                            translateY: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [height, 0],
                            }),
                          },
                        ],
                      },
                    }),
                  }}
                >
                  <Stack.Screen name="Ask" component={Ask} />
                  <Stack.Screen name="Answer" component={Answer} />
                  <Stack.Screen name="Details" component={Details} />
                </Stack.Group>
              </>
            )}
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    )
  }
}
