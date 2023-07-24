import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLoading } from "../../../utils/LoadingManager";
import { tokenAbi } from "../../../Abi/tokenAbi";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import MainPresenter from "./MainPresenter";

const initialState = {
  name: "",
  description: "",
};

const contractInfo = {
  address: "0x5E1d8F323D08ccFd7bAa549C773443c8C6Aa10c9",
  abi: tokenAbi,
  chainId: 11155111,
};

const MainContainer = () => {
  /* Router */
  /* State */
  const { address } = useAccount();
  const { handleLoading } = useLoading();
  const [selectedImage, setSelectedImage] = useState(null);
  const [nftInfo, setNftInfo] = useState(initialState);
  const [ipfsUrl, setIpfsUrl] = useState("");
  /* Hooks */

  const { config } = usePrepareContractWrite({
    ...contractInfo,
    functionName: "safeMint",
    args: [address, ipfsUrl],
  });

  const { data, write } = useContractWrite(config);

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  console.log(isSuccess);
  useEffect(() => {
    if (isSuccess) {
      handleLoading(!isSuccess);
    }
  }, [handleLoading, isSuccess]);

  useEffect(() => {
    if (ipfsUrl.length > 0) {
      write?.();
      setIpfsUrl("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipfsUrl]);
  /* Functions */
  /**
   * nft image를 선택
   * @param {*} e
   */
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  /**
   * nft 정보를 입력
   * @param {*} e
   */
  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setNftInfo({ ...nftInfo, [name]: value });
  };

  /**
   * IPFS 서버에 파일 업로드 API 호출
   * @param {*} ifpsInfo
   * @returns
   */
  const sendIpfs = async (ifpsInfo) => {
    try {
      const url = process.env.REACT_APP_IPFS_URL;
      const result = await axios.post(url, ifpsInfo, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${process.env.REACT_APP_IPFS_KEY}`,
        },
      });
      const { status, message, data } = result;
      if (status === 200) {
        return data;
      }
      throw message;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  /**
   * IPFS 서버에 파일 업로드 요청 후 IPFS hash 값 반환
   * @param {*} file
   * @returns
   */
  const handleOnIpfs = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const ipfsImage = await sendIpfs(formData);
    console.log(ipfsImage);
    return ipfsImage;
  };

  const handleMint = async (file) => {
    handleLoading(!isSuccess);
    const ipfsImage = await handleOnIpfs(file);
    const metadata = {
      name: nftInfo.name,
      description: nftInfo.description,
      image: `https://nftstorage.link/ipfs/${ipfsImage.value.cid}/${ipfsImage.value.files[0].name}`,
    };
    const jsonFile = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
      name: nftInfo.name,
    });
    const mFile = new File([jsonFile], `${nftInfo.name}.json`, {
      type: "text/json",
    });
    const result = await handleOnIpfs(mFile);
    setIpfsUrl(
      `https://nftstorage.link/ipfs/${result.value.cid}/${result.value.files[0].name}`
    );

    return result;
  };
  console.log(ipfsUrl);
  /* Render */
  return (
    <MainPresenter
      handleChangeImage={handleChangeImage}
      selectedImage={selectedImage}
      handleChangeInfo={handleChangeInfo}
      handleOnIpfs={handleMint}
      isSuccess={isSuccess}
      data={data}
    />
  );
};

export default MainContainer;
