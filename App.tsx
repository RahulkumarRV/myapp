import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack";
import { RootStackParamList } from './tyes';
import { useState } from 'react';


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const  HomeScreen: React.FC<HomeScreenProps> = (props) => {
  const [keyInput, setKeyInput] = useState("");

  async function handleApi (){
      await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${keyInput}?api_key=DEMO_KEY`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        props.navigation.push("Profile", {data : data});
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function handleRandomApi(){
    await fetch(` https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`)
      .then((data) => data.json())
      .then((data) => {
        const datalist = data.near_earth_objects;
        console.log(datalist.length);
        
        props.navigation.push("Profile", {data : datalist[Math.floor(Math.random() * datalist.length)]});
      })
      .catch((e) => {
        console.log(e);
      });
  }


  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <View>
      <TextInput 
      style={{ width: 200, height: 40, padding: 5, marginBottom: 5, backgroundColor: "lightgray"}}
      placeholder='Enter Key'
      value={keyInput}
      onChangeText={setKeyInput}
      ></TextInput>
      <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", height: 50}}>
        <Button title='Submit' onPress={() => { handleApi()}}/>
        <Button title='Random' onPress={() => handleRandomApi()}/>
      </View>
      </View>
    </View>
  );
}

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const  ProfileScreen: React.FC<ProfileScreenProps> = (props) => {

  
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Button title='Home' onPress={() => props.navigation.push("Home")}></Button>
      <Text>{JSON.stringify( props.route.params.data)}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>
        <Stack.Screen name='Profile' component={ProfileScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
