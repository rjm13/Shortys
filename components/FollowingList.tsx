//import { API, graphqlOperation } from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions, Image } from 'react-native';
//import { Chip, Title } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


//import { listUsers } from '../graphql/queries';

import people from '../data/dummypeople';

const Item = ({ name, email, pseudonym, avatar, gender, dob, narrations, author}) => {

    return (
        <View style={styles.tile}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{ flexDirection: 'row'}}>
                    <Image 
                        source={avatar}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                        }}
                    />
                
                    <View style={{ marginHorizontal: 10}}>
                        <Text style={styles.name}>
                            {name}
                        </Text> 
                        
                        <Text style={styles.category}>
                            {pseudonym}
                        </Text>
                        
                        
                        <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                            <FontAwesome5 
                                name='book-open'
                                size={12}
                                color='#ffffffa5'
                                style={{ marginRight: 5}}
                            />
                        <Text style={styles.userId}>
                                {author}
                            </Text>  
                            <FontAwesome5 
                                name='book-reader'
                                size={12}
                                color='#ffffffa5'
                                style={{ marginRight: 5}}
                            />
                        <Text style={styles.userId}>
                                {narrations}
                            </Text> 
                        </View> 
                    </View>
                </View>
                
                <View>
                    <View style={{ alignSelf: 'center', flexDirection: 'row', }}>
                        <FontAwesome5
                            name={'ellipsis-h'}
                            size={20}
                            color='white'
                            //onPress={onLikePress}
                        />
                    </View>
                </View>
            </View> 

        </View>
    );
}

export default function FollowingList() {

    const [ users, setUsers ] = useState([]);

    // useEffect( () => {
    //     const fetchUsers = async () => {
    //         try {
    //             const usersData = await API.graphql(
    //                 graphqlOperation(
    //                     listUsers
    //                 )
    //             )
    //             setUsers(usersData.data.listUsers.items);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    //     fetchUsers();
    // },[])

    const renderItem = ({ item }) => (

        <Item 
            name={item.name}
            email={item.email}
            pseudonym={item.pseudonym}
            avatar={item.avatar}
            gender={item.gender}
            dob={item.dob}
            narrations={item.narrations.length}
            author={item.author.length}
        />
      );

    return (

        
        <View style={ styles.container }>

            <FlatList
                style={{ width: '100%' }}
                data={people}
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