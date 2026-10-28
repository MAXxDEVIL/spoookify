import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

interface PlaylistCardProps {
  name: string;
}

export default function PlaylistCard({ name }: PlaylistCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { width: 150, marginRight: 12 },
  image: { width: 150, height: 150, backgroundColor: Colors.background.elevated, borderRadius: 8 },
  name: { color: Colors.text.primary, marginTop: 8, fontSize: 14 },
});
