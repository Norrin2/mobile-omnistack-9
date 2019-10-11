import React, {useState, useEffect} from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, StyleSheet, TextInput, TouchableOpacity}  from 'react-native';

import logo from '../../assets/logo.png';
import api from '../services/api';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect( () => {
        AsyncStorage.getItem('user').then( user => {
            if (user) {
                navigation.navigate('List');
            }
        });
    }, []);

    async function handleSubmit() {
        const response = await api.post('/users', {email});
        const { _id} = response.data;

        console.log(_id);

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs); 
        
        navigation.navigate('List');
    }

    return (<KeyboardAvoidingView behavior="padding" 
     enabled={Platform.OS === 'android'} style={styles.container}>
        <Image source={logo}/>
        <View style={styles.form}>
            <Text style={styles.label}>SEU E-MAIL *</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail} 
            />
                <Text style={styles.label}>TECNOLOGIAS</Text>
                <TextInput
                style={styles.input}
                placeholder="Tecnologias de Interesse"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false} 
                value={techs}
                onChangeText={setTechs} 
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Encontrar Spots</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center' 
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    form: {
       alignSelf: 'stretch',
       paddingHorizontal: 30,
       marginTop: 30
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color:'#444',
    },
    button: {
        height: 42,
        marginTop: 8,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        borderRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
})