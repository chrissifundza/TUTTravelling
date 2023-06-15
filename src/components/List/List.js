import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Box ,InputBase,} from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles.js';
import SearchIcon from "@material-ui/icons/Search";
const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();
  const [Search, setSearch] = useState("");
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

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    console.log(places)
  }, [places]);
if(places[0]?.address!==undefined&&places[0]?.address.toLowerCase().includes("soshanguve")){
  
 
	places=[...places,...RestuarentSosha]
}
if(places[0]?.address!==undefined&&places[0]?.address.toLowerCase().includes("mamelodi")){
  
 
	places=[...places,...RestuarentMamelodi]
}
if(type=="hotels"){ 
	places=[...places,...HotelSoshanguve]
}

console.log(childClicked);
  
  return (
    <div className={classes.container}>
      <Typography variant="h4">Restaurants, Hotels, Attractions</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Box>
          <div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
                onChange={(e)=>{
                  
                  setSearch(e.target.value.toLocaleLowerCase())
                  
                  }}
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
							/>{" "}
						</div>
          </Box>
          <Grid container spacing={3} className={classes.list}>
            {places?.filter((c)=>c.name.toLowerCase().includes(Search.toLowerCase())).map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
