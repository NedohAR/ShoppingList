import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username.trim()!== '' && password.trim()!== '') {
            navigation.navigate('ShoppingListScreen');
        } else {
            console.log('Login failed');
        }
    };

    const handleNotLogin = () => {
        navigation.navigate('ShoppingListScreen')
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{marginBottom: 20}}>Authorization</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20, borderRadius: 10 }}
                onChangeText={text => setUsername(text)}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20, borderRadius: 10 }}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="Password"
                secureTextEntry
            />
            <Button title="Login" color='black' onPress={handleLogin} />
            <Button title="Not login" color='black' onPress={handleNotLogin} />
        </View>
    );
};

export default LoginScreen;
