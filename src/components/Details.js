import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import Header from "./Header/Header";
import PlaceCard from "./Card";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './PlaceDetails/styles';
import axios from "axios";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Details(){
    const classes = useStyles();
    const [RateUs, setRateUs] = useState(0)
    const location = useLocation()
    const [Message, setMessage] = useState("")
    const [RatingReviews, setRatingReviews] = useState([])
    const { currentUser, logout } = useAuth();
    let place = location.state.place
    let rating = {tourist_id:currentUser.iduser,tourist_name:currentUser.name,message:Message,rate:RateUs,place_name:place.name}
  
    console.log(place)
    const SubmitRating= async ()=>{
        try {
          const res = await axios.post("https://traveladvisor.herokuapp.com/api/travel/submitrate",rating)
          console.log(res.data)
          UpdateRatings()
          swal("Success",res.data,"success")
          
        //  let newPlace = Other.filter((r)=>r.idother_attraction !== place.idother_attraction)
        
      } catch (error) {
        swal("Error Rating",error.response.data,"error")
          console.log(error.response.data)
          
      }
      }
      const UpdateRatings= async ()=>{
        try {
          const res = await axios.post(`https://traveladvisor.herokuapp.com/api/travel/update${place.type}`,rating)
          console.log(res.data)
          swal("Success",res.data,"success")
          
        //  let newPlace = Other.filter((r)=>r.idother_attraction !== place.idother_attraction)
        
      } catch (error) {
          
          console.log(error.response.data)
          
      }
      }
      useEffect(()=>{
        getReviews()
      },[])
      const getReviews=async ()=>{
        try {
          const res = await axios.post("https://traveladvisor.herokuapp.com/api/travel/getreviews",rating)
          console.log(res.data)
          setRatingReviews(res.data)
          
        //  let newPlace = Other.filter((r)=>r.idother_attraction !== place.idother_attraction)
        
      } catch (error) {
          
          console.log(error.response.data)
          
      }
      } 
    return(
      <>
      <CssBaseline />
			<Header  />
            <Grid container spacing={3}  style={{overFlowX:"hidden",marginTop:"40px"}}>
				
				<Grid
					item
					xs={12}
					md={7}
					style={{
						display: "flex",
                        flexDirection:"column",
						justifyContent: "center",
						alignItems: "center",
                        borderRight:"1px solid #696969",
                        
                        
					}}
				>
                 
               
                  <Card elevation={6} style={{width:"80%", marginBottom:"15px"}}>
      <CardMedia
        style={{ height: "200px", width:"100%"}}
        image={place?.image ? place.image: 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place?.name}</Typography>
        <Box display="flex" style={{flexDirection:"row", gap:"20px"}} justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place?.ratings)} readOnly /> <br/>
          <Typography component="legend">{place?.num_reviews} {RatingReviews.length} reviews </Typography>
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

        <Button size="small" color="primary" onClick={""}>
          Delete 
        </Button>
      </CardActions>
    </Card>
    <Box style={{width:"80%"}}>
      <Typography variant="h5">People's Reviews</Typography>
      {RatingReviews&&RatingReviews.map((r)=>{
        return(
          <Card style={{width:"100%",marginTop:"10px", backgroundColor:"#e6e6e6"}}>
          <CardContent>
            <Typography variant="h6">Username: {r.tourist_name}</Typography>
            <Typography variant="p">
              Comment: {r.message}
            </Typography>
          </CardContent>
        </Card>
        )
      })}
     
    </Box>
				</Grid>
                <Grid item xs={12} md={5} >
                  <Box style={{width:"95%"}}>
                <Typography variant="h6" style={{textTransform:"uppercase", textAlign:"left", width:"100%"}}>
                        ADD YOUR OWN Reviews
                    </Typography>

                    <div className="form-outline">
                    <label className="form-label" for="textAreaExample">Message</label>
                    <textarea onChange={(e)=>setMessage(e.target.value)} className="form-control" id="textAreaExample1" rows="4"></textarea>
                  
                  </div>

                  <div class="form-group">
                  <Rating name="read-only" value={RateUs} readOnly />
              
                <select onChange={(e)=>setRateUs(e.target.value)} class="form-control" id="exampleFormControlSelect2">
                <option value={0}>Select</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>

                <small id="emailHelp" className="form-text text-muted">Rate us from 1 to 5, 1 means Bad, 5 means Good</small>
              </div>

              <Button color="primary" variant="contained" onClick={SubmitRating}>Submit</Button>
              </Box>
				</Grid>
			</Grid>
      </>  
    )
}