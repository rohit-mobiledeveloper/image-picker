

import React,{useState,useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import CryptoAesCbc from 'react-native-crypto-aes-cbc';



import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




const App=()=> {
const[cameraPhoto,setCameraPhoto]=useState();
const [base64,setBase64]=useState("");
const[string,setString]=useState("");
const[decr,setDecr]=useState("");
const options={
 saveToPhotos:true,
 mediaType:'photo',
  }

const pickerimage= async()=>{
 const granted=await PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.CAMERA,
 );
 if(granted){
const result=await launchCamera(options);
setCameraPhoto(result.assets[0].uri)
console.log(result)
 }
 console.log('hello')
}

const gallery= async(e)=>{
  const options={
    includeBase64:true
  }
   const result=await launchImageLibrary(options);
    setBase64(result.assets[0].base64);
    setCameraPhoto(result.assets[0].uri)
}
const token=()=>{
  CryptoAesCbc.encryptInBase64(
    '0000000000000000',//iv
    "ab821eb4b7d352cd65e84c5a7f38dbb0966262c651cf7064a0d821d8b2a20a5a",//key
    base64,
    '128'
  ).then((encryptString) => {
    setString(encryptString)
    console.log(string);
  });
  CryptoAesCbc.decryptByBase64(
  ivInBASE64,
  "ab821eb4b7d352cd65e84c5a7f38dbb0966262c651cf7064a0d821d8b2a20a5a",//key
  string,
  '128'
).then((decryptString) => {
  setDecr(decryptString)
  console.log(decr);
});
}
  return (
 <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white',flexDirection:'column'}}>
<TouchableOpacity onPress={()=>{pickerimage()}} style={{height:140,width:150,backgroundColor:'skyblue',borderRadius:10,justifyContent:'center',alignItems:'center',elevation:10,borderColor:'black',borderWidth:1}}>
<Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>
  Upload Image
</Text>
</TouchableOpacity>
<Image style={{height:100,width:100,margin:10}} source={{uri:cameraPhoto}}/>
<TouchableOpacity onPress={(e)=>gallery(e)} style={{height:140,width:150,backgroundColor:'skyblue',borderRadius:10,justifyContent:'center',alignItems:'center',elevation:10,borderColor:'black',borderWidth:1}}>
<Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>
  Upload Image 
</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>{token()}} style={{height:40,width:90,backgroundColor:'skyblue',justifyContent:'center',alignItems:'center',marginTop:5}}>
<Text>Get Token</Text>
</TouchableOpacity>
 </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
