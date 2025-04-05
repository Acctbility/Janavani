require('dotenv').config();
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

document.getElementById('tweetForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const tweetText = document.getElementById('tweetText').value;
    const tweetImage = document.getElementById('tweetImage').files[0];
    const tagLokayukta = document.getElementById('tagLokayukta').checked;
    const tagBBMP = document.getElementById('tagBBMP').checked;
    const userName = document.getElementById('userName').value;
    const locationElement = document.getElementById('location');
    
    let location = await getLocation();
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

    // Add location to tweet content
    if (location) {
        tweetContent += ` [Location: ${location.latitude}, ${location.longitude}]`;
        locationElement.textContent = `Location: ${location.latitude}, ${location.longitude}`;
        locationElement.style.display = 'block';
    }

    console.log('Tweet Content:', tweetContent);
    console.log('Tweet Image:', tweetImage);
    console.log('Location:', location);

    // Post to Twitter using API
    postTweet(tweetContent, tweetImage);
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

function postTweet(status, media) {
    if (media) {
        // Upload media first
        const formData = new FormData();
        formData.append('media', media);

        fetch('https://upload.twitter.com/1.1/media/upload.json', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${process.env.TWITTER_ACCESS_TOKEN}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const mediaId = data.media_id_string;
            // Now post the tweet with media
            client.post('statuses/update', { status, media_ids: mediaId }, function(error, tweet, response) {
                if (error) {
                    console.error('Error posting tweet:', error);
                } else {
                    console.log('Tweet posted successfully:', tweet);
                }
            });
        })
        .catch(error => console.error('Error uploading media:', error));
    } else {
        // Post the tweet without media
        client.post('statuses/update', { status }, function(error, tweet, response) {
            if (error) {
                console.error('Error posting tweet:', error);
            } else {
                console.log('Tweet posted successfully:', tweet);
            }
        });
    }
}
