import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import GreetingsText from '@/components/GreetingsText';

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <GreetingsText/>
        <ThemedText type='title' style={{fontSize: 24}}>JOHN DOE</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: '9%',
    marginHorizontal: '5%'
  },
  greetingContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }
});
