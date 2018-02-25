import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.btn, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 8,
    color: white,
    fontWeight: 'bold',
  }
})