import { StatusBar } from 'react-native'
import React from 'react'
import { Heading, HStack, useColorModeValue } from 'native-base'

const Header = ({
  title,
  leftElement,
  titleStyle,
  rightElement,
  noStatusBarHeight,
}) => {
  const containercolor = useColorModeValue('bg.high', 'bg.darkhigh')
  return (
    <HStack
      bg={containercolor}
      width={'100%'}
      paddingTop={noStatusBarHeight ? 0 : StatusBar.currentHeight + 2}
      paddingX={'5'}
      borderBottomColor={'text.darksec'}
      borderBottomWidth={0.2}
      flexDirection={'row'}
      alignItems={'center'}
      space={leftElement ? '5' : '0'}
      justifyContent={rightElement ? 'space-between' : undefined}
    >
      {leftElement}
      <Heading
        style={titleStyle}
        fontSize={28}
        fontFamily={'heading'}
        fontWeight={'bold'}
      >
        {title}
      </Heading>
      {rightElement}
    </HStack>
  )
}

export default Header
