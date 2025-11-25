import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResultsScreen({ route, navigation }) {
    const { measurements } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Your Measurements</Text>
                <Text style={styles.subtitle}>Based on our analysis</Text>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Height</Text>
                        <Text style={styles.value}>{measurements.height} cm</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Chest/Bust</Text>
                        <Text style={styles.value}>{measurements.chest} cm</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Waist</Text>
                        <Text style={styles.value}>{measurements.waist} cm</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Hips</Text>
                        <Text style={styles.value}>{measurements.hips} cm</Text>
                    </View>
                </View>

                <Text style={styles.note}>
                    These measurements are estimates. For best results, verify with a tape measure if possible.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Styles')}
                >
                    <Text style={styles.buttonText}>Browse Styles</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.secondaryButtonText}>Back to Home</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        elevation: 3,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    label: {
        fontSize: 18,
        color: '#444',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
    },
    note: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginBottom: 30,
        fontStyle: 'italic',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 25,
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
