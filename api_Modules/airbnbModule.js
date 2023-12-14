import axios from 'axios';
// import React, { useState } from 'react'

// const [checkin, setCheckin] = useState('');
// const [checkout, setCheckout] = useState('');
// const [adults, setAdults] = useState('');
// const [children, setChildren] = useState('');
// const [pets, setPets] = useState('');

export const getAirbnb = async (query) => {


const airBnbUrl = `http://localhost:3001/airbnb?location=${query}&checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}&pets=${pets}`;

try {
    const response = await axios.get(airBnbUrl, 
   );console.log(response.data);
    return response.data;

} catch (error) {
    console.error('Error fetching airbnbs', error);
    throw error;
    }
};

// const apiCall = async (params)=>{

//     const options = {
//       method: 'GET',
//       url: apiBaseUrl,
//       params: {
//         location: 'Paris',
//         checkin: '2023-09-16',
//         checkout: '2023-09-17',
//         adults: '1',
//         children: '0',
//         infants: '0',
//         pets: '0',
//         page: '1',
//         currency: 'USD'
//       },
//       headers: {
//         'X-RapidAPI-Key': AIRBNB_API_KEY,
//         'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
//       }
//     };
// }

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }
// export const 