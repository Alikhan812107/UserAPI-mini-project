const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3005;

app.use(express.static("public"));


app.get("/api/profile", async (req, res) => {
  try {

// random user
    const userRes = await axios.get("https://randomuser.me/api/");
    const user = userRes.data.results[0];

    const cleanedUser = {
      firstName: user.name.first,
      lastName: user.name.last,
      gender: user.gender,
      age: user.dob.age,
      dob: user.dob.date,
      picture: user.picture.large,
      city: user.location.city,
      country: user.location.country,
      address: `${user.location.street.name} ${user.location.street.number}`
    };

// country info
    const countryRes = await axios.get(
      `https://restcountries.com/v3.1/name/${cleanedUser.country}`
    );

    const country = countryRes.data[0];
    const currencyCode = country.currencies
      ? Object.keys(country.currencies)[0]
      : null;

    const cleanedCountry = {
      name: country.name.common,
      capital: country.capital ? country.capital[0] : "N/A",
      languages: country.languages
        ? Object.values(country.languages)
        : [],
      currency: currencyCode || "N/A",
      flag: country.flags.png
    };

   // Exchange rates

let exchangeRates = null;

if (currencyCode) {
  try {
    const exchangeRes = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${currencyCode}`
    );

    exchangeRates = {
      base: currencyCode,
      USD: exchangeRes.data.conversion_rates.USD,
      KZT: exchangeRes.data.conversion_rates.KZT
    };
  } catch (error) {
    console.log("Exchange API error");
    exchangeRates = null;
  }
}


   // News API
    let news = [];

    try {
      const newsRes = await axios.get(
        "https://newsapi.org/v2/top-headlines",
        {
          params: {
            q: cleanedUser.country,
            language: "en",
            pageSize: 5,
            apiKey: process.env.NEWS_API_KEY
          }
        }
      );

      news = newsRes.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        image: article.urlToImage,
        url: article.url
      }));
    } catch (error) {
      console.log("News API error:", error.response?.status);
      news = [];
    }


   
    //Final response

    res.json({
      user: cleanedUser,
      country: cleanedCountry,
      exchangeRates,
      news
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to load profile data" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
