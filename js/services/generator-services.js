let gCurrLineLat;

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

function createLine(x, y, align) {
  console.log('Created a line!');
  const { txt, fontSize: size, color } = getTxtInfo();

  gMeme.lines.push({
    txt,
    size,
    align: align || 'center',
    color: color,
    // lat: lat || 0,
  });
  // drawText(txt, x, y, size, color, font);
  gMeme.selectedLineIdx++;
  gCurrLineLat += 50;
  renderTexts();
  //

  console.log('gMeme.lines: ', gMeme.lines);
}

function moveLineUp(selectedLineIdx = 0) {
  gCurrLineHeight += 10;
  clearCanvas();
}

function getLineInfo(selectedLineIdx) {
  if (!gMeme.lines.length) return;
  const { txt, size, align, color } = gMeme.lines[selectedLineIdx];
  return { txt, size, align, color };
}

function getLastLine() {
  return gMeme.lines.pop();
}
