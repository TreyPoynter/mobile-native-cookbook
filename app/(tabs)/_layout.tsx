import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors['light'].tint,
          tabBarInactiveTintColor: Colors['light'].gray,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: styles.tabBar,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome6 name="house-chimney" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <FontAwesome6 name="magnifying-glass" size={24} color={color}/>,
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: 'Add',
            tabBarIcon: () => null, // No default icon for this tab
            tabBarButton: (props) => <FloatingTabButton {...props} />,
          }}
        />
        <Tabs.Screen
          name="shoppingList"
          options={{
            title: 'List',
            tabBarIcon: ({ color }) => <FontAwesome6 name="cart-shopping" size={24} color={color}/>,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <FontAwesome6 name="calendar-days" size={24} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

function FloatingTabButton({ onPress }) {
  const isFocused = useIsFocused(); // Determine if the tab is active
  const color = isFocused ? Colors['light'].tint : '#97a2b0';

  return (
    <TouchableOpacity activeOpacity={1} style={styles.floatingTab} onPress={onPress}>
      <MaterialCommunityIcons name="chef-hat" size={36} color={color}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  tabBar: {
    backgroundColor: '#fff',
    position: Platform.OS === 'ios' ? 'absolute' : 'relative',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  floatingTab: {
    position: 'absolute',
    bottom: 10, // Adjust to match the navbar height
    left: '50%',
    transform: [{ translateX: -36 }], // Center the floating tab
    backgroundColor: '#fff',
    borderRadius: 36,
    height: 72,
    width: 72,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});
