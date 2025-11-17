import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { handleSignup } from "../../Utils/AuthUtils";
import { colors } from "../../Style/Theme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const scale = (size) => (SCREEN_WIDTH / 375) * size;

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      showPassword: false,
      errors: {},
    };
  }

  validateFields = () => {
    const { name, email, password } = this.state;
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Invalid email format";
    if (!password) errors.password = "Password is required";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters";

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSignupPress = () => {
    if (!this.validateFields()) return;
    const { name, email, password } = this.state;
    handleSignup({ name, email, password, navigation: this.props.navigation });
  };

  render() {
    const { name, email, password, showPassword, errors } = this.state;

    return (
      <SafeAreaView style={styles.safeArea}>
        {/* Header Logo */}
        <View style={styles.headerWrapper}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/trust-wallet-token.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.headerTexttitle}>Drug Verification</Text>
          <Text style={styles.headerText}>Join our secure platform</Text>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.text}>Create Your Account</Text>
            <Text style={styles.texttwo}>Sign up to get started</Text>

            {/* Name Input */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="person-outline"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.input, errors.name && { borderColor: "#ff6b6b" }]}
                  placeholder="Enter your full name"
                  placeholderTextColor="#ced3ceff"
                  value={name}
                  onChangeText={(text) => this.setState({ name: text })}
                />
              </View>
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            {/* Email Input */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colors.textLight}
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.input, errors.email && { borderColor: "#ff6b6b" }]}
                  placeholder="Enter your email"
                  placeholderTextColor="#ced3ceff"
                  value={email}
                  onChangeText={(text) => this.setState({ email: text })}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Password Input */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={colors.textLight}
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.input, errors.password && { borderColor: "#ff6b6b" }]}
                  placeholder="Create a password"
                  placeholderTextColor="#ced3ceff"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => this.setState({ password: text })}
                />
                <TouchableOpacity
                  onPress={() => this.setState({ showPassword: !showPassword })}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#007bff"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            {/* Signup Button */}
            <TouchableOpacity style={styles.button} onPress={this.handleSignupPress}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Login Redirect */}
            <TouchableOpacity onPress={() => this.props.navigation.replace("Login")}>
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.linkText}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#D6FFFF",
  },
  headerWrapper: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    paddingBottom: 30,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ced3ceff",
    borderStyle: "solid",
    backgroundColor: "#f7f8f7ff",
  },
  logoWrapper: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: "#D6FFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  logo: {
    width: scale(35),
    height: scale(35),
    tintColor: "#007bff",
  },
  headerText: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: "600",
  },
  headerTexttitle: {
    fontSize: 16,
    color: "#898fc2ff",
    fontWeight: "600",
  },
  scrollContainer: {
    paddingBottom: 50,
    alignItems: "center",
    paddingTop: 20,
  },
  content: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    marginVertical: 20,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 11,
      },
      android: { elevation: 30 },
      web: { boxShadow: "0px 20px 50px rgba(0,0,0,0.3)" },
    }),
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 6,
  },
  texttwo: {
    fontSize: 18,
    fontWeight: "400",
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 15,
  },
  fieldWrapper: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#555",
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    paddingHorizontal: 10,
    position: "relative",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#000",
    paddingVertical: 0,
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 14,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 13,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  loginText: {
    color: "#555",
    fontSize: 14,
    marginTop: 15,
  },
  linkText: {
    color: "#007bffe7",
    fontWeight: "bold",
  },
});
