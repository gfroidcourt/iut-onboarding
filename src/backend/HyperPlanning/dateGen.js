let getWeekNumber = async (d) => {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(
        ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

let a2hex = async (str) => {
    const arr = [];
    for (let i = 0, l = str.length; i < l; i++) {
        const hex = Number(str.charCodeAt(i)).toString(16);
        arr.push(hex);
    }
    return arr.join("");
}

