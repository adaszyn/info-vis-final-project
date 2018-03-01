import { memoize } from "underscore";
import { regions } from "../constants/regions";

export const getRegionPosition = memoize(name => {
  const [region] = regions.filter(region => region.name === name);
  if (!region) {
    return false;
  }
  return [region.lng, region.lat];
});
