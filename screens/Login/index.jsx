import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Button,
  Heading,
  Input,
  Spinner,
  StatusBar,
  useColorMode,
  useColorModeValue,
  VStack,
  Text,
  Link,
  Box,
  Toast,
} from "native-base";
import { Theme } from "../../Theme";
import QAlert from "../../components/QAlert";
import { useFirebase } from "react-redux-firebase";
import Logo from "../../components/Logo";

const Login = ({ navigation }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [isShow, setIsShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const firebase = useFirebase();

  async function onLogin() {
    setLoading(true);
    try {
      const { user } = await firebase.login({
        email,
        password,
      });

      Toast.show({
        placement: "top",
        render: () => {
          return <QAlert type={"success"} message={"Welcome back"} />;
        },
      });
    } catch (AuthError) {
      Toast.show({
        placement: "top",
        render: () => {
          return <QAlert type={"error"} message={"Invalid credentials"} />;
        },
      });
    }
    setLoading(false);
  }

  return (
    <VStack
      alignItems={"center"}
      width={"100%"}
      style={{ flex: 1, paddingHorizontal: 25 }}
      bg={useColorModeValue("bg.pri", "bg.darkpri")}
      space={5}
    >
      <StatusBar
        barStyle={colorMode == "dark" ? "light-content" : "dark-content"}
        backgroundColor={useColorModeValue(
          Theme.colors.bg.pri,
          Theme.colors.bg.darkpri
        )}
      />
      <Heading mt={"2"}>
        <Logo color={Theme.colors.app.pri} />
      </Heading>
      <Input
        placeholderTextColor={useColorModeValue("text.sec", "text.darksec")}
        placeholder={"Email"}
        fontSize={16}
        value={email}
        onChangeText={(in_email) => setEmail(in_email)}
        mt={"10"}
        isDisabled={loading}
      />
      <Input
        placeholderTextColor={useColorModeValue("text.sec", "text.darksec")}
        placeholder={"Password"}
        secureTextEntry={!isShow}
        isDisabled={loading}
        rightElement={
          <Icon
            onPress={() => setIsShow(!isShow)}
            name={isShow ? "eye" : "eye-off"}
            size={30}
            style={{ paddingHorizontal: 10 }}
            color={useColorModeValue(
              Theme.colors.text.sec,
              Theme.colors.text.darksec
            )}
          />
        }
        fontSize={16}
        value={password}
        onChangeText={(in_password) => setPassword(in_password)}
      />
      <Button
        isDisabled={!email.length || !password.length || loading}
        bg={"app.pri"}
        width={"100%"}
        size={"lg"}
        onPress={onLogin}
      >
        {loading ? <Spinner /> : "Login"}
      </Button>
      <Box flexDirection={"row"}>
        <Text>if you are new user? </Text>
        <Link onPress={() => navigation.navigate("Signup")}>
          <Text textDecorationLine={"underline"} color={"app.pri"}>
            {" "}
            Signup
          </Text>
        </Link>
      </Box>
    </VStack>
  );
};

export default Login;
