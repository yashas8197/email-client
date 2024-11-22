import React from "react";

const Shimmer: React.FC = () => {
  return (
    <div className="card p-3 d-flex h-100">
      <div className="row w-100">
        <div className="col-auto d-flex">
          <div
            className="rounded-circle me-3 shimmer"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#E54065",
            }}
          />
        </div>
        <div className="col">
          <div className="d-flex align-items-center mb-3 justify-content-between">
            <div>
              <div
                className="shimmer"
                style={{ width: "200px", height: "20px", marginBottom: "5px" }}
              />
              <div
                className="shimmer"
                style={{ width: "100px", height: "15px" }}
              />
            </div>
            <div
              className="shimmer"
              style={{ width: "120px", height: "35px", borderRadius: "20px" }}
            />
          </div>
          <div
            className="shimmer"
            style={{ width: "100%", height: "150px", marginTop: "10px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
