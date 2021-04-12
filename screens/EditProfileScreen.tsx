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

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { updateUser } from '../src/graphql/mutations';

import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

//import uploadImageOnS3 from '../components/functions/imagepicker';


const EditProfile = ({navigation}) => {

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    //const navigation = useNavigation();

    const route = useRoute();

    const {user} = route.params

    async function signOut() {
        try {
            await Auth.signOut()
            .then(() => navigation.navigate('SignIn'))
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

//PhotoModal
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

//SignOutModal
    const [visible2, setVisible2] = React.useState(false);
    const showSignOutModal = () => setVisible2(true);
    const hideSignOutModal = () => setVisible2(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

//NameModal
const [visible3, setVisible3] = useState(false);
const showNameModal = () => setVisible3(true);
const hideNameModal = () => setVisible3(false);

//EmailModal
const [visible4, setVisible4] = useState(false);
const showEmailModal = () => setVisible4(true);
const hideEmailModal = () => setVisible4(false);

//BioModal
const [visible5, setVisible5] = useState(false);
const showBioModal = () => setVisible5(true);
const hideBioModal = () => setVisible5(false);

//PassModal
const [visible6, setVisible6] = useState(false);
const showPassModal = () => setVisible6(true);
const hidePassModal = () => setVisible6(false);



//Attribute state
const [ Name, setName ] = useState('');
const [ Email, setEmail ] = useState('');
const [ Bio, setBio ] = useState('');
const [ confirmCode, setConfirmCode] = useState('');
const [ Password, setPassword] = useState('');
const [ oldPassword, setOldPassword] = useState('');
const [image, setImage] = useState('');

const [avatarKey, setAvatarKey] = useState(null);


//handle change attribute using graphql operation


const handleUpdateImage = async ()=> {

    try {
        const response = await fetch(image);

        const blob = await response.blob();

        const filename = '${uuid.v4()}.jpg';

        const s3Response = await Storage.put(filename, blob);

        setAvatarKey(s3Response.key);
        

    } catch (e) {
        console.error(e);
    }
}

const PublishAvatar = async () => {

    await handleUpdateImage();

    if ( avatarKey !== null ) {
        const userInfo = await Auth.currentAuthenticatedUser();

        const response = await Storage.get(avatarKey);
  
        const updatedUser = { id: userInfo.attributes.sub, imageUri: response }
  
        if (userInfo) {
            let result = await API.graphql(
            graphqlOperation(updateUser, { input: updatedUser }))
        console.log(result);

        hideModal();
        }
    }
};



const handleUpdateName = async () => {
      //get authenticated user from Auth
    if ( Name.length !== 0 ) {
        const userInfo = await Auth.currentAuthenticatedUser();

        const updatedUser = { id: userInfo.attributes.sub, name: Name }

        if (userInfo) {
            let result = await API.graphql(
            graphqlOperation(updateUser, { input: updatedUser }))
        console.log(result);
        hideNameModal();
        }
    }
}

const handleUpdateBio = async () => {
    //get authenticated user from Auth
  if ( Bio.length !== 0 ) {
      const userInfo = await Auth.currentAuthenticatedUser();

      const updatedUser = { id: userInfo.attributes.sub, bio: Bio }

      if (userInfo) {
          let result = await API.graphql(
          graphqlOperation(updateUser, { input: updatedUser }))
      console.log(result);
      hideBioModal();
      }
  }
}

const handleUpdateEmail = async () => {
    //get authenticated user from Auth
  if ( Email.length !== 0 ) {
      const userInfo = await Auth.currentAuthenticatedUser();

      if (userInfo) {
        let result = await Auth.updateUserAttributes(userInfo, {'email': Email})
        console.log(result);
      } else {
          alert('Error: Please enter a different email or try again later.')
      }
  }
}

const handleConfirmCode = async () => {

    const userInfo = await Auth.currentAuthenticatedUser();

    let result = await Auth.verifyCurrentUserAttributeSubmit(
        'email',
        confirmCode,
        );
    console.log(result); // SUCCESS   
    hideEmailModal();
}


const handleUpdatePassword = async () => {

    const userInfo = await Auth.currentAuthenticatedUser();

    let result = await Auth.changePassword(userInfo, oldPassword, Password);
    console.log(result); // SUCCESS   
    hidePassModal();
}


    return (
        <Provider>
           
            <View style={styles.container } >

            <Portal>

            <Modal visible={visible3} onDismiss={hideNameModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                        }}>Enter a new pseudonym
                    </Text>
                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <TextInput
                            placeholder={user?.name}
                            placeholderTextColor='#00ffffa5'
                            style={styles.nametext}
                            maxLength={20}
                            multiline={false}
                            onChangeText={val => setName(val)}
                            //defaultValue={user?.name}
                        />
                    </View>
                    
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={handleUpdateName}>
                            <LinearGradient
                                colors={['cyan', 'cyan']}
                                style={styles.savebutton} >
                                <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={visible4} onDismiss={hideEmailModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>

                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                        }}>Enter a new email
                    </Text>
                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <TextInput
                            placeholder={user?.email}
                            placeholderTextColor='#00ffffa5'
                            style={styles.nametext}
                            maxLength={40}
                            multiline={false}
                            onChangeText={val => setEmail(val)}
                            //defaultValue={user?.name}
                        />
                    </View>
                    
                    <View style={styles.button}>
                        <TouchableOpacity onPress={handleUpdateEmail} >
                            <LinearGradient
                                colors={['cyan', 'cyan']}
                                style={styles.savebutton} >
                                <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Send Code</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                        }}>Enter confirmation code
                    </Text>
                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <TextInput
                            placeholder='- - - - - -'
                            placeholderTextColor='#00ffffa5'
                            style={styles.nametext}
                            maxLength={6}
                            onChangeText={val => setConfirmCode(val)}
                            //defaultValue={user?.name}
                        />
                    </View>
                    
                    <View style={styles.button}>
                        <TouchableOpacity onPress={handleConfirmCode} >
                            <LinearGradient
                                colors={['cyan', 'cyan']}
                                style={styles.savebutton} >
                                <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={visible5} onDismiss={hideBioModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        color: '#fff'
                        }}>Update bio
                    </Text>
                    <View style={{ borderWidth: 0.2, borderColor: '#363636a5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                    <View style={styles.statuscontainermodal }> 
                        <TextInput 
                            placeholder={user?.bio || 'Say something about yourself'}
                            placeholderTextColor='#ffFFFFa5'
                            style={styles.textInput}
                            maxLength={250}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={val => setBio(val)}
                            defaultValue={user?.bio || ''}
                        />
                </View>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={handleUpdateBio}>
                            <LinearGradient
                                colors={['cyan', 'cyan']}
                                style={styles.savebutton} >
                                <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>
                    <TouchableOpacity onPress={pickImage}>
                    <Image 
                        source={{ uri: image || user?.imageUri}} 
                        style={styles.modalavatar} 
                    />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                        }}>Upload new picture
                    </Text>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={PublishAvatar}>
                            <LinearGradient
                                colors={['cyan', 'cyan']}
                                style={styles.savebutton} >
                                <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

                <Modal visible={visible2} onDismiss={hideSignOutModal} contentContainerStyle={containerStyle}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 16,
                            color: '#fff'
                            }}>Are you sure you want to log out?
                        </Text>
                        
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={signOut}>
                                <LinearGradient
                                    colors={['cyan', 'cyan']}
                                    style={styles.savebutton} >
                                    <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Log Out</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal visible={visible6} onDismiss={hidePassModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                        }}>Enter new password
                    </Text>
                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>  
                    <TextInput
                            placeholder='Minimum 8 of characters'
                            placeholderTextColor='#00ffffa5'
                            style={styles.nametext}
                            maxLength={16}
                            onChangeText={val => setPassword(val)}
                            secureTextEntry={true}
                            //defaultValue={user?.name}
                        />
                    </View>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                        }}>Enter old password
                    </Text>
                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>  
                    <TextInput
                            placeholder=''
                            placeholderTextColor='#00ffffa5'
                            style={styles.nametext}
                            maxLength={16}
                            onChangeText={val => setOldPassword(val)}
                            secureTextEntry={true}
                            //defaultValue={user?.name}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={handleUpdatePassword}>
                            <LinearGradient
                                colors={['cyan', 'cyan']}
                                style={styles.savebutton} >
                                <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            </Portal>

            <View>
                <View style={{ marginTop: 50, marginBottom: 20, marginHorizontal: 20,}}>
                    <FontAwesome5 
                        name='chevron-left'
                        color='#fff'
                        size={20}
                        onPress={() => navigation.goBack()}
                    />
                </View>

                <TouchableOpacity onPress={showNameModal}>
                    <View style={styles.emailcontainer }> 
                        <Text style={ styles.words }>Pseudonym</Text>
                        <Text style={ styles.placeholdertext }>{user?.name || 'annonymous'}</Text>
                    </View>
                </TouchableOpacity>
                

        
                <TouchableOpacity onPress={showBioModal}>
                    <View style={styles.statuscontainer}> 
                        <Text style={{fontSize: 14, color: '#00FFFFa5', padding: 10}}>{user?.bio || 'Say something about yourself'}</Text>
                    </View>
                </TouchableOpacity>
                

                <TouchableWithoutFeedback onPress={showModal}>
                    <View style={styles.photocontainer }>
                        <Text style={ styles.words }>Photo</Text>
                        <Image 
                            source={{ uri: user?.imageUri || 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg'}} 
                            style={styles.avatar} 
                        />
                    </View>
                </TouchableWithoutFeedback> 

                <TouchableOpacity onPress={showEmailModal}>
                    <View style={styles.emailcontainer }> 
                        <Text style={ styles.words }>Email</Text>
                        <Text style={ styles.placeholdertext }>{user?.email}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={showPassModal}>
                    <View style={styles.smallcontainer }>
                        <Text style={ styles.words }>Reset Password</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={showSignOutModal}>
                    <View style={styles.smallcontainer }>
                        <Text style={ styles.words }>Log Out</Text>
                    </View>
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
        backgroundColor: '#363636a5',
        padding: 10,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: 10,
    },
    statuscontainermodal: {
        backgroundColor: '#303030',
        padding: 10,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: 10,
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
        color: '#00FFFF',
        textAlign: 'right',
    },
    placeholdertext: {
        fontSize: 16,
        color: '#00FFFFa5',
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
        borderRadius: 60,
        margin: 16,
        
      },
      textInput: {
        //flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#ffffffa5',
        fontSize: 14,
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
        color: '#fff',
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 15,

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