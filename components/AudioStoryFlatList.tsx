import React, {useState} from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import {useNavigation} from '@react-navigation/native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import dummyaudio from '../data/dummyaudio';

import { ItemParamList } from '../types';


const Item = ({title, category, description, image, audioUri, author, narrator, time, liked, rating}) => {

    const [isVisible, setIsVisible] = useState(false);

    const [isLiked, setIsLiked] = useState(false);

    const navigation = useNavigation();
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }  
    };

    return (
        <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
        <View style={styles.tile}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={styles.name}>
                        {title}
                    </Text> 
                    
                    <Text style={styles.category}>
                        {category}
                    </Text>
                    
                    
                    <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                        <FontAwesome5 
                            name='book-open'
                            size={12}
                            color='#ffffffa5'
                        />
                       <Text style={styles.userId}>
                            {author}
                        </Text>  
                        <FontAwesome5 
                            name='book-reader'
                            size={12}
                            color='#ffffffa5'
                        />
                       <Text style={styles.userId}>
                            {narrator}
                        </Text> 
                    </View>
                    
                </View>
                <View>
                    <View style={{ alignSelf: 'center', flexDirection: 'row', }}>
                        <FontAwesome
                            name={isLiked ? 'star' : 'star-o'}
                            size={20}
                            color={isLiked ? 'gold' : 'white'}
                            onPress={onLikePress}
                        />
                    </View>
                </View>
                </View> 

                { isVisible ? (
                    <View style={styles.popupblock}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            
                            <View style={{ flexDirection: 'row'}}>
                                    <FontAwesome5 
                                        name='pepper-hot'
                                        color={
                                            rating === 1 ? 'green' : 
                                            rating === 2 ? 'orange' : 
                                            'red'
                                        }
                                        size={15}
                                        style={{ 
                                            marginHorizontal: 3
                                        }}
                                    />
                                    { rating === 2 ? (
                                    <FontAwesome5 
                                        name='pepper-hot'
                                        color={
                                            rating === 2 ? 'orange' : 
                                            'red'}
                                        size={15}
                                        style={{ 
                                            marginHorizontal: 3
                                        }}
                                    />
                                    ) : null }
                                    { rating === 3 ? (
                                    <FontAwesome5 
                                        name='pepper-hot'
                                        color='red'
                                        size={15}
                                        style={{ 
                                            marginHorizontal: 3
                                        }}
                                    />
                                    ) : null }
                                    { rating === 3 ? (
                                    <FontAwesome5 
                                        name='pepper-hot'
                                        color='red'
                                        size={15}
                                        style={{ 
                                            marginHorizontal: 3
                                        }}
                                    />
                                    ) : null }       

                            </View>
                            <Text style={styles.time}>
                                {time}
                            </Text>
                        </View> 
                        <Image 
                            source={image}
                            style={{
                                height: 200,
                                borderRadius: 15,
                                marginVertical: 15,
                            }}
                        />
                        <Text style={styles.paragraph}>
                            {description}
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center'}}>
                            <View>
                                <TouchableOpacity>
                                    <Text style={[styles.playbutton, {opacity: .7}]}>
                                        Queue
                                    </Text>
                                </TouchableOpacity>   
                            </View>

                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate ('AudioPlayer')}>
                                <Text style={styles.playbutton}>
                                    Play
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : false }  
        </View>
        </TouchableWithoutFeedback>
    );
  }

const AudioStoryList = () => {

    const renderItem = ({ item }) => (

        <Item 
          title={item.title}
          image={item.image}
          category={item.category}
          audioUri={item.audioUri}
          description={item.description}
          author={item.author}
          narrator={item.narrator}
          time={item.time}
          liked={item.liked}
          rating={item.rating}
        />
      );

    return (

        <View style={styles.container}>

            <FlatList 
                data={dummyaudio}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}    
                ListFooterComponent={ () => {
                    return (
                    <View style={{ height:  70, alignItems: 'center'}}>
                        <Text style={{ color: 'white', margin: 20,}}>
                            Load more
                        </Text>
                    </View>
                );

                }

                }
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
        fontSize: 14,
        color: 'cyan',
        //fontStyle: 'italic',
        marginVertical: 3,

    },

});

export default AudioStoryList;
