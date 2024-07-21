import React, { useCallback, useState } from "react";
import { useSession } from "@/context/ctx";
import { loginApi } from "@/api/auth";
import { router } from "expo-router";
import { SafeAreaView, Text, View } from "@/components/Global/Themed";
import { StyleSheet } from "react-native";
import { Label } from "@/components/Global/Label";
import { Input } from "@/components/Global/Input";
import { Button } from "@/components/Global/Button";

export default function Login() {
  const { login } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const data = await loginApi(username, password);
      const { user, token } = data;
      login(user, token);
      //   router.replace("/");
    } catch (error) {
      // TODO: Handle Error
    } finally {
      setLoading(false);
    }
  }, [username, password]);

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.title}>Feedgames</Text>
      <View style={styles.form}>
        <View style={styles.formStep}>
          <Label>Nombre de usuario</Label>
          <Input
            placeholder="Usuario"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.formStep}>
          <Label>Contraseña</Label>
          <Input
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Button height={48} loading={loading} text="Continuar" />
        <Text style={styles.register}>¿No tienes cuenta?</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  title: {
    fontSize: 36,
    lineHeight: 40,
    fontFamily: "Pacifico",
    padding: 12,
    marginBottom: 28,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    rowGap: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  formStep: {
    display: "flex",
    flexDirection: "column",
  },
  register: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 600,
    textAlign: "center",
  },
});
