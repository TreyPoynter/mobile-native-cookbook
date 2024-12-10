import React from "react";
import { View } from "react-native";
import ThemedTextbox from "../ThemedTextbox";
import ThemedDropdown from "../ThemedDropdown";

type BasicInfo = {
  setRecipeTitle: React.Dispatch<React.SetStateAction<string>>,
  setRecipeTime: React.Dispatch<React.SetStateAction<number>>
  setRecipeTimeUnits: React.Dispatch<React.SetStateAction<string>>
  SetRecipeServings: React.Dispatch<React.SetStateAction<number>>
}

const timeSelections = [
  { label: 'Minutes', value: 'Minutes' },
  { label: 'Hours', value: 'Hours' },
  { label: 'Days', value: 'Days' },
];

export default function AddBasicInfo(props: BasicInfo) {
  return (
    <View style={{gap: 8, marginTop: 8}}>
      <ThemedTextbox placeholder='Recipe Title' onTextChange={props.setRecipeTitle} />
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        <ThemedDropdown placeholder="Time" data={Array.from({ length: 60 }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() }))}
          fa6Icon={'clock'} style={{ width: '49%' }} onChange={props.setRecipeTime} />
        <ThemedDropdown placeholder="Time Unit" data={timeSelections} fa6Icon={'ruler-horizontal'} style={{ width: '49%' }} onChange={props.setRecipeTimeUnits} />
      </View>
      <ThemedDropdown placeholder="Servings" data={Array.from({ length: 60 }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() }))}
          fa6Icon={'utensils'} onChange={props.setRecipeTime} />
    </View>
  )
}