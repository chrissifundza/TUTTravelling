import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './PlaceDetails/styles';
import swal from 'sweetalert';
import axios from "axios"
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const PlaceCard = ({ place,Type}) => {
  const { currentUser, Other, logout, getOther,setOther  } = useAuth();
 
  const classes = useStyles();
  const navigate =useNavigate()
  const ViewSingle=(place)=>{
    place.type=Type
navigate("/details",{state:{place}})
  }
const DeleteTravel= async ()=>{
 
 
    try {
      const res = await axios.delete(`https://traveladvisor.herokuapp.com/api/travel/deleteother/${place.idother_attraction}`)
      console.log(res.data)
      swal("Success",res.data,"success")
      
     let newPlace = Other.filter((r)=>r.idother_attraction !== place.idother_attraction)
     setOther(newPlace)
  } catch (error) {
      
      console.log(error.response.data)
      
  }
  }
console.log(place)
  return (
    <Card elevation={6} style={{width:"80%", marginBottom:"15px"}}>
      <CardMedia
        style={{ height: "200px", width:"100%"}}
        image={place?.image ? place.image: 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place?.name}</Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place?.ratings)} readOnly />
          <Typography component="legend">{place?.ratings}</Typography>
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
      
        <Button size="small" color="primary" onClick={() => ViewSingle(place)}>
          View Details
        </Button>

       
      </CardActions>
    </Card>
  );
};

export default PlaceCard;
