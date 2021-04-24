import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useRoute } from '@react-navigation/native';

import AudioStoryFlatList from '../components/AudioStoryFlatList';

const GenreHome = ({navigation}) => {

    const route = useRoute();

    const {genre} = route.params

    const BackgroundColors = {
        backgroundColor: 
              genre === 'crime' ? '#cac715' : 
              genre === 'fantasy' ? '#15ca54' :
              genre === 'suspense' ? '#1579ca' :
              genre === 'comedy' ? '#ff9ce6' :
              genre === 'science fiction' ? '#c97f8b' :
              genre === 'life & adventure' ? '#15b8ca' :
              genre === 'fan fiction' ? '#a05ebf' :
              genre === 'after dark' ? '#5b6ade' : 
              'cyan'
        }

    return (
        <View style={styles.container}>
            <View style={[BackgroundColors]}>
                <LinearGradient
                    colors={['transparent', 'transparent', '#000']}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <View style={{ marginTop: 60, flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between'}}>
                        <FontAwesome5 
                            name='chevron-left'
                            color='#000'
                            size={22}
                            onPress={() => navigation.goBack()}
                        />
                        <FontAwesome5 
                            name='sort-alpha-down'
                            color='#000'
                            size={22}
                        />
                    </View>
                    <View style={{ top: 40, alignItems: 'center'}}>
                        <Text style={{ fontSize: 32, color: '#000', textTransform: 'capitalize', fontWeight: 'bold'}}>
                            {genre}
                        </Text>
                    </View>
                    
                </LinearGradient>
            </View>
            <View style={{ marginTop: 0}}>
                <AudioStoryFlatList genre={genre} search={null} all={null}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    gradient: {
        height: 300
    },
});

export default GenreHome;