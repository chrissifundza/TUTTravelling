import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './PlaceDetails/styles';

import axios from "axios"
import { useAuth } from '../contexts/AuthContext';
import swal from 'sweetalert';
const PSingleSaved = ({ place}) => {
  const { currentUser, Hotels, logout, getPlaces,setHotels  } = useAuth();
 
  const classes = useStyles();
//   const [PlaceSave, setPlaceSave] = useState({name:place.name,address:place.address,cellphone:place.phone,ratings:place.rating,image:place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg',iduser:currentUser.iduser})
// console.log(place.ranking_category)
// const addPlace = async ()=>{
//   try {
//     const res = await axios.post(`https://traveladvisor.herokuapp.com/api/travel/add${place.ranking_category}`, PlaceSave)
//     console.log(res.data)
//     if(res.data==="Place has been saved") alert("Place Saved")
   
//   } catch (error){
//     alert(error.response.data)
//   }
// }
const DeleteTravel= async ()=>{
    try {
      const res = await axios.delete(`https://traveladvisor.herokuapp.com/api/travel/deletehotel/${place.idhotel}`)
      console.log(res.data)
      swal("Success",res.data,"success")
      
     let newPlace = Hotels.filter((r)=>r.idhotel !== place.idhotel)
     setHotels(newPlace)
  } catch (error) {
      
      console.log(error.response.data)
      
  }
  }
console.log(place)
  return (
    <Card elevation={6} style={{width:"100%", marginBottom:"15px"}}>
      <CardMedia
        style={{ height: "200px", width:"100%"}}
        image={place?.image ? place.image: 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place?.name}</Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place?.ratings)} readOnly />
          <Typography component="legend">{place?.num_reviews} review{place?.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place?.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place?.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place?.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon />{place?.address}
          </Typography>
        )}
        {place?.cellphone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place?.cellphone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place?.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place?.website, '_blank')}>
          Website
        </Button>

        <Button size="small" color="primary" onClick={DeleteTravel}>
          Delete 
        </Button>
      </CardActions>
    </Card>
  );
};

export default PSingleSaved;
