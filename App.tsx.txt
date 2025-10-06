import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  async function playSound() {
    console.log('Ezan sesi çalınıyor...');
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/sounds/ezan.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Ezan sesi kapatılıyor...');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/images/vakit_rehberi_logo.png')} style={styles.logo} />
      <Text style={styles.title}>📿 Vakit Rehberi</Text>
      <Text style={styles.subtitle}>Hoşgeldiniz 🙌</Text>

      <TouchableOpacity style={styles.button} onPress={playSound}>
        <Text style={styles.buttonText}>▶️ Ezan Sesini Çal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1633',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5B400',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F5B400',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#0A1633',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
