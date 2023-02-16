var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      align: 'left',
      color: 'red',
    },
  ],
};

function createLine(x, y, align = 'center', color) {
  const { txt, fontSize: size, font } = getTxtInfo();

  gMeme.lines.push({
    txt,
    size,
    align,
    color,
  });
  drawText(txt, x, y, size, color, font);

  console.log('gMeme.lines: ', gMeme.lines);
}

function getLineInfo(selectedLineIdx) {
  if (!gMeme.lines.length) return;
  const { txt, size, align, color } = gMeme.lines[selectedLineIdx];
  return { txt, size, align, color };
}

function getLastLine() {
  return gMeme.lines.pop();
}

function modifyLine(selectedLineIdx) {
  if (selectedLineIdx === 1) {
    // WILL NEED TO RE RENDER THE COMPLETE CANVAS VOR EACH CHANGE
  }
  //   console.log('selectedLineIdx: ', +selectedLineIdx);
  //   const { txt, font, fontSize } = getTxtInfo();
  //   let x = 100;
  //   let y = 100;
  //   let color = gColor;
  //   let currLine = gMeme.lines[+selectedLineIdx];
  //   console.log('currLine: ', currLine);
  //   currLine.txt = txt;
  //   currLine.font = font;
  //   currLine.fontSize = fontSize;
  //   drawText(txt, x, y, fontSize, color, font);
}
