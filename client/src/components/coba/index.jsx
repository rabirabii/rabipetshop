import React from "react";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import EventCard from "../EventCard";

const Test = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>
        {!isLoading && (
          <div className="w-full grid">
            {allEvents.length !== 0 && (
              <EventCard data={allEvents && allEvents[0]} />
            )}
            <h4>{allEvents?.length === 0 && "No Events have!"}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
