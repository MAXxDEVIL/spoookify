import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Colors } from '../../../constants/Colors';
import { homeAPI } from '../../../lib/api';

export default function HomeScreen() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    homeAPI.getHome()
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Spoookify</Text>
        <Text style={styles.subtitle}>Good evening</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Made for you</Text>
        {data?.madeForYou?.map((item: any, i: number) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
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
  subtitle: { fontSize: 16, color: Colors.text.secondary, marginTop: 4 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.text.primary, marginBottom: 16 },
  card: { marginBottom: 12 },
  cardImage: { width: 150, height: 150, backgroundColor: Colors.background.elevated, borderRadius: 8 },
  cardTitle: { color: Colors.text.primary, marginTop: 8 },
});
