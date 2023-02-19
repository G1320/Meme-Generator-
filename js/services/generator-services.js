var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Your Text Here',
      size: 20,
      align: 'left',
      color: 'purple',
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

  if (!fontSize) return;
  gMeme.lines[gMeme.selectedLineIdx].size = fontSize;
}

function changeLineFont(font) {
  // const { font } = getTxtInfo();

  if (font.length < 4) return;
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
