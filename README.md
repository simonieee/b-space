# Hardhat config 설정

.env 파일은 Simon에게 요청 or 개인이 알아서 Infura, Alchemy, Etherscan, NFT Storage 등 API Key 생성하면 됩니다.

## Step 1

### `npm install`

## Step 2 - Contract Compile

Smart Contract는 Openzzeplin을 활용해서 생성하였음

아래 명령어를 통해 Contract 파일을 컴파일

### `npx hardhat compile`

## Step 3 - Contract Deploy

컴파일을 완료한 후, 아래 명령어를 통해 컨트랙트를 이더리움 네트워크에 등록

    npx hardhat run scripts/deploy.js --network <network>

컨트랙트가 등록되고 CA를 반환하면 정상적으로 컨트랙트가 올라간 것

## Step 4 - Contract Verify

컨트랙트를 올린 후, 검증 과정을 추가로 하게됨.

해당 과정을 거치면, 이더스캔상에서 컨트랙트 호출이 가능하게됨

    npx hardhat verify --network <network> <contract Address>

## Step 5 - ABI

#### `artifacts/contracts/###.sol/`

해당 경로로 이동하면 컨트랙트의 ABI 파일이 있음 해당 ABI를 가지고 frontend에서 컨트랙트 호출을 할 때 사용하게 됨

## .env

#### `API_URL` : alchemy or Infura API KEY

#### `PRIVATE_KEY` : 본인 이더리움 지갑 개인키 (메타마스크에서 확인 가능)

#### `PUBLIC_KEY` : 본인 이더리움 지갑 주소

#### `ETHERSCAN_API_KEY` : 이더스캔 API KEY (이더리스캔에서 발급 가능)
