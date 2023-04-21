import React from "react";
import Link from "next/link";
import classes from "./Home.module.css";
import moment from "moment";
import Calendar from "./components/Calendar";
import Providers from "./components/Provider/Provider";


const Home = async () => {
  return (
    <main className={classes.container}>
      <h1>Welcome To Reminder App</h1>
      <div className={`dp02 ${classes.calendarContainer}`}>
        <Providers>
          <Calendar />
        </Providers>
      </div>
    </main>
  );
};

export default Home;
