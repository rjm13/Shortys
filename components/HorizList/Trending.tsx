import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import DATA from '../../data/dummyaudio';
import {useNavigation} from '@react-navigation/native';

const Item = ({title, category, description, image, audioUri, author, narrator, time, liked, rating}) => {

    const navigation = useNavigation();

    return (
        <View style={styles.containernew}>
          <ImageBackground
            source={image}
            style={styles.image}
            imageStyle={{ borderRadius: 16}}
          >
                <View style={{ alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('AudioPlayer')}>
                        <View style={{flexDirection: 'row', backgroundColor: '#000000a5', alignItems: 'center', marginTop: 10, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 15}}>
                            <FontAwesome5 
                                name='play'
                                color='#fff'
                                size={10}
                            />
                            <Text style={{ color: '#fff', fontSize: 13, paddingVertical: 0, marginLeft: 10}}>
                                {time}
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
                <Text style={{ color: '#fff', fontSize: 14,}}>
                    {category}
                </Text>
          </View>
          
      </View>
    );
}

const TrendingList = () => {

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
        <View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                
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