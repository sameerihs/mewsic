import { useContext } from "react";
import songContext from "../../contexts/songContext";
import { Icon } from "@iconify/react";
const SingleSongCard = ({ info, playSound }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);

  return (
    <div
      className="flex hover:bg-indigo-400 hover:bg-opacity-20 p-2 rounded-sm"
      onClick={() => {
        setCurrentSong(info);
      }}
    >
      <div
        className="w-12 h-12 bg-cover bg-center"
        style={{
          backgroundImage: `url("${info.thumbnail}")`,
        }}
      ></div>
      <div className="flex h-12 w-full">
        <div className="text-white flex justify-center  flex-col pl-4 w-5/6">
          <div className="cursor-pointer hover:underline">{info.name}</div>
        </div>
        <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
          <div className="px-5">
            <Icon icon="iwwa:delete" width="30" height="30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
