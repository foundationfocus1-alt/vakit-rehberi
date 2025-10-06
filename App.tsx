import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  async function playEzan() {
    console.log('Ezan sesi çalınıyor...');
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/sounds/ezan.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    // Bileşen kapanırken sesi durdur
    return sound
      ? () => {
          console.log('Ezan sesi kapatılıyor...');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Vakit Rehberi</Text>
      <Button title="Ezan Sesini Çal" onPress={playEzan} />
    </View>
  );
}
