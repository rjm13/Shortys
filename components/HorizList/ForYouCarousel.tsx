import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, ImageBackground, RefreshControl, TouchableOpacity } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Carousel from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

import { listStorys } from '../../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import data from '../../data/dummyaudio';


const Item = ({title, genre, description, imageUri, audioUri, writer, narrator, time, id}) => {

    const navigation = useNavigation();

    const [isVisible, setIsVisible] = useState(false);
    
    const onShow = () => {
        if ( isVisible === false ) {
            setIsVisible(true);
        }
        if ( isVisible === true ) {
            setIsVisible(false);
        }  
    };

//liking the item
    const [isLiked, setIsLiked] = useState(false);
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }  
    };

//queueing the item
    const [isQ, setQd] = useState(false);
    
    const onQPress = () => {
        if ( isQ === false ) {
            setQd(true);
        }
        if ( isQ === true ) {
            setQd(false);
        }  
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{uri: imageUri}}
                style={{ width: '100%', height: 280, justifyContent: 'flex-end', backgroundColor: '#363636a5', borderRadius: 15}}
                imageStyle={{
                    borderRadius: 15,
                    
                }}
            >
                <View style={{ 
                    backgroundColor: '#000000a5',
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    borderTopRightRadius: isVisible === true ? 15 : 0,
                    borderTopLeftRadius: isVisible === true ? 15 : 0,
                    height: isVisible === true ? 280 : '35%',
                    padding: 10, 
                }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <View>
                                <Text style={styles.title}>
                                    {title}
                                </Text> 

                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={styles.category}>
                                        {genre}
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15}}>
                                       <FontAwesome5 
                                            name='play'
                                            color='#ffffffa5'
                                            size={10}
                                        />
                                        <Text style={styles.time}>
                                            12:53
                                        </Text> 
                                    </View>
                                    
                                </View>
                            </View>
                            
                            <View>
                                <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                                    <FontAwesome5 
                                        name='book-open'
                                        size={12}
                                        color='#ffffffa5'
                                    />
                                    <Text style={styles.userId}>
                                        {writer}
                                    </Text>  
                                    <FontAwesome5 
                                        name='book-reader'
                                        size={12}
                                        color='#ffffffa5'
                                    />
                                    <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
                                        <Text style={styles.userId}>
                                            {narrator}
                                        </Text> 
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                            <View style={{ alignSelf: 'center', flexDirection: 'row', marginRight: 10, }}>
                                <FontAwesome
                                    name={isVisible ? 'chevron-down' : 'chevron-up'}
                                    size={20}
                                    color='#ffffffa5'
                                    onPress={onShow}
                                />
                            </View>
                        </View>

                    <View>
                        { isVisible ? (
                            <View style={styles.popupblock}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                        <Text style={styles.time}>
                                            {time}
                                        </Text>
                                    </View> 
                                                  
                                    <View style={{ marginTop: 10,}}>
                                        <Text style={styles.paragraph}>
                                            {description}
                                        </Text>
                                    </View>
                                </View>
                                <View> 
                                <View style={{alignItems: 'center', width: '100%',flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{ marginVertical: 10, alignSelf: 'flex-start', flexDirection: 'row',  }}>
                                <View style={{alignItems: 'center', marginRight: 25,}}>
                                    <FontAwesome
                                        name={isLiked ? 'star' : 'star-o'}
                                        size={22}
                                        color={isLiked ? 'gold' : 'white'}
                                        onPress={onLikePress}
                                    />
                                    {/* <Text style={styles.icontext}>1842</Text> */}
                                </View>
                                
                                <View style={{alignItems: 'center', marginRight: 25,}}>
                                    <AntDesign
                                        name={isQ ? 'pushpin' : 'pushpino'}
                                        size={22}
                                        color={isQ ? 'cyan' : 'white'}
                                        onPress={onQPress}
                                    />
                                    {/* <Text style={styles.icontext}>Share</Text> */}
                                </View>

                                <View style={{alignItems: 'center', marginRight: 25,}}>
                                    <FontAwesome
                                        name='commenting-o'
                                        size={22}
                                        color='white'
                                        onPress={onLikePress}
                                    />
                                    {/* <Text style={styles.icontext}>Share</Text> */}
                                </View>

                                <View style={{alignItems: 'center'}}>
                                    <FontAwesome
                                        name='share'
                                        size={22}
                                        color='white'
                                        onPress={onLikePress}
                                    />
                                    {/* <Text style={styles.icontext}>Share</Text> */}
                                </View>
                            </View>

                            <View>
                            
                                <TouchableOpacity onPress={() => navigation.navigate ('AudioPlayer', {storyID: id})}>
                                    <Text style={styles.playbutton}>
                                        Play
                                    </Text>
                                </TouchableOpacity>
                            
                            </View>

                        </View>
                                </View>
                        </View>

                        ) : false } 
                    </View>

                </View>

            </ImageBackground>
        </View>
    );
}

const ForYouCarousel = () => {

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
        <SafeAreaView style={{}}>

            <Carousel
              data={Storys}
              renderItem={renderItem}
              extraData={true}
              refreshControl={
                <RefreshControl
                 refreshing={isFetching}
                 onRefresh={onRefresh}
                />
              }
              sliderWidth={Dimensions.get('window').width}
              itemWidth={300}
              //layout={'tinder'} 
              //layoutCardOffset={8}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
      },
    rowcontainer: {
        
    },
    header: {
        flexDirection: 'row', 
        paddingHorizontal: 0, 
        paddingTop: 20, 
        justifyContent: 'space-between',
        borderTopWidth: 0.3,
        borderColor: 'gray',

    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    listheader: {
        fontSize: 18,
        //fontWeight: 'bold',
        color: '#fff',
      },
      button: {
        fontSize: 12,
        //fontWeight: 'bold',
        color: '#fff',
      },
      buttonbox:
      {
        //margin: 20,
        borderWidth: 0.5,
        borderColor: '#fff',
        paddingVertical: 4,
        paddingHorizontal: 20,
        borderRadius: 20,
      },
      userId: {
        fontSize: 12,
        color: '#ffffffa5',
        marginRight: 15,
        marginLeft: 5,
    },
    category: {
        fontSize: 14,
        color: 'cyan',
        textTransform: 'capitalize'
        //fontStyle: 'italic',
        //marginVertical: 3,

    },
    popupblock: {
        marginTop: 20,
        justifyContent: 'space-between',
        height: 180,
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
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffffffa5',
        marginHorizontal: 5,
    },
  });

export default ForYouCarousel;
