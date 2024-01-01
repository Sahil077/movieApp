import { Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { movieapikey } from "../utils/apikey";
import LoadingComponent from "./loadingData";

const movieCard = ({ movieList, movieYear, genre, searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [onGoingYear, setOngoingYear] = useState(movieYear);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    const previousYear = parseInt(onGoingYear) - 1;
    if (selectedGenre) {
      fetchData(previousYear, selectedGenre).then(() => {
        setOngoingYear(previousYear);
      });
    } else {
      fetchData(previousYear).then(() => {
        setOngoingYear(previousYear);
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
    const nextYear = parseInt(onGoingYear) + 1;
    const currentYear = new Date().getFullYear();
    if (parseInt(onGoingYear) < currentYear) {
      if (selectedGenre) {
        fetchData(nextYear, selectedGenre).then(() => {
          setOngoingYear(nextYear);
        });
      } else {
        fetchData(nextYear, selectedGenre).then(() => {
          setOngoingYear(nextYear);
        });
      }
    }
  };

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
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {rows.length === 0 ? (
          <LoadingComponent isLoading={isLoading} />
        ) : (
          rows.map((row, rowIndex) => (
            <View key={rowIndex}>
              <View style={{ flexDirection: "row" }}>
                {row.map((item, cardIndex) => (
                  <View
                    key={cardIndex}
                    style={{
                     // display: "flex",
                      margin: 5,
                      // height: 280,
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
    </>
  );
};

export default movieCard;
