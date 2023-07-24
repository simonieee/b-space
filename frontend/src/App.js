import IndexRouter from "./Routes";

import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import {
  WagmiConfig,
  createConfig,
  configureChains,
  mainnet,
  sepolia,
} from "wagmi";

const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [
    infuraProvider({ apiKey: process.env.REACT_APP_INFURA_APIKEY }),
    publicProvider(),
  ]
);

const connector = new MetaMaskConnector({
  chains: chains,
});

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [connector],
});

function App() {
  return (
    <WagmiConfig config={config}>
      <IndexRouter />;
    </WagmiConfig>
  );
}

export default App;
