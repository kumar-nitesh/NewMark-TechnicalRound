import axios from "axios";

const API_URL = "https://localhost:7202/Property?blobSasUrl=https%3A%2F%2Fnmrkpidev.blob.core.windows.net%2Fdev-test%2Fdev-test.json%3Fsp%3Dr%26st%3D2024-10-28T10%3A35%3A48Z%26se%3D2025-10-28T18%3A35%3A48Z%26spr%3Dhttps%26sv%3D2022-11-02%26sr%3Db%26sig%3DbdeoPWtefikVgUGFCUs4ihsl22ZhQGu4%252B4cAfoMwd4k%253D";

export const fetchProperties = async (setLoading) => {
  try {
    if (setLoading) setLoading(true); // Start loading

    console.log("Fetching data from API...");
    const response = await axios.get(API_URL);
    console.log("API Response:", response.data);

    if (setLoading) setLoading(false); // Stop loading
    return response.data;
  } catch (error) {
    if (setLoading) setLoading(false); // Stop loading on error
    console.error("API Fetch Error:", error.message);
    throw new Error("Unable to fetch properties.");
  }
};
