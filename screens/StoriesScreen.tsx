import React, {useState} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Searchbar } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';

import AudioStoryFlatList from '../components/AudioStoryFlatList';
import GenreFlatList from '../components/GenreFlatList';

const AudioStoryHome = ({navigation}) => {

    function SearchBar () {

        const [searchQuery, setSearchQuery] = useState('');
      
        const onChangeSearch = query => setSearchQuery(query);
      
        return (
          <View>
            <Searchbar
              placeholder="Search"
              placeholderTextColor='#000000a5'
              onChangeText={onChangeSearch}
              value={searchQuery}
              iconColor='#000000a5'
              style={{
                height: 35,
                marginHorizontal: 20,
                borderRadius: 8,
                backgroundColor: '#e0e0e0a5',
              }}
              inputStyle={{fontSize: 16,}}
            />
          </View>
        );
      };


    return (
        <View >
        <LinearGradient
        colors={['#a52bb0', 'black', 'black']}
        //style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
          
          <View style={{    flexDirection: 'row', justifyContent: 'space-between', 
                            marginTop: 40, marginBottom: 20, marginHorizontal: 20}}>
            <View style={{ flexDirection: 'row'}}>
        
                <Text style={{ color: 'white', marginHorizontal: 0, fontSize: 22, fontWeight: 'bold'}}>
                    Discover Stories
                </Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
            <FontAwesome5
                    name='microphone-alt'
                    size={22}
                    color='#fff'
                    style={{ marginHorizontal: 5 }}
                    onPress={() => navigation.navigate('RecordAudio')}
                />
            </View>
          </View>
        
            <View style={{ marginBottom: 20}}>
                <SearchBar />
            </View>

            

            <View style={{ marginHorizontal: 20, height: '80%'}}>
                <GenreFlatList />
            </View>

        </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
  header: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  box: {
    height: 100,
    width: 140,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  genrebox: {
    height: 80,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default AudioStoryHome;
