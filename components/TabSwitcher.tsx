import { View,TouchableOpacity,StyleSheet } from "react-native";
import { useState } from "react";
import { ThemedText } from "./ThemedText";

type TabSwitcherProps = {
  tab1: string,
  tab2: string,
  onTab1Click?: any,
  onTab2Click?: any,
};

export default function TabSwitcher({tab1, tab2, onTab1Click, onTab2Click}: TabSwitcherProps) {

  const [activeTab, setActiveTab] = useState(tab1);

  // kind of a jank way of implementing itbut gets the job done
  function tabClick(tabClicked:string, onTabClick:any) {
    if(onTabClick)
      onTabClick();
    setActiveTab(tabClicked);
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity onPress={() => tabClick(tab1, onTab1Click)} activeOpacity={0.9} 
        style={[styles.tabButton, activeTab == tab1 && styles.activeTabButton]}>
        <ThemedText style={[styles.tabButtonText, activeTab == tab1 && styles.activeButtonText]}>{tab1}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => tabClick(tab2, onTab2Click)} activeOpacity={0.9} 
        style={[styles.tabButton, activeTab == tab2 && styles.activeTabButton]}>
        <ThemedText style={[styles.tabButtonText, activeTab == tab2 && styles.activeButtonText]}>{tab2}</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6ebf2',
    display: 'flex',
    padding: 5,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabButton: {
    borderRadius: 16,
    width: '45%',
    padding: 10
  },
  tabButtonText: {
    textAlign: 'center',
    
  },
  activeTabButton: {
    backgroundColor: '#042628',
  },
  activeButtonText: {
    color: '#fff',
  }
})
