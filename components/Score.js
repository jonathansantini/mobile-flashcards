import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Score ({ numCorrect, questionNum }) {
  return (
    <Text>
      {Math.floor(numCorrect/questionNum * 100)}%
    </Text>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});