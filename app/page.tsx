import React from "react";
import classes from "./Home.module.css";
import Calendar from "./components/Calendar";
import Providers from "./components/Providers";


const Home = async () => {
  return (
    <main className={classes.container}>
      <div className={`dp02 ${classes.calendarContainer}`}>
        <Providers>
          <Calendar />
        </Providers>
      </div>
    </main>
  );
};

export default Home;
