function removeAds() {
    // Remove the first set of ads
    document.querySelectorAll('.flex.items-center.justify-center.top-0.left-0.right-0.absolute.z-10.w-5\\/6')
        .forEach(el => el.remove());

    // Remove the second set of ads
    document.querySelectorAll('.flex.items-center.justify-center.right-0.absolute.z-10.w-1\\/4.bottom-\\[30\\%\\]')
        .forEach(el => el.remove());
}

// Run the removeAds function once the page is fully loaded
window.addEventListener('load', removeAds);

// Optionally, set up a MutationObserver to watch for dynamically added elements
const observer = new MutationObserver(removeAds);
observer.observe(document.body, { childList: true, subtree: true });

function executeRewind(seconds) {
    const video = document.querySelector('video.vjs-tech');
    if (video) {
        video.currentTime -= seconds;  // Rewind the video by the specified number of seconds
    }
}

function executeFullScreen() {
    const video = document.querySelector('video.vjs-tech');
    if (video) {
         video.webkitRequestFullscreen();
    }
}

// Function to go to live video (set to latest available timestamp)
function executeGoLive() {
    const video = document.querySelector('video.vjs-tech');
    if (video) {
        video.currentTime = video.seekable.end(0);  // Move to the latest available point
    }
}

function injectButtons() {
    // Select the target element where buttons should be inserted above
    const targetElement = document.querySelector('.relative.aspect-video');
    if (!targetElement) return;

    // Create a container for buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = "relative flex justify-center items-center gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide my-4";

    const buttons = [
        { id: "rewind-5", text: "⏪ 5s", action: () => executeRewind(5) },
        { id: "rewind-10", text: "⏪ 10s", action: () => executeRewind(10) },
        { id: "rewind-30", text: "⏪ 30s", action: () => executeRewind(30) },
        { id: "go-live", text: "LIVE", action: executeGoLive },
        { id: "fullscreen-btn", text: "🔲 Fullscreen", action: executeFullScreen }
    ];

    buttons.forEach(({ id, text, action }) => {
        const button = document.createElement("button");
        button.id = id;
        button.innerText = text;
        button.className = "flex items-center whitespace-nowrap rounded-6xl bg-neutral-900 px-2.5 py-1.5 text-sm font-medium leading-6 text-primary outline-none ring-2 ring-inset ring-transparent enabled:hover:bg-primary-200 enabled:hover:text-neutral-200 enabled:focus-visible:ring-primary enabled:active:bg-primary-200/90 enabled:active:text-neutral-200 group-[.active]:bg-primary group-[.active]:text-neutral-900 xl:px-3 xl:text-base disabled:opacity-40 transition-all group min-w-[3rem]";
        button.style.marginLeft = "0.5rem"
        button.style.color = "rgb(var(--neutral-50)/var(--tw-text-opacity))"

        button.addEventListener("click", action);
        buttonContainer.appendChild(button);
    });

    // Insert button container before the target element
    targetElement.parentNode.insertBefore(buttonContainer, targetElement);
}
// Run the removeAds function once the page is fully loaded
window.addEventListener('load', injectButtons);