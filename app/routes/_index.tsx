import type { V2_MetaFunction } from "@remix-run/node";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import proofs from "~/lib/proofs.json";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { formatEther } from "viem";
import { useHydrated } from "~/hooks/useHydrated";
import { refundABI } from "~/lib/refundABI";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "ZachXBT Refunds" },
    {
      name: "description",
      content: "ZachXBT refunds for legal funds donations",
    },
  ];
};

interface IProofs {
  [address: string]: { proof: Array<string>; amount: string };
}

export default function Index() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const refundProofs: any = address ? (proofs as IProofs)[address] ?? {} : {};

  const hydrated = useHydrated();

  const { config, error } = usePrepareContractWrite({
    address: "0xf33197CA64f66A36a2Ac9D02e3b954455F971761",
    abi: refundABI,
    functionName: "claim",
    args: [refundProofs.proof, refundProofs.amount],
    enabled:
      address && refundProofs.amount && chain && !chain.unsupported
        ? true
        : false,
  });
  const { data, isLoading, error: error2, write } = useContractWrite(config);
  const {
    isLoading: isLoading2,
    error: error3,
    data: txStatus,
  } = useWaitForTransaction({
    hash: data?.hash,
    enabled: data ? true : false,
  });

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "24px",
        paddingTop: "10vh",
      }}
    >
      <h1 style={{ margin: 0, fontWeight: 400, fontSize: "20px" }}>
        Refund from ZachXBT for legal funds donations
      </h1>
      <ConnectButton />
      <h2 style={{ margin: 0, fontWeight: 400, fontSize: "14px" }}>
        {` You Receive: ${
          hydrated && isConnected
            ? refundProofs.amount
              ? formatEther(refundProofs.amount) + "ETH"
              : "0 ETH"
            : ""
        }`}
      </h2>
      {/* <p
        style={{
          display: "flex",
          gap: "4px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span>Proofs:</span>
        {hydrated &&
          refundProofs.proof?.map((proof: string) => (
            <a
              style={{ textDecoration: "underline", wordBreak: "break-all" }}
              key={proof}
              target="_blank"
              href={`https://etherscan.io/tx/${proof}`}
              rel="noreferrer"
            >
              {proof}
            </a>
          ))}
      </p> */}
      <button
        style={{ padding: "8px 32px", fontSize: "16px" }}
        disabled={isLoading || !isLoading2 || !write || !isConnected}
      >
        {isLoading || isLoading2 ? "Confirming..." : "Claim"}
      </button>

      {data && (
        <a
          target="_blank"
          href={`https://etherscan.io/tx/${data.hash}`}
          rel="noreferrer"
          style={{ wordBreak: "break-all", textDecoration: "underline" }}
        >
          Transaction submitted
        </a>
      )}

      {txStatus ? (
        txStatus.status === "success" ? (
          <p style={{ color: "green" }}>Transaction Succcess</p>
        ) : (
          <p style={{ color: "red" }}>Transaction Failed</p>
        )
      ) : null}

      {error || error2 || error3 ? (
        <p style={{ color: "red", fontSize: "12px", wordBreak: "break-all" }}>
          {(error as any)?.shortmessage ??
            error?.message ??
            (error2 as any)?.shortMessage ??
            error2?.message ??
            (error3 as any)?.shortMessage ??
            error3?.message ??
            ""}
        </p>
      ) : null}
    </div>
  );
}
