import firestore, { firebase } from "@react-native-firebase/firestore";

export async function checkUsername(username) {
  return (
    await firestore(firebase.app("query"))
      .collection("users")
      .where("username", "==", username)
      .get()
  ).docs.length;
}
