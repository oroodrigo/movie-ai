import Image from "next/image";
import { Outfit } from "next/font/google";
import BotaoGerador from "../components/BotaoGerador";
import Filme from "@/components/Filme";
import { useEffect, useState } from "react";

const outfit = Outfit({ subsets: ["latin"] });

const axios = require("axios");

const moviesURL = "https://api.themoviedb.org/3/movie";

function select3Videos(movieList) {
  let videos = [];
  const getRandomNumber = () => {
    return Math.floor(Math.random() * movieList.length);
  };

  while (videos.length <= 2) {
    let randomNumber = getRandomNumber();

    if (videos.includes(randomNumber)) {
      getRandomNumber();
    } else {
      videos.push(movieList[randomNumber].id);
    }
  }
  return [...videos];
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
  const [movieList, setMovieList] = useState(null);

  const getMovies = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWMyMWEyM2RiZWQzZmM3OTJkN2ZlM2ZjZDZmNDE0MCIsInN1YiI6IjY0ZDE2YTgzOTQ1ZDM2MDBhY2EwMzI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iUMf9iVxje3WDiDYi76Hx1tQg-KWJb6VZcZac9ORPvA",
        },
      });

      setMovieList(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const popularMovies = `${moviesURL}/popular`;

    getMovies(popularMovies);
  }, []);

  function start() {
    if (movieList) {
      //selecionar 3 filmes randomicamente
      const chosenMovies = select3Videos(movieList).map(async (movie) => {
        // pegar mais infos
        const movieInfo = await getMoreInfo(movie);
        //organizar os dados
        const props = {
          id: movieInfo.id,
          nome: movieInfo.title,
          rate: Number(movieInfo.vote_average).toFixed(1),
          duracao: minutesToHour(movieInfo.runtime),
          lancamento: movieInfo.release_date.slice(0, 4),
          poster: movieInfo.poster_path,
        };

        return (
          <Filme
            key={props.id}
            nome={props.nome}
            id={props.id}
            rate={props.rate}
            duracao={props.duracao}
            lancamento={props.lancamento}
            poster={props.poster}
          />
        );
      });

      console.log("entrou na promise");
      console.log(Promise.all(chosenMovies));

      return Promise.all(chosenMovies);
    }
    console.log("nao entrou na promise");
  }

  return (
    <div
      className={`h-screen flex items-center justify-center bg-gradient-to-br from-destaque-roxo to-destaque-rosa ${outfit.className}`}
    >
      <div className="py-16 px-24 flex flex-col gap-9 bg-base-cinza-dark w-3/5 rounded-2xl border-4 border-purple-500">
        <header className="w-full flex justify-between">
          <Image
            alt={"Logo do Site"}
            src={"/Logo.svg"}
            width={85}
            height={44}
            priority
          ></Image>
          <BotaoGerador />
        </header>
        <main className="flex w-full gap-9">
          {/* <Filme
            nome="Barbie"
            poster="/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"
            duracao="2:09:12"
            lancamento="2023"
            rate="4.0"
          /> */}

          {/* ^^^ exemplo de como deve ficar ^^^ */}

          {start()}
        </main>
      </div>
    </div>
  );
}
