import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as Animatable from 'react-native-animatable';

const story = 
    {
        id: '1',
        name: 'My Night Out',
        category: 'Science Fiction',
        highlight: 'Having fun in the car. This is a story about my first time doing it in public. Lets make this a little bit longer shall we just to see how it wraps on the page. We should even add some more. Obviously, a limit would be good, but still enough space.',
        audioUri: '',
        userId: 'annonymous',
        narrator: 'Marge Simpson',
        time: '5:30',
        liked: '1128',
        spiceRating: 'spicy',
        image: {uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/60bf8d1d-edfc-42a6-ab03-f4fac6fe4fed/de8lo8c-eaab8809-6d66-4bf8-ad9e-6b05e565d40d.jpg/v1/fill/w_900,h_1350,q_75,strp/parallel_by_luccain_de8lo8c-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMzUwIiwicGF0aCI6IlwvZlwvNjBiZjhkMWQtZWRmYy00MmE2LWFiMDMtZjRmYWM2ZmU0ZmVkXC9kZThsbzhjLWVhYWI4ODA5LTZkNjYtNGJmOC1hZDllLTZiMDVlNTY1ZDQwZC5qcGciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Iiw_5zt76oWTGuwWSVcnJZlRgnjDCPRqJVl5J0ex-zI'},


    }

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



const AudioPlayer  = ({navigation}) => {

    const [sound, setSound] = useState();

    const [isPlaying, setIsPlaying] = useState(false);

    const [position, setPosition] = useState(0); //position in milliseconds

    const [slideLength, setSlideLength] = useState(0);

    const [isLiked, setIsLiked] = useState(false);
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }  
    };

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


    async function PlayPause() {

        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/zelda.mp3'),
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

    useEffect(() => {
        PlayPause();
    }, []);

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
        <View style={styles.container}>
            <ImageBackground 
                source={story.image}
                style={{ width: '100%', height: '110%', flex: 3,  }}
            >
                <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', marginHorizontal: 20}}>
                    <AntDesign 
                        name='close'
                        size={25}
                        color='#fff'
                        style={{
                            margin: 20
                        }}
                        onPress={() => navigation.goBack() }
                    />
                    <FontAwesome 
                        name={isLiked ? 'star' : 'star-o'}
                        size={25}
                        color={isLiked ? 'gold' : 'white'}
                        onPress={onLikePress}
                        style={{ margin: 20}}
                    />
                </View>
            </ImageBackground>
            <Animatable.View 
                animation='bounceInUp'
                style={{flex: 5}}
                >
            <LinearGradient 
                            colors={['#2f2179','black', '#000']}
                            style={{ borderRadius: 20, paddingVertical: 5, paddingHorizontal: 20, flex: 5}}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
            >

            <View style={{ justifyContent: 'space-between', height: '100%'}}>
               

                <View style={{ margin: 20, alignItems: 'center'}}>
                    <Text style={styles.name}>
                        {story.name}
                    </Text>

                    <View style={{ width: '100%', flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome5 
                                name='book-open'
                                color='#ffffffa5'
                                size={15}
                                style={{ marginRight: 10}}
                            />
                            <Text style={styles.username}>
                                {story.userId}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome5 
                                name='book-reader'
                                color='#ffffffa5'
                                size={15}
                                style={{ marginRight: 10}}
                            />
                            <Text style={styles.username}>
                                {story.narrator}
                            </Text>
                        </View>
                    </View>
                    
                    <Text style={styles.highlight}>
                        {story.highlight}
                    </Text>

                    <View style={{margin: 20,}}>
                        <LinearGradient 
                            colors={['#14bee0','#15c7ca']}
                            style={{borderRadius: 15,paddingVertical: 5, paddingHorizontal: 20}}
                            // start={{ x: 0, y: 0 }}
                            // end={{ x: 1, y: 1 }}
                        >
                        <Text style={{ fontSize: 16   }}>
                            {story.category}
                        </Text>
                        </LinearGradient>
                    </View>
                    
                    <View>
                                <View style={{ flexDirection: 'row'}}>
                                    <FontAwesome5 
                                        name='pepper-hot'
                                        color={
                                            story.spiceRating === 'mild' ? 'green' : 
                                            story.spiceRating === 'moderate' ? 'orange' : 
                                            'red'
                                        }
                                        size={15}
                                        style={{ 
                                            marginHorizontal: 3
                                        }}
                                    />
                                    { story.spiceRating === 'moderate' ? (
                                    <FontAwesome5 
                                        name='pepper-hot'
                                        color={
                                            story.spiceRating === 'moderate' ? 'orange' : 
                                            'red'}
                                        size={15}
                                        style={{ 
                                            marginHorizontal: 3
                                        }}
                                    />
                                    ) : null }
                                    { story.spiceRating === 'spicy' ? (
                                    <FontAwesome5 
                                        name='pepper-hot'
                                        color='red'
                                        size={15}
                                        style={{ 
                                            marginHorizontal: 3
                                        }}
                                    />
                                    ) : null }
                                    { story.spiceRating === 'spicy' ? (
                                    <FontAwesome5 
                                        name='pepper-hot'
                                        color='red'
                                        size={15}
                                        style={{ 
                                            marginHorizontal: 3
                                        }}
                                    />
                                    ) : null }       

                                </View>
                            </View>
                    </View>
                    <View style={{ marginTop: 0, alignSelf: 'center' }}>
                        <FontAwesome5 
                            name={isPlaying === true ? 'pause' : 'play'}
                            color='#ffffffa5'
                            size={50}
                            onPress={PlayPause}
                        />
                    </View>
                 

            

            <View style={styles.footer}>
                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                        {millisToMinutesAndSeconds()}
                    </Text>
                    <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                        {convertToTime()}
                    </Text>
                </View>
                <View>
                <Slider
                    style={{width: 320, height: 10}}
                    minimumTrackTintColor="cyan"
                    maximumTrackTintColor="#ffffffa5"
                    thumbTintColor='#fff'
                    //tapToSeek={true}
                    value={position}
                    step={1000}

                    minimumValue={0}
                    maximumValue={slideLength} //function set to the length of the audio file
                    onValueChange={SetPosition} //function: when slider changes, slider value = SetPosition
                    onSlidingComplete={StoryPosition}
                />
                </View>
            </View>
            </View>
        </LinearGradient> 
        </Animatable.View>
        <StatusBar style='dark' />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'space-between',
        alignContent: 'space-between',
        height: Dimensions.get('window').height
    },
    name: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    username: {
        color: '#ffffffa5',
        fontSize: 16,
        marginVertical: 5,
        textTransform: 'capitalize'
    },
    footer: {
        marginVertical: 0,
    },
    highlight: { 
        marginHorizontal: -20,
        color: '#ffffffa5',
        fontSize: 14,
        padding: 12,
        borderRadius: 15,
        backgroundColor: '#rgba(69,69,69,0.2)',
    },
});

export default AudioPlayer;
