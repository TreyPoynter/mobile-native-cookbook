import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ThemedDropdownProps } from "./ThemedDropdown";

export default function ThemedSearchDropdown(props: ThemedDropdownProps) {
  const [value, setValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState<{label: any, value: any}[]>([]);
  

  useEffect(() => {
    const formattedData = props.data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    setData(formattedData)
  }, [])

  return (
    <View style={dropdownStyles.container}>
      <Dropdown
        style={[dropdownStyles.dropdown, isFocus && { borderColor: props.focusColor }]}
        placeholderStyle={dropdownStyles.placeholderStyle}
        selectedTextStyle={dropdownStyles.selectedTextStyle}
        inputSearchStyle={dropdownStyles.inputSearchStyle}
        iconStyle={dropdownStyles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Ingredient" : "..."}
        searchPlaceholder="Search Ingredient..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={dropdownStyles.icon}
            color={isFocus ? props.focusColor : "#7c8990"}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
}

const dropdownStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    borderColor: "#E6EBF2",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
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
