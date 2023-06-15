/* eslint-disable consistent-return */
import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
	try {
		const {
			data: { data },
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
			{
				params: {
					bl_latitude: sw.lat,
					bl_longitude: sw.lng,
					tr_longitude: ne.lng,
					tr_latitude: ne.lat,
				},
				headers: {
					"x-rapidapi-key":
						"a52f32f946msh5a1c49514c7a31dp12991ejsnb066e14d9289",
					"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
				},
			}
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getWeatherData = async (lat, lng) => {
	try {
		if (lat && lng) {
			const { data } = await axios.get(
				"https://weatherapi-com.p.rapidapi.com/current.json",
				{
					params: {q: lat, lng },
					
					headers: {
						'X-RapidAPI-Key': '3b3676e638mshe87f0af3a90007bp142a0djsn3cc08811f512',
						'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
					  }
				}
			);

			return data;
		}
	} catch (error) {
		console.log(error);
	}
};
