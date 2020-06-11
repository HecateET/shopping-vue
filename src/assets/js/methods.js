
export const formatTime = (date) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1, month = month < 10 ? '0' + month : month;
    var day = date.getDate(), day = day < 10 ? '0' + day : day;
    return year + '-' + month + '-' + day;
}
/**
 * 获取固定格式的日期
 * @param {Date} date 传入的日期
 * @return {Object} 
 */
export const getFormatDate = (date) => {
    if (!typeOfDate(date)) {
        return { date: [] };
    }
    let today = new Date(Date.now() + serverTimeDiff);
    today.setHours(0, 0, 0, 0);
    
    date = new Date(date);
    date.setHours(0, 0, 0, 0);

    let version = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let enWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    let week = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
    let enMonth = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    let month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'][date.getMonth()];
    return {
        date: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
        enWeek: enWeek,
        week: week,
        version: version,
        enMonth: enMonth,
        month: month,
    }
}