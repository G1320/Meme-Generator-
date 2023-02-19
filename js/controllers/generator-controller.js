function onInit() {
  gElCanvas = document.querySelector('#my-canvas');
  gCtx = gElCanvas.getContext('2d');

  // resizeCanvas();
  addListeners();
  renderTexts();
  updateTextInput();
  renderGalleryImgs();
}

function renderGalleryImgs() {
  // var books = getBooks()
  const imgs = getImgs();
  console.log(imgs);

  var strHtmls = imgs.map(
    (img) => `
    <img onclick="renderImg(this),showClickedPage('generator')" src="img/meme-imgs (square)/${img.url}" alt="">
        `
  );

  document.querySelector('.gallery-container').innerHTML = strHtmls.join('');
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

function getTxtInfo() {
  const txt = document.querySelector('.txt').value;
  const font = document.querySelector('.font').value;
  const fontSize = document.querySelector('.font-size').value;
  const color = document.querySelector('.color-selector').value;
  changeColor(color);
  return { txt, fontSize, font, color };
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
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

function clearTextInput() {
  document.querySelector('.txt').value = '';
}

function updateTextInput() {
  const { txt } = getLineInfo(gMeme.selectedLineIdx);
  document.querySelector('.txt').value = txt;
}

function onClickedAddLine() {
  let x = null;
  let y = null;
  createLine(x, y);
}

function onChangedFontSize() {
  changeLineFontSize();
  clearCanvas();
  renderTexts();
}

function onChangedFont(font) {
  changeLineFont(font);
  clearCanvas();
  renderTexts();
}

function onChangedLineText() {
  changeLineText();
  clearCanvas();
  renderTexts();
}

function onClickedMoveLine(direction) {
  moveLine(direction);
}

function onClickedSelectNextLine() {
  selectNextLine();
  updateTextInput();
}

function onClickedSelectPrevLine() {
  selectPrevLine();
  updateTextInput();
}

function onChangeColor(color) {
  changeColor(color);
  changeLineColor();
  renderTexts();
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
  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev);
  // console.log('pos', pos)
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

  const { txt, fontsize, color } = getLineInfo(gMeme.selectedLineIdx);
  // The draw shape again in every move to new pos
  drawText(x, y, txt, fontsize, color, diff);
  gLastPos = pos;
  gLastDiff = diff;
}

function onUp() {
  console.log('Up');
  gIsDrag = false;
  document.body.style.cursor = 'grab';
}
