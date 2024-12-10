import { FontAwesome6, Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export type ProgressTrackerPage = {
  component: React.JSX.Element;
  pageId: string;  // helps know which UI we are on.
  entypoIcon?: any;  // just did any type so the linting error would go away
};

type ProgressTrackerProps = {
  pages: ProgressTrackerPage[];
};

export default function ProgressTracker({ pages }: ProgressTrackerProps) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        {pages.map((page, index) => (
          <View style={styles.stepContainer} key={page.pageId}>
            {/* Circle */}
            <TouchableOpacity
            activeOpacity={1}
              onPress={() => setCurrentStep(index)}
              style={[
                styles.circle,
                currentStep === index && styles.selectedCircle,
                currentStep > index && styles.previousCircle,
              ]}
            >
              {
                page.entypoIcon ?
                <Entypo name={page.entypoIcon} size={currentStep === index ? 20 : 15}color="white"/> :
                <Text style={styles.stepText}>{index + 1}</Text>
              }
            </TouchableOpacity>
            {/* Line */}
            {index < pages.length - 1 && (
              <View
                style={[
                  styles.line,
                  currentStep > index && styles.completedLine,
                ]}
              />
            )}
          </View>
        ))}
      </View>

      <View>
        {pages[currentStep].component}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    backgroundColor: '#70b9be',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  previousCircle: {
    backgroundColor: '#70b9be',
    borderRadius: 20,
  },
  stepText: {
    color: '#fff',
    fontSize: 14,
  },
  line: {
    width: 80,
    height: 4,
    backgroundColor: '#ccc',
  },
  completedLine: {
    backgroundColor: '#70b9be',
  },
});
