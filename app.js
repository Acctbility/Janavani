document.getElementById('tweetForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const tweetText = document.getElementById('tweetText').value;
    const tweetImage = document.getElementById('tweetImage').files[0];
    const tagLokayukta = document.getElementById('tagLokayukta').checked;
    const tagBBMP = document.getElementById('tagBBMP').checked;
    const userName = document.getElementById('userName').value;
    const location = await getLocation();

    let tweetContent = tweetText;

    // Add tags to tweet content
    if (tagLokayukta) {
        tweetContent += ' @LokayuktaKarnataka';
    }
    if (tagBBMP) {
        tweetContent += ' @BBMP';
    }

    // Add user name if provided
    if (userName) {
        tweetContent += ` - ${userName}`;
    }

    console.log('Tweet Content:', tweetContent);
    console.log('Tweet Image:', tweetImage);
    console.log('Location:', location);

    // Add code to post to Twitter using API
});

async function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, reject);
        } else {
            reject('Geolocation not supported');
        }
    });
}
