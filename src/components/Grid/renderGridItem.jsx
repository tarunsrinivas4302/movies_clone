import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RenderGridItem = ({ data = {}, type = "" }) => {

  const release = data.release_date || data.first_air_date;
  const date = release.slice(0, 4)

  const day = parseInt(release.slice(8, 10), 10);
  const month = parseInt(release.slice(5, 7), 10);
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  let video_type;
  if (currentMonth === month && currentDay - day <= 20) {
    video_type = "CAM";
  } else {
    video_type = "HD";
  }
  return (
    <div className={`w-full `}>
      <div className="poster relative">
        <Link to={`/${type}/${data.name || data.original_title}/${data.id}`} className="poster-img relative">
          <img src={`${import.meta.env.VITE_MOVIE_DB_BACK_PATH_IMAGE_URL}/${data.poster_path || data.backdrop_path}`} className="  rounded-lg  w-full h-52" />
          <p className="absolute top-2 left-0 font-bold  text-zinc-950 bg-cyan-600 capitalize text-xs px-0.5  ">{video_type}</p>
          <FaPlay className={`poster-play`} />
        </Link>
      </div>
      <Link to={`/${type}/${data.name || data.original_title}/${data.id}`} className="">

        <div className="flex justify-between items-center hover:text-cyan-500">
          <p className="text-sm mx-2  text-zinc-400">{date} </p>
          <p className="border-1 px-1  mx-2 text-sm uppercase text-slate-100 rounded-lg border-zinc-500">{type}</p>
          <p className="  capitalize max-w-1/3 mx-2  truncate">{data.vote_average.toString().slice(0, 3)}</p>
        </div>
        <p className="text-md text-slate-50 text-center">{data.title || data.name}</p>
      </Link>

    </div>
  )
}

export default RenderGridItem
