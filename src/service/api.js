import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchPhotosByQuery = async (query, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: "0v7z9MVlCF9O56BnFGGCCPPuX76iUfaM1RdqExSg7TU",
      query,
      per_page: 15,
      page,
    },
  });
  return response.data.results;
};
export default fetchPhotosByQuery;
