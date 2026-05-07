import { View, Text, Button, StyleSheet } from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/(auth)/login");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to plans.org!</Text>
      <Text>{auth.currentUser?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 12 },
});
