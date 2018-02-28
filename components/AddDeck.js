import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { red } from '../utils/colors';
import TextButton from './TextButton';
import { saveDeckTitle } from "../utils/api";
import { addDeck } from "../actions/index";
import { NavigationActions } from "react-navigation";

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetForm() {
    this.setState({
      text: ''
    })
  }

  handleSubmit(e) {
    const { dispatch, navigation } = this.props;
    const { text } = this.state;

    if (text) {
      saveDeckTitle(text)
        .then(() => dispatch(addDeck(text)))
        .then(() => navigation.dispatch(NavigationActions.back()))

      this.resetForm();
    } else {
      this.setState({
        error: true
      })
    }
  }

  render() {
    const { error } = this.state;

    return (
      <View style={styles.center}>
        <Text>What is the name of the new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />

        { error && (
          <Text style={styles.error}>Please enter a valid deck name.</Text>
        )}

        <TextButton style={{marginTop: 10}} onPress={this.handleSubmit}>
          Submit
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  error: {
    color: red,
  }
});

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(AddDeck)