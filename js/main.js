let gElCanvas;
let gCtx;
let gColor;
let gCurrImg;

function drawTextOnInput(txt, x = 200, y = 100, size = 20) {
  const { color, font } = getTxtInfo();
  clearCanvas();
  gCtx.lineWidth = 0.1;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = color;
  gCtx.font = `${size}px ${font}`;
  gCtx.textAlign = 'center';
  gCtx.textBaseline = 'middle';

  gCtx.fillText(txt, x, 380);
  gCtx.strokeText(txt, x, 380);

  setTimeout(() => {
    renderTexts();
    setTimeout(() => {
      clearCanvas();
      renderTexts();
    }, 2000);
  }, 0.1);
}

function drawText(txt, x, y, size, color, font) {
  gCtx.beginPath();
  gCtx.lineWidth = 0.1;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = color;
  gCtx.font = `${size}px ${font}`;
  gCtx.textAlign = 'center';
  gCtx.textBaseline = 'middle';
  gCtx.fillText(txt, x, y);
  gCtx.strokeText(txt, x, y);
}

function moveLine(direction) {
  if (gMeme.selectedLineIdx === -1) return;
  switch (direction) {
    case 'up':
      gMeme.lines[gMeme.selectedLineIdx].lat += -10;
      break;
    case 'down':
      gMeme.lines[gMeme.selectedLineIdx].lat += 10;
      break;
    case 'left':
      gMeme.lines[gMeme.selectedLineIdx].lan += -10;
      break;
    case 'right':
      gMeme.lines[gMeme.selectedLineIdx].lan += 10;
      break;
  }
  clearCanvas();
  renderTexts();
}

function selectPrevLine() {
  if (gMeme.selectedLineIdx === 0) return;
  gMeme.selectedLineIdx--;
  renderSelectedLineIdx();
}

function selectNextLine() {
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1) return;
  gMeme.selectedLineIdx++;
  renderSelectedLineIdx();
}

function renderSelectedLineIdx() {
  clearCanvas();
  drawText('Line ' + (gMeme.selectedLineIdx + 1).toString(), 380, 380, 20, gColor);
  renderTexts();
}

function changeColor(color) {
  gColor = color;
}

function clearCanvas(isCalledViaElBtn) {
  if (isCalledViaElBtn) {
    if (gMeme.lines.length > 1 && !confirm('Maybe only the last line?')) {
      gMeme.lines = [];
      gMeme.selectedLineIdx = -1;
    } else {
      gMeme.lines.pop();
      gMeme.selectedLineIdx--;
    }
  }
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  if (gCurrImg) renderImg(gCurrImg);
  renderTexts();
}

function renderImg(img) {
  gCurrImg = img;
  // Draw the img on the canvas
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  renderTexts();
}
