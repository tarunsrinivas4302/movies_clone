import axios from "axios";

const api = (props) => {
  const { endpoint, method, data, headers } = props;

  const axiosInstance = axios.create({
    method: "GET",
    baseURL: import.meta.env.VITE_MOVIE_DB_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_ACCESS_TOKEN}`,
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance({
    url: endpoint,
    method: method,
    data: data || {},
    headers: headers,
  });
};

const makeRequest = async (req) => {
  const { endpoint, method, data, headers , params } = req;
  try {
    const response = await api({
      endpoint,
      method,
      data,
      params,
      headers,
    });
    return Promise.resolve(response);
  } catch (e) {
    console.log(e);
    Promise.reject(e.message);
  }
};

export default makeRequest;
