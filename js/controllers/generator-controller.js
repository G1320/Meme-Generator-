function onInit() {
  gElCanvas = document.querySelector('#my-canvas');
  gCtx = gElCanvas.getContext('2d');
  resizeCanvas();
  addListeners();
  renderTexts();
}

function renderCanvas() {
  //Set the background color to grey
  gCtx.fillStyle = '#ede5ff59';
  //Clear the canvas,  fill it with grey background
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
  renderCircle();
}

function renderTexts() {
  //prettier-ignore
  gMeme.lines.forEach((line, idx )=> {
    const {lat, lan, txt, size, align, color, font } = getLineInfo(idx);
    drawText(txt, lan, lat, size, color, font, align);
  });
  // setTimeout(() => {
  drawText('Line ' + (gMeme.selectedLineIdx + 1).toString(), 380, 380, 16, 'white');
  // }, 500);
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}

function addListeners() {
  //Listen for resize ev
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
}

function onSelectShape(shape) {
  setShape(shape);
}
