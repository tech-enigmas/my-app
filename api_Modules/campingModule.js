// const axios = require('axios');
import axios from 'axios';

const campingData = async (req, res, next) => {
  const { query } = req.query;
  const url = `https://ridb.recreation.gov/api/v1/facilities?query=${query}&limit=5&activity=6,CAMPING`;
  const config = {
    headers: {
      apikey: process.env.CAMPING_API_KEY
    }
  };
  axios.get(url, config)
    .then(response => response.data.RECDATA.map(site => new Campsite(site)))
    .then(formattedData => res.status(200).send(formattedData))
    .catch(error = next(error));
} 

class Campsite {
  constructor(campingObj){
    this.site = campingObj.FacilityName;
    this.fee = campingObj.FacilityUseFeeDescription;
    this.description = campingObj.FacilityTypeDescription;
    this.image = campingObj.MEDIA;
  }
}
module.export = campingData;