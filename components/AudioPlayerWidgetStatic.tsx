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

//

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
                source={{ uri: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'}}
            />
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

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                
                    <Animated.Text
                        style={{
                            opacity: animatedSongTitleOpacity,
                            fontSize: 18,
                            paddingLeft: 10,
                            color: '#fff'
                    }}>
                        Hotel California(Live)
                    </Animated.Text>

                </View>

                <Animated.View
                    style={{
                        opacity: animatedSongTitleOpacity,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                }}>
                    <FontAwesome5 name="pause" size={22} color={'#fff'} />
                    <FontAwesome5 name="play" size={22} color={'#fff'}/>
                </Animated.View>

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
   
});

export default AudioPlayer;
