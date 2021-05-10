import { StackScreenProps } from '@react-navigation/stack';
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Slider from '@react-native-community/slider';
import {LinearGradient} from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { List, Modal, Portal, Provider } from 'react-native-paper';
//import ToggleSwitch from 'toggle-switch-react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { RootStackParamList } from '../types';
import genres  from '../data/dummygenre';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default function RecordAudio({
  navigation,
}: StackScreenProps<RootStackParamList, 'RecordAudio'>) {   
  
      const Genre = genres.map((item, index) => item.genre)

      //Toggle Switch
      const [isSwitchOn, setIsSwitchOn] = React.useState(false);
      const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  
      //Modal
      const [visible, setVisible] = React.useState(false);
  
      const showModal = () => setVisible(true);
      const hideModal = () => setVisible(false);
      const containerStyle = {
          backgroundColor: 'transparent', 
          padding: 20,
      };
  
      const [spice, setSpice] = useState(0);
  
      const [recording, setRecording] = useState();
  
      const [time, setTime] = useState(0);
  
      const [recTime, setRecTime] = useState(0)
  
      useInterval(() => {
          if (recording) {
          setTime(time + 1000);
          }
        }, 1000);
  
        function millisToMinutesAndSeconds () {
          let minutes = Math.floor(time / 60000);
          let seconds = ((time % 60000) / 1000);
          return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
      }  
  
      async function startRecording() {
          try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            }); 
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync(); 
            setRecording(recording);
            console.log('Recording started');
  
          let time = await recording.getStatusAsync();
          setRecTime(time.durationMillis);
  
  
          } catch (err) {
            console.error('Failed to start recording', err);
          }
        }
      
        async function stopRecording() {
          console.log('Stopping recording..');
          setRecording(undefined);
          showModal();
          await recording.stopAndUnloadAsync();
          const uri = recording.getURI(); 
          console.log('Recording stopped and stored at', uri);
  
          // let time = await recording.getStatusAsync();
  
          // if ( time.isDoneRecording === true) {
          //     {showModal}
          // }
          
        }
      
  
      function SpiceRating (value) {
          setSpice(value);
      }


  return (
    <Provider>
    <View style={styles.container}>

    <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View style={{ alignItems: 'center', padding: 20, backgroundColor: '#363636', borderRadius: 15,}}>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <Text style={[styles.title, {textTransform: 'capitalize'}]}>
                   Story Title 
                </Text>   
                <Text style={styles.timer}>
                    {millisToMinutesAndSeconds()}
                </Text>
            </View>
              
            <View style={{ }}>
                <TouchableOpacity
                    style={{ 
                        marginBottom: 20,
                    }}
                    onPress={hideModal}>
                    <View
                        style={{ 
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 20,
                            width: 200,
                            borderWidth: 1,
                            borderColor: 'cyan'
                            }} >
                        <Text style={{ color: 'cyan', fontSize: 16, textAlign: 'center'}}>Continue Recording</Text>
                    </View>
                </TouchableOpacity>

                    <TouchableOpacity
                        style={{ 
                            marginBottom: 20,
                        }}
                        onPress={hideModal}>
                        <LinearGradient
                            colors={['cyan', 'cyan']}
                            style={{ 
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 20,
                                width: 200,
                                }} >
                            <Text style={{ color: 'black', fontSize: 16, textAlign: 'center'}}>Save File</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    </Portal>

        <View style={{ marginTop: 50, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
           <AntDesign 
                name='close'
                size={25}
                color='#fff'
                onPress={ () => navigation.goBack()}
            /> 
        </View>


        <View style={{ alignItems: 'center'}}>
            <Text style={styles.title}>
                Record a Short Story
            </Text>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', height: 500}}> 
            
            <View style={[styles.inputfield, {height: 60}]}>
                <TextInput
                    placeholder='Story Title'
                        placeholderTextColor='#ffffffa5'
                    style={styles.textInputTitle}
                    maxLength={50}
                    multiline={true}
                    numberOfLines={2}
                    //onChangeText={displayStatus => setDisplayStatus(displayStatus)}
                />
            </View>
            
            <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
                    <View style={[styles.recordbutton, {
                        backgroundColor: !recording ? 'transparent' : '#00ffff',
                        borderColor: !recording ? '#00ffff' : 'transparent',
                        borderWidth: 1
                        }]}>
                        <FontAwesome5 
                            name='microphone-alt'
                            color={ !recording ? '#00ffff' : '#000'}
                            size={30}
                        />
                    </View>
            </TouchableOpacity>

            <View style={{ marginVertical: 10,}}>
                <Text style={styles.timer}>
                    {millisToMinutesAndSeconds()}
                </Text>
            </View>
        </View>
    </View>
    </Provider>
);
}

const styles = StyleSheet.create({
container: {
    //alignItems: 'center',
},
title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
    
},
inputfield: {
    width: '90%',
    backgroundColor: '#363636',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    
},
textInputTitle: {
    color: '#fff',
    fontWeight: 'bold',
},
textInput: {
    color: '#fff',
},
recordbutton: {
    backgroundColor: '#363636a5', 
    marginTop: 60,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
},
timer: {
    color: '#ffffff',
    fontSize: 22,
},
});

