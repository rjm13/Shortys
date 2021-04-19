import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Searchbar } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';

import AudioStoryFlatList from '../components/AudioStoryFlatList';

import {useRoute} from '@react-navigation/native';

const SearchScreen = ({navigation}) => {

    const route = useRoute();

    const {searchQ} = route.params;

    const [newSearch, setNewSearch] = useState(searchQ);


    function SearchBar () {

        
        const [searchQuery, setSearchQuery] = useState('');

        const onChangeSearch = query => setSearchQuery(query);

        return (
          <View>
            <Searchbar
              placeholder="Search"
              placeholderTextColor='#000000a5'
              onChangeText={onChangeSearch}
              onIconPress={() => setNewSearch(searchQuery)}
              value={searchQuery}
              iconColor='#000000a5'
              defaultValue={newSearch}
              style={{
                height: 35,
                marginHorizontal: 20,
                borderRadius: 8,
                backgroundColor: '#e0e0e0',
              }}
              inputStyle={{fontSize: 16,}}
            />
          </View>
        );
      };


    return (
        <View >
        <LinearGradient
        colors={['#363636','#2f217966', '#000']}
        //style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
          
          <View style={{    flexDirection: 'row', justifyContent: 'space-between', 
                            marginTop: 60, marginBottom: 20, marginHorizontal: 20}}>
            <View style={{ flexDirection: 'row'}}>
                <FontAwesome5 
                    name='chevron-left'
                    color='#fff'
                    size={20}
                    onPress={() => navigation.goBack()}
                />
                
            </View>
            <View style={{ flexDirection: 'row'}}>
            
            </View>
          </View>
        
            <View style={{ marginBottom: 20}}>
                <SearchBar />
            </View>

            

            <View style={{ alignSelf: 'center',marginHorizontal: 0, height: '80%'}}>
                    <AudioStoryFlatList search={newSearch} genre={null}/>
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

export default SearchScreen;
