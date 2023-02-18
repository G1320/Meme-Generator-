const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend'];

let gElCanvas;
let gCtx;
let gCurrShape = 'text';
// let gStartPos
let gLastPos = { x: null, y: null };
let gIsDrag;
let gColor;
let gLastDiff;
let gClickedPos;
let gCurrImg;

function setShape(shape) {
  gCurrShape = shape;
}

function getImgForDisplay() {
  var img = document.querySelector('img .gallery-container');
  console.log('img: ', img);
  // const img = getImgFromGallery();
  // console.log('img: ', img);
  // console.log('id: ', url);
  // console.log('url: ', id);
}

function getEvPos(ev) {
  // Gets the offset pos , the default pos
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  // Check if its a touch ev
  if (TOUCH_EVS.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault();
    //Gets the first touch point
    ev = ev.changedTouches[0];
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function onDown(ev) {
  console.log('Down');
  // const color = gColor;
  let align = 'center';

  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev);
  console.log('pos', pos);
  // let txt = gMeme.lines[0].txt;
  const { x, y } = pos;

  // gClickedPos = pos
  gIsDrag = true;
  //Save the pos we start from
  // gStartPos = pos
  document.body.style.cursor = 'grabbing';
  gLastPos = pos;
}

function onMove(ev) {
  // console.log('move')
  // console.log('ev',ev)
  if (!gIsDrag) return;
  const diff =
    Math.abs(ev.movementX) > Math.abs(ev.movementY) ? Math.abs(ev.movementX) : Math.abs(ev.movementY);
  let size = 10 * diff;
  if (size > 100) size = 100;
  if (size < 10) size = 10;

  const pos = getEvPos(ev);

  // Save the last pos , we remember where we`ve been and move accordingly
  // gStartPos = pos
  // console.log('pos',pos)
  const { x, y } = pos;
  //set color
  const color = gColor;
  // The draw shape again in every move to new pos
  // const { txt, fontSize } = getTxtInfo();
  // if (isMouseOnElement(x, y, element)) {
  //   renderImg(gCurrImg);
  // }
  // createLine(x, y, txt, fontSize, align, color);
  drawShape(x, y, size, color, diff);
  gLastPos = pos;
  gLastDiff = diff;
}

function onUp() {
  console.log('Up');
  gIsDrag = false;
  document.body.style.cursor = 'grab';
}

function drawShape(x, y, size, color, diff) {
  console.log('gCurrShape: ', gCurrShape);
  switch (gCurrShape) {
    case 'line':
      drawLine(x, y, size, color, diff);
      break;
  }
}

function drawTextOnInput(txt, x = 200, y = 100, size = 20, font = 'impact', align) {
  const { color } = getTxtInfo();
  clearCanvas();
  // renderTexts();
  gCtx.lineWidth = 1;
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
    // clearCanvas();
    renderTexts();
  }, 1);
}

function drawText(txt, x = 175, y = 100, size = 20, color, font = 'impact', align) {
  gCtx.beginPath();
  console.log(gMeme.lines);

  gCtx.lineWidth = 1;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = color;
  gCtx.font = `${size}px ${font}`;
  gCtx.textAlign = 'center';
  gCtx.textBaseline = 'middle';
  console.log('Drew');
  gCtx.fillText(txt, x, y); // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(txt, x, y); // Draws (strokes) a given text at the given (x, y) position.
}

function moveLineUp() {
  gMeme.lines[gMeme.selectedLineIdx].lat += -10;
  clearCanvas();
  renderTexts();
}
function moveLineDown() {
  gMeme.lines[gMeme.selectedLineIdx].lat += 10;
  clearCanvas();
  renderTexts();
}
function moveLineLeft() {
  gMeme.lines[gMeme.selectedLineIdx].lan += -10;
  clearCanvas();
  renderTexts();
}
function moveLineRight() {
  gMeme.lines[gMeme.selectedLineIdx].lan += 10;
  clearCanvas();
  renderTexts();
}

function selectPrevLine() {
  gMeme.selectedLineIdx--;
}
function selectNextLine() {
  gMeme.selectedLineIdx++;
}

function drawLine(x, y, size, color, diff) {
  // if (Math.abs(diff- gLastDiff)>5) {
  if (diff === gLastDiff) gCtx.beginPath();
  const x1 = gLastPos.x;
  const y1 = gLastPos.y;
  gCtx.moveTo(x, y);
  gCtx.lineTo(x1, y1);

  gCtx.lineWidth = size / 15;
  gCtx.strokeStyle = color;
  gCtx.stroke();
}

function getTxtInfo() {
  const txt = document.querySelector('.txt').value;
  const font = document.querySelector('.font').value;
  const fontSize = document.querySelector('.font-size').value;

  const color = document.querySelector('.color-selector').value;
  gColor = color;
  return { txt, fontSize, font, color };
}

function changeColor(color) {
  gColor = color;
}

function clearCanvas(isTrue) {
  if (isTrue) {
    gMeme.lines = [];
    gMeme.selectedLineIdx = -1;
  }
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  if (gCurrImg) renderImg(gCurrImg);
  console.log('Cleared Canvas');
}

function renderImg(img) {
  console.log('Rendered img');
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
    default:
      break;
  }
}
