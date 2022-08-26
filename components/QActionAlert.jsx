import React, { useState } from "react";
import { HStack, VStack, Center, Alert, Text, Stack } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

const QActionAlert = ({ message, type }) => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Center background={"transparent"} width={"full"}>
        <Alert w="full" variant={"solid"} colorScheme={type} status={type}>
          <VStack bg={"transparent"} space={2} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack
                bg={"transparent"}
                space={2}
                flexShrink={1}
                alignItems="center"
              >
                <Alert.Icon />
                <Text color={"white"}>{message}</Text>
              </HStack>
              <Icon
                name="ios-close-outline"
                color={"white"}
                onPress={() => setShow(false)}
                size={20}
              />
            </HStack>
          </VStack>
        </Alert>
      </Center>
    );
  } else {
    return null;
  }
};

export default QActionAlert;
