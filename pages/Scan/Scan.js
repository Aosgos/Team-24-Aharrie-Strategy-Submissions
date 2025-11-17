import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fonts } from "../../Style/Theme";

const { width, height } = Dimensions.get("window");
const scale = size => (width / 375) * size;
const verticalScale = size => (height / 812) * size;

export default class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      scannedHistory: [],
      menuOpen: false,
    };
  }

  componentDidMount() {
    this.loadUserData();
    this.loadScannedHistory();
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.loadScannedHistory();
    });
  }

  componentWillUnmount() {
    this._unsubscribe?.();
  }

  loadUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) this.setState({ user: JSON.parse(storedUser) });
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  loadScannedHistory = async () => {
    try {
      const storedScans = await AsyncStorage.getItem("scannedDrugs");
      if (storedScans) this.setState({ scannedHistory: JSON.parse(storedScans) });
    } catch (error) {
      console.error("Error loading scanned history:", error);
    }
  };

  render() {
    const { iconType } = this.props.route.params || {};
    const { user, scannedHistory, menuOpen } = this.state;

    const displayName = user?.name ? `Dr. ${user.name}` : "Dr. User";
    const displayEmail = user?.email || "user@example.com";

    const renderIcon = () => {
      if (iconType === "personal") return <Ionicons name="person-outline" size={scale(15)} color="#65f8f8ff" />;
      if (iconType === "pharmacy") return <Ionicons name="scan" size={scale(15)} color="#2ecc71" />;
      return <Ionicons name="people-outline" size={scale(15)} color="#65f8f8ff" />;
    };

    return (
      <SafeAreaView style={styles.container} edges={[]}>

        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.iconWrapper}>{renderIcon()}</View>
          <View style={styles.textWrapper}>
            <Text style={[styles.welcomeText, fonts.bold]}>Welcome, {displayName}</Text>
            <Text style={[styles.emailText, fonts.bold]}>{displayEmail}</Text>
          </View>

          {/* Hamburger icon */}
          <TouchableOpacity
            style={styles.hamburgerButton}
            onPress={() => this.setState({ menuOpen: !menuOpen })}
          >
            <Ionicons name="menu" size={scale(24)} color="#046868ff" />
          </TouchableOpacity>
        </View>

        
        {menuOpen && (
          <View style={styles.menuOverlay}>

            {/* Profile */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                this.setState({ menuOpen: false });
                this.props.navigation.navigate("Profile");
              }}
            >
              <View style={styles.menuRow}>
                <Ionicons name="person-circle-outline" size={scale(16)} color="#046868ff" />
                <Text style={styles.menuText}>Profile</Text>
              </View>
            </TouchableOpacity>

            {/* Scan History */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                this.setState({ menuOpen: false });
                this.props.navigation.navigate("ScanHistory");
              }}
            >
              <View style={styles.menuRow}>
                <MaterialIcons name="history" size={scale(16)} color="#046868ff" />
                <Text style={styles.menuText}>Scan History</Text>
              </View>
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                this.setState({ menuOpen: false });
                this.props.navigation.navigate("Settings");
              }}
            >
              <View style={[styles.menuRow, styles.setting]}>
                <Ionicons name="settings-outline" size={scale(16)} color="#046868ff" />
                <Text style={styles.menuText}>Settings</Text>
              </View>
            </TouchableOpacity>

            {/* Help & Support */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                this.setState({ menuOpen: false });
                this.props.navigation.navigate("Support");
              }}
            >
              <View style={styles.menuRow}>
                <Ionicons name="help-circle-outline" size={scale(16)} color="#046868ff" />
                <Text style={styles.menuText}>Help & Support</Text>
              </View>
            </TouchableOpacity>

            {/* Legal & Privacy */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                this.setState({ menuOpen: false });
                this.props.navigation.navigate("LegalPrivacy");
              }}
            >
              <View style={styles.menuRow}>
                <Ionicons name="document-text-outline" size={scale(16)} color="#046868ff" />
                <Text style={styles.menuText}>Legal & Privacy</Text>
              </View>
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity
              style={[styles.menuItem, { borderBottomWidth: 0 }]}
              onPress={() => {
                this.setState({ menuOpen: false });
                this.props.navigation.replace("Login");
              }}
            >
              <View style={styles.menuRow}>
                <Ionicons name="log-out-outline" size={scale(16)} color="#046868ff" />
                <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
              </View>
            </TouchableOpacity>

          </View>
        )}

        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/trust-wallet-token.png")}
              style={{ width: scale(30), height: scale(30) }}
              tintColor="#00A8C9"
            />
          </View>
          <View style={styles.TextVerify}>
            <Text style={[styles.TextHead, fonts.bold]}>Verify Drug authenticity</Text>
            <Text style={[styles.TextParagraph, fonts.bold]}>
              Scan QR codes to verify if your medications are genuine and safe
            </Text>
          </View>

          <TouchableOpacity
            style={styles.ScanButton}
            onPress={() => this.props.navigation.navigate("ScanningScreen")}
          >
            <MaterialIcons name="qr-code-2" size={scale(20)} color="#075f5fff" />
            <Text style={[styles.ScaNow, fonts.bold]}>SCAN NOW</Text>
          </TouchableOpacity>

          {/* Scanned history */}
          <ScrollView style={styles.historyContainer}>
            <Text style={styles.historyHeader}>Previously Scanned Drugs</Text>
            {scannedHistory.length === 0 ? (
              <Text style={styles.emptyText}>No scans yet.</Text>
            ) : (
              scannedHistory.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.resultBox,
                    { backgroundColor: item.valid ? "#e7fbe7" : "#ffeaea" },
                  ]}
                >
                  <Text style={styles.resultHeader}>
                    {item.valid ? "✅ Genuine Drug" : "⚠️ Fake or Unverified"}
                  </Text>
                  {item.productName && (
                    <Text style={styles.resultText}>Name: {item.productName}</Text>
                  )}
                  {item.manufacturer && (
                    <Text style={styles.resultText}>Manufacturer: {item.manufacturer}</Text>
                  )}
                  <Text style={styles.resultDate}>
                    {new Date(item.date).toLocaleString()}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fcfcff",
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(15),
    borderBottomWidth: 1,
    borderColor: "#eee",
    position: "relative",
  },

  iconWrapper: {
    width: scale(26),
    height: scale(26),
    marginRight: scale(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D6FFFF",
    borderRadius: scale(60),
  },

  textWrapper: { flex: 1 },
  welcomeText: { fontSize: scale(10), fontWeight: "700", color: "#046868ff" },
  emailText: { fontSize: scale(10), color: "#099c9cff", marginTop: verticalScale(3) },

  hamburgerButton: {
    position: "absolute",
    right: scale(15),
    top: verticalScale(20),
    zIndex: 10,
  },

  /* ========== MENU STYLES ========== */
  menuOverlay: {
    position: "absolute",
    top: verticalScale(65),
    right: scale(15),
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 5,
    width: scale(160),
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 50,
  },

  menuItem: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  
  

  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },

  menuText: {
    fontSize: scale(12),
    color: "#046868ff",
    fontWeight: "bold",
  },

  logoContainer: { marginTop: verticalScale(20), alignItems: "center" },

  logoWrapper: {
    width: scale(56),
    height: scale(56),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D6FFFF",
    borderRadius: scale(60),
  },

  TextVerify: { paddingHorizontal: scale(20) },

  TextHead: {
    textAlign: "center",
    marginVertical: verticalScale(15),
    letterSpacing: scale(1),
    color: "#046868ff",
  },

  TextParagraph: {
    textAlign: "center",
    fontSize: scale(10),
    color: "#046868ff",
    lineHeight: verticalScale(15),
  },

  ScanButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    height: verticalScale(50),
    gap: scale(10),
    marginVertical: verticalScale(20),
    borderColor: "#ccc",
    borderRadius: scale(10),
    paddingHorizontal: scale(15),
    backgroundColor: "#D6FFFF",
  },

  ScaNow: { color: "#046868ff", fontSize: scale(12) },

  historyContainer: {
    width: "90%",
    marginTop: 10,
    marginBottom: 30,
  },

  historyHeader: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#075f5f",
    marginBottom: 10,
    textAlign: "center",
  },

  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
  },

  resultBox: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  resultHeader: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 13,
  },

  resultText: {
    textAlign: "center",
    fontSize: 11,
    color: "#333",
  },

  resultDate: {
    textAlign: "center",
    fontSize: 10,
    color: "#666",
    marginTop: 4,
  },
});
