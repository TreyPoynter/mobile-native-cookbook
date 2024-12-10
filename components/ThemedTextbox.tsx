import { View, TextInput, StyleSheet } from "react-native"

type ThemedTextboxProps = {
  isProtected?: boolean
  onTextChange?: any
  placeholder?: string
  value?: string
  multiline?: boolean
  numLines?: number
  styles?: any
}

export default function ThemedTextbox({isProtected, onTextChange, placeholder, value, multiline = false, numLines = 1, styles}: ThemedTextboxProps) {

  function getValue() {
    if(value)
      return value
    return undefined;
  }

  return(
    <TextInput multiline={multiline} secureTextEntry={isProtected} onChangeText={onTextChange} numberOfLines={numLines} value={getValue()}
      placeholderTextColor={'#97A2B0'} placeholder={placeholder} style={[textboxStyles.textInput, styles, { height: 45*numLines }]}
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