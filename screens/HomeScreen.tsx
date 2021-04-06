import React, {useState} from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Searchbar } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';

import AudioStoryFlatList from '../components/AudioStoryFlatList';
import Trending from '../components/HorizList/Trending';
import ForYouCarousel from '../components/HorizList/ForYouCarousel';

const AudioStoryHome = ({navigation}) => {



    return (
        
        <LinearGradient
            colors={['#a52bb0', '#2f2179', 'black']}
            //style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
          <ScrollView style={styles.container}>
          <View style={{    flexDirection: 'row', justifyContent: 'space-between', 
                            marginTop: 40, marginBottom: 20, marginHorizontal: 20}}>
            <View style={{ flexDirection: 'row'}}>

                <Text style={styles.pageheader}>
                    For you
                </Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
                <FontAwesome
                    name='user'
                    size={20}
                    color='#fff'
                    style={{ paddingLeft: 30 }}
                    onPress={() => navigation.navigate('ProfileScreen')}
                />
            </View>
          </View>

          <View>
            <ForYouCarousel />
          </View>
        
          <View>
              <Text style={styles.header}>
                  Trending
              </Text>
              <Trending />
          </View>

          <View>
              <Text style={styles.header}>
                  Under 10 Minutes
              </Text>
              <Trending />
          </View>

          <View>
              <Text style={styles.header}>
                  Science Fiction
              </Text>
              <Trending />
          </View>

          <View>
              <Text style={styles.header}>
                  Mystery
              </Text>
              <Trending />
          </View>

            
           
            
        </ScrollView>
        </LinearGradient>
        
    );
}

const styles = StyleSheet.create({
    container: {
      
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginTop: 20,
    },
    pageheader: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      marginHorizontal: 20,
  },
});

export default AudioStoryHome;
