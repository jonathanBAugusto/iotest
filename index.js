const animationPath = 'https://jonathanbaugusto.github.io/iotest/assets/favicon_animation_frames'

const animationLoop = (frames, intervalMS) => {
    let counter = 0;
    setInterval(() => {
        const favicon = document.getElementById('favico');
        favicon.setAttribute('href', `${animationPath}/frame_${counter}.png`);
        counter < frames ? counter++ : counter= 0;
    }, intervalMS);
}

animationLoop(36, 200);
