import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, InputGroup } from "reactstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { FaYoutube, FaInfoCircle } from "react-icons/fa";

const Downloader = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [resData, setResData] = useState({});
  const [isFocused, setIsFocused] = useState(false);

  //https://www.youtube.com/watch?v=0NNWKCW3u9c or https://youtu.be/0NNWKCW3u9c
  const handleConvert = () => {
    if (videoUrl?.length > 12) {
      const options = {
        method: "GET",
        url: "https://youtube-video-download-info.p.rapidapi.com/dl",
        params: { id: videoUrl.slice(-11) },
        headers: {
          "X-RapidAPI-Key":
            "e2e8732dcbmsh9fb102907cdb62ep17ad14jsn46f746729c89",
          "X-RapidAPI-Host": "youtube-video-download-info.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          if (response.data.status === "ok") {
            setResData(response.data);
          } else {
            toast.error(response.data.msg);
            setResData({});
          }
        })
        .catch(function (error) {});
    } else {
      toast.error("Invalid Url");
    }
  };

  return (
    <Row className="w-100 m-0 justify-content-center py-3">
      <Col sm="12" className="text-center fs-4 fw-bold mb-3 flex-center gap-1">
        <FaYoutube style={{ color: "#ff0000" }} />{" "}
        <p
          className="m-0 pointer"
          onClick={() => window.open("https://h-solak.github.io", "_blank")}
        >
          <span className="text-white" style={{ fontWeight: "600" }}>
            Youtube to MP4{" "}
          </span>
          <span className="fs-8 text-secondary">v1 </span>
          <span className="fs-8 text-secondary fw-bold d-none d-sm-inline">
            by Hasan Solak
          </span>
        </p>
      </Col>
      <Col
        sm="12"
        md="6"
        className="p-0 m-0 d-flex align-items-start justify-content-center flex-column bg-dark p-4 rounded-4"
      >
        <span className="d-none d-sm-inline fs-5 fw-bold text-white">
          Enter the link of the video
        </span>
        <span className="d-inline d-sm-none fs-5 fw-bold text-white text-center w-100">
          Enter the link
        </span>
        <div className="w-100 d-flex align-items-center">
          <input
            className="w-100"
            placeholder="https://youtu.be/zbl6XKWMpvM"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoFocus
          />
          <button
            color="primary"
            onClick={handleConvert}
            className={isFocused ? "focused" : null}
          >
            Convert
          </button>
        </div>
        <p className="m-0 text-secondary fs-8 mt-2 d-flex align-items-s gap-1">
          <FaInfoCircle className="d-none d-sm-inlinetext-white fs-6" />{" "}
          <span className="">
            Video id has to be at the end of the url like
            https://www.youtube.com/watch?v=
            <span className="fw-bold">dQw4w9WgXcQ</span> or https://youtu.be/
            <span className="fw-bold">dQw4w9WgXcQ</span>
          </span>
        </p>
      </Col>
      {resData?.title && (
        <Row className="m-0 mt-3 p-0 justify-content-center">
          <Col
            sm="12"
            md="6"
            lg="6"
            className="bg-dark"
            style={{ borderRadius: "6px 6px 0px 0px" }}
          >
            <div
              className="d-flex align-items-center flex-column flex-sm-row pointer rounded-3 p-1"
              onClick={() =>
                window.open(`https://youtu.be/${resData?.id}`, "_blank")
              }
            >
              <img
                className="video-thumbnail rounded-3 mt-2 mt-sm-0"
                src={resData?.thumb}
                alt="video thumbnail"
              />
              <div className="mt-sm-0 p-4 d-flex align-items-start flex-column">
                {resData?.title?.length > 60 ? (
                  <span className="fw-bold text-white">
                    {resData?.title?.slice(0, 60)}...
                  </span>
                ) : (
                  <span className="fw-bold text-white">{resData?.title}</span>
                )}
                <span className="text-secondary">{resData?.length}</span>
                {resData?.description?.length > 60 ? (
                  <span className="text-secondary">
                    {resData?.description?.slice(0, 60)}...
                  </span>
                ) : (
                  <span className="text-secondary">{resData?.description}</span>
                )}
              </div>
            </div>
          </Col>
          <Row className="m-0 p-0 justify-content-center">
            <Col sm="12" md="6" className="text-center mt-0 bg-dark px-3 pb-3">
              <span className="fw-bold text-white">
                Video <span className="fs-8">(mp4)</span>
              </span>
              {resData?.link["18"] ? (
                <a
                  href={resData?.link["18"] && resData?.link["18"][0]}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn ms-1"
                >
                  {resData?.link["18"][3]}
                </a>
              ) : null}
              {/* Bunu d??zeltece??im, e??er bu yoksa ba??ka linke y??nlendir diye */}
              {resData?.link["22"] ? (
                <a
                  href={resData?.link["22"][0]}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn ms-1"
                >
                  {resData?.link["22"][3]}
                </a>
              ) : null}

              {resData?.link["137"] ? (
                <a
                  href={resData?.link["137"] && resData?.link["137"][0]}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn ms-1"
                >
                  {resData?.link["137"][3]}
                </a>
              ) : null}
            </Col>
          </Row>
          <Row className="m-0 p-0 justify-content-center">
            <Col
              sm="12"
              md="6"
              className="text-center bg-dark pb-3"
              style={{
                borderRadius: "0px 0px 6px 6px",
              }}
            >
              <span className="fw-bold text-white">Audio</span>
              {resData?.link["140"] ? (
                <a
                  href={resData?.link["140"][0]}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn ms-1"
                >
                  m4a
                </a>
              ) : null}
            </Col>
          </Row>
        </Row>
      )}
    </Row>
  );
};

export default Downloader;
