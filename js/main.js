let gElCanvas;
let gCtx;
let gColor;
let gCurrImg;

function getTxtInfo() {
  const txt = document.querySelector('.txt').value;
  const font = document.querySelector('.font').value;
  const fontSize = document.querySelector('.font-size').value;

  const color = document.querySelector('.color-selector').value;
  gColor = color;
  return { txt, fontSize, font, color };
}

function drawTextOnInput(txt, x = 200, y = 100, size = 20) {
  const { color, font } = getTxtInfo();
  clearCanvas();
  gCtx.lineWidth = 0.1;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = color;
  gCtx.font = `${size}px ${font}`;
  gCtx.textAlign = 'center';
  gCtx.textBaseline = 'middle';

  gCtx.fillText(txt, x, 380); // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(txt, x, 380);
  gCtx.lineWidth = 3;
  gCtx.fill();
  gCtx.stroke();
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
  gCtx.fillText(txt, x, y); // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(txt, x, y); // Draws (strokes) a given text at the given (x, y) position.
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

function showClickedPage(pageName) {
  let generatorPage = document.querySelector('.generator-page');
  let galleryPage = document.querySelector('.gallery-page');
  let aboutPage = document.querySelector('.about-page');
  generatorPage.hidden = true;
  galleryPage.hidden = true;
  aboutPage.hidden = true;

  switch (pageName) {
    case 'generator':
      generatorPage.hidden = false;
      break;
    case 'gallery':
      galleryPage.hidden = false;
      break;
    case 'about':
      aboutPage.hidden = false;
      break;
  }
}
