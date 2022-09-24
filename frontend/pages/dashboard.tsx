import { Fragment } from "react";
import { DashboardProduct, InventoryForm } from "@components";
import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <Fragment>
      <DashboardProduct />
      <InventoryForm />
    </Fragment>
  );
};

export default Dashboard;
