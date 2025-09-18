import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Task } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [text, setText] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Estudar React Native' },
    { id: '2', text: 'Fazer o projeto da disciplina' },
  ]);

  const handleAddTask = () => {
    if (text.trim() === '') {
      Alert.alert('Erro', 'O campo da tarefa não pode ser vazio.');
      return;
    }
    setTasks((prev) => [...prev, { id: Date.now().toString(), text }]);
    setText('');
  };

  const handleRemoveTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Digite uma nova tarefa..." value={text} onChangeText={setText} />
        <Button title="Adicionar" onPress={handleAddTask} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.listTitle}>Tarefas Pendentes</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.taskItem} onPress={() => navigation.navigate('Details', { task: item })}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity onPress={() => handleRemoveTask(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <Button title="Ir para Sobre" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
  formContainer: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 8,
  },
  taskText: { fontSize: 16 },
  deleteButton: { padding: 8, backgroundColor: '#ff4444', borderRadius: 4 },
  deleteButtonText: { color: 'white', fontWeight: 'bold' },
});
