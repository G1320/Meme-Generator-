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
      lat: 50,
      lan: 200,
    },
  ],
};

function createLine(x, y, align) {
  const { txt, fontSize: size, color } = getTxtInfo();
  if (!txt) return;
  gMeme.lines.push({
    txt,
    size,
    align: align || 'center',
    color: color,
    lat: gMeme.lines.length * 50 + 50,
    lan: gElCanvas.width / 2,
  });
  // drawText(txt, x, y, size, color, font);
  console.log('Created a line!');
  gMeme.selectedLineIdx++;
  gCurrLineLat += 50;
  renderTexts();
  //

  console.log('gMeme.lines: ', gMeme.lines);
}

function getLineInfo(selectedLineIdx) {
  if (!gMeme.lines.length) return;
  const { lat, lan, txt, size, align, color } = gMeme.lines[selectedLineIdx];
  return { lat, lan, txt, size, align, color };
}

function getLastLine() {
  return gMeme.lines.pop();
}
