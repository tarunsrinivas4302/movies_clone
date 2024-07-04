import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Suggestion = ({ data = [], title = "", params = {} }) => {
  let mainData = [];

  if (!data || data.length == 0) {
    return <h4 className="capitalize text-3xl font-bold text-red-600">No data Recieved ...</h4>
  }

  mainData.push(data.slice(0, 9))

  return (
    <div className={`w-96 flex flex-col `}>
      <div className="flex ml-4">
        <h3 className="title uppercase text-2xl mb-4"> <FaPlay className="inline-block text-2xl ml-2 mr-1 text-zinc-900 px-2  py-2 rounded-sm bg-cyan-500" />   {title}</h3>
        {
          params.showButtons && params.buttonData.length > 0 && params.buttonData.map((item, index) => {
            return (
              <Link key={index} to={item.url || ''} className="">
                <button key={index} onClick={() => item.handleClick()} className={` first:ml-3   border px-2.5 text-md font-semibold capitalize py-1.5 rounded-2xl mr-3 ${item.active.toLowerCase().trim() === item.name.toLowerCase() ? "border-cyan-500 text-cyan-400" : "border-zinc-400"}`}>
                  {item.name}
                </button>
              </Link>
            )
          })
        }
      </div>
      {mainData[0].map((item, index) => {
        const date =  item.release_date || item.first_air_date;
        const modifieddate  = date.toString().slice(0 , 4)
        return (
          <div key={index} className="py-1  hover:border-0 hover:shadow-none mx-3 relative suggestion-item">
            <Link to={`/${item.type}/${item.id}`} className="border-2 rounded-lg  bg-zinc-800 flex text-lg hover:bg-cyan-400 w-96">
              {/* Image */}
              <div className="w-1/5">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`} className="w-9/12 h-16 object-fill rounded-md" />
              </div>

              {/* Description */}
              <div className="desc ">
                <p className="capitalize text-sm text-zinc-400">{item.media_type}<span className="mx-2">/</span> {item.vote_average.toString().slice(0, 3)} <span className="mx-2">/</span> {modifieddate}</p>
                <p className="">{item.name || item.original_title}</p>
              </div>

            </Link>
            {params.showNumbers &&
              <div className="absolute -top-1 -left-2 px-3 py-1 border-2 rounded-full bg-zinc-900 suggestion-number text-cyan-400  font-bold">
                {index + 1}
              </div>
            }
          </div>
        );
      })}
    </div>
  );
}

export default Suggestion;