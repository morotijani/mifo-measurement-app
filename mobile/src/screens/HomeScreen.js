import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
    const [gender, setGender] = useState(null);

    const handleStart = () => {
        if (gender) {
            navigation.navigate('Camera', { gender });
        } else {
            alert('Please select a gender');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Body Measurement App</Text>
            <Text style={styles.subtitle}>Select your gender to begin</Text>

            <View style={styles.selectionContainer}>
                <TouchableOpacity
                    style={[styles.option, gender === 'male' && styles.selected]}
                    onPress={() => setGender('male')}
                >
                    <Text style={styles.optionText}>Male</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.option, gender === 'female' && styles.selected]}
                    onPress={() => setGender('female')}
                >
                    <Text style={styles.optionText}>Female</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Text style={styles.buttonText}>Start Measurement</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('Styles')}>
                <Text style={styles.secondaryButtonText}>View Styles</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
    },
    selectionContainer: {
        flexDirection: 'row',
        marginBottom: 40,
        gap: 20,
    },
    option: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 120,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        elevation: 2,
    },
    selected: {
        borderColor: '#007AFF',
        backgroundColor: '#E3F2FD',
    },
    optionText: {
        fontSize: 18,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    secondaryButtonText: {
        color: '#007AFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
