import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner";
import Card from "../components/Card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import { useState, useEffect, useContext } from "react";
import useTrackLocation from "../hooks/use-track-location";
import { ACTION_TYPES, StoreContext } from "./_app";


export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  console.log("props", props);

  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  // const [coffeeStores, setCoffeeStores] = useState("");

  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);

  const { coffeeStores, latLong } = state

  console.log({ latLong, locationErrorMsg });

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong);
          console.log({ fetchedCoffeeStores });
          // setCoffeeStores(fetchedCoffeeStores);
          //set coffee stores
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores: fetchedCoffeeStores,
            },
          });
        } catch (error) {
          console.log({ error });
          setCoffeeStoresError(error.message);
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong]);

  const handleOnBannerBtnClick = () => {
    console.log("hi banner button");
    handleTrackLocation();
  };

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          className={styles.Banner}
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />

        {locationErrorMsg && !isFindingLocation ? (
          <p>Something went wrong: {locationErrorMsg}</p>
        ) : null}
        {coffeeStoresError ? (
          <p>Something went wrong: {coffeeStoresError}</p>
        ) : null}

        {coffeeStores.length > 0 ? (
          <div>
            <h2 className={styles.heading2}>Cofee Stores Near Me</h2>

            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                    distance={coffeeStore.distance}
                  />
                );
              })}
            </div>
          </div>
        ) : null}

        {props.coffeeStores.length > 0 ? (
          <div>
            <h2 className={styles.heading2}>Chicago Coffee Stores</h2>

            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                    distance={coffeeStore.distance}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </main>
    </>
  );
}
