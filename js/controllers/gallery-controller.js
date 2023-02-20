function renderGalleryImgs() {
  const imgs = getImgs();
  var strHtmls = imgs.map(
    (img) => `
      <img onclick="renderImg(this),onShowClickedPage('generator')" src="img/meme-imgs (square)/${img.url}" alt="">
          `
  );

  document.querySelector('.gallery-container').innerHTML = strHtmls.join('');
}
