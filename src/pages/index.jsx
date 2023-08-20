import Image from "next/image";
import { Outfit } from "next/font/google";
import BotaoGerador from "../components/BotaoGerador";
import Filme from "@/components/Filme";
import { useEffect, useState } from "react";

const outfit = Outfit({ subsets: ["latin"] });

const axios = require("axios");

const moviesURL = "https://api.themoviedb.org/3";

function select3Videos(movieList) {
  const videos = new Set();

  while (videos.size < 3) {
    const randomNumber = Math.floor(Math.random() * movieList.length);
    videos.add(movieList[randomNumber].id);
  }

  return Array.from(videos);
}

async function getMoreInfo(id) {
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWMyMWEyM2RiZWQzZmM3OTJkN2ZlM2ZjZDZmNDE0MCIsInN1YiI6IjY0ZDE2YTgzOTQ1ZDM2MDBhY2EwMzI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iUMf9iVxje3WDiDYi76Hx1tQg-KWJb6VZcZac9ORPvA",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

function minutesToHour(minutes) {
  const date = new Date(null);
  date.setMinutes(minutes);
  return date.toISOString().slice(11, 19);
}

export default function Home() {
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [isDataFetch, setIsDataFetch] = useState(false);

  const getMovies = async (url) => {
    setIsDataFetch(false);

    try {
      const res = await axios.get(url, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWMyMWEyM2RiZWQzZmM3OTJkN2ZlM2ZjZDZmNDE0MCIsInN1YiI6IjY0ZDE2YTgzOTQ1ZDM2MDBhY2EwMzI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iUMf9iVxje3WDiDYi76Hx1tQg-KWJb6VZcZac9ORPvA",
        },
      });

      const movieList = res.data.results;
      const chosenMovies = select3Videos(movieList);

      const moviePromises = chosenMovies.map(async (movie) => {
        const movieInfo = await getMoreInfo(movie);
        return {
          id: movieInfo.id,
          nome: movieInfo.title,
          rate: Number(movieInfo.vote_average).toFixed(1),
          duracao: minutesToHour(movieInfo.runtime),
          lancamento: movieInfo.release_date.slice(0, 4),
          poster: movieInfo.poster_path,
        };
      });

      const resolvedMovies = await Promise.all(moviePromises);
      setMoviesToRender(resolvedMovies);
      setIsDataFetch(true);
    } catch (error) {
      console.log(error);
    }
  };

  const popularMovies = `${moviesURL}/trending/movie/week`;

  useEffect(() => {
    getMovies(popularMovies);
  }, []);

  return (
    <div
      className={`min-h-screen p-10 flex items-center justify-center bg-gradient-to-br from-destaque-roxo to-destaque-rosa ${outfit.className}`}
    >
      <div
        className="py-16 px-10 flex flex-col gap-9 bg-base-cinza-dark w-full rounded-2xl border-4 border-purple-500
      lg:w-3/4 lg:px-24"
      >
        <header
          className="w-full flex flex-col gap-4 justify-between items-center
        sm:flex-row"
        >
          <img
            alt="Logo do Site"
            src="/Logo.svg"
            className="min-w-[45px] max-w-[85px]"
          ></img>
          <BotaoGerador
            loading={isDataFetch}
            newRecomendation={() => getMovies(popularMovies)}
          />
        </header>
        <main className="flex flex-col md:flex-row w-full justify-center items-center p-2 gap-9">
          {moviesToRender.map((movie) => {
            return (
              <Filme
                key={movie.id}
                nome={movie.nome}
                id={movie.id}
                rate={movie.rate}
                duracao={movie.duracao}
                lancamento={movie.lancamento}
                poster={movie.poster}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
