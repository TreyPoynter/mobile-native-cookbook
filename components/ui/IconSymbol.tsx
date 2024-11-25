import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Font Awesome 6

export type IconLibrary = 'MaterialIcons' | 'SimpleLineIcons';

export type IconSymbolProps = {
  library?: IconLibrary; // Specify the library explicitly
  name: string; // Allow any valid icon name from the chosen library
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
};

export function IconSymbol({
  library,
  name,
  size = 24,
  color,
  style,
}: IconSymbolProps) {
  const IconComponent =
    library === 'MaterialIcons'
      ? MaterialIcons
      : library === 'SimpleLineIcons'
      ? SimpleLineIcons
      : FontAwesome;

  return <IconComponent name={name} size={size} color={color} style={style} />;
}
