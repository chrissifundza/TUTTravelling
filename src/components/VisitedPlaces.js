import { Box, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import Header from "./Header/Header";
import PlaceCard from "./Card";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import TestSlider from "./Trend";


export default function VisitedPlaces(){
  const { currentUser, Other,  getOther,setOther,Res,getRes ,Hotels,getPlaces } = useAuth();
  const [Places, setPlaces] = useState([])
  const [TrendingPlace, setTrendingPlace] = useState([])
  const [Option, setOption] = useState("restuarant")
  const [Type, setType] = useState("")
  useEffect(()=>{
    getData("restuarant")
    
  },[])
   const getData=async (place)=>{
    setType(place)
  
    console.log(place)
    setOption(place)
      try {
        const res = await axios.post(`https://traveladvisor.herokuapp.com/api/travel/all${place}`)
        console.log(res.data)
        setPlaces(res.data)

    } catch (error) {
        
        console.log(error.response.data)
        
    }
    
   }
   useEffect(()=>{
  
  },[Hotels,Res,Other])
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
                  <Box sx={{marginBottom:"20px",width:"80%"}}>
                  <Typography style={{textTransform:"uppercase", textAlign:"left", width:"100%"}} variant="h6" >
                        Places visited by other Tourist
                    </Typography>
                  </Box>
           <Box  sx={{width:"80%"}}>
           <FormControl style={{width:"50%", marginBottom:"20px"}} >
            <InputLabel id="type">Select Type</InputLabel>
            <Select id="type"  value={Option} onChange={(e) => getData(e.target.value)}>
              <MenuItem value="restuarant">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attraction">Attractions</MenuItem>
            </Select>
          </FormControl>
           </Box>
					{Places&&Places.map((place)=><PlaceCard place={place} Type={Type}/>)}
				</Grid>
                <Grid item xs={12} md={5} >
                <Typography variant="h6" style={{textTransform:"uppercase", textAlign:"left", width:"100%"}}>
                        Trending  places
                    </Typography>
                <Box style={{width:"95%"}}>
                    <TestSlider/>
                </Box>
                   
				</Grid>
			</Grid>
      </>  
    )
}