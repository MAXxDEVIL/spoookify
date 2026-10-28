import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { Colors } from '../../../constants/Colors';
import { searchAPI } from '../../../lib/api';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      try {
        const res = await searchAPI.search(text);
        setResults(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <TextInput
          style={styles.input}
          placeholder="What do you want to listen to?"
          placeholderTextColor={Colors.text.tertiary}
          value={query}
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView style={styles.content}>
        {results?.tracks?.map((track: any, i: number) => (
          <View key={i} style={styles.trackRow}>
            <View style={styles.trackArt} />
            <View>
              <Text style={styles.trackTitle}>{track.title}</Text>
              <Text style={styles.trackArtist}>{track.artist?.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.primary },
  header: { padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.text.primary, marginBottom: 16 },
  input: { backgroundColor: Colors.background.secondary, color: Colors.text.primary, padding: 12, borderRadius: 8 },
  content: { flex: 1 },
  trackRow: { flexDirection: 'row', padding: 12, alignItems: 'center' },
  trackArt: { width: 48, height: 48, backgroundColor: Colors.background.elevated, marginRight: 12, borderRadius: 4 },
  trackTitle: { color: Colors.text.primary, fontSize: 16 },
  trackArtist: { color: Colors.text.secondary, fontSize: 14 },
});
