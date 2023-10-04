import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "antd";
import axios from "axios";

const { Text } = Typography;

const CardComponent = (props) => {
  const truncate = (str) => {
    if (str?.length > 25) {
      const result = str.substring(0, 25) + "...";
      return result;
    }
    return str;
  };
  const handleClick = async (event, movieId) => {
    const api_key = "a88164522365d78d10f28d20e5bcd4d5";
    const BASE_URL = "https://api.themoviedb.org/3/";
    const api = axios.create({ baseURL: BASE_URL });

    try {
      const response = await api.get(`movie/${movieId}`, {
        params: { api_key },
      });

      const imdbIDNumber = response?.data?.imdb_id;

      console.log("imdb ID is: ....." + imdbIDNumber);

      setImdbID(imdbIDNumber);
    } catch (error) {
      console.error(error);
    }

    console.log("Image click");
    console.log(5000000000, movieId);
  };

  const posterpath = (path) => `https://image.tmdb.org/t/p/original/${path}`;

  return (
    <div data-testid="movie-card">
      <Link href={"/movies/" + props?.id}>
        <Image
          width={250}
          height={375}
          onClick={(event) => handleClick(event, props?.id)}
          style={{ width: "250px", height: "490" }}
          alt="movie poster"
          src={posterpath(props?.poster_path)}
          data-testid="movie-poster"
        />
      </Link>
      <div
        style={{
          // sborder: "1px solid red",
          width: "250px",
          marginBottom: "32px",
          marginTop: "8px",
        }}
      >
        <Text
          data-testid=" movie-release-date"
          type="secondary"
          style={{ fontSize: "12px" }}
        >
          USA, {props?.release_date?.substring(0, 4)}
        </Text>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "700",
            marginTop: "8px",
            marginBottom: "8px",
          }}
          data-testid="movie-title"
        >
          {truncate(props?.original_title)}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            {/* <img
                            alt="imdb logo"
                            src="/imdb.png"
                            style={{ width: "17px", height: "17px" }}
                          /> */}
            <img
              alt="imdb tag"
              src="/imdbsvg.svg"
              style={{ marginRight: "8px" }}
            />
            86/100
          </div>
          <div style={{ display: "flex" }}>
            {" "}
            <img
              alt="imdb tag"
              src="/tomato.svg"
              style={{ marginRight: "8px" }}
            />
            97%
          </div>
        </div>
        {/* <Text style={{ fontSize: "12px", fontWeight: "700" }} type="secondary">
          GenreIds: {props.genre_ids}
        </Text> */}
      </div>
    </div>
  );
};

export default CardComponent;
