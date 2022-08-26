import { Button, Text } from 'native-base'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

export const QButton = ({
  color,
  title,
  iconName,
  size,
  onPress,
  isDisabled,
}) => {
  return (
    <Button
      size={size}
      borderRadius={25}
      borderColor={color}
      variant={'outline'}
      onPress={onPress}
      isDisabled={isDisabled}
    >
      <Text color={color} fontSize={size == 'xs' ? 10 : 30} fontWeight={'bold'}>
        <Icon name={iconName} size={size == 'xs' ? 10 : 30} color={color} />{' '}
        {title}
      </Text>
    </Button>
  )
}
