import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


function LoginForm({ navigation }) {
    const handleLoginPress = () => {
        navigation.navigate('LoginScreen');
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handleRegisterPress}>
            <Text style={styles.text}>
                LOG IN
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: '#3db1e2',
        color: 'white',
        padding: 3,
        marginTop: 500,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        width: 400,
        cursor: 'pointer',
        lineHeight: 90,
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default LoginForm;