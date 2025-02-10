document.getElementById("download-last-10sec").addEventListener("click", () => downloadLast10Seconds());

function downloadLast10Seconds() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: executeDownloadLast10Seconds
        });
    });
}

function executeDownloadLast10Seconds() {
    const video = document.querySelector('video.vjs-tech');
    if (!video) return;

    // Get the video duration and set the start time to 10 seconds before the end
    const videoDuration = video.currentTime;
    const startTime = Math.max(videoDuration - 10, 0);  // Ensure it's not negative

    // Set the video to start at that point
    video.currentTime = startTime;

    // Set up the MediaRecorder to record the video
    const stream = video.captureStream();
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (event) => {
        chunks.push(event.data);
    };

    recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);

        // Create a download link for the video
        const a = document.createElement('a');
        a.href = url;
        a.download = "last-10-seconds.mp4";  // Filename for the download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Clean up the object URL
        URL.revokeObjectURL(url);
    };

    // Start recording for 10 seconds
    recorder.start();
    setTimeout(() => {
        recorder.stop();
    }, 10000);  // Stop recording after 10 seconds
}
