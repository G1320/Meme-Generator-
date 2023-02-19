function renderGalleryImgs() {
  const imgs = getImgs();
  console.log(imgs);
  var strHtmls = imgs.map(
    (img) => `
      <img onclick="renderImg(this),showClickedPage('generator')" src="img/meme-imgs (square)/${img.url}" alt="">
          `
  );

  document.querySelector('.gallery-container').innerHTML = strHtmls.join('');
}
