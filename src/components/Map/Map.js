import React, { useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery,Box ,InputBase,   InputLabel, OutlinedInput, Radio, FormLabel, FormControlLabel, RadioGroup, } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import mapStyles from "../../mapStyles";
import useStyles from "./styles.js";
import RoomIcon from '@mui/icons-material/Room';
import {GoogleMap, Marker, Autocomplete, DirectionsRenderer} from "@react-google-maps/api";
const center = { lat: 48.8584, lng: 2.2945 };
const Map = ({
	coords,
	places,
	setCoords,
	setBounds,
	setChildClicked,
	weatherData,
	type
}) => {
	const matches = useMediaQuery("(min-width:600px)");
	const classes = useStyles();
	const [map, setMap] = useState(/** @type google.maps.Map */ (null));
	/** @type React.MutableRefObject<HTMLInputElement> */
	const originRef = useRef();
	/** @type React.MutableRefObject<HTMLInputElement> */
	const distiantRef = useRef();
	const [selectedValue, setSelectedValue] = React.useState('place');

	const handleChange = (event) => {
	  setSelectedValue(event.target.value);
	  console.log(event.target.value)
	};
	
														
	const [directionsResponse, setDirectionsResponse] = useState(null);
	const [distance, setDistance] = useState("");
	const [duration, setDuration] = useState("");
	const [Search, setSearch] = useState("");
	const [CurrentLocation, setCurrentLocation] = useState("2 Aubrey Matlakala St, Soshanguve - K, Soshanguve, 0001, South Africa");
	const [DestinationLocation, setDestinationLocation] = useState("")
	/* eslint-disable no-undef */
	const geocoder = new google.maps.Geocoder();
	/* eslint-disable no-undef */
		const infowindow = new google.maps.InfoWindow();
	
	const getC=(c)=>{
console.log(c) 
setCoords({ lat: c.lat, lng: c.lng });
readCodes()
	}
	const [RestuarentSosha, setRestuarentSosha] = useState([{name:"Roroza Cafe",photo:{images:{large:{url:"https://lh3.googleusercontent.com/p/AF1QipPVnhi6JpxKkdNUWKTcqozdEE3R-n3N-E08lNxH=s680-w680-h510"}}},phone:"076 345 9828",address:"Block W LKK, Soshanguve, 0152",rating:3.8,num_reviews:80,latitude:"-25.436880",longitude:"28.108220",category:{key:"restaurant"}},
	{name:"BT's Grillhouse",photo:{images:{large:{url:"https://lh3.googleusercontent.com/p/AF1QipPeXE2hBrqdQB_SrZibGLbDFB7DW22tbbHffH0y=s680-w680-h510"}}},phone:"076 345 9828",address:"43, M43, Soshanguve - L, Soshanguve, 0152",rating:4.3,num_reviews:23,latitude:"-25.539360",longitude:"28.098540",category:{key:"restaurant"}},
{name:"Cornerflame",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipMnlF5fnWu_mG0N8ER5E8Cu5aKEuRdxUvf25pEz=w408-h306-k-no"}}},phone:"0659695919",address:"1129 Aubrey Matlakala St, Soshanguve - K, Soshanguve, 0152",rating:3.9,num_reviews:130,latitude:"-25.534969398567654",longitude:"28.100941254694664",category:{key:"restaurant"}},

	{name:"Sosha Shisanyama",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipO9Wh4pP4yR8PI5V9jIK4Sj5sSfBtchAUqjsjy-=w408-h543-k-no"}}},phone:"0810219919",address:"2105 Block H, Soshanguve - H, Soshanguve, 0152",rating:4.3,num_reviews:642,latitude:"-25.518853787816802",longitude:"28.109267850989827",category:{key:"restaurant"}},
	{name:"Roman's Pizza Soshanguve Crossing",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipMPzlMX3N77UDnw5FUurOgVTt1syN_F3y_C8mFA=w408-h272-k-no"}}},phone:"0810219919",address:"Shop 68, Soshanguve Crossing Cnr Ruth First Road &, Aubrey Matlakala St, Soshanguve, 0164",rating:3.5,num_reviews:145,latitude:"-25.55196912875425",longitude:"28.08987435284335",category:{key:"restaurant"}},
	{name:"KFC Soshanguve Crossing",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipPh5ValxclKvxiUZeP1Rr5Ut191UFUYboaHQ_MZ=w426-h240-k-no"}}},phone:"0127930577",address:"Shop 62, Shoshanguve Crossing, Cnr Ruth First Rd &, Aubrey Matlakala St, Soshanguve - RR South, Soshanguve, 0152",rating:4.0,num_reviews:752,latitude:"-25.549796704550122",longitude:"28.09035707982718",category:{key:"restaurant"}},
	{name:"McDonald's Soshanguve",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipMSSvHldwwYkd3AcBpUVo9Cn8xC6ZbQDrrTPELH=w426-h240-k-no"}}},phone:"0127933006",address:"Cnr Ruth First Road &, Aubrey Matlakala St, Soshanguve, 0152",rating:3.2,num_reviews:752,latitude:"-25.549774863828166",longitude:"28.090647210515204",category:{key:"restaurant"}}


])

const [RestuarentMamelodi, setRestuarent] = useState([
{name:"Collage kulture",photo:{images:{large:{url:"https://lh3.googleusercontent.com/p/AF1QipOJzou_wLhF2Pk3WVByh8RMBXDjY2K5lrLLGKOE=s680-w680-h510"}}},phone:"082 292 2104",address:"71 1st St, Mamelodi, East, Pretoria, 0122",rating:4.5,num_reviews:124,latitude:"-25.705370",longitude:"28.389130",category:{key:"restaurant"}},
{name:"The Village Mamelodi",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipOPOaKb8Z4bSgxfRFpZBB0YR_5qdlK1dsKMVAt4=w426-h240-k-no"}}},phone:"0718209031",address:"3773 Sibande Ave, Mamelodi - JB3, Mamelodi, 0101",rating:4.5,num_reviews:124,latitude:"-25.704670",longitude:"28.350980",category:{key:"restaurant"}},
{name:"Jack Buda",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipP4DMdK-qTG_1e9rVOxTlgKgcsspezWC48iWic=w408-h306-k-no"}}},phone:"0718209031",address:"Mashabela St, Mamelodi - SA5, Pretoria, 0101",rating:4.1,num_reviews:690,latitude:"-25.713680",longitude:"28.347220",category:{key:"restaurant"}},
{name:"KFC Mamelodi Crossing",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipM6yOT5L-0BbLcf_oz0FFLAFZ0W40IeLjI6A6yZ=w408-h304-k-no"}}},phone:"0124434044",address:"Cnr Waltloo &, Denlyn Shopping Centre, Stormvoël Rd, Mamelodi - FB3, Pretoria, 0122",rating:3.7,num_reviews:801,latitude:"-25.71500621921382",longitude:"28.33407879517859",category:{key:"restaurant"}},
{name:"Baltimore Spur Steak Ranch",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipM_MsBdgO3_4c5YVJlaUvrBww682YpDfHKL9Skr=w458-h240-k-no"}}},phone:"0124434044",address:"Tshwane Regional Mall, Shop GF12B GF13B, Cnr Waltloo &Tsamaya Road, Mamelodi West, Pretoria, 0122",rating:4.2,num_reviews:34,latitude:"-25.71240209524606",longitude:"28.341970287707486",category:{key:"restaurant"}},
{name:"McDonald's Denlyn Mamelodi",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipPN-7VSSyathALOYyBJUn5jZlypP0eX0i2OZKGZ=w426-h240-k-no"}}},phone:"0860000040",address:"Denlyn Shopping Centre, Cnr Stormvoel and Maphala Drive, Mamelodi, Pretoria, 0101",rating:3.8,num_reviews:575,latitude:"-25.71462561744391",longitude:"28.33453881052258",category:{key:"restaurant"}},
{name:"Roman's Pizza Mamelodi Crossing",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipOGT3Fp9KtoPhOuc8jzb7izB-UMcQfOdMtPMQad=w408-h272-k-no"}}},phone:"0128051755",address:"Shop 2A, Mamelodi Crossing Shopping Centre Cnr Tsamaia & Waltloo Roads, Mamelodi - FB3, Pretoria, 0001",rating:3.8,num_reviews:575,latitude:"-25.715064804063488",longitude:"28.333852813492",category:{key:"restaurant"}},

]) 

const [HotelSoshanguve, setHotelSoshanguve] = useState([
	{name:"Diateho Guest House",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipMUKnHEM6-uSyxjfvD8fsUR49Dvxlt2mn4ytrR2=w445-h240-k-no"}}},phone:"0713764750",address:"extension 10, Soshanguve East, 7708 Loapi St, Soshanguve - YY, Soshanguve, 0164",rating:4.0,num_reviews:124,latitude:"-25.55484717537584",longitude:"28.09203569517154",category:{key:"hotel"}},
	{name:"Sunset View Palace Guest House",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipMR1OFecxs-Vpt3p7WJfnR45sZXNB5cQaS_r5g5=w408-h306-k-no"}}},phone:"0120231522",address:"MM, 25/19 Block, Soshanguve, 0152",rating:4.0,num_reviews:124,latitude:"-25.492222907044347",longitude:"28.133516908660653",category:{key:"hotel"}},
	{name:"Goldrush Bingo Morula",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipPUOEpRXMSEKOX3V_uiTGLxnJuWgDHiRquEMXfx=w408-h271-k-no"}}},phone:"0127990000",address:"Lucas Mangope Rd, Mabopane Unit U, Mabopane, 0190",rating:3.7,num_reviews:1453,latitude:"-25.521541928936287",longitude:"28.03346072400598",category:{key:"hotel"}},
	{name:"Lasev Resort",photo:{images:{large:{url:"https://lh5.googleusercontent.com/p/AF1QipMyZaaDzKjx7P2qV2vj2-lTasBmLd3Iekg-ijmA=w408-h306-k-no"}}},phone:"0813884299",address:"Pretoria Rural, Pretoria",rating:3.7,num_reviews:1453,latitude:"-25.550017764200742",longitude:"28.155252983531277"},
	
	]) 
if(places[0]?.address!==undefined&&places[0]?.address.toLowerCase().includes("soshanguve")){
  
 
	places=[...places,...RestuarentSosha]
}
if(places[0]?.address!==undefined&&places[0]?.address.toLowerCase().includes("mamelodi")){
  
 
	places=[...places,...RestuarentMamelodi]
}

if(type=="hotels"){
	places=[...places,...HotelSoshanguve]
}

  
	  // places=	places.concat(Restuarent);
	  
	async function calculateRoute(lat,lng,address) {
		
		/* eslint-disable no-undef */
		setDestinationLocation(address)
		let destination={lat:lat,lng:lng}
		const directionsService = new google.maps.DirectionsService();
		const results = await directionsService.route({
			origin: coords,
			destination: address,
			/* eslint-disable no-undef */
			travelMode: google.maps.TravelMode.DRIVING,
		});
		console.log(results.routes[0].legs[0].distance.text)
		setDirectionsResponse(results);
		setDistance(results.routes[0].legs[0].distance.text);
		setDuration(results.routes[0].legs[0].duration.text);
		
	}
	useEffect(()=>{
		
	},[places])
	useEffect(()=>{
			readCodes()
			setDirectionsResponse("");
		setDistance("");
		setDuration("");
		setDestinationLocation("")
	
	},[coords])
const readCodes =()=>{
	
	  
	  function geocodeLatLng(geocoder) {
		
		const latlng = {
		  lat: parseFloat(coords?.lat),
		  lng: parseFloat(coords?.lng),
		};
	  
		geocoder
		  .geocode({ location: latlng })
		  .then((response) => {
			if (response.results[0]) {
			 
	  console.log(response.results[0].formatted_address)
			 setCurrentLocation(response.results[0].formatted_address)
	  
			} else {
			  console.log("No results found");
			}
		  })
		 
	  }
	  
	  geocodeLatLng(geocoder,  infowindow);
}
	
	return (
		<div className={classes.mapContainer}>
		
		  <Box sx={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"center", alignItems:"center"}}>
		  
				<Box sx={{width:"70%",display:"flex", flexDirection:"row", gap:"10px",justifyContent:"center", alignItems:"center",  margin:0,padding:0}}> 
				<FormControl fullWidth sx={{ m: 1 }}>
					<InputLabel htmlFor="outlined-adornment-amount">Current Location</InputLabel>
					<OutlinedInput
						id="outlined-adornment-amount"
						value={CurrentLocation}
						label="Amount"
					/>
				</FormControl>
		  <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Destination Location</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={DestinationLocation}
            label="Amount"
          />
		  </FormControl>	
				</Box>
				<Box  sx={{width:"30%",display:"flex", flexDirection:"row",justifyContent:"center", alignItems:"center"}}>
				<FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Distance</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={distance}
            label="Amount"
          />
		  </FormControl>
		  <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Drive Duration</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={duration}
            label="Amount"
          />
		  </FormControl>
				</Box>
			</Box>
			<Box>
				
		
							  <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
		defaultValue="place"
      >
        <FormControlLabel value="place" control={<Radio defaultChecked  onChange={(e)=>handleChange(e)}/>} label="Places View" />
        <FormControlLabel value="street" control={<Radio  onChange={(e)=>handleChange(e)} />} label="Street View" />

      </RadioGroup>
    </FormControl>
				</Box>
				{selectedValue=="place"?<GoogleMapReact
				bootstrapURLKeys={{
					key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
				}}
				defaultCenter={coords}
				center={coords}
				defaultZoom={14}
				margin={[50, 50, 50, 50]}
				options={{
					disableDefaultUI: true,
					zoomControl: true,
					styles: mapStyles,
				}}
				onChange={(e) => {
					setCoords({ lat: e.center.lat, lng: e.center.lng });
					setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
				}}
				onChildClick={(child) => setChildClicked(child)}
				onClick={(e)=>getC(e)}
			>
				
				{isNaN(coords.lat)?"":<div
							className={classes.markerContainer}
							lat={Number(coords?.lat)}
							lng={Number(coords?.lng)}
							style={{fontSize:"25px"}}
						>
							<RoomIcon sx={{fontSize:"45px", color:"#FF0000"}}/>
						</div>}
				
				{places.length &&
					places?.filter((c)=>c.name.toLowerCase().includes(Search.toLowerCase())).map((place, i) => (
						<div
							className={classes.markerContainer}
							lat={Number(place.latitude)}
							lng={Number(place.longitude)}
							key={i}
							onClick={()=>calculateRoute(Number(place.latitude),Number(place.longitude),place.address)}
						>
							{!matches ? (
								<LocationOnOutlinedIcon
									color="primary"
									fontSize="large"
								/>
							) : (
								<Paper elevation={3} className={classes.paper}>
									<Typography
										className={classes.typography}
										variant="subtitle2"
										gutterBottom
									>
										{" "}
										{place.name}
									</Typography>
									<img
										className={classes.pointer}
										src={
											place.photo
												? place.photo.images.large.url
												: "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
										} alt=""
									/>
									<Rating
										name="read-only"
										size="small"
										value={Number(place.rating)}
										readOnly
									/>
								</Paper>
							)}
						</div>
					))}
				{weatherData?.list?.length &&
					weatherData.list.map((data, i) => (
						<div key={i} lat={data.coord.lat} lng={data.coord.lon}>
							<img
								src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
								height="70px"
							/>
						</div>
					))}
					{directionsResponse && (
							<DirectionsRenderer
								directions={directionsResponse}
							/>
						)}
			</GoogleMapReact>:<GoogleMap
						center={coords}
						zoom={15}
						mapContainerStyle={{ width: "100%", height: "100%" }}
						onLoad={(map) => setMap(map)}
					>
						<Marker position={coords} />
						{directionsResponse && (
							<DirectionsRenderer
								directions={directionsResponse}
							/>
						)}


				
				
				{weatherData?.list?.length &&
					weatherData.list.map((data, i) => (
						<div key={i} lat={data.coord.lat} lng={data.coord.lon}>
							<img
								src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
								height="70px"
							/>
						</div>
					))}
					{directionsResponse && (
							<DirectionsRenderer
								directions={directionsResponse}
							/>
						)}
					</GoogleMap>}
			{/* <GoogleMapReact
				bootstrapURLKeys={{
					key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
				}}
				defaultCenter={coords}
				center={coords}
				defaultZoom={14}
				margin={[50, 50, 50, 50]}
				options={{
					disableDefaultUI: true,
					zoomControl: true,
					styles: mapStyles,
				}}
				onChange={(e) => {
					setCoords({ lat: e.center.lat, lng: e.center.lng });
					setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
				}}
				onChildClick={(child) => setChildClicked(child)}
				onClick={(e)=>getC(e)}
			>
				
				{isNaN(coords.lat)?"":<div
							className={classes.markerContainer}
							lat={Number(coords?.lat)}
							lng={Number(coords?.lng)}
							style={{fontSize:"25px"}}
						>
							<RoomIcon sx={{fontSize:"45px", color:"#FF0000"}}/>
						</div>}
				
				{places.length &&
					places?.filter((c)=>c.name.toLowerCase().includes(Search.toLowerCase())).map((place, i) => (
						<div
							className={classes.markerContainer}
							lat={Number(place.latitude)}
							lng={Number(place.longitude)}
							key={i}
							onClick={()=>calculateRoute(Number(place.latitude),Number(place.longitude),place.address)}
						>
							{!matches ? (
								<LocationOnOutlinedIcon
									color="primary"
									fontSize="large"
								/>
							) : (
								<Paper elevation={3} className={classes.paper}>
									<Typography
										className={classes.typography}
										variant="subtitle2"
										gutterBottom
									>
										{" "}
										{place.name}
									</Typography>
									<img
										className={classes.pointer}
										src={
											place.photo
												? place.photo.images.large.url
												: "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
										} alt=""
									/>
									<Rating
										name="read-only"
										size="small"
										value={Number(place.rating)}
										readOnly
									/>
								</Paper>
							)}
						</div>
					))}
				{weatherData?.list?.length &&
					weatherData.list.map((data, i) => (
						<div key={i} lat={data.coord.lat} lng={data.coord.lon}>
							<img
								src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
								height="70px"
							/>
						</div>
					))}
					{directionsResponse && (
							<DirectionsRenderer
								directions={directionsResponse}
							/>
						)}
			</GoogleMapReact> */}
			{/* <GoogleMap
						center={coords}
						zoom={15}
						mapContainerStyle={{ width: "100%", height: "100%" }}
						onLoad={(map) => setMap(map)}
					>
						<Marker position={coords} />
						{directionsResponse && (
							<DirectionsRenderer
								directions={directionsResponse}
							/>
						)}

{isNaN(coords.lat)?"":<div
							className={classes.markerContainer}
							lat={Number(coords?.lat)}
							lng={Number(coords?.lng)}
							style={{fontSize:"25px"}}
						>
							<RoomIcon sx={{fontSize:"45px", color:"#FF0000"}}/>
						</div>}
				
				{places.length &&
					places?.filter((c)=>c.name.toLowerCase().includes(Search.toLowerCase())).map((place, i) => (
						<div
							className={classes.markerContainer}
							lat={Number(place.latitude)}
							lng={Number(place.longitude)}
							key={i}
							onClick={()=>calculateRoute(Number(place.latitude),Number(place.longitude),place.address)}
						>
							{!matches ? (
								<LocationOnOutlinedIcon
									color="primary"
									fontSize="large"
								/>
							) : (
								<Paper elevation={3} className={classes.paper}>
									<Typography
										className={classes.typography}
										variant="subtitle2"
										gutterBottom
									>
										{" "}
										{place.name}
									</Typography>
									<img
										className={classes.pointer}
										src={
											place.photo
												? place.photo.images.large.url
												: "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
										} alt=""
									/>
									<Rating
										name="read-only"
										size="small"
										value={Number(place.rating)}
										readOnly
									/>
								</Paper>
							)}
						</div>
					))}
				{weatherData?.list?.length &&
					weatherData.list.map((data, i) => (
						<div key={i} lat={data.coord.lat} lng={data.coord.lon}>
							<img
								src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
								height="70px"
							/>
						</div>
					))}
					{directionsResponse && (
							<DirectionsRenderer
								directions={directionsResponse}
							/>
						)}
					</GoogleMap> */}
		</div>
	);
};

export default Map;
