import { StackScreenProps } from '@react-navigation/stack';
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Slider from '@react-native-community/slider';
import {LinearGradient} from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { List, Modal, Portal, Provider } from 'react-native-paper';
import ToggleSwitch from 'toggle-switch-react-native';
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
                <View style={{ flexDirection: 'row'}}>
                    <FontAwesome5 
                        name='pepper-hot'
                        color={
                            spice === 0 ? 'green' : 
                            spice === 1 ? 'orange' : 'red'
                        }
                        size={20}
                        style={{
                            marginVertical: 10,
                            marginHorizontal: 5,
                        }}
                    />
                    { spice === 1 ? (
                        <FontAwesome5 
                            name='pepper-hot'
                            color={spice === 1 ? 'orange' : 'red'}
                            size={20}
                            style={{ 
                                marginVertical: 10,
                                marginHorizontal: 5,
                            }}
                        />
                    ) : null }
                    { spice === 2 ? (
                        <FontAwesome5 
                            name='pepper-hot'
                            color='red'
                            size={20}
                            style={{ 
                                marginVertical: 10,
                                marginHorizontal: 5,
                            }}
                        />
                    ) : null }
                    { spice === 2 ? (
                        <FontAwesome5 
                            name='pepper-hot'
                            color='red'
                            size={20}
                            style={{ 
                                marginVertical: 10,
                                marginHorizontal: 5,
                            }}
                        />
                    ) : null }
                </View>
            </View>
            <View>
                <Text style={{ color: '#ffffffa5', borderBottomWidth: 1, borderColor: 'gold', paddingBottom: 20,}}>
                Desciption.Desciption.Desciption.Desciption.Desciption.Desciption.
                Desciption.Desciption.Desciption.Desciption.Desciption.Desciption.
                </Text>
            </View>
            
            <Text style={{
                    fontSize: 18,
                    paddingVertical: 10,
                    color: 'white',
                    alignSelf: 'flex-start',
                    marginHorizontal: 20,
                    marginTop: 20,
                    }}>Share
                </Text>
                <View style={[styles.inputfield, {height: 60, borderWidth: 1, borderColor: 'white'}]}>
                    <TextInput
                        placeholder='Select partner'
                            placeholderTextColor='#ffffffa5'
                        style={styles.textInputTitle}
                        maxLength={50}
                        multiline={true}
                        numberOfLines={2}
                        //onChangeText={displayStatus => setDisplayStatus(displayStatus)}
                    />
                </View>
                
                <View style={{ flexDirection: 'row'}}>
                    <ToggleSwitch
                        isOn={isSwitchOn}
                        onColor="#524d11"
                        thumbOnStyle={{
                            backgroundColor: 'gold'
                        }}
                        offColor="gray"
                        size="medium"
                        onToggle={onToggleSwitch}
                    />
                    <Text style={{
                        fontSize: 18,
                        paddingVertical: 20,
                        color: 'white',
                        margin: 20,
                        }}>Post annonymously
                    </Text>  
                </View>
               
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>

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
                                width: 100,
                                borderWidth: 1,
                                borderColor: 'gold'
                                }} >
                            <Text style={{ color: 'gold', fontSize: 16, textAlign: 'center'}}>Edit</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ 
                            marginBottom: 20,
                        }}
                        onPress={hideModal}>
                        <LinearGradient
                            colors={['gold', 'gold']}
                            style={{ 
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 20,
                                width: 100,
                                }} >
                            <Text style={{ color: 'black', fontSize: 16, textAlign: 'center'}}>Finish</Text>
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
            <View style={styles.inputfield}>
                <TextInput
                    placeholder='Description'
                        placeholderTextColor='#ffffffa5'
                    style={[styles.textInput, { height: 80 }]}
                    maxLength={300}
                    multiline={true}
                    numberOfLines={10}
                    //onChangeText={displayStatus => setDisplayStatus(displayStatus)}
                />
            </View>

            <View style={{ width: Dimensions.get('window').width, marginBottom: 20, }}>
                <ModalDropdown 
                  options={Genre}
                  defaultValue='Select category...'
                  defaultTextStyle={{ color: '#ffffffa5'}}
                  style={{ 
                    backgroundColor: '#363636a5',
                    marginHorizontal: 20,
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                  }}
                  textStyle={{ color: 'cyan', fontSize: 14, textTransform: 'capitalize',}}
                  dropdownStyle={{ 
                    backgroundColor: '#363636', 
                    width: '80%', 
                    borderWidth: 0,
                    borderRadius: 15,
                    height: 280,
                    marginTop: 10
                  }}
                  dropdownTextStyle={{ 
                    backgroundColor: 'transparent',
                    color: '#fff',
                    fontSize: 14,
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    textTransform: 'capitalize',
                    
                  }}
                  dropdownTextHighlightStyle={{
                    color: 'cyan'
                  }}
                />

            </View>

            <View style={{ alignItems: 'center'}}>

                <View style={{ flexDirection: 'row'}}>
                    <FontAwesome5 
                        name='pepper-hot'
                        color={
                            spice === 0 ? 'green' : 
                            spice === 1 ? 'orange' : 'red'
                        }
                        size={25}
                        style={{
                            marginVertical: 10,
                            marginHorizontal: 5,
                        }}
                    />
                    { spice === 1 ? (
                        <FontAwesome5 
                            name='pepper-hot'
                            color={spice === 1 ? 'orange' : 'red'}
                            size={25}
                            style={{ 
                                marginVertical: 10,
                                marginHorizontal: 5,
                            }}
                        />
                    ) : null }
                    { spice === 2 ? (
                        <FontAwesome5 
                            name='pepper-hot'
                            color='red'
                            size={25}
                            style={{ 
                                marginVertical: 10,
                                marginHorizontal: 5,
                            }}
                        />
                    ) : null }
                    { spice === 2 ? (
                        <FontAwesome5 
                            name='pepper-hot'
                            color='red'
                            size={25}
                            style={{ 
                                marginVertical: 10,
                                marginHorizontal: 5,
                            }}
                        />
                    ) : null }
                </View>
                
                <Slider
                    style={{width: 300, height: 40}}
                    minimumTrackTintColor="gold"
                    maximumTrackTintColor="#ffffffa5"
                    thumbTintColor='#ffffff'
                    //tapToSeek={true}
                    value={0}
                    step={1}
                    minimumValue={0}
                    maximumValue={2} //function set to the length of the audio file
                    //onValueChange={SetPosition} //function: when slider changes, slider value = SetPosition
                    onSlidingComplete={SpiceRating}
                />
            </View>
                <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
                    <LinearGradient 
                        colors={!recording ? ['#ffffffa5', 'gray',] : ['maroon', 'red',] }
                        style={styles.recordbutton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        
                    >
                        <View>
                            <FontAwesome5 
                                name='microphone-alt'
                                color='#ffffff'
                                size={30}
                            />
                        </View>
                    </LinearGradient>
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
    backgroundColor: '#363636a5',
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
    fontSize: 16,
},
});

