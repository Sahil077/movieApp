import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
       style={styles.input}
       placeholder="Search for movies..."
       onChangeText={(text) => setSearchText(text)}
       value={searchText}
       onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    backgroundColor: "#d9dbda",
    width: "95%",
    borderRadius: 15,
  },
  input: {
    flex: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
});

export default SearchBar;
