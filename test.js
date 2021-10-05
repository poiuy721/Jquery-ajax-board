var a=new Date("2021-10-01T01:07:13.979Z");
function formatDate(date) {
    return date.getFullYear() + '년 ' + 
      (date.getMonth() + 1) + '월 ' + 
      date.getDate() + '일 ' + 
      date.getHours() + '시 ' + 
      date.getMinutes() + '분';
  }
a=formatDate(a);
console.log(a);