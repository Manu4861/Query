import { ScrollViewPropsAndroid, RefreshControl } from 'react-native'
import { ScrollView } from 'native-base'
import React, { useState } from 'react'
import { Theme } from '../Theme'

/**
 *
 * @param {ScrollViewPropsAndroid} props
 * @returns
 */
const RefreshableSrollView = ({ children, onRefreshHandle, onScrollToEnd }) => {
  const [refValue, setRefValue] = useState(false)
  return (
    <ScrollView
      bounces={true}
      paddingBottom={'10'}
      onScroll={({
        nativeEvent: { layoutMeasurement, contentOffset, contentSize },
      }) => {
        if (
          layoutMeasurement.height + contentOffset.y >=
          contentSize.height - 20
        )
          if (onScrollToEnd) onScrollToEnd()
      }}
      refreshControl={
        <RefreshControl
          refreshing={refValue}
          colors={[Theme.colors.app.pri]}
          onRefresh={() => {
            setRefValue(true)
            onRefreshHandle()
            setRefValue(false)
          }}
        />
      }
    >
      {children}
    </ScrollView>
  )
}

export default RefreshableSrollView
