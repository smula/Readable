export const formatTime = unixTimestamp => {
    const date = new Date(unixTimestamp);
    const year = date.getFullYear();
    const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
    const day = date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`;
    const formatedTime = `${year}-${month}-${day}`;

    return formatedTime;
}
