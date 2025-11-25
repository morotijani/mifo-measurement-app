import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { uploadMeasurementImage } from '../services/api';

export default function CameraScreen({ route, navigation }) {
    const { gender } = route.params;
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState('back');
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.text}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            setLoading(true);
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.7,
                });

                // Upload and process
                const result = await uploadMeasurementImage(photo.uri, gender);
                navigation.navigate('Results', { measurements: result });
            } catch (error) {
                alert('Failed to process image. Please try again.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

            <View style={styles.overlay}>
                <Text style={styles.instruction}>
                    Align your body within the frame. Stand straight with arms slightly apart.
                </Text>

                <View style={styles.controls}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.captureButton, loading && styles.disabled]}
                        onPress={takePicture}
                        disabled={loading}
                    >
                        {loading ? <ActivityIndicator color="white" /> : <View style={styles.innerCircle} />}
                    </TouchableOpacity>

                    <View style={{ width: 50 }} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        padding: 20,
        zIndex: 1,
    },
    instruction: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 8,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    button: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    disabled: {
        opacity: 0.5,
    },
});
