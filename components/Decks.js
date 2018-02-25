import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import DeckList from './DeckList';
import { AppLoading } from 'expo';
import { getDecks } from "../utils/api";
import { receiveDecks } from "../actions/index";
import { NavigationActions } from 'react-navigation';

class Decks extends Component {
  state = {
    ready: false
  }
  componentDidMount () {
    const { dispatch } = this.props;
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }
  goToAddDeck = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.navigate({routeName: 'AddDeck'}))
  }
  render() {
    const { ready } = this.state;
    const { decks, hasDecks } = this.props;

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <DeckList decks={decks}
        hasDecks={hasDecks}
        goToAddDeck={this.goToAddDeck}
      />
    )
  }
}

function mapStateToProps (decks) {
  const hasDecks = Object.keys(decks).length ? true : false;
  return {
    decks,
    hasDecks
  }
}

export default connect(
  mapStateToProps,
)(Decks)