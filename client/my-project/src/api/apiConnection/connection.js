import axios from "axios";

export const locationData = async (values) => {
  try {
    console.log(values, "06666666666666666333333333333");
    const response = await axios.post(
      "http://localhost:3000/api/main/",
      values
    );
    // Log the response data received from the server
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};
