import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, View, Text } from "react-native";
import { RootStackParamList } from "./tyes";



type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const  ProfileScreen: React.FC<ProfileScreenProps> = (props) => {

  
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Button title='Home' onPress={() => props.navigation.push("Home")}></Button>
      <Text>{JSON.stringify( props.route.params.data)}</Text>
    </View>
  );
}

export default ProfileScreen;