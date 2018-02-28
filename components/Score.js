import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import TextButton from './TextButton';
import { blue, red } from '../utils/colors';

export default function Score ({ numCorrect, questionNum, backToDeck, restartQuiz }) {
  return (
    <View style={styles.center}>
      <Text style={styles.copy}>
        {`You answered ${numCorrect} out of ${questionNum} correct.`}
      </Text>

      <Text style={styles.percentage}>
        {Math.floor(numCorrect/questionNum * 100)}%
      </Text>

      <TextButton style={styles.returnBtn} onPress={() => backToDeck()}>
        Return
      </TextButton>

      <TextButton style={styles.restartBtn} onPress={() => restartQuiz()}>
        Restart
      </TextButton>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copy: {
    fontSize: 24,
    marginBottom: 15,
  },
  percentage: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  returnBtn: {
    marginTop: 10,
    backgroundColor: blue,
  },
  restartBtn: {
    marginTop: 10,
    backgroundColor: red,
  },
});