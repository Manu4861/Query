import { registerRootComponent } from "expo";
import App from "./App";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { store } from "./app/store";
import firebase from "@react-native-firebase/app";
import { createFirestoreInstance } from "redux-firestore";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import "@react-native-firebase/database";

if (firebase.apps.length <= 1) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyCPr8n4UVsuxMDvrY77O3rGBawEHwTpJoI",
      authDomain: "query-83709.firebaseapp.com",
      databaseURL: "https://query-83709-default-rtdb.firebaseio.com",
      projectId: "query-83709",
      storageBucket: "query-83709.appspot.com",
      messagingSenderId: "395348672989",
      appId: "1:395348672989:web:9cfd609c5ecfec7370b634",
      measurementId: "G-ZHENS1C3TV",
    },
    { name: "query" }
  );
}

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase: firebase.app("query"),
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const RDXComponent = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

registerRootComponent(RDXComponent);
