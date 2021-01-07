import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import pokemon from 'pokemon';
import Pokemon from "./components/Pokemon";

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

const Main = () => {
    const [state, setState] = useState({
        isLoading: false, // decides whether to show the activity indicator or not
        searchInput: '', // the currently input text
        name: '', // Pokémon name
        pic: '', // Pokémon image URL
        types: [], // Pokémon types array
        desc: '', // Pokémon description
    });

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(searchInput) => {
                                setState({
                                    ...state,
                                    searchInput
                                })
                            }}
                            value={state.searchInput}
                            placeholder="Search Pokémon"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            // onPress={this.searchPokemon}
                            title="Search"
                            color="#0064e1"
                        />
                    </View>
                </View>

                <View style={styles.mainContainer}>
                    {state.isLoading && <ActivityIndicator size="large" color="#0064e1" />}

                    {!state.isLoading && (
                        <Pokemon name={state.name} pic={state.pic} types={state.types} desc={state.desc} />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Main;

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F5FCFF',
    },
    headContainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 100,
    },
    textInputContainer: {
      flex: 2,
    },
    buttonContainer: {
      flex: 1,
    },
    mainContainer: {
      flex: 9,
    },
    textInput: {
      height: 35,
      marginBottom: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      backgroundColor: '#eaeaea',
      padding: 5,
    },
  });