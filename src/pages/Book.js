import React, {useState} from 'react';
import { SafeAreaView, Alert, TextInput, TouchableOpacity, StyleSheet, AsyncStorage, Text }  from 'react-native';

import api from '../services/api';

export default function Book({navigation}) {
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id}
        })

        Alert.alert('Solicitação de reserva Enviada!');
        navigation.navigate('List');
    }
     
    function handleCancel() {
        navigation.navigate('List');
    }

    return (<SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false} 
                value={date}
                onChangeText={setDate} 
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            </SafeAreaView>)
}

const styles = StyleSheet.create( {
    container: {
        margin: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 25,
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
        paddingHorizontal: 5,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        borderRadius: 3,
    },
    cancelButton: {
        height: 42,
        paddingHorizontal: 5,
        marginTop: 15,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        borderRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
})