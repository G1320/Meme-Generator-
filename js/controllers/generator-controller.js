function onInit() {
  gElCanvas = document.querySelector('#my-canvas');
  gCtx = gElCanvas.getContext('2d');

  resizeCanvas();
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
    (img, idx) => `
    
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
  //Listen for resize ev
  window.addEventListener('resize', () => {
    resizeCanvas();
    renderTexts();
    renderImg(gCurrImg);
  });
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
