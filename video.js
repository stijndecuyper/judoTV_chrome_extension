// Attach event listeners to the buttons with specific rewind times
// document.getElementById("rewind-5").addEventListener("click", () => rewindVideo(5));
// document.getElementById("rewind-10").addEventListener("click", () => rewindVideo(10));
// document.getElementById("rewind-30").addEventListener("click", () => rewindVideo(30));

// Add event listener to the full-screen button
// document.getElementById("fullscreen-btn").addEventListener("click", () => makeFullScreen());

function rewindVideo(seconds) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: executeRewind,
            args: [seconds]
        });
    });
}

function executeRewind(seconds) {
    const video = document.querySelector('video.vjs-tech');
    if (video) {
        video.currentTime -= seconds;  // Rewind the video by the specified number of seconds
    }
}

function makeFullScreen() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: executeFullScreen
        });
    });
}

function executeFullScreen() {
    const video = document.querySelector('video.vjs-tech');
    if (video) {
         video.webkitRequestFullscreen();
    }
}