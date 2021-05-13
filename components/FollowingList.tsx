import { API, graphqlOperation } from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
//import { Chip, Title } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { listUsers } from '../src/graphql/queries';
import { listFollowingIDs } from '../src/graphql/queries';
import {Auth} from 'aws-amplify';

import people from '../data/dummypeople';
import {useNavigation, useRoute} from '@react-navigation/native';

const Item = ({ name, imageUri, id, bio }) => {

    const navigation = useNavigation();



    return (
        <View style={styles.tile}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('UserScreen', {userID: id})}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ flexDirection: 'row'}}>
                        <Image 
                            source={{ uri: imageUri}}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: 'cyan'
                            }}
                        />
                    
                        <View style={{ marginHorizontal: 10}}>
                            <Text style={styles.name}>
                                {name}
                            </Text> 
                            
                            
                            <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                                <FontAwesome5 
                                    name='book-open'
                                    size={12}
                                    color='#ffffffa5'
                                    style={{ marginRight: 5}}
                                />
                            <Text style={styles.userId}>
                                    0
                                </Text>  
                                <FontAwesome5 
                                    name='book-reader'
                                    size={12}
                                    color='#ffffffa5'
                                    style={{ marginRight: 5}}
                                />
                            <Text style={styles.userId}>
                                    0
                                </Text> 
                            </View> 
                        </View>
                    </View>
                

                <View>
                    <View style={{ alignSelf: 'center', flexDirection: 'row', }}>
                        <AntDesign
                            name={'ellipsis1'}
                            size={20}
                            color='white'
                            //onPress={onLikePress}
                        />
                    </View>
                </View>
                
            </View> 
            
            </TouchableWithoutFeedback>
           
        </View>
    );
}

export default function FollowingList() {

    const [ users, setUsers ] = useState([]);

    useEffect( () => {
        const fetchUsers = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();


            try {
                const usersData = await API.graphql(
                    graphqlOperation(
                        listUsers
                    )
                )
                setUsers(usersData.data.listUsers.items);
            } catch (e) {
                console.log(e);
            }
        }
        fetchUsers();
    },[])

    const renderItem = ({ item }) => (

        <Item 
            //user={item}
            name={item.name}
            id={item.id}
            // email={item.email}
            imageUri={item.imageUri}
            //narrations={item.narrations.length}
            //author={item.author.length}
            bio={item.bio}
        />
      );

    return (

        
        <View style={ styles.container }>

            <FlatList
                style={{ width: '100%' }}
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                //extraData={true}
            />
          
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width, 
     },
     tile: {
         backgroundColor: '#383838a5',
         marginHorizontal: 20,
         marginVertical: 10,
         padding: 20,
         borderRadius: 15,
     },
     name: {
         fontSize: 16,
         fontWeight: 'bold',
         color: '#fff',
     },
     userId: {
         fontSize: 12,
         color: '#ffffffa5',
         marginRight: 15,
         marginLeft: 5,
     },
     popupblock: {
         marginTop: 10,
     },
     paragraph: {
         color: '#ffffffa5'
     },
     playbutton: {
         borderWidth: 0.3,
         paddingHorizontal: 15,
         paddingVertical: 3,
         borderRadius: 15,
         borderColor: '#fff',
         color: '#fff',
     },
     time: {
         fontSize: 16,
         fontWeight: 'normal',
         color: '#ffffffa5',
     },
     category: {
         fontSize: 12,
         color: 'cyan',
         fontStyle: 'italic',
         marginVertical: 3,
 
     },
});