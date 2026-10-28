import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Colors } from '../../../constants/Colors';
import { libraryAPI } from '../../../lib/api';

export default function LibraryScreen() {
  const [liked, setLiked] = useState<any[]>([]);

  useEffect(() => {
    libraryAPI.getLiked()
      .then(res => setLiked(res.data.tracks || []))
      .catch(err => console.log(err));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Library</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Liked Songs</Text>
        {liked.map((track: any, i: number) => (
          <View key={i} style={styles.trackRow}>
            <View style={styles.trackArt} />
            <View>
              <Text style={styles.trackTitle}>{track.title}</Text>
              <Text style={styles.trackArtist}>{track.artist?.name}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.primary },
  header: { padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.text.primary },
  section: { padding: 20 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.text.primary, marginBottom: 16 },
  trackRow: { flexDirection: 'row', padding: 8, alignItems: 'center' },
  trackArt: { width: 48, height: 48, backgroundColor: Colors.background.elevated, marginRight: 12, borderRadius: 4 },
  trackTitle: { color: Colors.text.primary, fontSize: 16 },
  trackArtist: { color: Colors.text.secondary, fontSize: 14 },
});
