import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout, Space, Tag } from "antd";
import {
  HomeOutlined,
  VideoCameraOutlined,
  PlaySquareOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import axios from "axios";
import styles from "./Moviedetails.module.css";

const Details = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [idState, setIdState] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  console.log(router?.query?.id);

  useEffect(() => {
    const api_key = "a88164522365d78d10f28d20e5bcd4d5";
    const BASE_URL = "https://api.themoviedb.org/3/";
    const api = axios.create({ baseURL: BASE_URL });

    const fetchMovieDetails = async () => {
      //   const URL = `movie/${id}`;
      try {
        const response = await api.get(`movie/${id}`, {
          params: { api_key },
        });

        // const response = await api.get(`find/${id}`, {
        //   params: { api_key, external_source: "imdb_id" },
        // });

        console.log(response?.data);

        console.log(id);

        if (response) {
          setMovieDetails(response?.data);
        }

        console.log(movieDetails);
      } catch (error) {
        // router.replace("/404");
        console.error(222, error);
      }
    };

    if (id !== undefined) {
      fetchMovieDetails();
    }
  }, [id]);

  const checkRating = (rating) => {
    if (rating === false) {
      return "PG-13";
    }
    return "18+";
  };
  const posterpath = (path) => `https://image.tmdb.org/t/p/original/${path}`;
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ color: "black", fontSize: 24, fontWeight: 700 }}>
            <img
              style={{ width: 50, height: 50 }}
              alt="movie box logo"
              src="/tv.svg"
            />
            MovieBox
          </div>
        </div>
        <ul>
          <li style={{ marginBottom: "16px" }}>
            <a href="/">
              <i class="fas fa-home"></i>
              <HomeOutlined style={{ marginRight: 8 }} />
              Home
            </a>
          </li>
          <li style={{ marginBottom: "16px" }}>
            <a href="#">
              <i class="fas fa-user"></i>{" "}
              <VideoCameraOutlined style={{ marginRight: 8 }} />
              Movies
            </a>
          </li>
          <li style={{ marginBottom: "16px" }}>
            <a href="#">
              <i class="fas fa-address-card"></i>
              <PlaySquareOutlined style={{ marginRight: 8 }} />
              Tv Series
            </a>
          </li>
          <li style={{ marginBottom: "16px" }}>
            <a href="#">
              <i class="fas fa-project-diagram"></i>{" "}
              <CalendarOutlined style={{ marginRight: 8 }} />
              Upcoming
            </a>
          </li>
        </ul>
        <div className={styles.social_media}>
          <a href="#">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div class="main_content" style={{ marginLeft: "260px" }}>
        <div class="info">
          <div className={styles.trailerScreen}>
            <img
              src={posterpath(movieDetails?.backdrop_path)}
              alt="trailer preview"
              style={{
                width: "1198px",
                height: "449px",
                borderRadius: "10px",
              }}
            />
          </div>
          <div>
            <div
              style={{
                display: "inline-block",
                fontSize: "23px",
                fontWeight: "400",
              }}
            >
              <div>
                <span data-testid="movie-title">{movieDetails?.title}</span> •{" "}
                <span data-testid="movie-release-date">
                  {movieDetails?.release_date?.slice(0, 4)}
                </span>{" "}
                •{" "}
                <span data-testid="movie-rating">
                  {checkRating(movieDetails?.adult)}
                </span>{" "}
                •{" "}
                <span data-testid="movie-runtime">{movieDetails?.runtime}</span>
                mins
                {/* <Tag
                  style={{
                    minWidth: "49px",
                    minHeight: "23px",
                    color: "#B91C1C",
                    marginLeft: 16,
                  }}
                >
                  {movieDetails?.genres?.name}
                </Tag>
                <Tag
                  style={{
                    minWidth: "49px",
                    minHeight: "23px",
                    color: "#B91C1C",
                  }}
                >
                  {movieDetails?.genres?.name}
                </Tag> */}
              </div>
            </div>
            <div className={styles.leftDiv}>
              {/* Description here */}
              <div
                data-testid="movie-overview"
                style={{
                  maxWidth: "774px",
                  textJustify: "auto",
                  fontSize: "20px",
                  fontWeight: "400",
                  marginTop: 16,
                  marginBottom: 16,
                }}
              >
                {movieDetails?.overview}
              </div>
              <div>
                Director: Test
                <br />
                Writers: Testing again
                <br />
                Stars: gsuahd
              </div>
            </div>
            <div className={styles.rightDiv}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
