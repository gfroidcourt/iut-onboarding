const ical = require('node-ical');

//automatically get icals from parameters
export let parseEvents = async (schedulerId, dateParam) => {
    const events = ical.fromURL(`http://127.0.0.1/api/scheduler/hyperplanning/${schedulerId}/${dateParam}`);
    console.log(events)
    return events;
}