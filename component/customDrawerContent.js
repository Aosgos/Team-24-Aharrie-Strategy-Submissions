// components/CustomDrawerContent.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawerContent = ({ navigation }) => {
  const menuItems = [
    { label: "Profile", icon: "person-outline", screen: "Profile" },
    { label: "Scan History", icon: "document-text-outline", screen: "ScanHistory" },
    { label: "Settings", icon: "settings-outline", screen: "Settings" },
    { label: "Help & Support", icon: "help-circle-outline", screen: "Help" },
    { label: "Legal & Privacy", icon: "book-outline", screen: "Legal" },
    { label: "Sign Out", icon: "exit-outline", screen: "Login" },
  ];

  return (
    <ScrollView style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Ionicons name={item.icon} size={22} color="#046868ff" style={styles.icon} />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 20 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 15, paddingHorizontal: 20 },
  icon: { marginRight: 15 },
  label: { fontSize: 16, color: "#046868ff" },
});

export default CustomDrawerContent;
