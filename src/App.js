import "./App.css";
import JSMpeg from "jsmpeg-player";
import React, { Component } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export default class App extends Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();
  state = {
    canPlay: false
  };
  // we are gonna use inline style
  styles = {
    position: "fixed",
    top: 150,
    left: 150
  };
  _renderVideo = _ => {
    //     const tf = require("@tensorflow/tfjs");
    // const tfn = require("@tensorflow/tfjs-node");
    // const handler = tfn.io.fileSystem("./model.json");
    // const model = await tf.loadModel(handler);

    // Setup the WebSocket connection and start the player
    const canvas = document.getElementById("videoCanvas");
    const player = new JSMpeg.Player("ws://localhost:9999/", {
      autoPlay: true,
      canvas: canvas
    });
    this.setState({ canPlay: true }, () => {
      const loadlModelPromise = cocoSsd.load();
      // resolve all the Promises
      Promise.all([loadlModelPromise])
        .then(values => {
          debugger;
          this.detectFromVideoFrame(values[0], this.videoRef.current);
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  detectFromVideoFrame = (model, video) => {
    model.detect(video).then(
      predictions => {
        this.showDetections(predictions);

        requestAnimationFrame(() => {
          this.detectFromVideoFrame(model, video);
        });
      },
      error => {
        console.log("Couldn't start the webcam");
        console.error(error);
      }
    );
  };
  showDetections = predictions => {
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const font = "24px helvetica";
    ctx.font = font;
    ctx.textBaseline = "top";

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = "#2fff00";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#2fff00";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10);
      // draw top left rectangle
      ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
      // draw bottom left rectangle
      ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
      ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
    });
  };
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this._renderVideo();
          }}
        >
          Vigen
        </button>
        <canvas
          id="videoCanvas"
          width="1280"
          height="720"
          ref={this.videoRef}
        ></canvas>
        <canvas
          style={this.styles}
          ref={this.canvasRef}
          width="1280"
          height="720"
        />
      </div>
    );
  }
}
