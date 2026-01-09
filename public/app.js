const btn = document.getElementById("loadBtn");
const content = document.getElementById("content");

btn.addEventListener("click", async () => {
  content.innerHTML = "Loading...";

  try {
    const res = await fetch("/api/profile");
    const data = await res.json();

    content.innerHTML = `
      <div class="card">
        <img src="${data.user.picture}" />
        <h2>${data.user.firstName} ${data.user.lastName}</h2>
        <p><b>Gender:</b> ${data.user.gender}</p>
        <p><b>Age:</b> ${data.user.age}</p>
        <p><b>City:</b> ${data.user.city}</p>
        <p><b>Country:</b> ${data.user.country}</p>
        <p><b>Address:</b> ${data.user.address}</p>
      </div>

      <div class="card">
        <h3>Country Info</h3>
        <img src="${data.country.flag}" width="80" />
        <p><b>Capital:</b> ${data.country.capital}</p>
        <p><b>Languages:</b> ${data.country.languages.join(", ")}</p>
        <p><b>Currency:</b> ${data.country.currency}</p>
      </div>

      ${
        data.exchangeRates
          ? `
            <div class="card">
              <h3>Exchange Rates</h3>
              <p>1 ${data.exchangeRates.base} = ${data.exchangeRates.USD} USD</p>
              <p>1 ${data.exchangeRates.base} = ${data.exchangeRates.KZT} KZT</p>
            </div>
          `
          : `
            <div class="card">
              <h3>Exchange Rates</h3>
              <p>Exchange rate data unavailable.</p>
            </div>
          `
      }

      <div class="card">
        <h3>News</h3>
        ${
          data.news && data.news.length > 0
            ? data.news.map(n => `
                <div class="news">
                  <h4>${n.title}</h4>
                  ${n.image ? `<img src="${n.image}" />` : ""}
                  <p>${n.description || ""}</p>
                  <a href="${n.url}" target="_blank">Read more</a>
                </div>
              `).join("")
            : "<p>No news available for this country.</p>"
        }
      </div>
    `;
  } catch (error) {
    console.error(error);
    content.innerHTML = "<p>Failed to load data. Please try again.</p>";
  }
});
