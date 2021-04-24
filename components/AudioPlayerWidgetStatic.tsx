import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Dimensions, ImageBackground, Animated, PanResponder, Image, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as Animatable from 'react-native-animatable';
import { useRoute } from '@react-navigation/native';
import {graphqlOperation, API, Storage} from 'aws-amplify';
import { getStory } from '../src/graphql/queries';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

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

const AudioPlayer  = () => {

//minimize the player with animations
    const [isExpanded, setIsExpanded] = useState(false);

    const animation = useRef(new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 90 })).current;

    const onChangeHandler = () => {
        if (isExpanded) {
            setIsExpanded(false);
            Animated.spring(animation.y, {
                toValue: -SCREEN_HEIGHT + 120,
                tension: 1,
                //duration: 200,
                useNativeDriver: false,
            }).start();
        } else if (!isExpanded) {
            setIsExpanded(true);
            Animated.spring(animation.y, {
                toValue: SCREEN_HEIGHT - 90,
                tension: 1,
                //duration: 200,
                useNativeDriver: false,
            }).start();
        } 
    }

    const animatedHeight = {
        transform: animation.getTranslateTransform(),
    };
  
    const animatedImageHeight = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_WIDTH/1.2, 0],
        extrapolate: 'clamp',
        });
        
    const animatedImageWidth = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_WIDTH, 0],
        extrapolate: 'clamp',
        });

    const animatedSongTitleOpacity = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
    });

    const animatedImageMarginLeft = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_WIDTH / 2 - 100, 10],
        extrapolate: 'clamp',
    });

    const animatedHeaderHeightMinimized = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_HEIGHT, 0],
        extrapolate: 'clamp',
    });

    const animatedButtonLeft = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [0, -80],
        extrapolate: 'clamp',
    });

    const animatedButtonRight = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [0, -300],
        extrapolate: 'clamp',
    });

    const animatedHeaderHeightSmall = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [0, 60],
        extrapolate: 'clamp',
    });

    const animatedBoxHeight = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_HEIGHT - 240, 60],
        extrapolate: 'clamp',
      });

    const animatedBottom = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [-610, 690],
        extrapolate: 'clamp',
      });

    const animatedSongDetailsOpacity = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
        outputRange: [1, 0.5, 0.5],
        extrapolate: 'clamp',
    });

    const animatedBackgroundColor = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: ['rgba(0,0,0,0.5)', 'white'],
        extrapolate: 'clamp',
    });

//recieve story ID as props

//const route = useRoute();
//const {storyID} = route.params;

const storyID  = 'a367684b-9d1f-49aa-b767-457773446309'

//use storyID to retrieve Story from AWS
const [Story, setStory] = useState();
const [AudioUri, setAudioUri] = useState('');

useEffect(() => {

    const fetchStory = async () => {
      
      try {
        const storyData = await API.graphql(graphqlOperation(
          getStory, {id: storyID}))
          if (storyData) {
            setStory(storyData.data.getStory);
            const response = await Storage.get(storyData.data.getStory.audioUri, {download: false, expiration: 604800});
            setAudioUri(response);
            console.log(AudioUri);
          }
      } catch (e) {
        console.log(e);
      }
    }

    fetchStory();

  }, [storyID])

//background colors for the genre indicator
    const BackgroundColors = {
        backgroundColor: 
                Story?.genre === 'crime' ? '#cac715' : 
                Story?.genre === 'fantasy' ? '#15ca54' :
                Story?.genre === 'suspense' ? '#1579ca' :
                Story?.genre === 'comedy' ? '#ff9ce6' :
                Story?.genre === 'science fiction' ? '#c97f8b' :
                Story?.genre === 'life & adventure' ? '#15b8ca' :
                Story?.genre === 'fan fiction' ? '#a05ebf' :
                Story?.genre === 'after dark' ? '#5b6ade' : 
                '#363636'
        }

//audio player
    const [sound, setSound] = useState();

    const [isPlaying, setIsPlaying] = useState(false);

    const [position, setPosition] = useState(0); //position in milliseconds

    const [slideLength, setSlideLength] = useState(0);

//like state
    const [isLiked, setIsLiked] = useState(false);

    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }  
    };

//queueing the story
    const [isQ, setQd] = useState(false);

    const onQPress = () => {
        if ( isQ === false ) {
            setQd(true);
        }
        if ( isQ === true ) {
            setQd(false);
        }  
    };

//slider functions
    function SetPosition(value) {
        setPosition(value)
    }

    async function StoryPosition (value) { 
        await sound.setPositionAsync(value);
        setPosition(value);
    }

    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(position / 60000);
        let seconds = ((position % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

    function convertToTime () {
        let minutes = Math.floor(slideLength / 60000);
        let seconds = Math.floor((slideLength % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }  

//audio play and pause control
    async function PlayPause() {

        console.log('Loading Sound');
        console.log(Story);
        const { sound } = await Audio.Sound.createAsync(
            {uri: AudioUri},
            {shouldPlay: true}
        );
        
        setSound(sound);

        let time = await sound.getStatusAsync();
        setSlideLength(time.durationMillis);

        if (isPlaying === false) {
            console.log('Playing Sound');
            await sound.playAsync(); 
            setIsPlaying(true);
            await sound.setPositionAsync(position);
        } 
        if (isPlaying === true) {
            await sound.pauseAsync();
            setIsPlaying (false);     
        }    
    }

    // useEffect(() => {
    //     PlayPause();
    // }, []);

    useInterval(() => {
        if (isPlaying === true && position < slideLength) {
        setPosition(position + 1000);
        }
      }, 1000);
    

    useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);


    return (

    <View>
        <Animated.View
            style={{
            height: animatedImageHeight,
            width: animatedImageWidth,
            //marginLeft: animatedImageMarginLeft,
            position: 'absolute',
            bottom: 460,
            }}>
            <ImageBackground
                style={{
                    flex: 1,
                    width: null,
                    height: null,
                }}
                source={{uri: Story?.imageUri}}
            >
                <Animated.View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', marginHorizontal: 20}}>
                <Animated.View style={ [styles.button, {left: animatedButtonLeft}]}>
                        <AntDesign 
                            name='close'
                            size={22}
                            color='#fff'
                            style={{
                                
                            }}
                            //onPress={() => navigation.goBack() }
                        />
                    </Animated.View>
                    
                    <View style={{ }}>
                        <Animated.View style={ [styles.button, {right: animatedButtonRight}]}>
                            <FontAwesome 
                                name={isLiked ? 'star' : 'star-o'}
                                size={22}
                                color={isLiked ? 'gold' : 'white'}
                                onPress={onLikePress}
                                style={{ }}
                            />
                        </Animated.View>
                        <Animated.View style={ [styles.button, {right: animatedButtonRight}]}>
                            <AntDesign 
                                name={isQ ? 'pushpin' : 'pushpino'}
                                size={22}
                                color={isQ ? 'cyan' : 'white'}
                                onPress={onQPress}
                                style={{ }}
                            />
                        </Animated.View>
                        <Animated.View style={ [styles.button, {right: animatedButtonRight}]}>
                            <FontAwesome 
                                name='commenting-o'
                                size={22}
                                color='white'
                                //onPress={}
                                style={{ }}
                            />
                        </Animated.View>
                        <Animated.View style={ [styles.button, {right: animatedButtonRight}]}>
                            <FontAwesome 
                                name='share'
                                size={22}
                                color='white'
                                //onPress={}
                                style={{ }}
                            />
                        </Animated.View>
                    </View>
                    
                </Animated.View>
            </ImageBackground>
        </Animated.View>

        <Animated.View
          style={[
            animatedHeight,
            {
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: animatedBottom,
              //flex: 1,
              //zIndex: 10,
              //backgroundColor: '#ffffffa5',
              //height: SCREEN_HEIGHT,
              height: animatedBoxHeight,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            },
          ]}>
              <LinearGradient 
                colors={['#2f2179','black', '#000']}
                style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15, flex: 1}}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
            >
          <TouchableWithoutFeedback onPress={onChangeHandler}>

            <Animated.View
                style={{
                    height: animatedHeaderHeightSmall,
                    flexDirection: 'row',
                    alignItems: 'center', 
            }}>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                
                    
                    <Animated.Text
                        style={{
                            opacity: animatedSongTitleOpacity,
                            fontSize: 18,
                            paddingLeft: 20,
                            color: '#fff',
                            
                    }}>
                        {Story?.title}
                    </Animated.Text>

                    <Animated.View
                        style={{
                            opacity: animatedSongTitleOpacity,
                            //flex: 1,
                            marginRight: 40,
                    }}>
                        <FontAwesome5 
                                name={isPlaying === true ? 'pause' : 'play'}
                                color='#ffffffCC'
                                size={20}
                                onPress={PlayPause}
                        />
                    </Animated.View>
                </View>
            </Animated.View>

{/* Expanded View elements */}
            <Animated.View
                style={{
                    height: animatedHeaderHeightMinimized,
                    opacity: animatedSongDetailsOpacity,
            }}>

                <View
                    style={{
                        //flex: 1,
                        alignItems: 'center',
                        //justifyContent: 'flex-end',
                }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                        Hotel California (Live)
                    </Text>

                    <Text style={{ fontSize: 18, color: '#fa95ed' }}>
                        Eagles - Hell Freezes Over
                    </Text>
                </View>

                <View
                    style={{
                        height: 40,
                        width: SCREEN_WIDTH,
                        alignItems: 'center',
                }}>

                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={18}
                        maximumValue={71}
                        value={18}
                    />
                </View>

                <View
                    style={{
                        flex: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                    <View style={{ marginTop: 0, alignSelf: 'center' }}>
                        <FontAwesome5 
                            name={isPlaying === true ? 'pause' : 'play'}
                            color='#ffffffCC'
                            size={50}
                            onPress={PlayPause}
                        />
                </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingBottom: 20,
                }}>
                    <Ionicons name="add" size={32} style={{ color: '#fa95ed' }}/>
                    <Ionicons name="disc" size={32} style={{ color: '#fa95ed' }}/>
              </View>
            </Animated.View>
            
            </TouchableWithoutFeedback>
          </LinearGradient>
        </Animated.View>
      </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#363636a5',
        borderRadius: 50,
        width: 36,
        height: 36,
        margin: 10,
    },
   
});

export default AudioPlayer;
