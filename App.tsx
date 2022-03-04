//import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ActivityIndicator, FlatList,StyleSheet, Text, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import React from 'react';
import { useState, useEffect } from 'react';
//import Article from './components/Article';
import Character from './components/characters/index.jsx';
import Personage from './components/character/index.jsx';
import './index.css';
import './App.css';
import Buscador from './components/buscador';

export default function App() {
 let urlCharacters = `https://rickandmortyapi.com/api/character/`;
  let dataURL = {
    info: {},
    character: [],
    error: '',
  };

  const [ characters, setCharacters ] = useState(dataURL);
  const [ ulr, setURL ] = useState(urlCharacters);
  const [ page, setPage ] = useState(1);

  useEffect(
    () => {
      const fetchAPI = () => {
        fetch(ulr)
          .then(res => res.json())
          .then(data => setCharacters({ character: data.results, info: data.info, error: data.error }))
          .catch(error => console.log(error));
      };
      fetchAPI();
    },
    [ ulr ]
  );

  const nextPage = () => {
    setURL(characters.info.next);
    setPage(page + 1);
    scroll();
  };

  const prevPage = () => {
    if (characters.info.prev != null) {
      setURL(characters.info.prev);
      setPage(page - 1);
      scroll();
    }
  };

  const scroll = () => {
    const elemento = document.querySelector('.container');
    elemento.scrollIntoView('auto', 'start');
  };

  const searchData = data => {
    urlCharacters = `https://rickandmortyapi.com/api/character/?name=${data}`;
    setURL(urlCharacters);
    setPage(1);
  };

  return (
    <div className="container">
      <h1 className="title">Rick and Morty</h1>
      <Buscador searchData={searchData} />
      <Character character={characters} prevPage={prevPage} nextPage={nextPage} page={page} />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  containerProfil: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'unset',
    padding: 0,
  },
  scrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});