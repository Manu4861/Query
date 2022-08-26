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
  KeyboardAvoidingView,
  ScrollView,
  Toast,
} from "native-base";
import { Theme } from "../../Theme";
import QAlert from "../../components/QAlert";
import { checkUsername } from "../../app/features/Auth";
import { useFirebase } from "react-redux-firebase";
import Logo from "../../components/Logo";

const Signup = ({ navigation }) => {
  const { colorMode } = useColorMode();
  const firebase = useFirebase();
  const [isShow, setIsShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  async function onSignup() {
    setLoading(true);
    const isExistUsername = await checkUsername(username);
    console.log(isExistUsername);
    if (isExistUsername) {
      Toast.show({
        placement: "top",
        render: () => {
          return <QAlert type="error" message={"username not available"} />;
        },
      });
      setLoading(false);
      return;
    }

    if (password !== cpassword) {
      Toast.show({
        placement: "top",
        render: () => {
          return <QAlert type="error" message={"confirm your password"} />;
        },
      });
      setLoading(false);
      return;
    }

    try {
      await firebase.createUser(
        {
          email,
          password,
        },
        {
          username: username.trim(),
          createdAt: Date.now(),
          followersCount: 0,
          followingCount: 0,
          questionsCount: 0,
          answersCount: 0,
        }
      );
      Toast.show({
        placement: "top",
        render: () => {
          return (
            <QAlert type="success" message={"Account created successfully"} />
          );
        },
      });
      return;
    } catch (AuthError) {
      Toast.show({
        placement: "top",
        render: () => {
          return (
            <QAlert type="error" message={AuthError.message.split("] ")[1]} />
          );
        },
      });
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      bg={useColorModeValue("bg.pri", "bg.darkpri")}
      behavior={"height"}
      flex={1}
    >
      <ScrollView flex={1}>
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
            placeholder={"Username"}
            fontSize={16}
            value={username}
            onChangeText={(in_username) => setUsername(in_username)}
            mt={"10"}
            isDisabled={loading}
          />

          <Input
            placeholderTextColor={useColorModeValue("text.sec", "text.darksec")}
            placeholder={"Email"}
            fontSize={16}
            value={email}
            onChangeText={(in_email) => setEmail(in_email)}
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

          <Input
            placeholderTextColor={useColorModeValue("text.sec", "text.darksec")}
            placeholder={"Confirm Password"}
            secureTextEntry
            fontSize={16}
            value={cpassword}
            isDisabled={loading}
            onChangeText={(in_cpassword) => setCPassword(in_cpassword)}
          />

          <Button
            isDisabled={
              !email || !password || !username || !cpassword || loading
            }
            bg={"app.pri"}
            width={"100%"}
            size={"lg"}
            onPress={onSignup}
          >
            {loading ? <Spinner color={"white"} size={"sm"} /> : "Signup"}
          </Button>

          <Box pb={25} flexDirection={"row"}>
            <Text>if you already an account? </Text>
            <Link onPress={() => navigation.navigate("Login")}>
              <Text textDecorationLine={"underline"} color={"app.pri"}>
                {" "}
                Login
              </Text>
            </Link>
          </Box>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
