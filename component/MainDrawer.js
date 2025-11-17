import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Menue from "../component/LandingPage/Menue";
import CustomDrawerContent from "./customDrawerContent";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="HomeScreen" component={Menue} />
    </Drawer.Navigator>
  );
}
