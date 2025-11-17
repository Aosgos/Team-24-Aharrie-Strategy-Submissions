import React, { Component } from "react";
import { View, TouchableOpacity, Platform, StyleSheet, Text, Image, PixelRatio } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from '../../Style/Theme';

export default class Header extends Component {
  render() {
    const { showBackButton, onBackPress, showText, headerTitle, headerText, showIcon } = this.props;

    const defaultText = "Select your role to personalize your medication verification experience";

    return (
      <View style={styles.head}>

        {/* Back Button */}
        {showBackButton && onBackPress && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.textColor} />
          </TouchableOpacity>
        )}

        {/* Centered Title + Optional Icon + Logo */}
        {(headerTitle || showIcon) && (
          <View style={styles.centerWrapper}>
            {/* Title Row */}
            {headerTitle && (
              <View style={styles.titleRow}>
                {showIcon && (
                  <Ionicons
                    name="leaf-outline"
                    size={22}
                    color="#6ab04c"
                    style={{ transform: [{ scaleX: -1 }] }}
                  />
                )}
                <Text style={styles.headerTitle}>{headerTitle}</Text>
              </View>
            )}

            {/* Logo */}
            <View style={[styles.logoContainer, { marginTop: 20 }]}>
              <Image
                source={require("../../assets/trust-wallet-token.png")}
                style={{ width: 50, height: 50 }}
                tintColor="#AFD18B"
              />
            </View>
          </View>
        )}

        {/* Optional description text */}
        {showText && (
          <Text style={styles.headerText}>
            {headerText || defaultText}
          </Text>
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 20,
    backgroundColor: "#f7f8f7ff",
    justifyContent: "flex-start",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
      },
      android: { elevation: 12 },
      web: { boxShadow: "0px 8px 25px rgba(0,0,0,0.35)" },
    }),
  },

  /* Absolute back button on left */
  backButton: {
    position: "absolute",
    left: 10,
    top: Platform.OS === "ios" ? 50 : 25,
    zIndex: 20,
  },

  /* Centered column for title + logo */
  centerWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  headerTitle: {
    fontSize: 20,
    color: "#597a0dff",
    lineHeight: 24,
    fontWeight: "600",
    textAlign: "center",
  },

  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 60,
    backgroundColor: "#f7faf7ff",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: { elevation: 6 },
      web: { boxShadow: "0px 4px 15px rgba(0,0,0,0.25)" },
    }),
  },

  headerText: {
    textAlign: "center",
    fontSize: PixelRatio.getFontScale() * 12,
    marginTop: 15,
    ...fonts.regular,
    color: colors.textLight,
    includeFontPadding: false,
  },
});
