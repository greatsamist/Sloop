import { Fragment } from "react";
import {
  Accountability,
  HowItWorksSection,
  IndexHero,
  WellTailored,
} from "@components";
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
