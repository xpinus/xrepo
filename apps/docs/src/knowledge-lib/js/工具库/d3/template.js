import { useStore } from '@/store/index.js'
import Konva from "konva";
import * as d3 from 'd3'
import Cloud from "@/assets/lib/d3.layout.cloud.js"

const store = useStore();
let words = [];
let wordsTargetPos = [];
let wordsGroup = [];
let wordsAnim = [];
let fontsize = 14;
const selectedWord = {
  word: null,
  animation: null
}

let containerW = 0, containerH = 0;
let currentTemplate = null;

export const CLOUND_0_NAME = "放射"
export const CLOUND_1_NAME = "同心圆"
export const CLOUND_2_NAME = "悬挂云"
export const CLOUND_3_NAME = "普通词云"

export const wordcloudTemplates = [
  {
    name: CLOUND_0_NAME,
    cover: "/src/assets/images/ciyun-t0-cover.png",
    create: createWordCloud_0,
    update: updateWordCloud_0,
    destroy() {
      wordsAnim.forEach((anim) => {
        anim.stop();
      })
      wordsAnim = [];
      wordsGroup = [];
      wordsTargetPos = [];
      selectedWord.animation = null;
      selectedWord.word = null;
    },
    blur: function () {
      if (!!selectedWord.word) {
        selectedWord.word = null;
        selectedWord.animation.start();
        selectedWord.animation = null;
      }
    },
    changeTheme: function () {
      let textColor, opacity;
      if (store.theme === "default") {
        textColor = "#1135F1";
        opacity = 0.76;
      } else {
        textColor = "#FFF";
        opacity = 0.2;
      }

      wordsGroup.forEach((group) => {
        group.wordText.fill(textColor);
        group.wordRect.opacity(opacity);
      });
    }
  },
  // {
  //   name: CLOUND_1_NAME,
  // cover: "/src/assets/images/ciyun-t1-cover.png",
  //   create: createWordCloud_1,
  //   update: updateWordCloud_1,
  //   destroy() {
  //     wordsAnim.forEach((anim) => {
  //       anim.stop();
  //     })
  //     wordsAnim = [];

  //     d3.selectAll('.word').remove();
  //   },
  //   blur: function () {
  //     if (!!selectedWord.word) {
  //       selectedWord.word = null;
  //     }
  //   }
  // },
  // {
  //   name: CLOUND_2_NAME,
  // 	cover: "/src/assets/images/ciyun-t2-cover.png",
  //   create: createWordCloud_2,
  //   update: updateWordCloud_2,
  //   destroy() {
  //     wordsAnim.forEach((anim) => {
  //       anim.stop();
  //     })
  //     wordsAnim = [];
  //     wordsGroup = [];
  //     wordsTargetPos = [];
  //     selectedWord.animation = null;
  //     selectedWord.word = null;
  //   },
  //   blur: function () {
  //     if (!!selectedWord.word) {
  //       selectedWord.word = null;
  //       selectedWord.animation.start();
  //       selectedWord.animation = null;
  //     }
  //   }
  // },
  {
    name: CLOUND_3_NAME,
    cover: "/src/assets/cloud.png",
    create: createWordCloud_3,
    update: updateWordCloud_3,
    destroy: destroyWordCloud_3,
    blur: () => { },
    changeScale: changeScale,
    deactivated() {
      removeEvent();
    },
    activated() {
      addEvent();
    },
  }
]

/*
 * 0
 * 中心向四周散射的词云
 */
function createWordCloud_0(stage, cw, ch, data, showDetailPopover) {
  currentTemplate = 0;

  words = data;
  wordsTargetPos = new Array(words.length).fill(0);
  setWordsPosition_0();

  containerW = cw;
  containerH = ch;

  const layer = new Konva.Layer();
  for (let i = 0; i < words.length; i++) {
    const text = words[i].name;
    const wordW = 38 + text.length * fontsize;

    const wordGroup = new Konva.Group({
      x: wordsTargetPos[i].cx,
      y: wordsTargetPos[i].cy,
      scale: {
        x: 0.4,
        y: 0.4,
      },
      opacity: 0,
    });

    const wordRect = new Konva.Rect({
      x: 0,
      y: 0,
      width: wordW,
      height: 36,
      fill: "#FFF",
      opacity: 0.76,
    });
    const prefixRect = new Konva.Rect({
      x: 12,
      y: 15,
      width: 6,
      height: 6,
      fill: "#FEA41D",
    });
    const wordText = new Konva.Text({
      x: 26,
      y: 12,
      text,
      fontSize: 14,
      fontFamily: "PingFang SC",
      fill: "#1135F1",
    });

    wordGroup.add(wordRect);
    wordGroup.add(prefixRect);
    wordGroup.add(wordText);
    layer.add(wordGroup);

    const period = 10000;
    const halfPeriod = 5000;
    const anim = new Konva.Animation(function ({ time, timeDiff, frameRate }) {
      if (currentTemplate !== 0 || time < wordsTargetPos[i].delay) return;

      const t = (time - wordsTargetPos[i].delay) % period;
      if (t <= halfPeriod) {
        // 50%的时间用来运动
        const ratio = t / halfPeriod;

        let scale =
          ratio * wordsTargetPos[i].scale < 0.2
            ? 0.2
            : ratio * wordsTargetPos[i].scale;

        wordGroup.scale({
          x: scale,
          y: scale,
        });
        wordGroup.position({
          x:
            wordsTargetPos[i].cx +
            ratio * wordsTargetPos[i].x +
            wordRect.width() / 2,
          y:
            wordsTargetPos[i].cy +
            ratio * wordsTargetPos[i].y +
            wordRect.height() / 2,
        });
        wordGroup.opacity(1);
      } else if (t >= period * 0.9) {
        // 最后一秒用来渐变隐藏
        wordGroup.opacity((period - t) / (period - period * 0.9));
      }
    }, layer);
    anim.start();

    wordGroup.on("mouseenter", function (e) {
      stage.container().style.cursor = "pointer";
      if (store.theme === "default") {
        wordRect.opacity(1);
      } else {
        wordRect.opacity(0.5);
      }
      anim.stop();
      wordGroup.zIndex(words.length - 1);
    });

    wordGroup.on("mouseleave", function (e) {
      stage.container().style.cursor = "default";
      if (store.theme === "default") {
        wordRect.opacity(0.76);
      } else {
        wordRect.opacity(0.2);
      }

      if (selectedWord.word !== words[i]) {
        anim.start();
      }
    });

    wordGroup.on("pointerclick", function (e) {
      e.cancelBubble = true;
      wordGroup.zIndex(words.length - 1);

      let visible = !selectedWord.word;

      if (!selectedWord.word) {
        selectedWord.word = words[i];
        anim.stop();
        selectedWord.animation = anim;
        visible = true;
      } else if (selectedWord.word == words[i]) {
        selectedWord.word = null;
        selectedWord.animation.start();
        visible = false;
      } else {
        selectedWord.animation.start();
        selectedWord.word = words[i];
        anim.stop();
        selectedWord.animation = anim;
        visible = true;
      }


      showDetailPopover(e.evt, visible, wordW);
    });

    wordsGroup[i] = {
      wordText,
      wordRect,
    };
    wordsAnim[i] = anim;
  }

  stage.add(layer);
}

function updateWordCloud_0(cw, ch) {
  containerW = cw;
  containerH = ch;

  setWordsPosition_0();
}

function setWordsPosition_0() {
  let d = [1, -1];
  let w, h;
  let scaleLimit;

  if (store.mobile) {
    scaleLimit = {
      min: 0.4,
      max: 1.2,
    };
    w = (containerW - 40) / 2;
    h = (containerH - 40) / 2;
  } else {
    scaleLimit = {
      min: 0.6,
      max: 1.4,
    };

    w = (containerW - 100) / 2;
    h = (containerH - 60) / 2;
  }

  for (let i = 0; i < words.length; i++) {
    let ts = Math.min(
      (Math.random() + scaleLimit.min).toFixed(2),
      scaleLimit.max
    ); //  target scale

    let th = d[Math.round(Math.random())]; // x/y轴上的移动方向 + -

    let x = Math.ceil(Math.random() * w); // x 水平移动距离
    let x1 = x;
    x1 = th === 1 && x + 200 > w ? x - 200 : x;
    let tx = th * x1; // target x

    let y = Math.ceil(Math.random() * h).toFixed(2); // 垂直移动距离
    let y1 = y - 36 * ts > h ? h : y;
    let ty = d[Math.round(Math.random())] * y1 - 10; // target y

    let td = (Math.random() * 10).toFixed(2) * 1000; // delay

    let text = words[i].name;
    let wordW = 38 + text.length * fontsize;
    let cx = containerW / 2 - wordW / 2;
    let cy = containerH / 2 - 18;

    wordsTargetPos[i] = {
      scale: ts,
      x: tx,
      y: ty,
      delay: td,
      cx,
      cy,
    };
  }
}

/*
 * 1 
 * 同心圆  词权重内大外小
 */
function drawCircle(index, arr) {
  let r = 0;
  let startRadian;
  let len = arr.length;
  let halfLen = arr.length / 2;
  let stepR
  let fsize

  const appendWords = () => {
    const cx = 736;
    const cy = 457;

    for (let i = 0; i < len; i++) {
      const baseRadian = i < halfLen ? startRadian : startRadian + 180;
      const radian = Math.PI * ((baseRadian + stepR * (i % halfLen)) / 180);
      const circleX = cx + Math.cos(radian) * r;
      const circleY = cy + Math.sin(radian) * r;

      let word = arr[i];
      let maxLen = 4;
      if (index === 3) {
        maxLen = 5;
      }
      if (index === 2) {
        maxLen = 6;
      }
      if (index === 1) {
        maxLen = 8;
      }
      let wordW = word.length > maxLen ? maxLen * fsize : word.length * fsize;

      if (i < halfLen) {
        var g = d3.select(".container").append('g').attr("class", `word word--c${index}`).attr('data-word', word);
        g.append('circle').attr("r", 5).attr("fill", "#6581BA").attr("cx", circleX).attr("cy", circleY);

        var text = g.append('text').attr("fill", "#6581BA").attr("font-size", fsize).attr("x", circleX + 10).attr("y", circleY + 5);
        if (word.length > maxLen) {
          text.append('tspan').attr("x", circleX + 10).attr("y", circleY - 15 + 10).text(word.substring(0, maxLen));
          text.append('tspan').attr("x", circleX + 10).attr("y", circleY - 15 + 10 + fsize).text(word.substring(maxLen, maxLen * 2) + `${word.length > maxLen * 2 ? '...' : ''}`);
        } else {
          text.text(word)
        }


      } else {
        var g = d3.select(".container").append('g').attr("class", `word word--left word--c${index}`)
        g.append('circle').attr("r", 5).attr("fill", "#6581BA").attr("cx", circleX).attr("cy", circleY).attr('data-word', word);

        var text = g.append('text').attr("fill", "#6581BA").attr("font-size", fsize).attr("x", circleX - 10 - wordW).attr("y", circleY + 5);
        if (word.length > maxLen) {
          text.append('tspan').attr("x", circleX - 10 - wordW).attr("y", circleY - 15 + 10).text(word.substring(0, maxLen));
          text.append('tspan').attr("x", circleX - 10 - wordW).attr("y", circleY - 15 + 10 + fsize).text(word.substring(maxLen, maxLen * 2) + `${word.length > maxLen * 2 ? '...' : ''}`);
        } else {
          text.text(word)
        }
      }
    }
  }

  switch (index) {
    case 5:
      r = 97;
      startRadian = -54;
      stepR = 36;
      fsize = 30;
      appendWords();
      break;
    case 4:
      r = 190;
      startRadian = -63;
      stepR = 18;
      fsize = 26;
      appendWords();
      break;
    case 3:
      r = 285;
      startRadian = -54;
      stepR = 12;
      fsize = 22;
      appendWords();
      break;
    case 2:
      r = 398;
      startRadian = -52;
      stepR = 8;
      fsize = 18;
      appendWords();
      break;
    case 1:
      r = 534;
      startRadian = -50;
      stepR = 8;
      fsize = 16;
      appendWords();
      break;
  }

}

function createWordCloud_1(stage, cw, ch, data, showDetailPopover) {
  currentTemplate = 1;

  const temp = [...Array.from(data)];
  temp.sort((a, b) => b.weight - a.weight);
  words = temp.map(item => item.name);

  drawCircle(5, words.slice(0, 8));
  drawCircle(4, words.slice(8, 24));
  drawCircle(3, words.slice(24, 44));
  drawCircle(2, words.slice(44, 72));
  drawCircle(1, words.slice(72, 100));

  // appendName(97, 2);
  // appendName(190, 4);
  // appendName(285, 6);
  // appendName(398, 10);
  // appendName(537, 12);

  d3.selectAll('.word').on("click", function (e, d) {
    // console.log('click', e, d);

    let visible = false;
    let word = e.target.closest(".word").querySelector("text").innerHTML;
    if (!selectedWord.word) {
      visible = true;
      selectedWord.word = word;
    } else if (selectedWord.word === word) {
      visible = false;
      selectedWord.word = null;
    } else {
      visible = true;
      selectedWord.word = word;
    }

    showDetailPopover(e, visible, word.length * 18);
  })


  setTimeout(() => {
    const delay = 600;
    const period = 30000;

    const hideEnd = 0.01;
    const showAnimEnd = 0.1;
    const showEnd = 0.9;
    const hideAnimEnd = 1;

    const anim5 = new Konva.Animation(function ({ time }) {
      if (currentTemplate !== 1) return;

      const passedTime = time % period;
      if (passedTime < period * hideEnd) {
        d3.selectAll('.word--c5').style("opacity", "0");
        d3.select('#c5 path').style("stroke-opacity", "0");
      } else if (passedTime < period * showAnimEnd) {
        d3.selectAll('.word--c5').style("opacity", `${(passedTime - period * hideEnd) / (period * (showAnimEnd - hideEnd))}`);
        d3.select('#c5 path').style("stroke-opacity", `${(passedTime - period * hideEnd) / (period * (showAnimEnd - hideEnd))}`);
      }
      else if (passedTime < period * showEnd) {
        d3.selectAll('.word--c5').style("opacity", "1");
        d3.select('#c5 path').style("stroke-opacity", "1");
      } else {
        d3.selectAll('.word--c5').style("opacity", `${1 - (passedTime - period * showEnd) / (period * (hideAnimEnd - showEnd))}`);
        d3.select('#c5 path').style("stroke-opacity", `${1 - (passedTime - period * showEnd) / (period * (hideAnimEnd - showEnd))}`);
      }
    }).start();
    const anim4 = new Konva.Animation(function ({ time }) {
      if (currentTemplate !== 1 && time < delay) return;

      const passedTime = (time - delay) % period;
      if (passedTime < period * hideEnd) {
        d3.selectAll('.word--c4').style("opacity", "0");
        d3.select('#c4 path').style("stroke-opacity", "0");
      } else if (passedTime < period * showAnimEnd) {
        d3.selectAll('.word--c4').style("opacity", `${(passedTime - period * hideEnd) / (period * (showAnimEnd - hideEnd))}`);
        d3.select('#c4 path').style("stroke-opacity", `${(passedTime - period * hideEnd) / (period * (showAnimEnd - hideEnd))}`);
      }
      else if (passedTime < period * showEnd) {
        d3.selectAll('.word--c4').style("opacity", "1");
        d3.select('#c4 path').style("stroke-opacity", "1");
      } else {
        d3.selectAll('.word--c4').style("opacity", `${1 - (passedTime - period * showEnd) / (period * (hideAnimEnd - showEnd))}`);
        d3.select('#c4 path').style("stroke-opacity", `${1 - (passedTime - period * showEnd) / (period * (hideAnimEnd - showEnd))}`);
      }
    }).start()
    const anim3 = new Konva.Animation(function ({ time }) {
      if (currentTemplate !== 1 && time < delay * 2) return;

      const passedTime = (time - delay * 2) % period;
      if (passedTime < period * hideEnd) {
        d3.selectAll('.word--c3').style("opacity", "0");
        d3.select('#c3 path').style("stroke-opacity", "0");
      } else if (passedTime < period * showAnimEnd) {
        d3.selectAll('.word--c3').style("opacity", `${(passedTime - period * hideEnd) / (period * (showAnimEnd - hideEnd))}`);
        d3.select('#c3 path').style("stroke-opacity", `${(passedTime - period * hideEnd) / (period * (showAnimEnd - hideEnd))}`);
      }
      else if (passedTime < period * showEnd) {
        d3.selectAll('.word--c3').style("opacity", "1");
        d3.select('#c3 path').style("stroke-opacity", "1");
      } else {
        d3.selectAll('.word--c3').style("opacity", `${1 - (passedTime - period * showEnd) / (period * (hideAnimEnd - showEnd))}`);
        d3.select('#c3 path').style("stroke-opacity", `${1 - (passedTime - period * showEnd) / (period * (hideAnimEnd - showEnd))}`);
      }

    }).start()
    const anim2 = new Konva.Animation(function ({ time }) {
      if (currentTemplate !== 1 && time < delay * 3) return;

      const passedTime = (time - delay * 3) % period;
      if (passedTime < period * hideEnd) {
        d3.selectAll('.word--c2').style("opacity", "0");
        d3.select('#c2 path').style("stroke-opacity", "0");
      } else if (passedTime < period * showAnimEnd) {
        d3.selectAll('.word--c2').style("opacity", `${(passedTime - period * hideEnd) / (period * (showAnimEnd - hideEnd))}`);
        d3.select('#c2 path').style("stroke-opacity", `${(passedTime - period * hideEnd) / (period * (showAnimEnd - hideEnd))}`);
      }
      else if (passedTime < period * showEnd) {
        d3.selectAll('.word--c2').style("opacity", "1");
        d3.select('#c2 path').style("stroke-opacity", "1");
      } else {
        d3.selectAll('.word--c2').style("opacity", `${1 - (passedTime - period * showEnd) / (period * (hideAnimEnd - showEnd))}`);
        d3.select('#c2 path').style("stroke-opacity", `${1 - (passedTime - period * showEnd) / (period * (hideAnimEnd - showEnd))}`);
      }

    }).start()
    const anim1 = new Konva.Animation(function ({ time }) {

      if (currentTemplate !== 1 && time < delay * 4) return;

      const passedTime = (time - delay * 4) % period;
      if (passedTime < period * hideEnd) {
        d3.selectAll('.word--c1').style("opacity", "0");
        d3.select('#c1 path').style("stroke-opacity", "0");
      } else if (passedTime < period * showAnimEnd) {
        d3.selectAll('.word--c1').style("opacity", `${(passedTime - period * hideEnd) / (period * (showAnimEnd - hideEnd))}`);
        d3.select('#c1 path').style("stroke-opacity", `${(passedTime - period * hideEnd) / (period * (showAnimEnd - hideEnd))}`);
      }
      else if (passedTime < period * showEnd) {
        d3.selectAll('.word--c1').style("opacity", "1");
        d3.select('#c1 path').style("stroke-opacity", "1");
      } else {
        d3.selectAll('.word--c1').style("opacity", `${1 - (passedTime - period * showEnd) / (period * (hideAnimEnd - showEnd))}`);
        d3.select('#c1 path').style("stroke-opacity", `${1 - (passedTime - period * showEnd) / (period * (hideAnimEnd - showEnd))}`);
      }
    }).start();

    wordsAnim = [anim1, anim2, anim3, anim4, anim5];
  })
}

function updateWordCloud_1(cw, ch) {
  containerW = cw;
  containerH = ch;

  setWordsPosition_1();
}

function setWordsPosition_1() {


}

/*
 * 2
 * 横向运动，词大小代表权重
 */
function createWordCloud_2(stage, cw, ch, data, showDetailPopover) {
  currentTemplate = 2;
  words = data;
  wordsTargetPos = new Array(words.length).fill(0);

  containerW = cw;
  containerH = ch;
  setWordsPosition_2();

  const averageWeight = words.reduce((a, b) => a + b.weight, 0) / words.length;

  const layer = new Konva.Layer();
  for (let i = 0; i < words.length; i++) {
    const title = words[i].name;
    let scale = words[i].weight / averageWeight;  // 计算缩放幅度
    scale = scale > 1.5 ? 1.5 : scale;
    scale = scale < 0.8 ? 0.8 : scale;
    scale = isNaN(scale) ? 1 : scale;

    const wordGroup = new Konva.Group({
      x: wordsTargetPos[i].sx,
      y: wordsTargetPos[i].sy,
      scale: {
        x: scale,
        y: scale,
      },
    });

    const wrap = new Konva.Group({
      x: 0,
      y: 0
    });

    const h = 30 + title.length * 22
    const box = new Konva.Rect({
      x: 0,
      y: 0,
      width: 30,
      height: h,
      fillLinearGradientColorStops: [0, "rgba(17, 198, 231, 0.20)", 1, "rgba(180, 229, 255, 0.02)"],
      fillLinearGradientStartPoint: {
        x: 15, y: 0
      },
      fillLinearGradientEndPoint: { x: 15, y: 30 + title.length * 22 },
    })

    const border = new Konva.Line({
      stroke: 'rgba(180, 229, 255, 0.2)',
      strokeWidth: 1,
      lineJoin: 'round',
      lineCap: 'round',
      points: [0, 0, 30, 0, 30, h, 0, h, 0, 0],
      shadowColor: '#FFF',
      shadowBlur: 5,
      shadowOffset: { x: 0, y: 0 },
      shadowOpacity: 1,
    });

    const rect = new Konva.Rect({
      x: 12,
      y: 8,
      width: 6,
      height: 6,
      fill: '#647DED',
    });

    const textArr = title.split("");
    for (let i = 0; i < textArr.length; i++) {
      const t = textArr[i]
      const text = new Konva.Text({
        x: 8,
        y: 22 + i * 22,
        text: t,
        fontSize: 14,
        fontFamily: 'PingFang SC',
        fill: '#FFF',
      });

      wordGroup.add(text)
    }

    wrap.add(box).add(rect).add(border)

    const line = new Konva.Line({
      stroke: '#23C3FF',
      strokeWidth: 1,
      lineJoin: 'round',
      lineCap: 'round',
      points: [15, 0, 15, -containerH],
    });

    wordGroup.add(wrap).add(line)

    layer.add(wordGroup);

    wrap.on('mouseenter', function () {
      stage.container().style.cursor = 'pointer';

      anim.stop();
      wordGroup.zIndex(words.length - 1);
    });

    wrap.on('mouseleave', function () {
      stage.container().style.cursor = 'default';

      if (selectedWord.word !== words[i]) {
        anim.start();
      }
    });

    wrap.on("pointerclick", function (e) {
      e.cancelBubble = true;
      wordGroup.zIndex(words.length - 1);

      let visible = !selectedWord.word;

      if (!selectedWord.word) {
        selectedWord.word = words[i];
        anim.stop();
        selectedWord.animation = anim;
        visible = true;
      } else if (selectedWord.word == words[i]) {
        selectedWord.word = null;
        selectedWord.animation.start();
        visible = false;
      } else {
        selectedWord.animation.start();
        selectedWord.word = words[i];
        anim.stop();
        selectedWord.animation = anim;
        visible = true;
      }

      showDetailPopover(e.evt, visible, 40);
    });

    const period = 20000;
    const anim = new Konva.Animation(function ({ time }) {
      if (currentTemplate !== 2 || time < wordsTargetPos[i].delay) return;

      wordGroup.x(
        ((time - wordsTargetPos[i].delay) % period / period * (containerW + 100)) - 100
      );

      const newY = wordsTargetPos[i].amplitude * Math.sin((time * 2 * Math.PI) / (period / 2)) + wordsTargetPos[i].sy;
      wordGroup.y(newY);
      // line.points([15, 0, 15, -containerH])
    }, layer);
    anim.start();

    // wordsGroup[i] = {
    //   // wordText,
    //   // wordRect,
    //   anim
    // };
    wordsAnim[i] = anim;
  }

  stage.add(layer);
}

function updateWordCloud_2(cw, ch) {
  containerW = cw;
  containerH = ch;

  setWordsPosition_1();
}

function setWordsPosition_2() {

  let maxLength = 0;
  words.forEach((w) => {
    if (w.name.length > maxLength) maxLength = w.name.length
  })

  for (let i = 0; i < words.length; i++) {
    let sy = Math.max(50, (containerH * 0.5 - maxLength * fontsize - 20) * Math.random());
    // sy = Math.min(sy, containerH * 0.2)

    wordsTargetPos[i] = {
      sx: -100,
      sy,
      amplitude: 10 + 50 * Math.random(),
      delay: Math.random() * words.length * 600
    };
  }
}

/*
 * 3
 * mask词云
 */
var chart
var colors = [
  "#7299EDe0",
  "#9FE1F7e0",
  "#FBA742e0",
  "#F9D160e0",
  "#F76B62e0",
  "#9971E5e0",
];
var clickedWord = null;
var svg, group
var transform = {
  origin: [0, 0],
  scale: 1,
  translate: [0, 0],
};
var width, height
var callback
var cloud3stage
var cloud3_words = []
function createWordCloud_3(stage, cw, ch, data, showDetailPopover) {
  cloud3stage = stage || "cloudCon";
  var maskImage = new Image();
  maskImage.src = "/cloud.png";
  maskImage.style =
    "position: fixed; transform: translateX(-99999px); opacity: 0; width: 0; height: 0;";
  maskImage.setAttribute("id", "cloudmask");
  document.body.append(maskImage);
  const fontRange = store.mobile ? (cw > ch ? [24, 100] : [12, 100]) : [12, 100]
  maskImage.onload = function () {
    var minWeight = d3.min(data, (d) => d.weight);
    var maxWeight = d3.max(data, (d) => d.weight);
    var scale = d3.scaleSqrt().range(fontRange).domain([minWeight, maxWeight]);
    cloud3_words = data.map((d, i) => {
      return {
        ...d,
        text: d.name,
        size: scale(d.weight),
      };
    });

    callback = showDetailPopover;
    console.log(cw);
    renderD3Cloud(cw, ch);
    addEvent();
  };
}


function updateWordCloud_3(cw, ch) {
  if (!cloud3stage) return;
  renderD3Cloud(cw, ch)
}

function destroyWordCloud_3() {
  const con = document.querySelector("#cloudCon")
  if (con) {
    con.innerHTML = ""
  }
  removeEvent();
}


function renderD3Cloud(cw, ch) {
  width = cw;
  height = ch;

  const cloudWidth = store.mobile ? (cw > ch ? width : width * 1.2) : (store.webTemplate === '1' && !store.isSelectedBook ? width : height);
  const cloudHeight = store.mobile ? (cw > ch ? height  : height * 1.2) : height;


  var layout = Cloud()
    .size([cloudWidth, cloudHeight])
    .mask(document.querySelector("#cloudmask"))
    .words(cloud3_words)
    .padding(1)
    .font("Impact")
    .fontSize(function (d) {
      return d.size;
    })
    .rotate(function () {
      return (~~(Math.random() * 6) - 3) * 0;
    })
    .on("end", function draw(words) {
      svg = d3.select('#' + cloud3stage).html('').append("svg").attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
        .attr("width", width)

      group = svg.append("g")

      group
        .attr(
          "transform",
          `translate(${transform.translate[0]}, ${transform.translate[1]}) scale(${transform.scale})`
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function (d) {
          return d.size + "px";
        })
        .style("fill", (d, i) => colors[i % colors.length])
        .attr('class', 'template3-word')
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
          return (
            "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
          );
        })
        .text(function (d) {
          return d.text;
        }).on('click', function (event, d) {
          event.stopPropagation();

          if (!clickedWord || clickedWord !== d) {
            clickedWord = d
            callback && callback(event, true, 0)
          }
          else {
            clickedWord = null
            callback && callback(event, false, 0)
          }
        });
    });
  layout.start();
}
/**
 * 添加事件
 */
var frameId = null
function addEvent() {
  if (!cloud3stage) return;
  // pc鼠标事件
  document.getElementById(cloud3stage).addEventListener('mousedown', onMouseDown);
  document.getElementById(cloud3stage).addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  // 移动端touch事件
  document.getElementById(cloud3stage).addEventListener('touchstart', onTouchStart);
  document.getElementById(cloud3stage).addEventListener('touchmove', onTouchMove);

  // 渲染更新
  frameId = window.requestAnimationFrame(setTransform);
}

/**
 * 移除事件
 */
function removeEvent() {
  if (!cloud3stage) return;
  document.removeEventListener('mouseup', onMouseUp);

  const contaniner = document.getElementById(cloud3stage);
  if (!!contaniner) {
    contaniner.removeEventListener('mousedown', onMouseDown);
    contaniner.removeEventListener('mousemove', onMouseMove);

    contaniner.removeEventListener('touchstart', onTouchStart);
    contaniner.removeEventListener('touchmove', onTouchMove);
  }


  // 取消更新
  frameId && window.cancelAnimationFrame(frameId)
}

var MOUSE_DOWN = false
var startPoint = {
  x: 0,
  y: 0
}
var startTranslate = [0, 0]
function onMouseDown(e) {
  MOUSE_DOWN = true
  startPoint = {
    x: e.clientX,
    y: e.clientY
  }
  startTranslate = [transform.translate[0], transform.translate[1]]
  document.getElementById(cloud3stage).className = "grabbing";
}

function onMouseMove(e) {
  if (MOUSE_DOWN) {
    transform.translate[0] = e.clientX - startPoint.x + startTranslate[0]
    transform.translate[1] = e.clientY - startPoint.y + startTranslate[1]
    UPDATE_FLAG = true
  }
}

function onMouseUp(e) {
  MOUSE_DOWN = false
  const stage = document.getElementById(cloud3stage)
  if (stage) {
    stage.className = ""
  }
}

var touchType = null;
var startDistance = null;
var scaleCenter = {
  cx: 0,
  cy: 0
}
function onTouchStart(e) {
  if (e.touches.length === 1) {
    // 单指拖动
    touchType = 1;
    startPoint = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    startTranslate = [transform.translate[0], transform.translate[1]]
  } else {
    // 多指缩放
    touchType = 2;
    scaleCenter.cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    scaleCenter.cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    startDistance = Math.sqrt(
      (e.touches[0].clientX - e.touches[1].clientX) ** 2 +
      (e.touches[0].clientY - e.touches[1].clientY) ** 2
    )
  }
}

function onTouchMove(e) {
  e.stopPropagation();
  e.preventDefault();
  // console.log(e);
  if (touchType === 1) {
    transform.translate[0] = e.touches[0].clientX - startPoint.x + startTranslate[0]
    transform.translate[1] = e.touches[0].clientY - startPoint.y + startTranslate[1]
    UPDATE_FLAG = true
  } else if (touchType === 2) {
    const distance = Math.sqrt(
      (e.touches[0].clientX - e.touches[1].clientX) ** 2 +
      (e.touches[0].clientY - e.touches[1].clientY) ** 2
    );

    let scale = distance / startDistance;
    scale = Math.max(scale * transform.scale, 0.3);
    scale = Math.min(scale, 2);

    transform.scale = scale;

    startDistance = distance
    UPDATE_FLAG = true
  }
}


function changeScale(scale) {
  transform.scale = scale;
  UPDATE_FLAG = true
}

var UPDATE_FLAG = false;
function setTransform() {

  if (UPDATE_FLAG) {
    group
      .attr(
        "transform",
        `translate(${transform.translate[0]}, ${transform.translate[1]}) scale(${transform.scale})`
      )

    UPDATE_FLAG = false
  }

  requestAnimationFrame(setTransform);
}

