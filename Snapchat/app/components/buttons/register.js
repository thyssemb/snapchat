import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function Register() {
    return (
        <Text style={styles.text}>
            REGISTER
        </Text>
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

export default Register;
