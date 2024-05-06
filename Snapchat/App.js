import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Register from "./app/components/buttons/register";
import Login from "./app/components/buttons/login";

function App() {
    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Image
                    source={require('./assets/snapchat-icon.png')}
                    style={styles.image}
                />
            </View>
            <View style={styles.bottom}>
                <Register />
                <Login />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffc1f',
    },
    center: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default App;
