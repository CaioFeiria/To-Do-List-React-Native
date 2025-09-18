import { View, Text, Button, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Tarefa</Text>
      <Text style={styles.detailText}>ID: {task.id}</Text>
      <Text style={styles.detailText}>Tarefa: {task.text}</Text>

      <Button title="Voltar para a Lista" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  detailText: { fontSize: 18 },
});
