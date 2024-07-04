import RenderGridItem from "./renderGridItem";
import { FaPlay } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Grid = ({ heading = "Recomended", cols = 6, params = {}, data = [], limit = cols * 5 }) => {
    if (params.isLoading) return <h1>Loading ....</h1>
    return (
        <div className="py-3">
            <h1 className="text-white text-2xl my-2 uppercase font-bold inline-block mr-5" ><FaPlay className="inline-block text-2xl ml-4 mr-3 text-zinc-900 px-2  py-2 rounded-sm bg-cyan-500" />{heading}</h1>

            {
                params.showButton && params.buttons && params.buttons.map((item, index) => {
                    return (
                        <button key={index} onClick={() => item.handleClick()} className={`border px-2.5 text-md font-semibold capitalize py-1.5 rounded-2xl mr-3 ${item.active.toLowerCase().trim() === item.label.toLowerCase() ? "border-cyan-500 text-cyan-400" : "border-zinc-400"}`}>
                            {item.label}
                        </button>
                    )
                })
            }

            {/* Render Data If Any */}
            {data && data.length > 0 &&
                <div className={`grid grid-cols-6 relative sm:grid-cols-3   my-4 mx-2 w-full  gap-y-2.5 gap-x-2 md:grid-cols-4 lg:grid-cols-7 md:w-full max-sm:grid-cols-2 max-sm:gap-y-1 max-w-xs:grid-cols-1 max-sm:gap-x-0.5   max-sm:w-full`}>
                    {data.slice(0, limit).map((item) => (
                        <RenderGridItem data={item} key={item.id} type={params.type} />
                    ))}
                </div>
            }
        </div>
    )
}

export default Grid
