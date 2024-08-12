const animationPath = 'https://jonathanbaugusto.github.io/iotest/assets/favicon_animation_frames'

const cachedImages = {};


const _blobToBase64 = (blob) => {
  let blobUrl = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = err => reject(err);
    img.src = blobUrl;
  }).then(img => {
    URL.revokeObjectURL(blobUrl);
    let [w, h] = [img.width, img.height]

    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL();
  })
}

const _animationLoop = (frames, intervalMS) => {
  let counter = 0;

  setInterval(() => {
    const favicon = document.getElementById('favico');
    favicon.setAttribute('href', cachedImages[counter]);
    counter < frames ? counter++ : counter = 0;
  }, intervalMS);
}

const _loadImages = async (framesLength) => {
  const promisses = [];

  for (let index = 0; index < framesLength; index++) {
    const frameUrl = `${animationPath}/frame_${index}.png`;
    promisses.push(fetch(frameUrl).then((response) => response.blob()).then(async (blob) => {
      const base64Frame = await _blobToBase64(blob);
      cachedImages[index] = base64Frame;
    }));

  }
  await Promise.all(promisses);
}

const initFaviconAnimationLoop = async (frames, intervalMS) => {
  await _loadImages(frames);
  _animationLoop(frames, intervalMS);
}

initFaviconAnimationLoop(36, 100);

