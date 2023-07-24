import React from "react";
import { Create } from "../../../Components";

const MainPresenter = ({
  handleChangeImage,
  selectedImage,
  handleChangeInfo,
  handleOnIpfs,
  isSuccess,
  data,
}) => {
  return (
    <div className="main">
      <Create
        handleChangeImage={handleChangeImage}
        selectedImage={selectedImage}
        handleChangeInfo={handleChangeInfo}
        handleOnIpfs={handleOnIpfs}
      />
      {isSuccess && (
        <div className="col-12 col-md-6 mx-auto">
          <div className="item-form card no-hover">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Description"
                    cols={30}
                    rows={3}
                    defaultValue={data?.hash}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPresenter;
