function onInit() {
  gElCanvas = document.querySelector('#my-canvas');
  gCtx = gElCanvas.getContext('2d');
  resizeCanvas();
  addListeners();
  getImgForDisplay();
  renderTexts();
  // addEventListener('resize', () => {
  //   resizeCanvas();
  // });
}

function renderCanvas() {
  //Set the background color to grey
  gCtx.fillStyle = '#ede5ff59';
  //Clear the canvas,  fill it with grey background
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
  renderCircle();
}

function renderTexts() {
  // !gCurrImg ? clearCanvas() : renderImg(gCurrImg);
  //prettier-ignore
  gMeme.lines.forEach((line, idx )=> {
    // console.log('line: ', line);
    let x = 175;
    gCurrLineLat = idx * 50 + 50
    let y = gCurrLineLat ;

    const { txt, size, align, color } = getLineInfo(idx);
    drawText(txt, x, y, size, color, 'impact', align);
  });
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
  //Listen for resize ev
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown);
  gElCanvas.addEventListener('touchmove', onMove);
  gElCanvas.addEventListener('touchend', onUp);
}

function onSelectShape(shape) {
  setShape(shape);
}
