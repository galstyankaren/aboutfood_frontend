import JSMpeg from "jsmpeg-player";
import React, { Component } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import Slide from "react-reveal/Slide";

export default class FridgeView extends Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();
  state = {
    canPlay: false
  };
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.handleNotification = this.handleNotification.bind(this);
  }
  handleNotification() {
    this.setState({ show: true });
  }
  // we are gonna use inline style
  styles = {
    position: "fixed",
    top: 0
  };
  componentDidMount = () => {
    this.handleNotification();
    // Setup the WebSocket connection and start the player
    const canvas = document.getElementById("videoCanvas");
    const player = new JSMpeg.Player("ws://localhost:9999/", {
      autoPlay: true,
      canvas: canvas
    });
    this.setState({ canPlay: true }, () => {
      const loadlModelPromise = cocoSsd.load({
        modelUrl: "http://localhost:3000/data/v2/model.json"
      });

      Promise.all([loadlModelPromise])
        .then(values => {
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
        console.log("Couldn't start the camera");
        console.error(error);
      }
    );
  };
  showDetections = predictions => {
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const font = "24px avenir";
    //const padding = "6px 10px 6px 0";
    ctx.font = font;
    ctx.textBaseline = "top";

    var class_names = [
      "banana",
      "apple",
      "orange",
      "broccoli",
      "carrot",
      "hot dog",
      "pizza",
      "donut",
      "cake"
    ];
    predictions.forEach(prediction => {
      if (prediction.class == "broccoli") {
        this.handleNotification();
      }
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box
      ctx.strokeStyle = "#d70f64";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#d70f64";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10);
      // draw top left rectangle
      if (class_names.includes(prediction.class)) {
        ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(prediction.class, x, y);
      }
      //ctx.fillText(prediction.class, x, y);
      //ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
    });
  };
  render() {
    return (
      <div>
        <Slide top when={this.state.show}>
          <a href="http://localhost:8000/recepie.html">
            <img
              id="notification"
              src={process.env.PUBLIC_URL + "img/notification.png"}
              alt="notification"
            />
          </a>
        </Slide>
        <div>
          <canvas id="videoCanvas" ref={this.videoRef}></canvas>
          <canvas
            style={this.styles}
            ref={this.canvasRef}
            width="380"
            height="742"
          />

          <img src={process.env.PUBLIC_URL + "img/navbar.jpg"} alt="navbar" />
        </div>
      </div>
    );
  }
}
