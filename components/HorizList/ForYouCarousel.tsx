import React, {useState} from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Carousel from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';

import data from '../../data/dummyaudio';


const Item = ({title, category, description, image, audioUri, author, narrator, time, liked, rating}) => {

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

    return (
        <View style={styles.container}>
            <ImageBackground
                source={image}
                style={{ width: '100%', height: 280, justifyContent: 'flex-end'}}
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
                    height: isVisible === true ? 280 : 80,
                    padding: 10,
                }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.title}>
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
                                <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
                                    <Text style={styles.userId}>
                                        {narrator}
                                    </Text> 
                                </TouchableOpacity>
                            </View>
                            
                        </View>

                            <View style={{ alignSelf: 'center', flexDirection: 'row', }}>
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
                                                  
                                    <View style={{ marginTop: 10,}}>
                                        <Text style={styles.paragraph}>
                                            {description}
                                        </Text>
                                    </View>
                                </View>
                                <View> 
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
                        </View>

                        ) : false } 
                    </View>

                </View>

            </ImageBackground>
        </View>
    );
}

const ForYouCarousel = () => {

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
        <SafeAreaView style={{}}>

            <Carousel
              data={data}
              renderItem={renderItem}
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
        fontSize: 16,
        fontWeight: 'normal',
        color: '#ffffffa5',
    },
  });

export default ForYouCarousel;
