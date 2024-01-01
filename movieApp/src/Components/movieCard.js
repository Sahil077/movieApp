import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { movieapikey } from "../utils/apikey";
import LoadingComponent from "./loadingData";
import { AntDesign } from "@expo/vector-icons";
import NoMovieFound from './noMovieFound';

const movieCard = ({ movieList, movieYear, genre, searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [onGoingYear, setOngoingYear] = useState(movieYear);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false) 
  const ITEM_HEIGHT = 20;

  const scrollViewRef = useRef(null);

  const scrollToMiddle = () => {
    if (scrollViewRef.current) {
      const middleIndex = movies.length / 2; 
      const yOffset = middleIndex * ITEM_HEIGHT;

      scrollViewRef.current.scrollTo({
        y: yOffset,
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (genre !== selectedGenre || searchQuery) {
      setSelectedGenre(genre);
      setMovies([]);
      setIsLoading(true);
      if (searchQuery) {
        searchMovies(searchQuery);
      } else {
        fetchData(movieYear, genre);
      }
    }
    if (movieList && movieList.length > 0 && !selectedGenre && !searchQuery) {
      setMovies(movieList);
    }
  }, [movieList, movieYear, genre, selectedGenre, searchQuery]);

  const rows = movies.reduce((acc, _, index, array) => {
    if (index % 2 === 0) {
      acc.push(array.slice(index, index + 2));
    }
    return acc;
  }, []);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (
      offsetY > 0 &&
      offsetY >=
        event.nativeEvent.contentSize.height -
          event.nativeEvent.layoutMeasurement.height -
          20
    ) {
      onEndReached();
    } else if (offsetY <= 0) {
      onScrollToTop();
    }
  };

  const onEndReached = () => {
    setIsLoading(true);
    const previousYear = parseInt(onGoingYear) - 1;
    if (selectedGenre) {
      fetchData(previousYear, selectedGenre).then(() => {
        setOngoingYear(previousYear);
        scrollToMiddle();
      });
    } else {
      fetchData(previousYear).then(() => {
        setOngoingYear(previousYear);
        scrollToMiddle();
      });
    }
  };

  const fetchGenresMap = async () => {
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${movieapikey}`;
    const genreResponse = await fetch(genreUrl);
    const genreData = await genreResponse.json();
    return new Map(genreData.genres.map((genre) => [genre.id, genre.name]));
  };

  const fetchData = async (year, genre) => {
    const genresMap = await fetchGenresMap();
    const apiUrl = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${movieapikey}&query=${searchQuery}&sort_by=popularity.desc&primary_release_year=${year}&page=1`
      : genre && genre !== "all"
      ? `https://api.themoviedb.org/3/discover/movie?api_key=${movieapikey}&sort_by=popularity.desc&primary_release_year=${year}&with_genres=${genre}&page=1&vote_count.gte=100`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${movieapikey}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;

    try {
      const response = await fetch(apiUrl);
      const movieResponse = await response.json();
      if(!movieResponse){
        setNotFound(true)
      }
      setNotFound(false)
      const moviesWithGenres = movieResponse.results.map((movie) => ({
        ...movie,
        genres: movie.genre_ids.map((genreId) => genresMap.get(genreId)),
      }));
      setMovies([]);
      setMovies(moviesWithGenres);
      setIsLoading(false);
      setOngoingYear(year);
    } catch (error) {
      throw error;
    }
  };


  const searchMovies = async (query) => {
    setIsLoading(true);
    const genresMap = await fetchGenresMap();
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${movieapikey}&sort_by=popularity.desc&query=${query}&primary_release_year=${onGoingYear}&page=1&vote_count.gte=100`
      );
      const movieResponse = await response.json();
            const moviesWithGenres = movieResponse.results.map((movie) => ({
        ...movie,
        genres: movie.genre_ids.map((genreId) => genresMap.get(genreId)),
      }));
      setMovies(moviesWithGenres);
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const onScrollToTop = () => {
    setIsLoading(true);
    const nextYear = parseInt(onGoingYear) + 1;
    const currentYear = new Date().getFullYear();
    if (parseInt(onGoingYear) < currentYear) {
      if (selectedGenre) {
        fetchData(nextYear, selectedGenre).then(() => {
          setOngoingYear(nextYear);
          scrollToMiddle();
        });
      } else {
        fetchData(nextYear, selectedGenre).then(() => {
          setOngoingYear(nextYear);
          scrollToMiddle();
        });
      }
    }
  };

  const ScrollToTopButton = ({ onPress }) => (
    <TouchableOpacity style={styles.scrollToTopButton} onPress={onPress}>
      <AntDesign name="up" size={24} color="white" />
    </TouchableOpacity>
  );

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const previousYearMovie = () => {
    onEndReached()
  }

  return (
    <>
      <Text
        style={{
          color: "black",
          fontSize: 20,
          fontWeight: "bold",
          marginLeft: 12,
        }}
      >
        {onGoingYear}
      </Text>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {rows.length === 0 ? (
          isLoading ? 
          <LoadingComponent isLoading={isLoading} /> : <NoMovieFound onPressBack={previousYearMovie}/>
        ) : (
          rows.map((row, rowIndex) => (
            <View key={rowIndex}>
              <View style={{ flexDirection: "row" }}>
                {row.map((item, cardIndex) => (
                  <View
                    key={cardIndex}
                    style={{
                      margin: 5,
                    }}
                  >
                    <Image
                      style={{
                        aspectRatio: 3 / 4,
                        height: 200,
                        borderRadius: 6,
                      }}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                      }}
                    />
                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: "column",
                        fontSize: 15,
                        fontWeight: "600",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "800",
                          width: 170,
                          marginTop: 10,
                        }}
                        numberOfLines={2} // Limit to 2 lines for title
                        ellipsizeMode="tail"
                      >
                        {item.original_title}
                      </Text>

                      <Text
                        style={{
                          marginTop: 4,
                          fontSize: 15,
                          fontWeight: "600",
                        }}
                        numberOfLines={4}
                      >
                        Genre • {item.genres[0]}
                      </Text>

                      <Text
                        style={{
                          marginTop: 4,
                          fontSize: 15,
                          fontWeight: "600",
                        }}
                      >
                        vote • {item.vote_average}
                      </Text>
                      <View style={{ width: 170, marginTop: 4 }}>
                        <Text
                          style={{ fontSize: 14, fontWeight: "700" }}
                          numberOfLines={3} // Limit to 3 lines for overview
                          ellipsizeMode="tail"
                        >
                          {item.overview.substring(0, 150) + "..."}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <ScrollToTopButton onPress={scrollToTop} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  scrollToTopButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "indianred", 
    borderRadius: 30,
    padding: 10,
    zIndex: 1,
  },
});

export default movieCard;
