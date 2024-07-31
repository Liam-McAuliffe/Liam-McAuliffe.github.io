const streamContainer = document.getElementById("stream-container");
const loadingMessage = document.getElementById("loading-message");
const activeStream = document.getElementById("active-stream");

const channelName = "xqc";
const twitchClientId = "YOUR_TWITCH_CLIENT_ID"; // Replace with your Twitch Client ID

async function checkStreamStatus() {
  try {
    // Check Twitch status
    const twitchResponse = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
      {
        headers: {
          "Client-ID": twitchClientId,
          Authorization: "Bearer YOUR_TWITCH_ACCESS_TOKEN", // Replace with your Twitch access token
        },
      }
    );
    const twitchData = await twitchResponse.json();

    if (twitchData.data && twitchData.data.length > 0) {
      // xQc is live on Twitch
      loadingMessage.style.display = "none";
      activeStream.innerHTML = `
        <div id="twitch-embed"></div>
      `;
      new Twitch.Player("twitch-embed", { channel: channelName });
      return;
    }

    // Check Kick status (Kick doesn't have a public API, so we'll assume he's live on Kick if not on Twitch)
    loadingMessage.style.display = "none";
    activeStream.innerHTML = `
      <iframe
        src="https://player.kick.com/${channelName}"
        height="720"
        width="1280"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true">
      </iframe>
    `;
  } catch (error) {
    console.error("Error checking stream status:", error);
    loadingMessage.textContent =
      "Error checking stream status. Please refresh the page.";
  }
}

checkStreamStatus();
