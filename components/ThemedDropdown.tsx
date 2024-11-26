import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

  type ThemedDropdownProps = {
    data: any[]
    placeholder?: string,
    dropdownLabel?: string,
    fa6Icon?: any,
    focusColor?: string,
    style?: any,
    onChange?: any
  } 
export default function ThemedDropdown({data, placeholder, dropdownLabel, fa6Icon, focusColor, style, onChange}:ThemedDropdownProps){
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if ((value || isFocus) && dropdownLabel) {
        return (
          <Text style={[dropdownStyles.label, isFocus && { color: focusColor ?? '#000' }]}>
            {dropdownLabel}
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={style}>
        {renderLabel()}
        <Dropdown
          style={[dropdownStyles.dropdown, isFocus && { borderColor: focusColor }]}
          placeholderStyle={dropdownStyles.placeholderStyle}
          selectedTextStyle={dropdownStyles.selectedTextStyle}
          inputSearchStyle={dropdownStyles.inputSearchStyle}
          iconStyle={dropdownStyles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? placeholder : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            onChange(item.value);
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            fa6Icon && (
            <FontAwesome6
              style={dropdownStyles.icon}
              color={isFocus ? focusColor : '#7c8990'}
              name={fa6Icon}
              size={20}
            />)
          )}
        />
      </View>
    );
  };

  const dropdownStyles = StyleSheet.create({

    dropdown: {
      height: 50,
      borderColor: '#E6EBF2',
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      color: '#000',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });