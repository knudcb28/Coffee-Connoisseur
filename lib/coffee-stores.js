
export const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOUR_SQUARE_API_KEY,
    },
  };

  const response = await fetch(getUrlForCoffeeStores("43.054092921961015,-89.53095509861257", "coffee", "6"), options);
  const data = await response.json();
  return data.results;
};
