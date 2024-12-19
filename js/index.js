let search = document.getElementById("search");
let firstOne = document.querySelector("#fistOne");
let secondOne = document.querySelector("#secondONe");
let thirdOne = document.querySelector("#thirdOne");
let loading = document.getElementById("loading");
async function searchRegion(a = "cairo") {
  loading.classList.remove("d-none");
  let forCast = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=cfb39f2407924993aa2221145241712&q=${a}&days=3`
  );
  loading.classList.add("d-none");
  if (forCast.ok) {
    let forcast_new = await forCast.json();
    display(forcast_new);
    console.log(forcast_new);
  }
}

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
search.addEventListener("keyup", () => {
  searchRegion(search.value);
});
searchRegion();

function display(forcast_new) {
  let currentDate = new Date();
  // Get the current day
  let currentDay = days[currentDate.getDay()];
  let nextDay = days[(currentDate.getDay() + 1) % 7];
  let secondDay = days[(currentDate.getDay() + 2) % 7];

  let firstCartona = "";
  let secondCartona = "";
  let thirdCartona = "";
  firstCartona = `<div class="my-table  text-white overflow-hidden">
                      <div
                          class="table-head text-white py-2 px-2 text-opacity-50 d-flex justify-content-between">
                          <div>${currentDay}</div>
                          <div>${
                            currentDate.getDate() +
                            monthNames[currentDate.getMonth()]
                          }</div>
                      </div>
                      <div class="rest-table py-3 px-3">
                          <span>${forcast_new.location.country}</span>
                          <div class="degree">
                              <div class="num display-2 fw-bold text-center">${
                                forcast_new.current.temp_c
                              }<sup>o</sup>C</div>
                              <div class="forecast-icon">
                                  <img src="${
                                    forcast_new.current.condition.icon
                                  }"
                                      alt="${currentDay}" width="90">
                                      <div class="ps-3 pb-2 text-info">${
                                        forcast_new.current.condition.text
                                      }</div>
                              </div>
                              
                          </div>
                          
                          <span class="ps-3"><i class="fa-solid fa-umbrella me-2"></i>20%</span>
                          <span class="ps-3"><i class="fa-solid fa-wind  me-2"></i>18km/h</span>
                          <span class="ps-3"><i class="fa-regular fa-compass me-2"></i>East</span>
                      </div>
                  </div>`;

  secondCartona = `<div class="my-table  text-white ">
              <div class="table-head-2 text-white py-2 px-2 text-center text-opacity-50 ">
                  <div>${nextDay}</div>
              </div>
              <div class="rest-table-2 py-3 px-3 ">
                  <div class="degree text-center">
                      <div class="forecast-icon ">
                          <img src="${forcast_new.forecast.forecastday[1].day.condition.icon}"
                              alt="" width="90">
                      </div>
                      <div class="">${forcast_new.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
                      <small>${forcast_new.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
                      <div class="text-info">${forcast_new.forecast.forecastday[1].day.condition.text}</div>
                  </div>
              </div>
          </div>`;

  thirdCartona = `
                <div class="my-table  text-white ">
                    <div class="table-head-3 text-white py-2 px-2 text-center text-opacity-50 ">
                        <div>${secondDay}</div>
                    </div>
                    <div class="rest-table-3 py-3 px-3">
                        <div class="degree text-center">
                            <div class="forecast-icon ">
                                <img src="${forcast_new.forecast.forecastday[2].day.condition.icon}"
                                    alt="" width="90">
                            </div>
                            <div class="">${forcast_new.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
                            <small>${forcast_new.forecast.forecastday[2].day.mintemp_c}
                                <sup>o</sup></small>
                            <div class="text-info">${forcast_new.forecast.forecastday[2].day.condition.text}</div>
                        </div>
                    </div>
                </div>
            `;
  firstOne.innerHTML = firstCartona;
  secondOne.innerHTML = secondCartona;
  thirdOne.innerHTML = thirdCartona;
}
