import { Fragment } from "react";
import type { NextPage } from "next";
import { HowItWorksSection, IndexHero } from "@components";

const Home: NextPage = () => {
  return (
    <Fragment>
      <IndexHero />
      <HowItWorksSection />
    </Fragment>
  );
};

export default Home;
