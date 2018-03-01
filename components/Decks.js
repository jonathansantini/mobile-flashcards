import React, { Component } from 'react';
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
    //console.log('get')
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  toDeck = (deckId) => {
    this.props.navigation.navigate('Deck', {deckId})
  }

  toAddDeck = () => {
    this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'AddDeck'}))
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
        toDeck={this.toDeck}
        toAddDeck={this.toAddDeck}
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