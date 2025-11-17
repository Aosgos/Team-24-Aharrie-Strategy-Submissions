import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LegalPrivacy() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Legal & Privacy</Text>
      <Text style={styles.text}>
        Terms, policies, and legal information will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", color: "#046868" },
  text: { marginTop: 10, fontSize: 14, color: "#555" },
});
