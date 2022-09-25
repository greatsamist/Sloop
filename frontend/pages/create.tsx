import { Fragment } from "react";
import { CreateForm } from "@components";
import type { TransactionReceipt } from "@ethersproject/providers";
import type { NextPage } from "next";
import { default as NextHead } from "next/head";

const Create: NextPage = () => {
  const onCreateError = async (error: Error) => {
    console.log("CreateError:", error);
  };
  const onCreateSuccess = async (data: TransactionReceipt) => {
    console.log("CreateError:", data);
  };

  return (
    <Fragment>
      <NextHead>
        <title>Create | Straps - A decentralized supply chain</title>
      </NextHead>
      <CreateForm
        onError={(error: Error) => onCreateError(error)}
        onSuccess={(data: TransactionReceipt) => onCreateSuccess(data)}
      />
    </Fragment>
  );
};

export default Create;
