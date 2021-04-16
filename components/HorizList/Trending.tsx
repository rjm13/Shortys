import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ImageBackground, TouchableOpacity } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import DATA from '../../data/dummyaudio';
import {useNavigation} from '@react-navigation/native';
import { listStorys } from '../../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';

const Item = ({title, genre, description, imageUri, audioUri, writer, narrator, time, id}) => {

    const navigation = useNavigation();

    return (
        <View style={styles.containernew}>
          <ImageBackground
            source={{uri: imageUri}}
            style={styles.image}
            imageStyle={{ borderRadius: 16}}
          >
                <View style={{ alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('AudioPlayer', {storyID: id})}>
                        <View style={{flexDirection: 'row', backgroundColor: '#000000a5', alignItems: 'center', marginTop: 10, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 15}}>
                            <FontAwesome5 
                                name='play'
                                color='#fff'
                                size={10}
                            />
                            <Text style={{ color: '#fff', fontSize: 13, paddingVertical: 0, marginLeft: 10}}>
                                21:48
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#000000a5', borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>   
                    <Text style={{ color: '#fff', paddingVertical: 5, paddingHorizontal: 10, fontSize: 12,}}>
                        {title}
                    </Text> 
                </View>  
          </ImageBackground>

          <View >
                <Text style={{ color: '#fff', fontSize: 14, textTransform: 'capitalize'}}>
                    {genre}
                </Text>
          </View>
          
      </View>
    );
}

const TrendingList = () => {

    //load the list of stories from AWS
    const fetchStorys = async () => {
        try {
            const response = await API.graphql(
                graphqlOperation(
                    listStorys
                )
            )
            setStorys(response.data.listStorys.items);
        } catch (e) {
            console.log(e);
        }
    }

    const [isFetching, setIsFetching] = useState(false);

    const [Storys, setStorys] = useState([]);

    useEffect( () => {
        const fetchStorys = async () => {
            try {
                const response = await API.graphql(
                    graphqlOperation(
                        listStorys
                    )
                )
                setStorys(response.data.listStorys.items);
            } catch (e) {
                console.log(e);
            }
        }
        fetchStorys();
    },[])

    const onRefresh = () => {
        setIsFetching(true);
        fetchStorys();
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

    const renderItem = ({ item }) => (

        <Item 
          title={item.title}
          imageUri={item.imageUri}
          genre={item.genre}
          audioUri={item.audioUri}
          description={item.description}
          writer={item.writer}
          narrator={item.narrator}
          time={item.time}
          id={item.id}
          //liked={item.liked}
          //rating={item.rating}
        />
      );

    return (
        <View>
            <FlatList
                data={Storys}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                extraData={true}
                refreshControl={
                    <RefreshControl
                    refreshing={isFetching}
                    onRefresh={onRefresh}
                    />
                }
                ListFooterComponent={
                    <View style={{ width: 100, height: 160, justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome5 
                            name='chevron-circle-right'
                            color='#ffffffa5'
                            size={25}
                        />
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create ({
    containernew: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 20,
        marginVertical: 20,
        borderRadius: 20,
      },
    image: {
        resizeMode: 'cover',
        width: 180,
        height: 160,
        justifyContent: 'space-between',
        marginBottom: 6,
        backgroundColor: '#363636',
        borderRadius: 15
      },
      title: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#000000a0',
      },
});

export default TrendingList;