import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const people = 
    {
        id: '1',
        name: 'Randy Myers',
        email: '',
        pseudonym: 'AnnonymousTexan',
        avatar: { uri: 'https://scontent.fhou1-2.fna.fbcdn.net/v/t1.6435-9/100657069_10222349946436703_2222904085466578944_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=LWvZcDEKGwcAX9em-6Y&_nc_ht=scontent.fhou1-2.fna&oh=927973b953b559de666741e10658d9bf&oe=608F40FF'},
        gender: 'male',
        dob: '',
        bio: 'Houston based writer. I usually stick with science fiction and mystery, but also dabble in the occasional fan fiction.',
        following: [],
        followers: [],
        narrations: ['1', '2'],
        author: ['3', '5'],
        finishedStory: [],
        liked: [],
        queued: [],
    }


const UserScreen = ({navigation}) => {

    const [SelectedId, setSelectedId] = useState(1);

    const [Following, setFollowing] = useState(false);

    function FollowButton () {
        if (Following === true) {
            setFollowing(false)
        }
        else {
            setFollowing(true)
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                //style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center'}}>
                    <AntDesign 
                        name='close'
                        size={25}
                        color='#fff'
                        style={{
                            margin: 20
                        }}
                        onPress={() => navigation.goBack() }
                    />
                    <TouchableOpacity onPress={FollowButton}>
                        <View>
                            <Text style={{
                                color: Following === true ? '#000' : 'cyan',
                                backgroundColor: Following === true ? 'cyan' : 'transparent',
                                borderRadius: 20,
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderWidth: Following === true ? 0 : 0.5,
                                borderColor: 'cyan',
                            }}>
                                {Following === true ? 'Following' : 'Follow'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center'}}>
                    <Image 
                        source={people.avatar}
                        style={{
                            width: 120,
                            height: 120,
                            backgroundColor: '#363636',
                            borderRadius: 60,
                            marginTop: 20,
                        }}
                    />
                </View>

                <View style={{ alignItems: 'center'}}>
                    <Text style={styles.header}>
                        {people.name}
                    </Text>
                </View>

                <View style={{ alignItems: 'center', marginHorizontal: 20,}}>
                    <Text style={{ color: '#ffffffa5'}}>
                        {people.bio}
                    </Text>
                </View>

                <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-evenly', 
                    width: '100%', 
                    alignItems: 'flex-end',
                    //marginHorizontal: 20,
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
                            Authored
                        </Text>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => setSelectedId(2)}>
                        <Text style={{ 
                            color: SelectedId ===  2 ? '#fff' : '#ffffffa5',
                            marginHorizontal: 15, 
                            fontSize: SelectedId ===  2 ? 22 : 17,
                            fontWeight: SelectedId === 2 ? 'bold' : 'normal'
                        }}>
                            Narrations
                        </Text>
                    </TouchableWithoutFeedback>
                </View>

                
                    
            </LinearGradient>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginVertical: 20,
    },
});

export default UserScreen;