import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'

import axios from 'axios';

import {
  DeckList,
  SearchBar,
  SearchResults
} from './components'

import {
  fetchCards,
} from './api';




//the function app is a component. It takes a parameter, called props,
// and has to return a template. This is similar to render functions
// we used in js before

const App = () => {
  const [results, setResults] = useState([]);
  const [deck, setDeck] = useState([]);

  const addCardToDeck = ({ id, name }) => {
    // what should this look like?
    const nextDeck = [...deck]; //makes a duplicate first
    const index = nextDeck.findIndex(card => card.id === id); // checks
    //element against a condition -- works like .filter() but it just returns
    // the index of the first array element that passes said condition

    // index will be -1 if it is not found
    if(index > -1) {
      nextDeck[index].count += 1;
    } else {
      nextDeck.push({
        id, 
        name, 
        count: 1});
    }

    setDeck(nextDeck);
  }

  const removeCardFromDeck = ({ id }) => {
    // what goes here?
    const nextDeck = [...deck];
    const index = nextDeck.findIndex(card => card.id === id);

    if(index === -1) {
      // don't do anything if we're trying to remove a card that is not
      // in the deck so:
      return; 
    }

    if (nextDeck[index].count === 1) {
      // remove the card altogether
      nextDeck.splice(index, 1);
    } else {
      //decrement the count
      nextDeck[index].count -= 1;
    }

    setDeck(nextDeck);
  }

  return (
    <div id="app">
      <SearchBar setResults={ setResults } />
      <SearchResults 
        results={ results }
        addCardToDeck={ addCardToDeck }
        removeCardFromDeck={ removeCardFromDeck } />
      <DeckList deck={ deck } />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);