import { ThemedText } from "./ThemedText";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Feather from '@expo/vector-icons/Feather';

export default function GreetingsText() {
  const currTime = new Date(); // Get the current date and time
  const hours = currTime.getHours(); // Get the current hour (0-23)

  // Determine the greeting based on the time of day
  const getGreeting = () => {
    if (hours < 12) {
      return 'Good Morning';
    } else if (hours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
      <Feather name="sun" size={24} color={'#5c8c9d'} />
      <ThemedText style={{fontSize: 20}}>{getGreeting()}</ThemedText>
    </View>
  );
}
