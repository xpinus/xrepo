# Konva 


```js
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

```