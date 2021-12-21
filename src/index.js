import React from "react";
import ReactDOM from "react-dom";
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import "./styles.css";
tf.setBackend('webgl');

const threshold = 0.75;

async function load_model() {
    // It's possible to load the model locally or from a repo
    // You can choose whatever IP and PORT you want in the "http://127.0.0.1:8080/model.json" just set it before in your https server
    //const model = await loadGraphModel("http://127.0.0.1:8080/model.json");
    const model = await loadGraphModel("https://raw.githubusercontent.com/hugozanini/TFJS-object-detection/master/models/kangaroo-detector/model.json");
    return model;
  }

let classesDir = {
    1: {'name':'Destination_right', 'id':1},
    2:   {'name':'Destination_left', 'id':2}, 
      3: {'name':'FERRY_2', 'id':3}, 
    4:   {'name':'FERRY_3', 'id':4},
    5:   {'name':'FERRY_4', 'id':5},
    6:   {'name':'FERRY_5', 'id':6},
    7:   {'name':'FERRY_6', 'id':7},
    8:   {'name':'FERRY', 'id':8},
    9:   {'name':'ONRAMP_LEFT_0', 'id':9},
    10:   {'name':'ONRAMP_LEFT_1', 'id':10},
    11:   {'name':'ONRAMP_LEFT_2', 'id':11},
     12:  {'name':'ONRAMP_LEFT_3', 'id':12}, 
      13: {'name':'ONRAMP_LEFT_4', 'id':13},
       14:{'name':'ONRAMP_LEFT_5', 'id':14},
       15:{'name':'ONRAMP_LEFT_6', 'id':15},
       16:{'name':'ONRAMP_LEFT', 'id':16},
       17:{'name':'ONRAMP_RIGHT_0', 'id':17},
       18:{'name':'ONRAMP_RIGHT_1', 'id':18},
       19:{'name':'ONRAMP_RIGHT_2', 'id':19},
       20:{'name':'ONRAMP_RIGHT_3', 'id':20},
       21:{'name':'ONRAMP_RIGHT_4', 'id':21},
       22:{'name':'ONRAMP_RIGHT_5', 'id':22},
       23:{'name':'ONRAMP_RIGHT_6', 'id':23},
       24:{'name':'ONRAMP_RIGHT', 'id':24},
       25:{'name':'ONRAMP_SHARP_LEFT_0', 'id':25},
       26:{'name':'ONRAMP_SHARP_LEFT_1', 'id':26},
       27:{'name':'ONRAMP_SHARP_LEFT_2', 'id':27},
       28:{'name':'ONRAMP_SHARP_LEFT_3', 'id':28},
       29:{'name':'ONRAMP_SHARP_LEFT_4', 'id':29},
       30:{'name':'ONRAMP_SHARP_LEFT_5', 'id':30},
       31:{'name':'ONRAMP_SHARP_LEFT_6', 'id':31},
       32:{'name':'ONRAMP_SHARP_LEFT', 'id':32},
       33:{'name':'ONRAMP_SHARP_RIGHT_0', 'id':33},
       34:{'name':'ONRAMP_SHARP_RIGHT_1', 'id':34},
       35:{'name':'ONRAMP_SHARP_RIGHT_2', 'id':35},
       36:{'name':'ONRAMP_SHARP_RIGHT_3', 'id':36},
       37:{'name':'ONRAMP_SHARP_RIGHT_4', 'id':37},
       38:{'name':'ONRAMP_SHARP_RIGHT_5', 'id':38},
       39:{'name':'ONRAMP_SHARP_RIGHT_6', 'id':39},
       40:{'name':'ONRAMP_SHARP_RIGHT', 'id':40},
       41:{'name':'ONRAMP_SLIGHT_LEFT_0', 'id':41},
       42:{'name':'ONRAMP_SLIGHT_LEFT_1', 'id':42},
       43:{'name':'ONRAMP_SLIGHT_LEFT_2', 'id':43},
       44:{'name':'ONRAMP_SLIGHT_LEFT_3', 'id':44},
       45:{'name':'ONRAMP_SLIGHT_LEFT_4', 'id':45},
       46:{'name':'ONRAMP_SLIGHT_LEFT_5', 'id':46},
       47:{'name':'ONRAMP_SLIGHT_LEFT_6', 'id':47},
       48:{'name':'ONRAMP_SLIGHT_LEFT', 'id':48},
       49:{'name':'ONRAMP_SLIGHT_RIGHT_0', 'id':49},
       50:{'name':'ONRAMP_SLIGHT_RIGHT_1', 'id':50},
       51:{'name':'ONRAMP_SLIGHT_RIGHT_2', 'id':51},
       52:{'name':'ONRAMP_SLIGHT_RIGHT_3', 'id':52},
      53: {'name':'ONRAMP_SLIGHT_RIGHT_4', 'id':53},
       54:{'name':'ONRAMP_SLIGHT_RIGHT_5', 'id':54},
       55:{'name':'ONRAMP_SLIGHT_RIGHT_6', 'id':55},
       56:{'name':'ONRAMP_SLIGHT_RIGHT', 'id':56},
       57:{'name':'Round_ABOUT_RIGHT_0', 'id':57},
       58:{'name':'Round_ABOUT_RIGHT_1', 'id':58},
       59:{'name':'Round_ABOUT_RIGHT_2', 'id':59},
       60:{'name':'Round_ABOUT_RIGHT_3', 'id':60},
       61:{'name':'Round_ABOUT_RIGHT_4', 'id':61},
       62:{'name':'Round_ABOUT_RIGHT_5', 'id':62},
       63:{'name':'Round_ABOUT_RIGHT_6', 'id':63,
       64:{'name':'Round_ABOUT_RIGHT', 'id':64},
       65:{'name':'Roundabout (without exit number)_0', 'id':65},
       66:{'name':'Roundabout (without exit number)_1', 'id':66},
       67:{'name':'Roundabout (without exit number)_2', 'id':67},
       68:{'name':'Roundabout (without exit number)_3', 'id':68},
       69:{'name':'Roundabout (without exit number)_4', 'id':69},
       70:{'name':'Roundabout (without exit number)_5', 'id':70},
       71:{'name':'Roundabout (without exit number)_6', 'id':71},
       72:{'name':'Roundabout (without exit number)', 'id':72},
       73:{'name':'Slight_Left_0', 'id':73},
       74:{'name':'Slight_Left', 'id':74},
       75:{'name':'Straight_6', 'id':75},
       76:{'name':'Straight_8', 'id':76},
       77:{'name':'Turn_Left_0', 'id':77},
       78:{'name':'Turn_Left_6', 'id':78},
       79:{'name':'Turn_Left_7', 'id':79},
       80:{'name':'Turn_Left_8', 'id':80},
       81:{'name':'Turn_Left', 'id':81},
       82:{'name':'Turn_Right_0', 'id':82},
       83:{'name':'Turn_Right_14', 'id':83},
       84:{'name':'Turn_Right', 'id':84},
       85:{'name':'uTurn_Left_0', 'id':85},
       86:{'name':'uTurn_Left_1', 'id':86},
        87:{'name':'uTurn_Left_2', 'id':87},
        88:{'name':'uTurn_Left_3', 'id':88},
         89:{'name':'uTurn_Left_4', 'id':89},
         90:{'name':'uTurn_Left_5', 'id':90},
         91:{'name':'uTurn_Left_6', 'id':91},
         92:{'name':'uTurn_Left', 'id':92},
         93:{'name':'uTurn_Right_0', 'id':93},
         94:{'name':'uTurn_Right_1', 'id':94},
         95:{'name':'uTurn_Right_2', 'id':95},
         96:{'name':'uTurn_Right_3', 'id':96},
         97:{'name':'uTurn_Right', 'id':97},
         98:{'name':'off_ramp_sharp_left_0', 'id':98},
         99:{'name':'off_ramp_sharp_left_1', 'id':99},
         100:{'name':'off_ramp_sharp_left_2', 'id':100},
         101:{'name':'off_ramp_sharp_left_3', 'id':101},
         102:{'name':'off_ramp_sharp_left_4', 'id':102},
         103:{'name':'off_ramp_sharp_left_5', 'id':103},
         104:{'name':'off_ramp_sharp_left_6', 'id':104},
         105:{'name':'off_ramp_sharp_left', 'id':105}, 
         106:{'name':'off_ramp_sharp_right_0', 'id':106},
         107:{'name':'off_ramp_sharp_right_1', 'id':107},
         108:{'name':'off_ramp_sharp_right_2', 'id':108},
         109{'name':'off_ramp_sharp_right_3', 'id':109},
         110:{'name':'off_ramp_sharp_right_4', 'id':110},
         111:{'name':'off_ramp_sharp_right_5', 'id':111},
         112:{'name':'off_ramp_sharp_right_6', 'id':112},
         113:{'name':'off_ramp_sharp_right', 'id':113},         
         114:{'name':'text_1', 'id':114},
         115:{'name':'text_2', 'id':115},
         116:{'name':'Tripper_pod', 'id':116}
class App extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();


  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        })
        .then(stream => {
          window.stream = stream;
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });

      const modelPromise = load_model();

      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

    detectFrame = (video, model) => {
        tf.engine().startScope();
        model.executeAsync(this.process_input(video)).then(predictions => {
        this.renderPredictions(predictions, video);
        requestAnimationFrame(() => {
          this.detectFrame(video, model);
        });
        tf.engine().endScope();
      });
  };

  process_input(video_frame){
    const tfimg = tf.browser.fromPixels(video_frame).toInt();
    const expandedimg = tfimg.transpose([0,1,2]).expandDims();
    return expandedimg;
  };

  buildDetectedObjects(scores, threshold, boxes, classes, classesDir) {
    const detectionObjects = []
    var video_frame = document.getElementById('frame');

    scores[0].forEach((score, i) => {
      if (score > threshold) {
        const bbox = [];
        const minY = boxes[0][i][0] * video_frame.offsetHeight;
        const minX = boxes[0][i][1] * video_frame.offsetWidth;
        const maxY = boxes[0][i][2] * video_frame.offsetHeight;
        const maxX = boxes[0][i][3] * video_frame.offsetWidth;
        bbox[0] = minX;
        bbox[1] = minY;
        bbox[2] = maxX - minX;
        bbox[3] = maxY - minY;
        detectionObjects.push({
          class: classes[i],
          label: classesDir[classes[i]].name,
          score: score.toFixed(4),
          bbox: bbox
        })
      }
    })
    return detectionObjects
  }

  renderPredictions = predictions => {
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    //Getting predictions
    const boxes = predictions[4].arraySync();
    const scores = predictions[5].arraySync();
    const classes = predictions[6].dataSync();
    const detections = this.buildDetectedObjects(scores, threshold,
                                    boxes, classes, classesDir);

    detections.forEach(item => {
      const x = item['bbox'][0];
      const y = item['bbox'][1];
      const width = item['bbox'][2];
      const height = item['bbox'][3];

      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);

      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(item["label"] + " " + (100 * item["score"]).toFixed(2) + "%").width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    detections.forEach(item => {
      const x = item['bbox'][0];
      const y = item['bbox'][1];

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(item["label"] + " " + (100*item["score"]).toFixed(2) + "%", x, y);
    });
  };

  render() {
    return (
      <div>
        <h1>Real-Time Object Detection: Kangaroo</h1>
        <h3>MobileNetV2</h3>
        <video
          style={{height: '600px', width: "500px"}}
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width="600"
          height="500"
          id="frame"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
          width="600"
          height="500"
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
