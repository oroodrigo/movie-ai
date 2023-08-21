import { Clock, CalendarBlank, Star } from "@phosphor-icons/react";

const axios = require("axios");

export default function Filme({ nome, rate, duracao, lancamento, poster, id }) {
  const watchTrailer = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos`;

    try {
      const res = await axios.get(url, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWMyMWEyM2RiZWQzZmM3OTJkN2ZlM2ZjZDZmNDE0MCIsInN1YiI6IjY0ZDE2YTgzOTQ1ZDM2MDBhY2EwMzI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iUMf9iVxje3WDiDYi76Hx1tQg-KWJb6VZcZac9ORPvA",
        },
      });

      const { results } = res.data;

      const youtubeVideo = results.find((video) => video.type === "Trailer");

      window.open(`https://youtube.com/watch?v=${youtubeVideo.key}`, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col max-w-[400px] gap-3 text-base-branco">
      <section className="flex justify-between ">
        <h1
          className="w-[150px] 
        xs:w-[200px] sm:w-[300px] md:w-[150px] md2:w-[200px] 2xl:w-[250px] truncate"
        >
          {nome}
        </h1>
        <div className="flex gap-1 items-center">
          <Star weight="fill" color="#feea35" />
          <span>{rate}</span>
        </div>
      </section>

      <section>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt="Poster do filme"
          className="mb-3 rounded"
        />
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <Clock />
            <span className="text-base-cinza-light">{duracao}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarBlank />
            <span className="text-base-cinza-light">{lancamento}</span>
          </div>
        </div>
      </section>
      <button
        onClick={() => watchTrailer(id)}
        className="flex items-center w-full justify-center bg-base-cinza px-4 py-2 gap-2 rounded text-base-branco
        hover:bg-base-cinza-medio cursor-pointer"
      >
        <img src="/Play.svg" alt="Icone de play" />
        Assistir Trailer
      </button>
    </div>
  );
}
