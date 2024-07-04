import { useEffect, useState } from "react";
import Suggestion from "./Suggestion"
import makeRequest from "../../utils/axios";

// eslint-disable-next-line react/prop-types
const SuggestionCall = ({ title = "", endpoint = "", showButtons = false, showNumbers = false , handleClick = () =>{}}) => {
    const [data, setData] = useState([]);
    const [active, setActive] = useState("day");
    let buttonData = [];
    if (showButtons == "true") {
        buttonData.push({
            name: "Day",
            handleClick: () => {
                setActive("day");
                handleCallback("day");
            },
            active: active,
        }, {
            name: "Week",
            active: active,

            handleClick: () => {
                setActive("week");
                handleCallback("week");
            }

        }, {
            name: "Month",
            handleClick: () => {
                setActive("week");
                handleCallback("week");
            },
            active: active,

        })
    }
    const handleCallback = (value) => {
        console.log("value: " + value);
        handleClick(value);
    }
    const fetchSuggestions = async () => {
        try {
            const response = await makeRequest({
                endpoint: endpoint,
                method: 'GET',
            });
            setData(response?.results);

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchSuggestions()
    }, [active])

    return (
        <div className="mt-12">
            <Suggestion data={data} title={title} params={{
                showButtons: showButtons,
                buttonData: buttonData,
                showNumbers: showNumbers,
            }} />
        </div>
    )
}

export default SuggestionCall
