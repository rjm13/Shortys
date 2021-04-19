import { StackScreenProps } from '@react-navigation/stack';
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, TextInput, Dimensions, Platform, ActivityIndicator, TouchableWithoutFeedback, ScrollView } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {LinearGradient} from 'expo-linear-gradient';
import { Modal, Portal, Provider } from 'react-native-paper';
import ToggleSwitch from 'toggle-switch-react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import uuid from 'react-native-uuid';
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { createStory } from '../src/graphql/mutations';
import { Audio } from 'expo-av';

import genres  from '../data/dummygenre';

export default function UploadAudio({navigation}) {   

//audio object
    const [pendingImageState, setPendingImageState] = useState('');
    const [pendingAudioState, setPendingAudioState] = useState('');

    const [data, setData] = useState({
        title: '',
        description: '',
        genre: '',
        writer: '',
        narrator: '',
        time:'',
        imageUri: '',
        audioUri: '',
    });

    const [localImageUri, setLocalImageUri] = useState('');
    const [localAudioUri, setLocalAudioUri] = useState('');

//upload audio and image to s3
    const [isLoading, setIsLoading] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);

    const UploadToS3 = async () => {

        setIsLoading(true);

        if (localImageUri) {
        
                const response = await fetch(localImageUri);
                const blob = await response.blob();
                const filename = uuid.v4();
                const s3ResponseImage = await Storage.put(filename, blob);
                
                const result = await Storage.get(s3ResponseImage.key);
                setPendingImageState(result);          
        }
        
        if (localAudioUri) {
            try {
                const response = await fetch(localAudioUri);
                const blob = await response.blob();
                const filename = uuid.v4();
                const s3ResponseAudio = await Storage.put(filename, blob);

                //const response_a = await Storage.get(s3ResponseAudio.key);
                setPendingAudioState(s3ResponseAudio.key);
            } catch (e) {
                console.error(e);
            }
        }

        setIsLoading(false);
        setIsLoaded(true);
    }

//upload audio object to graphql database
    const [isPublishing, setIsPublishing] = useState(false);

    const [isPublished, setIsPublished] = useState(false);

    const PublishStory = async () => {

        console.log(pendingAudioState);
        console.log(pendingImageState);

        setIsPublishing(true);
        setData({...data, imageUri: pendingAudioState, audioUri: pendingImageState});
        console.log(data);

        try {
            let result = await API.graphql(
                    graphqlOperation(createStory, { input: 
                        {
                            title: data.title,
                            description: data.description,
                            genre: data.genre,
                            writer: data.writer,
                            narrator: data.narrator,
                            imageUri: pendingImageState,
                            audioUri:pendingAudioState,
                        }
                    }))
                        console.log(result);
                } catch (e) {
                        console.error(e);
        }
        setIsPublishing(false);
        setIsPublished(true);
    }


//request permission to access camera roll
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

//audio picker
    const [audioName, setAudioName] = useState('');

    const pickAudio = async () => {
        let result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
        });

        console.log(result);

        if (result) {
        setLocalAudioUri(result.uri);
        setAudioName(result.name);

        }
    };

//convert time for upload
    const Convert = async () => {
        let { sound } = await Audio.Sound.createAsync(
            {uri: localAudioUri},
            {shouldPlay: false}
        );

        let duration = await sound.getStatusAsync();
        setData({...data, time: duration.durationMillis});
    }

//image picker
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        setLocalImageUri(result.uri);
        }
    };
  
//Modal dropdown
      const Genre = genres.map((item, index) => item.genre)

      const ConvertToString = (val) => {
          if (val === 0) {
            setData({...data, genre: 'crime'})
          }  
          if (val === 1) {
            setData({...data, genre: 'fantasy'})
          }
          if (val === 2) {
            setData({...data, genre: 'mystery'})
          }
          if (val === 3) {
            setData({...data, genre: 'comedy'})
          }
          if (val === 4) {
            setData({...data, genre: 'heart warming'})
          }
          if (val === 5) {
            setData({...data, genre: 'life'})
          }  
          if (val === 6) {
            setData({...data, genre: 'after dark'})
          }  
          if (val === 7) {
            setData({...data, genre: 'fan fiction'})
          }    
        }

//Toggle Switch
      const [isSwitchOn, setIsSwitchOn] = useState(false);
      const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  
//Modal
      const [visible, setVisible] = useState(false);
  
      const showModal = () => setVisible(true);
      const hideModal = () => setVisible(false);
      const containerStyle = {
          backgroundColor: 'transparent', 
          padding: 20,
      };      

  return (
    <Provider>
        <ScrollView>
    <View style={styles.container}>

    <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <View style={{ padding: 20, backgroundColor: '#363636', borderRadius: 15,}}>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <Text style={[styles.title, {textTransform: 'capitalize'}]}>
                   {data.title}
                </Text>   
            </View>

            <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center'}}>
                <FontAwesome5 
                    name='book-open'
                    size={12}
                    color='#ffffffa5'
                />
                <Text style={styles.userId}>
                    {data.writer}
                </Text>  
                <FontAwesome5 
                    name='book-reader'
                    size={12}
                    color='#ffffffa5'
                />
                <Text style={styles.userId}>
                    {data.narrator}
                </Text> 
            </View>

            <View>
                <Text style={{ textTransform:'capitalize', color: '#00ffffa5', marginVertical: 5,}}>
                {data.genre}
                </Text>
            </View>

            <View>
                <Text style={{ color: '#ffffffa5', borderBottomWidth: 1, borderColor: 'cyan', paddingBottom: 20,}}>
                {data.description}
                </Text>
            </View>

            <View>
                <Text style={{ color: '#00ffffa5', marginVertical: 10,}}>
                {audioName}
                </Text>
            </View>

            <View>
                <Image 
                    source={{ uri: localImageUri}}
                    resizeMode='contain'
                    style={{ 
                        marginVertical: 10,
                        height: 120,
                        borderRadius: 15,
                    }} 
                    />
            </View>
            
                
                <View style={{ flexDirection: 'row'}}>
                    <ToggleSwitch
                        isOn={isSwitchOn}
                        onColor="#008282a5"
                        thumbOnStyle={{
                            backgroundColor: 'cyan'
                        }}
                        offColor="gray"
                        size="small"
                        onToggle={onToggleSwitch}
                    />
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 20,
                        color: 'white',
                        margin: 20,
                        }}>Post annonymously
                    </Text>  
                </View>
               
               
                <View style={{ width: '100%', alignItems: 'center'}}>
                    {!isLoading && !isLoaded? (
                        <TouchableOpacity
                                style={{ 
                                    marginBottom: 20,
                                }}
                                onPress={UploadToS3}>
                                <View
                                    style={{ 
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 20,
                                        //width: 100,
                                        borderWidth: 1,
                                        borderColor: 'cyan'
                                        }} >
                                    <Text style={{ color: 'cyan', fontSize: 16, textAlign: 'center'}}>Upload Media</Text>
                                </View>
                            </TouchableOpacity>
                    ) : null }

                    {isLoading ? (<ActivityIndicator size="large" color="#ffffff"/>) : null }

                    {isLoaded && !isPublishing && !isPublished && !isLoading ? (
                        <TouchableOpacity
                            style={{ 
                                marginBottom: 20,
                            }}
                            onPress={PublishStory}>
                            <LinearGradient
                                colors={['cyan', 'cyan']}
                                style={{ 
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 20,
                                    width: 100,
                                    }} >
                                <Text style={{ color: 'black', fontSize: 16, textAlign: 'center'}}>Publish</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    ) : null }
                    
                    {isLoaded && isPublishing ? (<ActivityIndicator size="large" color="#ffffff"/>) : null}
                    
                    {isPublished ? (
                        <TouchableOpacity
                        style={{ 
                            marginBottom: 20,
                        }}
                        onPress={() => navigation.navigate('Root', { screen: 'HomeScreen'})}
                        >
                        <LinearGradient
                            colors={['cyan', 'cyan']}
                            style={{ 
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 20,
                                width: 120,
                                alignItems: 'center'
                                }} >
                            <FontAwesome5 
                                name='check'
                                color='#363636'
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                    ) : null}

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
            <Text style={[styles.title, {marginBottom: 30}]}>
                Upload a Short Story
            </Text>
            <View style={[styles.inputfield, {height: 60}]}>
                <TextInput
                    placeholder='Story Title*'
                        placeholderTextColor='#ffffffa5'
                    style={styles.textInputTitle}
                    maxLength={50}
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={val => setData({...data, title: val})}
                />
                <FontAwesome5 
                    name='check-circle'
                    color={data.title !== '' ? 'cyan' : '#363636'}
                    size={20}
                />
            </View>
            <View style={styles.inputfield}>
                <TextInput
                    placeholder='Description*'
                        placeholderTextColor='#ffffffa5'
                    style={[styles.textInput, { height: 80 }]}
                    maxLength={300}
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={val => setData({...data, description: val})}
                />
                <FontAwesome5 
                    name='check-circle'
                    color={data.description !== '' ? 'cyan' : '#363636'}
                    size={20}
                />
            </View>

            <View style={{ 
                    width: '90%', 
                    marginBottom: 20, 
                    backgroundColor: '#363636a5',
                    marginHorizontal: 20,
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    }}>
                <ModalDropdown 
                  options={Genre}
                  defaultValue='Select category...*'
                  defaultTextStyle={{ color: '#ffffffa5'}}
                  onSelect={(val) => ConvertToString(val)}
                  style={{ 
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
                <FontAwesome5 
                    name='check-circle'
                    color={data.genre !== '' ? 'cyan' : '#363636'}
                    size={20}
                />

            </View>

            <View style={[styles.inputfield, {height: 60}]}>
                <TextInput
                    placeholder='Author*'
                        placeholderTextColor='#ffffffa5'
                    style={styles.textInputTitle}
                    maxLength={50}
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={val => setData({...data, writer: val})}
                />
                <FontAwesome5 
                    name='check-circle'
                    color={data.writer !== '' ? 'cyan' : '#363636'}
                    size={20}
                />
            </View>

            <View style={[styles.inputfield, {height: 60}]}>
                <TextInput
                    placeholder='Narrator'
                        placeholderTextColor='#ffffffa5'
                    style={styles.textInputTitle}
                    maxLength={50}
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={val => setData({...data, narrator: val})}
                />
                <FontAwesome5 
                    name='check-circle'
                    color={data.narrator !== '' ? 'cyan' : '#363636'}
                    size={20}
                />
            </View>

            <View style={{ width: '100%', marginBottom: 20, marginTop: 20, }}>
                <TouchableOpacity onPress={pickImage}>
                    <View style={{ marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                        <Text style={{ color: '#ffffffa5'}}>
                            {localImageUri !== '' ? localImageUri : 'Select artwork'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%'}}>
                <TouchableOpacity onPress={pickAudio}>
                    <View style={{ marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                        <Text style={{ color: '#ffffffa5'}}>
                            {audioName !== '' ? audioName : 'Select audio file'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

                <TouchableOpacity onPress={showModal}>
                    <LinearGradient 
                        colors={['#ffffffa5', 'gray'] }
                        style={styles.uploadbutton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        
                    >
                        <View>
                            <FontAwesome5 
                                name='upload'
                                color='#ffffff'
                                size={30}
                            />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

        </View>
    </View>
    </ScrollView>
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
    marginBottom: 0,
},
inputfield: {
    width: '90%',
    backgroundColor: '#363636a5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row', 
    justifyContent: 'space-between'
    
},
textInputTitle: {
    color: '#fff',
    fontWeight: 'bold',
    width: '90%'
},
textInput: {
    color: '#fff',
    width: '92%'
},
userId: {
    fontSize: 12,
    color: '#ffffffa5',
    marginRight: 15,
    marginLeft: 5,
},
uploadbutton: {
    backgroundColor: '#363636a5', 
    marginTop: 60,
    marginBottom: 60, 
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
},
timer: {
    color: '#ffffff',
    fontSize: 16,
},
});

