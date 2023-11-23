import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en';

export const fetchTimeAgo = (updatedAt) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  const inSeconds = new Date(updatedAt).getTime();
  const minutesAgo = timeAgo.format(inSeconds - 60 * 1000);
  return minutesAgo;
}
