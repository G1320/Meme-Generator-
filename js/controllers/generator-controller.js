function onInit() {
  gElCanvas = document.querySelector('#my-canvas');
  gCtx = gElCanvas.getContext('2d');

  addListeners();
  renderTexts();
  updateTextInput();
  renderGalleryImgs();
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

function clearTextInput() {
  document.querySelector('.txt').value = '';
}

function updateTextInput() {
  const { txt } = getLineInfo(gMeme.selectedLineIdx);
  document.querySelector('.txt').value = txt;
}

function onClickedAddLine() {
  createLine();
}

function onChangedFontSize() {
  updateLineFontSize();
  clearCanvas();
  renderTexts();
}

function onChangedFont(font) {
  updateLineFont(font);
  clearCanvas();
  renderTexts();
}

function onChangedLineText() {
  updateLineTxt();
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
  updateLineColor();
  renderTexts();
}
