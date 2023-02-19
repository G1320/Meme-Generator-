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
