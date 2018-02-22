import CONFIG from "../config";
import qs from "querystring";
import axios from "axios";
import moment from "moment";
import { DATE_FORMAT } from '../util/range-util';

export const fetchCrimes = ({ startDate, endDate, startHour, endHour, boundingBox }) => {
  const startTime = moment(startDate, DATE_FORMAT).unix();
  const endTime = moment(endDate, DATE_FORMAT).unix();
  const lat2 = boundingBox.ne.lat; 
  const lat1 = boundingBox.sw.lat; 
  const lng2 = boundingBox.ne.lng; 
  const lng1 = boundingBox.sw.lng;
  const query = qs.encode({ startTime, endTime, lat1, lat2, lng1, lng2, startHour, endHour });
  return axios.get(`${CONFIG.apiBase}/crime?${query}`)
    .then(response => {
        return response.data;
    })
    .catch(err => console.log(err))
};


export const fetchAggregatedCrimeTypes = ({ startDate, endDate, boundingBox, limit = 8, startHour, endHour }) => {
    const lat2 = boundingBox.ne.lat; 
    const lat1 = boundingBox.sw.lat; 
    const lng2 = boundingBox.ne.lng; 
    const lng1 = boundingBox.sw.lng;

    const startTime = moment(startDate, DATE_FORMAT).unix();
    const endTime = moment(endDate, DATE_FORMAT).unix();
    const query = qs.encode({ startTime, endTime, lat1, lat2, lng1, lng2, limit, startHour, endHour });
    return axios.get(`${CONFIG.apiBase}/type?${query}`)
      .then(response => {
          return response.data;
      })
      .catch(err => console.log(err))
  };
  

export const fetchAggregatedCities = ({ startDate, endDate, boundingBox, limit = 8, startHour, endHour }) => {
    const lat2 = boundingBox.ne.lat; 
    const lat1 = boundingBox.sw.lat; 
    const lng2 = boundingBox.ne.lng; 
    const lng1 = boundingBox.sw.lng;

    const startTime = moment(startDate, DATE_FORMAT).unix();
    const endTime = moment(endDate, DATE_FORMAT).unix();
    const query = qs.encode({ startTime, endTime, lat1, lat2, lng1, lng2, limit, startHour, endHour });
    return axios.get(`${CONFIG.apiBase}/city?${query}`)
      .then(response => {
          return response.data;
      })
      .catch(err => console.log(err))
  };
  
  export const fetchAggregatedRegions = ({ startDate, endDate, boundingBox, limit = 8, startHour, endHour }) => {
    const lat2 = boundingBox.ne.lat; 
    const lat1 = boundingBox.sw.lat; 
    const lng2 = boundingBox.ne.lng; 
    const lng1 = boundingBox.sw.lng;

    const startTime = moment(startDate, DATE_FORMAT).unix();
    const endTime = moment(endDate, DATE_FORMAT).unix();
    const query = qs.encode({ startTime, endTime, lat1, lat2, lng1, lng2, limit, startHour, endHour });
    return axios.get(`${CONFIG.apiBase}/region?${query}`)
      .then(response => {
          return response.data;
      })
      .catch(err => console.log(err))
  };

  export const fetchAggregatedHours = ({ startDate, endDate, boundingBox }) => {
    const lat2 = boundingBox.ne.lat; 
    const lat1 = boundingBox.sw.lat; 
    const lng2 = boundingBox.ne.lng; 
    const lng1 = boundingBox.sw.lng;

    const startTime = moment(startDate, DATE_FORMAT).unix();
    const endTime = moment(endDate, DATE_FORMAT).unix();
    const query = qs.encode({ startTime, endTime, lat1, lat2, lng1, lng2 });
    return axios.get(`${CONFIG.apiBase}/hour?${query}`)
      .then(response => {
          const values = Array.from(new Array(24), () => 0);
          for (let {label, value} of response.data) {
            values[parseInt(label)] = value;
          }
          return values;
      })
      .catch(err => console.log(err))
  };
  