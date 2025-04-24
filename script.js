// --- START OF FILE script.js ---

document.addEventListener('DOMContentLoaded', () => {
    // Get references to the main screen elements
    const loadingScreen = document.getElementById('loading-screen');
    const mainViewScreen = document.getElementById('main-view'); // The main wrapper visible after loading
    const storyContainer = document.getElementById('story-container'); // Already present

    // Get references to the sections within the story container that need toggling
    const confirmationContent = document.getElementById('confirmation-content');
    const actualStoryContent = document.getElementById('actual-story-content'); // The spacer div
    const storyFooter = document.getElementById('story-footer');

    // Get reference to inner progress bar
    const progressBarInner = document.querySelector('.progress-bar-inner'); // Already present

    // *** Get reference to music animation container ***
    const musicBarsContainer = document.querySelector('.music-animation-bars'); // Added this reference

    // Get reference to the button that triggers the view switch
    const viewStoryButton = document.getElementById('view-story-button');

    // --- Variable to hold the redirect timer ID ---
    let redirectTimerId = null; // <<< ADDED THIS LINE

    // --- Initial Screen Transition ---

    // 1. Loading screen is initially visible (has 'active' class in HTML).
    // 2. After a delay, hide the loading screen and show the main view container.
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.remove('active');
        }
        if (mainViewScreen) {
            mainViewScreen.classList.add('active'); // Show the main view with header, story container etc.
        }
    }, 1500); // 1.5 second loading time (adjust as needed)

    // --- Story View Switch ---

    // Add event listener to the 'View story' button in the confirmation section
    if (viewStoryButton) {
        viewStoryButton.addEventListener('click', () => {
            // --- When the button is clicked: ---
            if (confirmationContent) {
                // 1. Hide the confirmation content
                confirmationContent.classList.remove('active-section');
            }
            if (actualStoryContent) {
                // 2. Show the spacer div (which pushes the footer down)
                actualStoryContent.classList.add('active-section');
            }
            if (storyFooter) {
                // 3. Show the story footer
                storyFooter.classList.add('active-section');
            }

            // 4. Add class to story container to activate background image
            if (storyContainer) {
                storyContainer.classList.add('story-background-active');
            }

            // 5. Start progress bar animation
            if (progressBarInner) {
                 // Reset width just in case it was already animated
                 progressBarInner.style.width = '0%';
                 // Force reflow/repaint before adding class (important for re-triggering)
                 void progressBarInner.offsetWidth;
                 // Add class to start animation
                 progressBarInner.classList.add('animate');
            }

            // *** 6. Start music bar animation ***
            if (musicBarsContainer) { // Added check and class add
                musicBarsContainer.classList.add('playing');
            }

            // --- 7. Start the redirect timer ---  <<< ADDED THIS BLOCK
            // Clear any existing timer first (important if the user closes and reopens quickly)
            if (redirectTimerId) {
                clearTimeout(redirectTimerId);
            }
            // Set a new timer for 13 seconds (13000 milliseconds)
            redirectTimerId = setTimeout(() => {
                console.log("Story finished, redirecting to Instagram...");
                window.location.href = 'https://www.instagram.com/openai/'; // Redirect
            }, 13000); // 13 seconds matching the CSS animation
            // --- End redirect timer ---

            // --- End button click actions ---
        });
    }

    // --- Expose closeApp globally (or attach event listener properly) ---
    // Since the button uses onclick="closeApp()", make sure closeApp is global.
    window.closeApp = function() { // <<< MODIFIED TO MAKE IT GLOBAL
        const mainViewScreen = document.getElementById('main-view');
        const storyContainer = document.getElementById('story-container'); // Already present
        const progressBarInner = document.querySelector('.progress-bar-inner'); // Already present
        const musicBarsContainer = document.querySelector('.music-animation-bars'); // Already present
        const confirmationContent = document.getElementById('confirmation-content'); // Already present
        const actualStoryContent = document.getElementById('actual-story-content'); // Already present
        const storyFooter = document.getElementById('story-footer'); // Already present

        if (mainViewScreen) {
            mainViewScreen.classList.remove('active'); // Hide the entire main view
        }

        // Optional: Remove the background class when closing
        if (storyContainer) {
            storyContainer.classList.remove('story-background-active');
        }

        // Remove animation class and reset progress bar
        if (progressBarInner) {
            progressBarInner.classList.remove('animate');
            progressBarInner.style.width = '0%'; // Reset width
        }

        // *** Stop music bar animation ***
        if (musicBarsContainer) { // Added check and class remove
            musicBarsContainer.classList.remove('playing');
        }

        // --- Clear the redirect timer if it's running --- <<< ADDED THIS BLOCK
        if (redirectTimerId) {
            clearTimeout(redirectTimerId);
            redirectTimerId = null; // Reset the timer ID variable
            console.log("Redirect timer cancelled.");
        }
        // --- End clear timer ---

        // Reset sections visibility
        if (confirmationContent) confirmationContent.classList.add('active-section');
        if (actualStoryContent) actualStoryContent.classList.remove('active-section');
        if (storyFooter) storyFooter.classList.remove('active-section');

        console.log("Main view hidden / App closed simulation.");
    }

}); // End DOMContentLoaded

// --- Remove the standalone closeApp function if it exists below ---
// function closeApp() { ... } // DELETE THIS if it's outside DOMContentLoaded

// --- END OF FILE script.js ---