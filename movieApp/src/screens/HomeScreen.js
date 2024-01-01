import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import MovieList from "../Components/movieCard";
import SearchBar from "../Components/SearchBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { movieapikey } from "../utils/apikey";

export default function HomeScreen() {

  const [ genre , setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([])
  const [year, setYear] = useState('2012')
  const [searchQuery, setSearchQuery] = useState('');

  const fetchGenre = async () => {
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${movieapikey}`;
    try {
      const genreResponse = await axios.get(genreUrl);
      genreResponse.data.genres.unshift(  {
        "id": "all",
        "name": "All"
      });
      setGenre(genreResponse.data.genres);
    } catch (error) {
      throw error;
    }
  };

  const fetchMovies = async () => {
    try {
      const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${movieapikey}`;
      const genreResponse = await fetch(genreUrl);
      const genreData = await genreResponse.json();
      const genresMap = new Map(
        genreData.genres.map((genre) => [genre.id, genre.name])
      );
  
      const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${movieapikey}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=200&sort_by=popularity.desc`;
  
      const response = await fetch(movieUrl);
      const movieResponse = await response.json();
  
      const moviesWithGenres = movieResponse.results.map((movie) => ({
        ...movie,
        genres: movie.genre_ids.map((genreId) => genresMap.get(genreId)),
      }));
  
      setMovies(moviesWithGenres);
    } catch (error) {
      throw error;
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchGenre(), fetchMovies()]);
      } catch (error) {
        throw error;
      }
    };

    fetchData();

  }, [year]);

  const getMovieListGenreBased = (id) => {
    setSearchQuery(null)
    setSelectedGenre(id);
  }

  const handleSearch = (text) => {
    setSearchQuery(text);
    setSelectedGenre('')
  };

  return (
    <View style={styles.homeScreenMainContainer}>
      <Image
        style={styles.homescreenBackgroundImage}
        source={require("../../assets/movie_wallpaper2.jpeg")}
        resizeMode="cover"
      />
      <View style={styles.homescreenViewContainer}>
        <View style={styles.TopheaderContainer}>
          <Image
          style={styles.logoIcon}
            source={require("../../assets/mov-logo.png")}

          />
        </View>
        <View style={styles.genreContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            {genre.map((label, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: selectedGenre === label.id ? 'red' : 'gray',
                  borderRadius: 8,
                  padding: 8,
                  marginRight: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => getMovieListGenreBased(label.id)}
              >
                <Text style={styles.textLable}>{label.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <SearchBar onSearch={handleSearch}/>
       
      </View>
                
        <MovieList  movieList={movies} movieYear={year} genre={selectedGenre} searchQuery={searchQuery}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreenMainContainer:{ 
    display:"flex",height:'100%'
  },
  homescreenBackgroundImage: {
    opacity: 0.1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  homescreenViewContainer :{
    backgroundColor: 'black',
    minHeight: 220,
    width: '100%',
    position: 'fixed',
    top: 0,
    alignItems: 'flex-start', 
    justifyContent: 'flex-start',
  },
    TopheaderContainer: {
    flexDirection: 'row',  
    paddingTop: 2, 
  },
  logoIcon:{
    height: 80,  
    width: 100,  
    padding: 12,
    marginTop: 14,  
  },
  genreContainer: {
    flexDirection:'row',
    margin: 12
  },
  textLable: {
    alignItems: 'center',
    color: 'white',
  },
  contentContainer: {
    flexGrow: 0,
  },
});

