import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDomain = createAsyncThunk(
  "/post/getdomain",

  async ({ domainName }) => {
    try {
      const response = await fetch(
        `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_CavE4QEKbr7udKwSyOTcWcVtKWDPB&domainName=${domainName}&outputFormat=JSON`

        // `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_CavE4QEKbr7udKwSyOTcWcVtKWDPB&domainName=${domainName}&outputFormat=JSON`

        // `https://user.whoisxmlapi.com/user-service/api-key/generate?currentApiKey=at_cdQsr3ThqTaHemWFIAyy79B3SiYNa&domainName=${domainName}&outputFormat=JSON`
      );
      const data = await response.json();
      const creationDate = new Date(data.WhoisRecord.createdDateNormalized);
      const ageInMs = Date.now() - creationDate.getTime();
      const ageInYears = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365));

      const remainingMs = ageInMs - ageInYears * (1000 * 60 * 60 * 24 * 365);
      const ageInMonths = Math.floor(remainingMs / (1000 * 60 * 60 * 24 * 30)); // Approximate months
      const ageInDays = Math.floor(
        (remainingMs % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
      ); // Approximate days

      // return { years: ageInYears, months: ageInMonths, days: ageInDays };

      // Replace 'YOUR_API_KEY' with your actual API key
      const apiKey = "AIzaSyC2n8EYSFk_HRcp3lhfigL0GPzMKat-qy4";

      // Construct the URL
      // const apiUrl = `https://customsearch.googleapis.com/customsearch/v1?cx=21c57b79201f94a9c&q=banana&key=AIzaSyBf-OZejv_zZBeGRFmGO15b97iD1DMIiJ0`;

      const apiUrl = `https://customsearch.googleapis.com/customsearch/v1?cx=21c57b79201f94a9c&q=${domainName}&key=AIzaSyBf-OZejv_zZBeGRFmGO15b97iD1DMIiJ0`;

      // Define the headers
      const headers = {
        Accept: "application/json",
      };

      // Send the GET request using fetch
      const infoUrl = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
      });
      const dataUrl = await infoUrl.json();
      // return infoUrl.json();

      return {
        dataUrl,
        years: ageInYears,
        months: ageInMonths,
        days: ageInDays,
      };
    } catch (error) {
      console.error(error);
    }
  }
);
