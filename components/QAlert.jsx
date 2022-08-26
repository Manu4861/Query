import React from "react";
import { Alert, Center, Text, HStack } from "native-base";

const QAlert = ({ type, message }) => {
  return (
    <Center bg={"rgba(0,0,0,0.001)"}>
      <Alert width={"90%"} status={type} colorScheme="info">
        <HStack
          bg={"rgba(0,0,0,0.001)"}
          px={5}
          flexShrink={1}
          alignItems="center"
        >
          <Alert.Icon />
          <Text
            width={"100%"}
            textAlign={"center"}
            fontSize="sm"
            color="coolGray.800"
          >
            {message}
          </Text>
        </HStack>
      </Alert>
    </Center>
  );
};

export default QAlert;
