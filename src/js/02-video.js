import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const onTimeUpdate = throttle(({ seconds }) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, seconds);
}, 1000);

player.on('timeupdate', onTimeUpdate);

const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedTime !== null) {
  player.setCurrentTime(savedTime).catch(error => {
    console.error('Failed to set playback time:', error);
  });
}

