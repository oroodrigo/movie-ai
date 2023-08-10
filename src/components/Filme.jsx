import { Clock, CalendarBlank, Star } from "@phosphor-icons/react";

export default function Filme({ nome, rate, duracao, lancamento, poster, id }) {
  return (
    <div className="flex flex-col gap-3 w-[194px] text-base-branco">
      <section className="flex">
        <h1 className="w-4/5">{nome}</h1>
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
        className="flex items-center w-full justify-center bg-base-cinza px-4 py-2 gap-2 rounded text-base-branco
        hover:bg-base-cinza-medio cursor-pointer"
      >
        <img src="/Play.svg" alt="Icone de play" />
        Assistir Trailer
      </button>
    </div>
  );
}
