import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export default function NowPlayingBar() {
  return (
    <View style={styles.container}>
      <View style={styles.artwork} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>No song playing</Text>
        <Text style={styles.artist} numberOfLines={1}>-</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 12, backgroundColor: Colors.background.elevated, borderTopWidth: 1, borderTopColor: Colors.border, alignItems: 'center' },
  artwork: { width: 48, height: 48, backgroundColor: Colors.background.surface, borderRadius: 4, marginRight: 12 },
  info: { flex: 1 },
  title: { color: Colors.text.primary, fontSize: 14 },
  artist: { color: Colors.text.secondary, fontSize: 12 },
});
