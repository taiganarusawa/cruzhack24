import Nav from "@/components/nav";
import { Box, FormControl, FormLabel, FormControlLabel, Typography, Button, InputLabel, Select, MenuItem, TextField, Rating, FormGroup, Checkbox, Radio, RadioGroup } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from "react";


const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)',
   clipPath: 'inset(50%)',
   height: 1,
   overflow: 'hidden',
   position: 'absolute',
   bottom: 0,
   left: 0,
   whiteSpace: 'nowrap',
   width: 1
});

import styles from "@/styles/review.module.css";

export default function Review() {

   const [files, setFiles] = useState([]);

   const handleImageSelect = (e) => {
      setFiles(Array.from(e.target.files));
   }

   const handleImageUpload = () => {
      // Do upload code here
   }

   const handleSubmit = () => {
      // Handle form submit
   }

   const [selectedCollege, setSelectedCollege] = useState('');
   const [name, setName] = useState('');
   const [collegeRating, setCollegeRating] = useState(0);

   const [dormChosen, setDormChosen] = useState(false);

   useEffect(() => {
      console.log(dormChosen);
   }, [dormChosen])


   return (
      <>
         <Nav />
         <Box className={styles.formUploadRoot}>
            <Typography className={styles.formUploadTitle}>Write a Review</Typography>
            <FormControl className={styles.formControlBox}>
               <Box className={styles.imageUploadRoot}>
                  <Typography className={styles.formLabel}>Select Your Images</Typography>
                  <Box className={styles.imageSelect}>
                     <Button sx={{
                        textAlign: "center",
                        fontFamily: "Lato",
                        fontWeight: "500",
                        backgroundColor: "var(--byellow)",
                        '&:hover': {
                           backgroundColor: "var(--byellow)"
                        },
                        marginTop: "10px"
                     }} component="label" variant="contained" endIcon={<CloudUploadIcon />} disableRipple>
                        Select images
                        <VisuallyHiddenInput type="file" onChange={e => handleImageSelect(e)} accept="image/*" multiple />
                     </Button>
                  </Box>
                  <Box className={styles.previewImageBox}>
                     {
                        files != [] ? files.map((img, i) => {
                           return <img src={URL.createObjectURL(img)} width={"160px"} height={"auto"}></img>
                        }) : <></>
                     }
                  </Box>
                  <Button className={styles.imageUploadBtn} onClick={handleImageUpload} style={{ "color": "var(--bblue)" }} disableFocusRipple>Upload Image</Button>
               </Box>
               <Box className={styles.mainTextUploadContainer}>
                  <div className={styles.uploadGrid}>
                     <Box sx={{ gridArea: "collegeSelect", width: "auto" }}>
                        <Typography sx={{ paddingBottom: "4px", width: "160px" }}>College</Typography>
                        <Select
                           required
                           label=""
                           displayEmpty
                           value={selectedCollege}
                           onChange={(e) => setSelectedCollege(e.target.value)}
                           sx={{
                              width: "160px"
                           }}
                        >
                           <MenuItem value={"College Nine"}>College Nine</MenuItem>
                           <MenuItem value={"John R. Lewis"}>John R. Lewis</MenuItem>
                           <MenuItem value={"Stevenson"}>Stevenson</MenuItem>
                        </Select>
                     </Box>
                     <Box sx={{ gridArea: "authorName", width: "auto" }}>
                        <Typography sx={{ paddingBottom: "4px", width: "160px" }}>Your name</Typography>
                        <TextField
                           required
                           label=""
                           displayEmpty
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           sx={{
                              width: "160px"
                           }}
                        >
                        </TextField>
                     </Box>
                     <Box sx={{ gridArea: "rating", width: "auto" }}>
                        <Typography sx={{ paddingBottom: "4px", width: "160px" }}>College rating</Typography>
                        <Rating
                           name="collegeRating"
                           value={collegeRating}
                           onChange={(e, newV) => {
                              setCollegeRating(newV);
                           }}
                        />
                     </Box>
                     <Box sx={{ gridArea: "writtenEntry", width: "auto", gridColumn: "span 2" }}>
                        <Typography sx={{ paddingBottom: "4px", width: "auto" }}>Write a brief review</Typography>
                        <TextField
                           placeholder="How's living at this college?"
                           multiline
                           rows={2}
                           maxRows={4}
                           sx={{ width: "100%" }}
                        />
                     </Box>
                     <Box sx={{ gridArea: "checklist", width: "auto" }}>
                        <Typography sx={{ paddingBottom: "4px", width: "auto" }}>Provide more info</Typography>
                        <FormGroup>
                           <RadioGroup
                              defaultValue="Dorm"
                              name="radio-buttons-group"
                              value={dormChosen}
                              onChange={(e) => setDormChosen(e.target.value == "Dorm")}
                           >
                              <FormControlLabel value="Dorm" control={<Radio />} label="Dorm" />
                              <FormControlLabel value="Apartment" control={<Radio />} label="Apartment" />
                           </RadioGroup>
                           <FormControlLabel control={<Checkbox />} label="Kitchen" />
                           <FormControlLabel control={<Checkbox />} label="Community Kitchen" />
                           <FormControlLabel control={<Checkbox />} label="Community Room" />
                           <FormControlLabel control={<Checkbox />} label="Large Storage" />
                           <FormControlLabel control={<Checkbox />} label="Bike Parking" />
                           <FormControlLabel control={<Checkbox />} label="Parking Nearby" />
                           <FormControlLabel control={<Checkbox />} label="Laundry Room" />
                        </FormGroup>
                     </Box>
                     <Box sx={{ gridArea: "checklistCondition", width: "auto" }}>
                        <Typography sx={{ paddingBottom: "4px", width: "auto" }}>What was the condition?</Typography>
                        <RadioGroup
                           defaultValue="Maintained"
                           name="radio-buttons-group"
                        >
                           <FormControlLabel value="Maintained" control={<Radio />} label="Maintained" />
                           <FormControlLabel value="Run Down" control={<Radio />} label="Run Down" />
                           <FormControlLabel value="Mold/Mildew" control={<Radio />} label="Mold/Mildew" />

                        </RadioGroup>
                     </Box>

                  </div>
                  <Button sx={{}}>
                     Submit Review
                  </Button>
               </Box>
            </FormControl>
         </Box>
      </>
   )
}