var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      align: 'left',
      color: 'red',
      font: 'Impact',
      lat: 50,
      lan: 200,
    },
  ],
};

function createLine() {
  const { txt, fontSize: size, color, font } = getTxtInfo();

  if (!txt) return;
  gMeme.lines.push({
    txt,
    size,
    align: 'center',
    color: color,
    font,
    lat: gMeme.lines.length * 50 + 50,
    lan: gElCanvas.width / 2,
  });
  gMeme.selectedLineIdx++;
  renderTexts();
  clearTextInput();
  renderSelectedLineIdx();
}

function getLineInfo(selectedLineIdx) {
  if (!gMeme.lines.length) return;
  return gMeme.lines[selectedLineIdx];
}

function changeLineFontSize() {
  const { fontSize } = getTxtInfo();

  gMeme.lines[gMeme.selectedLineIdx].size = fontSize;
}

function changeLineFont() {
  const { font } = getTxtInfo();

  gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function changeLineColor() {
  const { color } = getTxtInfo();

  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function changeLineText() {
  const { txt } = getTxtInfo();

  if (!txt) return;
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}
