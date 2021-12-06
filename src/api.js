async function getweather () {

    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/131928?apikey=SI5CGkV2GkHfHZARLw9La9DIYQchBu2F&language=fr-fr`;
    const response = await fetch(url);
    const data = await response.json();
    return data.Headline.Category;
}
