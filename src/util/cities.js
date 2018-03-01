import { memoize } from "underscore";
import { cities } from "../constants/cities";

export const getCityPosition = memoize(name => {
  const [city] = cities.filter(city => city.name.toLowerCase() === name.toLowerCase());
  if (!city) {
    return false;
  }
  return [city.lng, city.lat];
});
