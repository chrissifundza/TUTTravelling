import React, { Component } from "react";
import Slider from "react-slick";
import useStyles from './PlaceDetails/styles'
import { AiFillStar } from "react-icons/ai";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
export default function TestSlider({place}) {
    const classes = useStyles();
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
     
    };
    return (
      <div >
        
        <Slider {...settings}>
     
       
   
        <Card elevation={6} style={{width:"80%", marginBottom:"15px"}}>
      <CardMedia
        style={{ height: "200px", width:"100%"}}
        image={'https://media-cdn.tripadvisor.com/media/photo-w/08/bf/0f/d7/market-at-the-sheds.jpg'}
        title={"Melrose House"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{"Melrose House"}</Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(5)} readOnly />
          <Typography component="legend">{place?.ratings}</Typography>
        </Box>
      
        
        
      </CardContent>
      <CardActions>
      
       

       
      </CardActions>
    </Card>
    <Card elevation={6} style={{width:"80%", marginBottom:"15px"}}>
      <CardMedia
        style={{ height: "200px", width:"100%"}}
        image={'https://media-cdn.tripadvisor.com/media/photo-w/18/b0/fd/5b/macdonald-s.jpg'}
        title={"McDonald's Paul Kruger"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{"McDonald's Paul Kruger"}</Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(5)} readOnly />
          <Typography component="legend">{place?.ratings}</Typography>
        </Box>
      
        
        
      </CardContent>
      <CardActions>
      
       

       
      </CardActions>
    </Card>

    <Card elevation={6} style={{width:"80%", marginBottom:"15px"}}>
      <CardMedia
        style={{ height: "200px", width:"100%"}}
        image={'https://media-cdn.tripadvisor.com/media/photo-s/1b/6c/ca/d0/christie-s-at-32-on-russell.jpg'}
        title={"Christie's at 32 on Russellr"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{"Christie's at 32 on Russell"}</Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(5)} readOnly />
          <Typography component="legend">{place?.ratings}</Typography>
        </Box>
      
        
        
      </CardContent>
      <CardActions>
      
       

       
      </CardActions>
    </Card>
          
        </Slider>
      </div>
    );
  
}