import { CircleNotch, Lightning } from "@phosphor-icons/react";

export default function BotaoGerador({ newRecomendation }) {
  return (
    <button
      onClick={newRecomendation}
      className="flex items-center gap-2 bg-gradient-to-r from-destaque-roxo to-destaque-rosa px-4 py-2 rounded text-base-branco group 
    hover:from-purple-500 hover:from-30% hover:to-destaque-rosa transition-colors "
    >
      Nova Recomendação
      <div
        className="w-6 h-6 p-1 justify-center self-end items-center xs:inline-flex bg-white/30 rounded-full cursor-pointer
      group-hover:bg-white/40 transition-colors hidden"
      >
        <Lightning className="w-4 h-4 relative flex-col justify-start items-start flex text-base-branco " />
        {/* <CircleNotch className="w-4 h-4 relative flex-col justify-start items-start flex text-base-branco" /> */}
      </div>
    </button>
  );
}
