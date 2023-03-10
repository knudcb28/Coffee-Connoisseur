/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import styles from "../styles/Card.module.css";
import Image from "next/image";

const Card = (props) => {

  // function to convert meters into miles
  function getMiles(meters) {
    const number = meters * 0.000621371192;
    return number.toFixed(2);
  }

  return (
    <div className={styles.container} key={props.fsq_id}>
      <Link className={styles.cardLink} href={props.href}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{props.name}</h2>
          <p>{props.address}</p>
          <p>{getMiles(props.distance)} miles away</p>
          <p>{props.category}</p>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            src={props.imgUrl}
            width={250}
            height={150}
            alt={props.name}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card;
