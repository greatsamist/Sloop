import { Fragment } from "react";
import { DashboardProduct, InventoryForm } from "@components";
import type { NextPage } from "next";
import { default as NextHead } from "next/head";

const Dashboard: NextPage = () => {
  return (
    <Fragment>
      <NextHead>
        <title>Dashboard | Straps - A decentralized supply chain</title>
      </NextHead>
      <DashboardProduct />
      <InventoryForm />
    </Fragment>
  );
};

export default Dashboard;
