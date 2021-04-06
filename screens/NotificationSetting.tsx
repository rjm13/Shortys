import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Switch } from 'react-native-paper';
import ToggleSwitch from 'toggle-switch-react-native'

const Settings = ({navigation}) => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 50, marginHorizontal: 20,}}>
                    <FontAwesome5 
                        name='chevron-left'
                        color='#fff'
                        size={20}
                        onPress={() => navigation.goBack()}
                    />
            </View>

            <View style={{ marginHorizontal: 20, marginVertical: 20}}>
                <Text style={styles.header}>
                    Playback
                </Text>
            </View>
            <View style={styles.optionslist}>

                <View style={styles.optionsitem}>
                    <Text style={styles.paragraph}>
                        Notifications
                    </Text>

                    <ToggleSwitch
                        isOn={isSwitchOn}
                        onColor="#219a9ca5"
                        thumbOnStyle={{
                            backgroundColor: 'cyan'
                        }}
                        offColor="gray"
                        size="medium"
                        onToggle={onToggleSwitch}
                    />
                </View>

                <View style={styles.optionsitem}>
                    <Text style={styles.paragraph}>
                        Notifications
                    </Text>

                    <ToggleSwitch
                        isOn={isSwitchOn}
                        onColor="#219a9ca5"
                        thumbOnStyle={{
                            backgroundColor: 'cyan'
                        }}
                        offColor="gray"
                        size="medium"
                        onToggle={onToggleSwitch}
                    />
                </View>

                <View style={styles.optionsitem}>
                    <Text style={styles.paragraph}>
                        Notifications
                    </Text>

                    <ToggleSwitch
                        isOn={isSwitchOn}
                        onColor="#219a9ca5"
                        thumbOnStyle={{
                            backgroundColor: 'cyan'
                        }}
                        offColor="gray"
                        size="medium"
                        onToggle={onToggleSwitch}
                    />
                </View>
            </View>

            <View style={{ marginHorizontal: 20, marginVertical: 20}}>
                <Text style={styles.header}>
                    Notifications
                </Text>
            </View>
            <View style={styles.optionslist}>

                <View style={styles.optionsitem}>
                    <Text style={styles.paragraph}>
                        Notifications
                    </Text>

                    <ToggleSwitch
                        isOn={isSwitchOn}
                        onColor="#219a9ca5"
                        thumbOnStyle={{
                            backgroundColor: 'cyan'
                        }}
                        offColor="gray"
                        size="medium"
                        onToggle={onToggleSwitch}
                    />
                </View>

                <View style={styles.optionsitem}>
                    <Text style={styles.paragraph}>
                        Notifications
                    </Text>

                    <ToggleSwitch
                        isOn={isSwitchOn}
                        onColor="#219a9ca5"
                        thumbOnStyle={{
                            backgroundColor: 'cyan'
                        }}
                        offColor="gray"
                        size="medium"
                        onToggle={onToggleSwitch}
                    />
                </View>

                <View style={styles.optionsitem}>
                    <Text style={styles.paragraph}>
                        Notifications
                    </Text>

                    <ToggleSwitch
                        isOn={isSwitchOn}
                        onColor="#219a9ca5"
                        thumbOnStyle={{
                            backgroundColor: 'cyan'
                        }}
                        offColor="gray"
                        size="medium"
                        onToggle={onToggleSwitch}
                    />
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: '#363636a5'
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionslist: {

    },
    optionsitem: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginHorizontal: 40,
        marginBottom: 30
    },
    paragraph: {
        fontSize: 16,
        color: '#ffffffa5'
    },
});

export default Settings;
