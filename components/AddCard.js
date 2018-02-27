import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { red } from '../utils/colors';
import TextButton from './TextButton';
import { addCardToDeck } from "../utils/api";
import { addCard } from "../actions/index";
import { NavigationActions } from "react-navigation";

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      error: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static navigationOptions = () => {
    return {
      title: 'Add Card'
    }
  }

  handleSubmit() {
    const { dispatch, navigation, deckId } = this.props;
    const { question, answer } = this.state;

    if (question && answer) {
      addCardToDeck({ deckId, question, answer })
        .then(() => dispatch(addCard({ deckId, question, answer })))
        .then(() => navigation.dispatch(NavigationActions.back()))
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
        <TextInput
          style={styles.input}
          onChangeText={(question) => this.setState({question})}
          placeholder={'Enter question here'}
          value={this.state.question}
        />

        <TextInput
          style={styles.input}
          onChangeText={(answer) => this.setState({answer})}
          placeholder={'Enter answer here'}
          value={this.state.answer}
        />

        { error && (
          <Text style={styles.error}>Please enter a valid question and answer.</Text>
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
    width: 300,
    height: 40,
    marginTop: 10,
    marginBottom: 25,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  error: {
    color: red,
    marginBottom: 15,
  }
});

function mapStateToProps (decks, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    decks,
    deckId
  }
}

export default connect(
  mapStateToProps,
)(AddCard)