const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date) {
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, '0');
  var day = date.getDate().toString().padStart(2, '0');
  return year + '-' + month + '-' + day;
}

  // 格式化日期为 MM-DD 格式
  function formatMMDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
}

module.exports = {
  formatTime,
  formatDate,
  formatMMDate
}
