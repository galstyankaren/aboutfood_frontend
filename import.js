const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");
const cocoSsd = require("@tensorflow-models/coco-ssd");
const model = cocoSsd.load();
model.save("file://./model-1a");
