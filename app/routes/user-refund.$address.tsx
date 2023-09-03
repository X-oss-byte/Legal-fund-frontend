import { json, type LoaderArgs } from "@vercel/remix";
import proofs from "~/lib/proofs.json";

interface IProofs {
  [address: string]: { proof: Array<string>; amount: string };
}

export async function loader({ params }: LoaderArgs) {
  const { address } = params;

  if (!address) {
    throw new Response("Not Found", { status: 404 });
  }

  const refundProofs: any = address ? (proofs as IProofs)[address] ?? {} : {};

  return json(refundProofs);
}
