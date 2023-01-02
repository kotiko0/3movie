async function getMovieCountry(title) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=abc2446&t=${title}`
  );
  const data = await response.json();
  const countries = data.Country;
  const commaIndex = countries.indexOf(",");

  let country;
  // ეს კოდის ნაწილი აბრუნებს პირველ ქვეყანას ქვეყნების სტრინგში.
  if (commaIndex !== -1) {
    country = countries.substring(0, commaIndex);
  } else {
    country = countries;
  }
  return country;
}
async function getMovieLength(title) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=abc2446&t=${title}`
  );
  const data = await response.json();
  return data.Runtime.split(" ")[0];
}
async function getCountryPopulation(country) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${country}`
  );
  const data = await response.json();
  return data[2].population;
}

async function getdata() {
  const movie1 = document.querySelector(".input1").value;
  const movie2 = document.querySelector(".input2").value;
  const movie3 = document.querySelector(".input3").value;
  let lengthSum = 0;
  let populationSum = 0;
  await getMovieCountry(movie1)
    .then((country) => getCountryPopulation(country))
    .then((population) => {
      populationSum += population;
      return getMovieLength(movie1);
    })
    .then((length) => {
      lengthSum += parseInt(length);
      return getMovieCountry(movie2);
    })
    .then((country) => getCountryPopulation(country))
    .then((population) => {
      populationSum += population;
      return getMovieLength(movie2);
    })
    .then((length) => {
      lengthSum += parseInt(length);
      return getMovieCountry(movie3);
    });
  document.querySelector(
    ".output"
  ).innerHTML = `The length of all the movies combined in minutes is ${lengthSum}
    minutes and Sum of population of all the countries in which the movies where made is ${populationSum}`;
}
