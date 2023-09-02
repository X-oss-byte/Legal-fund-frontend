import type { V2_MetaFunction } from "@remix-run/node";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "ZachXBT Refunds" },
    { name: "description", content: "Refunds from ZachXBT" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Refunds</h1>
      <ConnectButton />
    </div>
  );
}
