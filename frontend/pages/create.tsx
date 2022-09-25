import { Fragment } from "react";
import { CreateForm } from "@components";
import type { NextPage } from "next";
import { default as NextHead } from "next/head";

const Create: NextPage = () => {
  return (
    <Fragment>
      <NextHead>
        <title>Create | Straps - A decentralized supply chain</title>
      </NextHead>
      <CreateForm />
    </Fragment>
  );
};

export default Create;
