import {
  Accountability,
  HowItWorksSection,
  IndexHero,
  WellTailored,
} from "@components";
import { Fragment } from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Fragment>
      <IndexHero />
      <HowItWorksSection />
      <WellTailored />
      <Accountability />
    </Fragment>
  );
};

export default Home;
