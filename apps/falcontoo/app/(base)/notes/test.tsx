"use client";
import { draco } from "@falcon/trpc/node/client";
import { api } from "@falcon/trpc/next/client";

export const DracoTest = () => {
  const { data, isError, error } = draco.test.useQuery();
  console.log(isError);
  console.log(error);
  console.log(data);
  if (data) {
    return <div>{data.name}</div>;
  }
  return <div>DracoTest</div>;
};
