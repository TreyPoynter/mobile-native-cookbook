import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ThemedTextbox from "../ThemedTextbox";
import ThemedDropdown from "../ThemedDropdown";

type BasicInfoPage = {
  recipeTitle: string
  setRecipeTitle: React.Dispatch<React.SetStateAction<string>>
  recipeTime: number
  setRecipeTime: React.Dispatch<React.SetStateAction<number>>
  recipeTimeUnits: string
  setRecipeTimeUnits: React.Dispatch<React.SetStateAction<string>>
  servings: number
  setServings: React.Dispatch<React.SetStateAction<number>>
}

const timeSelections = [
  { label: 'Minutes', value: 'Minutes' },
  { label: 'Hours', value: 'Hours' },
  { label: 'Days', value: 'Days' },
];

export default function AddBasicInfo(props: BasicInfoPage) {
 
  return (
    <View style={{gap: 8, marginTop: 8}}>
      <ThemedTextbox value={props.recipeTitle} placeholder={"Title"} onTextChange={props.setRecipeTitle} />
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        <ThemedDropdown parentValue={props.recipeTime} placeholder="Time" data={Array.from({ length: 60 }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() }))}
          fa6Icon={'clock'} style={{ width: '49%' }} onChange={props.setRecipeTime} />
        <ThemedDropdown parentValue={props.recipeTimeUnits} placeholder="Time Unit" data={timeSelections} fa6Icon={'ruler-horizontal'} style={{ width: '49%' }} onChange={props.setRecipeTimeUnits} />
      </View>
      <ThemedDropdown parentValue={props.servings} placeholder="Servings" data={Array.from({ length: 60 }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() }))}
          fa6Icon={'utensils'} onChange={props.setServings} />
    </View>
  )
}