import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStyles } from '../services/api';

export default function StyleScreen({ navigation }) {
    const [stylesList, setStylesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStyles();
    }, []);

    const loadStyles = async () => {
        try {
            const data = await getStyles();
            setStylesList(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Style Gallery</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
            ) : (
                <FlatList
                    data={stylesList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No styles available yet.</Text>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        fontSize: 16,
        color: '#007AFF',
    },
    list: {
        padding: 15,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    info: {
        padding: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    loader: {
        marginTop: 50,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
        fontSize: 16,
    },
});
