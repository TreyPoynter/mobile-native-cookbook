import React, { useState } from 'react';
import { StyleSheet, Alert, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface PhotoButtonProps {
  onPhotoSelected: (uri: string) => void;
  allowEditing?: boolean;
  style?: StyleProp<ViewStyle>;
}

const PhotoButton: React.FC<PhotoButtonProps> = ({
  onPhotoSelected,
  allowEditing = true,
  style,
}) => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handlePhotoOptions = () => {
    Alert.alert(
      'Choose an Option',
      'Would you like to take a new photo or select one from your library?',
      [
        { text: 'Take Photo', onPress: handleTakePhoto },
        { text: 'Choose from Library', onPress: handlePickPhoto },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Camera access is required to take a photo.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: allowEditing,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0]?.uri || '';
      setPhotoUri(uri);
      onPhotoSelected(uri);
    }
  };

  const handlePickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Media library access is required to select a photo.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: allowEditing,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0]?.uri || '';
      setPhotoUri(uri);
      onPhotoSelected(uri);
    }
  };

  return (
    <TouchableOpacity onPress={handlePhotoOptions} style={[styles.container, style]}>
      <FontAwesome6 name="camera" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#70b9be',
    padding: 15,
    borderRadius: 30,
    zIndex: 1, // Ensures it's above other elements
  },
});

export default PhotoButton;
