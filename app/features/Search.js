import { useFirebase } from "react-redux-firebase";

export async function search(qry) {
  const firestore = useFirebase().firestore;
  await firestore().setListener({
    collection: "questions",
    where: ["question", "<=", qry],
    storeAs: "search_result",
  });
}
