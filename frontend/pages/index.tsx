import { Fragment } from "react";
import type { NextPage } from "next";
import { HowItWorksSection, IndexHero, WellTailored } from "@components";

const Home: NextPage = () => {
  return (
    <Fragment>
      <IndexHero />
      <HowItWorksSection />
      <WellTailored />
    </Fragment>
  );
};

export default Home;
