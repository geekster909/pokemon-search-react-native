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

    const getTypes = (types) =>
        types.map(({ slot, type }) => ({
            id: slot,
            name: type.name,
        }));

    const getDescription = (entries) =>
        entries.find((item) => item.language.name === 'en').flavor_text;

    const searchPokemon = async () => {
        try {
            const pokemonID = pokemon.getId(state.searchInput); // check if the entered Pokémon name is valid
            // console.log(pokemonID);

            setState({
                ...state,
                isLoading: true, // show the loader while request is being performed
            });
    
            const { data: pokemonData } = await axios.get(
                `${POKE_API_BASE_URL}/pokemon/${pokemonID}`
            );
            const { data: pokemonSpecieData } = await axios.get(
                `${POKE_API_BASE_URL}/pokemon-species/${pokemonID}`
            );
            
            const { name, sprites, types } = pokemonData;
            const { flavor_text_entries } = pokemonSpecieData;

            setState({
                ...state,
                name,
                pic: sprites.front_default,
                types: getTypes(types),
                desc: getDescription(flavor_text_entries),
                isLoading: false, // hide loader
            });
        } catch (err) {
            console.log(err);
            Alert.alert('Error', 'Pokémon not found');
            setState({
                ...state,
                isLoading: false, // hide loader
            });
        }
    };

    // console.log(state);

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
                                });
                            }}
                            value={state.searchInput}
                            placeholder="Search Pokémon"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={searchPokemon}
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