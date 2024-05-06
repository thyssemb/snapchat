import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function Login() {
    return (
        <Text style={styles.text}>
            LOG IN
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: '#e92755',
        color: 'white',
        padding: 3,
        textAlign: 'center',
        height: 90,
        width: 400,
        cursor: 'pointer',
        lineHeight: 90,
        fontWeight: 'bold',
        fontSize: 20,
    },

});

export default Login;