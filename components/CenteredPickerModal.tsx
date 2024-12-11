import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type CenteredPickerModalProps = {
  onChange: (value: number, unit: string) => void;
  value?: number,
  unit?: string
}
//TODO: Make this component reusable in the future.
const CenteredPickerModal = (props: CenteredPickerModalProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  

  const valuesData = Array.from({ length: 60 }, (_, i) => (i+1))
  const recipeMetricUnits = [
    'milliliter',
    'liter',
    'gram',
    'kilogram',
    'unit',
    'piece',
    'cup',
    'tsp',
    'ounce',
];
  const [selectedValue, setSelectedValue] = useState(props.value ? props.value: valuesData[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(props.unit ? props.unit : recipeMetricUnits[0]);

  useEffect(() => {
    if(!props.onChange)
      return;
    props?.onChange(selectedValue, selectedQuantity)
  }, [selectedValue, selectedQuantity]);

  function renderText() {
    if(selectedValue && selectedQuantity) {
      return <Text style={styles.buttonText}>{props.value ? props.value : selectedValue} {props.unit ? props.unit : selectedQuantity}{selectedValue > 1 ? 's' : ''}</Text>
    }
    return <Text style={styles.buttonText}>Select Ingredient & Quantity</Text>;
  }


  return (
    <View style={styles.container}>
      {/* Main Screen */}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        {renderText()}
      </TouchableOpacity>

      {/* Container Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

            {/* Picker Columns */}
            <View style={styles.pickerContainer}>
              {/* Values Picker */}
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem} 
              >
                {Array.from({ length: 100 }, (_, i) => (i+1)).map((value) => (
                  <Picker.Item label={value.toString()} value={`${value}`} key={value} />
                ))}
              </Picker>

              {/* Quantities Picker */}
              <Picker
                selectedValue={selectedQuantity}
                onValueChange={(itemValue) => setSelectedQuantity(itemValue)}
                style={[styles.picker]}
                itemStyle={styles.pickerItem} 
              >
                {recipeMetricUnits.map((value) => (
                  <Picker.Item label={`${value}`} value={value} key={value} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#70b9be',
    minWidth: '60%',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#eaeceb',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerItem: {
    color: 'black'
  }
});

export default CenteredPickerModal;
