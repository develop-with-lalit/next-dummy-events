import Image from "next/image";
import React from "react";

import classes from "./event-item.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

const EventItem = ({ event }) => {
  //   return <li>{JSON.stringify(event.id)}</li>;
  const { id, title, description, location, date, image, isFeatured } = event;
  return (
    <li className={classes.item}>
      <img src={image} alt={title} width="50" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{date}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{location?.replace(",", "\n")}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore More</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
