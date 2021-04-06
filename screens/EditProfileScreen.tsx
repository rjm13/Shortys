import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Platform } from 'react-native';
//import { getUser } from '../graphql/queries';
//import { API, graphqlOperation, Auth } from "aws-amplify";
//import { updateUser } from '../graphql/mutations';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { Modal, Portal, Button, Provider } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const EditProfile = ({navigation}) => {

//Modal
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#fff', 
        padding: 20,
    };

//Fetch user information
    const [user, setUser] = useState();

    // useEffect(() => {
    //     const fetchUser = async () => {
    //     const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true});
    //         if (!userInfo) {
    //         return;
    //         }
    //     try {
    //         const userData = await API.graphql(graphqlOperation(
    //         getUser, {id: userInfo.attributes.sub}))
    //         if (userData) {
    //             setUser(userData.data.getUser);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    //     }
    //     fetchUser();
    // }, [])

    //Attribute state
    const [ displayName, setDisplayName ] = useState('');
    const [ displayStatus, setDisplayStatus ] = useState('');
    const [ displayEmail, setDisplayEmail ] = useState('');

//handle change attribute using graphql operation
// const handleUpdateAttributes = async () => {
//       //get authenticated user from Auth
//       const userInfo = await Auth.currentAuthenticatedUser(
//         { bypassCache: true }
//       );

//       const updatedUser = {
//         id: userInfo.attributes.sub,
//         name: displayName.length === 0 ? user?.name : displayName,
//         //imageUri: 
//         status: displayStatus.length === 0 ? user?.status : displayStatus,
//         //email: displayEmail.length === 0 ? user?.email : displayEmail,
//       }
      
//       if (userInfo) {
//       //get the user from Backend with the user SUB from Auth
//         let result = await API.graphql(
//           graphqlOperation(
//             updateUser, { input: updatedUser }
//           )
//         )
        
//         let action = navigation.navigate('Profile')

//         console.log(result);
//       }
//   }


    return (
        <Provider>
           
            <View style={styles.container } >

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 22,
                            paddingVertical: 16,
                            }}>Change Photo
                        </Text>
                        <Image 
                            source={{ uri: user?.imageUri || 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg'}} 
                            style={styles.modalavatar} 
                        />
                        <Text style={{
                            fontSize: 20,
                            paddingVertical: 16,
                            }}>Upload new photo
                        </Text>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={hideModal}>
                                <LinearGradient
                                    colors={['gray', 'gold']}
                                    style={styles.savebutton} >
                                    <Text style={styles.savewords}>Submit</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Portal>

            <View>
                <View style={{ marginTop: 50, marginHorizontal: 20,}}>
                    <FontAwesome5 
                        name='chevron-left'
                        color='#fff'
                        size={20}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <TouchableWithoutFeedback onPress={showModal}>
                    <View style={styles.photocontainer }>
                        <Text style={ styles.words }>Photo</Text>
                        <Image 
                            source={{ uri: user?.imageUri || 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg'}} 
                            style={styles.avatar} 
                        />
                    </View>
                </TouchableWithoutFeedback> 

                <View style={styles.namecontainer }>
                    <Text style={ styles.words }>Pseudonym</Text>
                    <TextInput
                        placeholder={user?.name || 'Larry Flint'}
                        placeholderTextColor='cyan'
                        style={styles.nametext}
                        maxLength={20}
                        multiline={false}
                        onChangeText={displayName => setDisplayName(displayName)}
                        //defaultValue={user?.name}
                    />
                </View>

                

                <TouchableOpacity onPress={() => {navigation.navigate('UpdateEmail')}}>
                    <View style={styles.emailcontainer }> 
                         <Text style={ styles.words }>Update Email</Text>
                        {/* <Text style={ styles.nametext }>{user?.email}</Text> */}
                    </View>
                </TouchableOpacity>
               
                <TouchableOpacity
                    onPress={() => {navigation.navigate('ChangePassword')}}>
                    <View style={styles.smallcontainer }>
                        <Text style={ styles.words }>Reset Password</Text>
                    </View>
                </TouchableOpacity>
            </View>

                <View style={styles.button}>
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                    >
                            <Text style={styles.savewords}>Save</Text>
                        
                    </TouchableOpacity>
                </View>
                <StatusBar style="light" />
            </View>

                {/* <View style={styles.deletecontainer }>
                    <View>
                        <TouchableOpacity 
                            onPress={() => alert('This will permenantly delete your account. Are you sure you want to continue?')}>
                                <Text style={ styles.deletewords }>Delete Account</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            
        </Provider> 
);}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#363636a5',
        flex: 1,
        justifyContent: 'space-between',
    },
    photocontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    namecontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    statuscontainer: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: '#363636a5',
        padding: 40,
        width: '100%',
    },
    emailcontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    smallcontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    nametext: {
        fontSize: 16,
        color: 'cyan',
        textAlign: 'right',
    },
    words: {
        fontSize: 16,
        marginVertical: 20,
        color: '#fff',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        margin: 16,
      },
      modalavatar: {
        width: 120,
        height: 120,
        borderRadius: 50,
        margin: 16,
        borderWidth: 4,
        borderColor: '#155843',
        
      },
      textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: 'cyan',
        fontSize: 18,
    },
    button: {
        alignItems: 'center',
        marginVertical: 30,
    },
    savebutton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    savewords: {
        fontSize: 14,
        paddingVertical: 5,
        paddingHorizontal: 20,
        color: 'white',
        borderColor: 'white',
        borderWidth: 0.5,
        borderRadius: 40,
    },
    deletecontainer: {
        margin: 50,
        alignItems: 'center',    
    },
    deletewords: {
        fontSize: 18,
        padding: 16,
        color: 'gray',
        //alignSelf: 'center',
    },
})