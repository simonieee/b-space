import React from "react";
import AuthorProfile from "../AuthorProfile";

const Create = ({
  handleChangeImage,
  selectedImage,
  handleChangeInfo,
  handleOnIpfs,
}) => {
  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-md-4">
            {/* Author Profile */}
            <AuthorProfile selectedImage={selectedImage} />
          </div>
          <div className="col-12 col-md-7">
            {/* Intro */}
            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
              <div className="intro-content">
                <span>Get Started</span>
                <h3 className="mt-3 mb-0">Create Item</h3>
              </div>
            </div>
            {/* Item Form */}
            <div className="item-form card no-hover">
              <div className="row">
                <div className="col-12">
                  <div className="input-group form-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        onChange={(e) => handleChangeImage(e)}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        {selectedImage ? selectedImage.name : "Choose file"}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Item Name"
                      required="required"
                      onChange={(e) => handleChangeInfo(e)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="description"
                      placeholder="Description"
                      cols={30}
                      rows={3}
                      defaultValue={""}
                      onChange={(e) => handleChangeInfo(e)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="btn w-100 mt-3 mt-sm-4"
                    onClick={() => handleOnIpfs(selectedImage)}
                  >
                    Create Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
