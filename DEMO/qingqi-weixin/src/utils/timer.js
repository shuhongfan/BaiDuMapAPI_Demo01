var time = "00:00";
var timeSem = ''
var timer_id = 0;
var tiemsData = 0
let ms = 0,
  s = 0,
  m = 0,
  h = 0;

function timer() { //定义计时函数
  ms = ms + 50; //毫秒
  if (ms >= 1000) {
    ms = 0;
    s = s + 1; //秒
  }
  if (s >= 60) {
    s = 0;
    m = m + 1; //分钟
  }
  if (m >= 60) {
    m = 0;
    h = h + 1; //小时
  }
  time =
    toDub(Number(h * 60) + Number(m)) + ":" + toDub(s);
}

function toDub(n) { //补0操作
  if (n < 10) {
    return "0" + n;
  } else {
    return "" + n;
  }
}
// 分钟转秒
function toSem(time) { //补0操作
  var min = time.split(':')[0];
  var sec = time.split(':')[1];
  timeSem = Number(min * 60) + Number(sec);
  return timeSem
}

function start() {
  timer_id = setInterval(function () {
    timer()
  }, 50);
}

function end() {
  clearInterval(timer_id);
}

function reset() {
  time = "00:00:00";
  ms = 0, s = 0, m = 0, h = 0;
  timer_id = 0;
}

function setIntervalTime() {
  tiemsData = setInterval(function () {
    console.log(time)
    time
  }, 1000)
}

function getTime() {
  return time;
}

module.exports = {
  start: start,
  end: end,
  reset: reset,
  getTime: getTime,
  toSem: toSem,
  setIntervalTime: setIntervalTime
}
