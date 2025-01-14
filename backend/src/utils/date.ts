const oneMonthFromNow = () => 
    new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);

const tenMinutesFromNow = () => 
    new Date(new Date().getTime() + 10 * 60 * 1000);

export { oneMonthFromNow, tenMinutesFromNow }