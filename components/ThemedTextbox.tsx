import { View, TextInput, StyleSheet } from "react-native"

type ThemedTextboxProps = {
  isProtected?: boolean
  onTextChange?: any
  placeholder?: string
  styles?: any
}

export default function ThemedTextbox({isProtected, onTextChange, placeholder, styles}: ThemedTextboxProps) {
  return(
    <TextInput secureTextEntry={isProtected} onChangeText={onTextChange} 
      placeholderTextColor={'#97A2B0'} placeholder={placeholder} style={[textboxStyles.textInput, styles]}
    />
  )
}

const textboxStyles = StyleSheet.create({
  textInput: {
    borderColor: '#E6EBF2',
    borderWidth: 1,
    borderRadius: 16,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%'
  }
});