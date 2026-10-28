import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

interface TrackRowProps {
  title: string;
  artist: string;
  duration?: number;
}

export default function TrackRow({ title, artist, duration }: TrackRowProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.artwork} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{artist}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 12, alignItems: 'center' },
  artwork: { width: 48, height: 48, backgroundColor: Colors.background.elevated, borderRadius: 4, marginRight: 12 },
  info: { flex: 1 },
  title: { color: Colors.text.primary, fontSize: 16 },
  artist: { color: Colors.text.secondary, fontSize: 14 },
});
