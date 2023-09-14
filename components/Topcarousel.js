import React, { useState, useEffect } from "react";
import { Carousel, Button, Input, Dropdown } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";
import axios from "axios";
import styles from "../components/Styles/Topcarousel.module.css";

const { Search } = Input;

const Topcarousel = () => {
  const contentStyle = {
    margin: 0,
    height: "600px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const [movieData, setMovieData] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [searchIsloading, setSearchIsloading] = useState(false);

  const BGpath = (path) => `https://image.tmdb.org/t/p/original/${path}`;

  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          1st item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          2nd Item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          3rd Item
        </a>
      ),
    },
  ];

  useEffect(() => {
    const api_key = "a88164522365d78d10f28d20e5bcd4d5";
    const BASE_URL = "https://api.themoviedb.org/3/";
    const api = axios.create({ baseURL: BASE_URL });
    const fetchRandomMovies = async () => {
      try {
        const res = await api.get("movie/popular", {
          params: { api_key },
        });

        const RandomMovies = res.data.results.slice(0, 4);

        setMovieData(RandomMovies);

        console.log(movieData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRandomMovies();
  }, []);

  const truncateDesc = (str) => {
    if (str.length > 200) {
      const result = str.substring(0, 200) + "...";
      return result;
    }
    return str;
  };

  const SearchByTitle = async (movieName) => {
    const api_key = "a88164522365d78d10f28d20e5bcd4d5";
    const BASE_URL = "https://api.themoviedb.org/3/";
    const api = axios.create({ baseURL: BASE_URL });
    try {
      const res = await api.get("search/movie", {
        params: { api_key, query: movieName },
      });
      console.log(res.data.results);
      setSearchResult(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const onSearch = (value, _e, info) => {
    setSearchIsloading(true);

    SearchByTitle(value);
    console.log(info?.source, value);
  };

  useEffect(() => {
    if (searchResult.length > 0) {
      setSearchIsloading(false);
    }
  }, [searchResult]);

  return (
    <div style={{ margin: "-8px" }}>
      <Carousel
        autoplay
        dotPosition="right"
        effect="fade"
        afterChange={onChange}
      >
        {movieData?.map((movie) => (
          <div className={styles.bannercard}>
            <h3 style={contentStyle}>
              <img
                style={{ height: "600px", width: "100%" }}
                alt="movie background"
                src={BGpath(movie?.backdrop_path)}
              />
            </h3>
            {/* <------------- Search Bar is Here ---------------> */}
            <div className={styles.searchbar}>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Search
                  placeholder="What do you want to watch?"
                  onSearch={onSearch}
                  style={{
                    width: 525,
                    height: 36,
                  }}
                  loading={searchIsloading}
                />
              </Dropdown>
            </div>
            <div className={styles.bannerdescription}>
              <div style={{ fontSize: "48px", fontWeight: 700 }}>
                {movie?.original_title}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    alt="imdb tag"
                    src="/imdbsvg.svg"
                    style={{ marginRight: "8px" }}
                  />
                  86.0/100
                </div>
                <div style={{ marginLeft: "128px", display: "flex" }}>
                  <img
                    alt="imdb tag"
                    src="/tomato.svg"
                    style={{ marginRight: "8px" }}
                  />
                  7/10
                </div>
              </div>
              <div
                style={{
                  marginBottom: "16px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {truncateDesc(movie?.overview)}
              </div>
              <div>
                <Button
                  style={{
                    padding: "6px 16px",
                    backgroundColor: "#BE123C",
                    minHeight: "36px",
                  }}
                  type="primary"
                >
                  {" "}
                  <PlayCircleFilled /> WATCH TRAILER
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Topcarousel;
