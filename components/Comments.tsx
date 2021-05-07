import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, Dimensions, Animated} from 'react-native';

const comments =[
    {
        id: '1',
        comment: 'This is by far the best short story from this series. This authors imagination is truly amazing!',
        avatar: 'https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg',
        name: 'JK Rowling',
        title: 'Listen to This',
        datePosted: 'Yesterday'
    }, 
    {
        id: '2',
        comment: 'Had me hooked from the first sentance!',
        avatar: 'https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg',
        name: 'Ronald Dahl',
        title: '5 Stars',
        datePosted: 'August 23, 2020 at 12:16 pm'
    }, 
]

const Item = ({id, comment, avatar, name, title, datePosted}) => {

    return (
        <View style={{ marginVertical: 10, backgroundColor: '#00ffff0D', borderRadius: 15}}>

            <View style={{ margin: 10, flexDirection: 'row'}}>
                <View>
                   <Image 
                        source={{uri: avatar}}
                        style={{ width: 50, height: 50, borderRadius: 25}}
                    /> 
                </View>
                <View style={{marginHorizontal: 20, alignSelf: 'center'}}>
                    <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
                        {title}
                    </Text>
                    <Text style={{color: '#ffffffa5', fontSize: 12}}>
                        {datePosted}
                    </Text>
                </View>
            </View>

            <View>
                <Text style={{ color: '#ffffff', marginVertical: 10, marginHorizontal: 20}}>
                    {comment}
                </Text>
            </View>
        </View>
    );
}

const CommentsList = () => {

    const renderItem = ({ item }) => (

        <Item 
            id={item.id}
            comment={item.comment}
            avatar={item.avatar}
            name={item.name}
            title={item.title}
            datePosted={item.datePosted}
        />
      );
    
    return(
        <View>
            <FlatList 
                data={comments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                ListFooterComponent={ () => {
                    return (
                    <View style={{ height:  Dimensions.get('window').height-100, alignItems: 'center'}}>
                        
                    </View>
                    );
                }}
                ListHeaderComponent={ () => {
                    return (
                    <View style={{ marginVertical: 10, borderRadius: 15, height:  50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#363636a5'}}>
                        <Text style={{ color: '#ffffffa5', fontSize: 13}}>
                            Say something
                        </Text>
                    </View>
                    );
                }}
            />
        </View>
    );
}

export default CommentsList;