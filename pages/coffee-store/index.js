async function placeSearch() {
  try {
    const searchParams = new URLSearchParams({
      query: "coffee",
      near: "Middleton, WI",
      open_now: "true",
      sort: "DISTANCE",
    });
    const results = await fetch(
      `https://api.foursquare.com/v3/places/search?${searchParams}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "fsq3yvpUaKKK9Z3RrIUFF1yDuOxE57IEfOvstI1YBjR4v6Y=",
        },
      }
    );
    const data = await results.json();
    console.log(data)
    return data;
  } catch (err) {
    console.error(err);
  }
}

import React from "react";

const Coffee = () => {
  placeSearch();

  return (
    <div>
      <h1>All Coffee</h1>
    </div>
  );
};

export default Coffee;
