import { useEffect } from "react";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
