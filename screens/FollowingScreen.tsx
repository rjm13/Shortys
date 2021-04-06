import React, {useState} from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Searchbar } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';

import AudioStoryFlatList from '../components/AudioStoryFlatList';
import FollowingList from '../components/FollowingList';

const FollowingScreen = ({navigation}) => {

    const [SelectedId, setSelectedId] = useState(1);

    return (
        <View >
        <LinearGradient
        colors={['#363636', 'black', 'black']}
        //style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
          
          <View>
              <View style={{ marginTop: 50, marginHorizontal: 20}}>
                  <FontAwesome5 
                    name='chevron-left'
                    color='#fff'
                    size={20}
                    onPress={ () => navigation.goBack()}
                  />

              </View>
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'flex-start', 
                width: '100%', 
                alignItems: 'flex-end',
                marginHorizontal: 20,
                height: 50,
                }}>
        
                <TouchableWithoutFeedback onPress={() => setSelectedId(1)}>
                    <Text style={{ 
                        color: SelectedId ===  1 ? '#fff' : '#ffffffa5',
                        marginHorizontal: 15, 
                        fontSize: SelectedId ===  1 ? 22 : 17,
                        fontWeight: SelectedId === 1 ? 'bold' : 'normal',
                        borderBottomColor: '#fff',
                        //borderBottomWidth: SelectedId ===  1 ? 1 : 0,
                    }}>
                        Followers
                    </Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => setSelectedId(2)}>
                    <Text style={{ 
                        color: SelectedId ===  2 ? '#fff' : '#ffffffa5',
                        marginHorizontal: 15, 
                        fontSize: SelectedId ===  2 ? 22 : 17,
                        fontWeight: SelectedId === 2 ? 'bold' : 'normal'
                    }}>
                        Following
                    </Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => setSelectedId(3)}>
                    <Text style={{ 
                        color: SelectedId ===  3 ? '#fff' : '#ffffffa5',
                        marginHorizontal: 15, 
                        fontSize: SelectedId ===  3 ? 22 : 17,
                        fontWeight: SelectedId === 3 ? 'bold' : 'normal'
                    }}>
                        
                    </Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => setSelectedId(4)}>
                    <Text style={{ 
                        color: SelectedId ===  4 ? '#fff' : '#ffffffa5',
                        marginHorizontal: 15, 
                        fontSize: SelectedId ===  4 ? 22 : 17,
                        fontWeight: SelectedId === 4 ? 'bold' : 'normal'
                    }}>                        
                        
                    </Text>
                </TouchableWithoutFeedback>
            </View>
            
          </View>
        
            {/* <View>
                {renderElement()}
            </View> */}

            <View style={{ alignItems: 'center', marginTop: 20, height: '86%'}}>
                <FollowingList />
            </View>
           
            
        
        </LinearGradient>
        </View>
    );
}

export default FollowingScreen;
