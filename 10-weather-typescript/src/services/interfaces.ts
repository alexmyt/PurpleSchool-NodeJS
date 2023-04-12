export interface openWeatherData {
  name: string,
  weather: { description: string, icon: string }[],
  main: {
    temp: number,
    feels_like: number,
    humidity: number,
    pressure: number,
  },
  wind: {
    speed: number,
  }
}
