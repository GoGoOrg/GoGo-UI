import { useCookies } from "vue3-cookies";

const cookies = useCookies();

function isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }

export function checkLogin() {
    const tokenBearer = cookies.cookies.get('Token');
    if (tokenBearer == null || tokenBearer == '' || isTokenExpired(tokenBearer)) return false;
  
    return true
};

export function calculateTimeElapse(t: string): string {


    const timeElapsed = Date.now() - Date.parse(t);

    const minutesElapsed = Math.floor(timeElapsed / (1000 * 60));
    const hoursElapsed = Math.floor(timeElapsed / (1000 * 60 * 60));
    const daysElapsed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));

    let content = minutesElapsed + ' phút trước'
    if (minutesElapsed > 60) content = hoursElapsed + ' giờ trước'
    if (hoursElapsed > 24) content = daysElapsed + ' ngày trước'

    return content
}
