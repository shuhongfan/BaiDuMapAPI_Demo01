export const formatNumber = (n: number | string): string => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};
export const formatYearData = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return year + "年" + month + "月" + day + "日";
};
export const formatTimeData = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return month + "月" + day + "日";
};
export const formatTime = (date: Date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [hour, minute, second].map(formatNumber).join(":");
};

export const before30Day = () => {
  const date = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 29);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join("-");
};

export const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join("-");
};
export const changeArr = (arr) => {
  let tgArr = [];
  arr.forEach((n) => {
    let stData = { year: "", data: [] };
    let ind = -1;
    if (tgArr.length != 0) {
      ind = tgArr.findIndex((it) => it.year == n.year);
    }
    if (ind != -1) {
      tgArr[ind].data.push(n);
    } else {
      stData.year = n.year;
      stData.data.push(n);
      tgArr.push(stData);
    }
  });
  return tgArr;
};
