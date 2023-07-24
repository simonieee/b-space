import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json-1/author";

const AuthorProfile = ({ selectedImage }) => {
  const [data, setData] = useState();
  const { address } = useAccount();

  const dataSet = async () => {
    const d = await axios.get(`${BASE_URL}`);
    setData(d.data);
  };
  useEffect(() => {
    dataSet();
  }, []);

  return (
    <div className="card no-hover text-center">
      <div className="image-over">
        {!selectedImage ? (
          <img className="card-img-top" src={data && data.img} alt="" />
        ) : (
          <img
            className="card-img-top"
            src={URL.createObjectURL(selectedImage)}
            alt="NFTImage"
          />
        )}
        {/* Author */}
        <div className="author">
          <div className="author-thumb avatar-lg">
            <img
              className="rounded-circle"
              src={data && data.authorImg}
              alt=""
            />
          </div>
        </div>
      </div>
      {/* Card Caption */}
      <div className="card-caption col-12 p-0">
        {/* Card Body */}
        <div className="card-body mt-4">
          <h5 className="mb-3">{data && data.author}</h5>
          <p className="my-3">{data && data.content}</p>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={address && address}
            />
            <div className="input-group-append">
              <button>
                <i className="icon-docs" />
              </button>
            </div>
          </div>
          {/* Social Icons */}
          <div className="social-icons d-flex justify-content-center my-3">
            {data &&
              data.socialData.map((item, idx) => {
                return (
                  <div key={`asd_${idx}`} className={item.link}>
                    <i className={item.icon} />
                  </div>
                );
              })}
          </div>
          <div className="btn btn-bordered-white btn-smaller">
            {data && data.btnText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
