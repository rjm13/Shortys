import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback, TouchableOpacity,  Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';

import { useNavigation } from '@react-navigation/native';


const ProfileScreen = ({navigation}) => {

    //const navigation = useNavigation();

    const [user, setUser] = useState();

    useEffect(() => {
      const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
          if (!userInfo) {
            return;
          }
        try {
          const userData = await API.graphql(graphqlOperation(
            getUser, {id: userInfo.attributes.sub}))
            if (userData) {
              setUser(userData.data.getUser);
            }
            console.log(userData.data.getUser);
        } catch (e) {
          console.log(e);
        }
      }
      fetchUser();
    }, [])

    return (
        <View>
            
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                //style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                
                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, alignItems: 'center'}}>
                    <FontAwesome5 
                        name='chevron-left'
                        color='#fff'
                        size={20}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.header}>
                        Profile
                    </Text>
                </View>
                
                <ScrollView style={{ height: '86%'}}>
                    <View style={{ alignItems: 'center'}}>
                        <Image 
                            source={{ uri: user?.imageUri}}
                            style={{
                                width: 120,
                                height: 120,
                                backgroundColor: '#363636',
                                borderRadius: 60,
                                marginTop: 20,
                            }}
                        />
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Following')}>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{ alignItems: 'center', margin: 20}}>
                                    <Text style={{ color: 'cyan', opacity: .5}}>
                                        32
                                    </Text>
                                    <Text style={{ color: '#ffffffa5', fontWeight: 'bold'}}>
                                        Following
                                    </Text>
                                </View>

                                <View style={{ alignItems: 'center', margin: 20}}>
                                    <Text style={{ color: 'cyan', opacity: .5}}>
                                        184
                                    </Text>
                                    <Text style={{ color: '#ffffffa5', fontWeight: 'bold'}}>
                                        Followers
                                    </Text>
                                </View>
                        </View>
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.header}>
                        {!!user ? user.name : 'Cognito User'}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen', {user: user})}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Account
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => navigation.navigate('Narrations')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Narrations
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ () => navigation.navigate('History')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                History
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableWithoutFeedback>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            
                        </View>
                    </TouchableWithoutFeedback>
                    

                    <TouchableOpacity onPress={() => navigation.navigate('NotificationSetting')}>
                        <View style={{ alignItems: 'center', marginHorizontal: 40, marginVertical: 10}}>
                            <Text style={{ color: '#fff', fontSize: 16, borderRadius: 20, borderColor: '#fff', paddingHorizontal: 20, paddingVertical: 5, borderWidth: .5}}>
                                Settings
                            </Text>
                        </View>
                    </TouchableOpacity>
                    
                </ScrollView>  
            </LinearGradient>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        //flex: 1
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginVertical: 20,
    },
});

export default ProfileScreen;