import axios from 'axios';

const API_KEY = 'AIzaSyDK2pp_ZBOGEV-BZt76whlzUYhaCJOAkEg';
const SEARCH_QUERY = 'art tutorials';

axios.get('https://www.googleapis.com/youtube/v3/search', {
  params: {
    key: API_KEY,
    q: SEARCH_QUERY,
    type: 'video', // Specify the type of content you want (video, playlist, channel).
    part: 'snippet', // You can specify more parts to retrieve additional information.
  },
})
.then(response => {
  console.log(response.data.items); // Handle the video data here.
})
.catch(error => {
  console.error(error);
});
