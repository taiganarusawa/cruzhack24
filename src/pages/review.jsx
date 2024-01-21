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
   const [submitButtonText, setSubmitButtonText] = useState("Submit Review");

   const handleImageSelect = (e) => {
      setFiles(Array.from(e.target.files));
   }

   const handleImageUpload = () => {
      // Do upload code here for files
   }

   const handleReviewSubmit = (e) => {

      if (files == []) return;

      const formData = new FormData();

      console.log(files);

      for (let i = 0; i < files.length; i++) {
         formData.append('files', files[i]);
      }

      formData.append('selectedCollege', selectedCollege);
      formData.append('userName', name);
      formData.append('collegeRating', collegeRating);
      formData.append('condition', condition);
      formData.append('briefReview', briefReview);
      formData.append('totalPeopleInRoom', roommates);

      fetch(`http://127.0.0.1:5000/api/createreview`, {
         method: 'POST',
         body: formData,

      })
         .then((response) => {
            response.json();
            if (response.status == 200) {
               setSelectedCollege("");
               setName("");
               setCollegeRating("");
               setCondition("Maintained");
               setBriefReview("");
               setRoommates(3);
               setFiles([]);
               setTimeout(() => {
                  setSubmitButtonText("Submitted");
               }, 1000);
               setTimeout(() => {
                  setSubmitButtonText("Submit Review");
               }, 2000);
            }
         })
         .then((data) => {
            console.log(data);
         })
         .catch(error => console.error(error));
      // Handle form submit
   }

   const [selectedCollege, setSelectedCollege] = useState('');
   const [name, setName] = useState('');
   const [collegeRating, setCollegeRating] = useState(0);
   const [condition, setCondition] = useState("Maintained");
   const [briefReview, setBriefReview] = useState("");
   const [roommates, setRoommates] = useState(3);

   const [dormChosen, setDormChosen] = useState(false);
   const [kitchen, setKitchen] = useState(false);

   return (
      <>
         <Nav />
         <Box className={styles.formUploadRoot}>
            <Typography className={styles.formUploadTitle}>Write a Review</Typography>
            <form className={styles.formControlBox} encType="multipart/form-data">
               <Box className={styles.imageUploadRoot}>
                  <Box className={styles.imageUploadCont}>
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
                           <VisuallyHiddenInput type="file" name="files" onChange={e => handleImageSelect(e)} accept="image/*" multiple />
                        </Button>
                     </Box>
                     <Box className={styles.previewImageBox}>
                        {
                           files != [] ? files.map((img, i) => {
                              return <img src={URL.createObjectURL(img)} width={"160px"} height={"auto"}></img>
                           }) : <></>
                        }
                     </Box>
                     {/* <Button className={styles.imageUploadBtn} onClick={handleImageUpload} style={{ "color": "var(--bblue)" }} disableFocusRipple>Upload Image</Button> */}
                  </Box>
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
                           <MenuItem value={"collegenine"}>College Nine</MenuItem>
                           <MenuItem value={"johnrlewis"}>John R. Lewis</MenuItem>
                           <MenuItem value={"stevenson"}>Stevenson</MenuItem>
                           <MenuItem value={"cowell"}>Cowell</MenuItem>
                           <MenuItem value={"crown"}>Crown</MenuItem>
                           <MenuItem value={"merrill"}>Merrill</MenuItem>
                           <MenuItem value={"porter"}>Porter</MenuItem>
                           <MenuItem value={"kresge"}>Kresge</MenuItem>
                           <MenuItem value={"rachelcarson"}>Rachel Carson</MenuItem>
                           <MenuItem value={"oakes"}>Oakes</MenuItem>
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
                           value={briefReview}
                           onChange={(e) => setBriefReview(e.target.value)}
                        />
                     </Box>
                     <Box sx={{ gridArea: "checklist", width: "auto" }}>
                        <Typography sx={{ paddingBottom: "4px", width: "auto" }}>Provide more info</Typography>
                        <FormGroup>
                           <RadioGroup
                              defaultValue="Dorm"
                              name="radio-buttons-group"
                              value={dormChosen ? "Dorm" : "Apartment"}
                              onChange={(e) => setDormChosen(e.target.value == "Dorm")}
                           >
                              <FormControlLabel value="Dorm" control={<Radio />} label="Dorm" />
                              <FormControlLabel value="Apartment" control={<Radio />} label="Apartment" />
                           </RadioGroup>
                           {
                              dormChosen ? <>
                                 <FormControlLabel control={<Checkbox />} label="Kitchen" />
                                 <FormControlLabel control={<Checkbox />} label="Community Room" />
                                 <FormControlLabel control={<Checkbox />} label="Bike Parking" />
                                 <FormControlLabel control={<Checkbox />} label="Parking Nearby" />
                                 <FormControlLabel control={<Checkbox />} label="Parking Nearby" />
                              </> : <>
                                 <FormControlLabel control={<Checkbox />} label="Community Kitchen" />
                                 <FormControlLabel control={<Checkbox />} label="Community Room" />
                                 <FormControlLabel control={<Checkbox />} label="Bike Parking" />
                                 <FormControlLabel control={<Checkbox />} label="Parking Nearby" />
                              </>
                           }

                        </FormGroup>
                     </Box>
                     <Box sx={{ gridArea: "checklistCondition", width: "auto" }}>
                        <Typography sx={{ paddingBottom: "4px", width: "auto" }}>What was the condition?</Typography>
                        <RadioGroup
                           defaultValue="Maintained"
                           name="radio-buttons-group"
                           onChange={(e) => setCondition(e.target.value)}
                        >
                           <FormControlLabel value="Maintained" control={<Radio />} label="Maintained" />
                           <FormControlLabel value="Run Down" control={<Radio />} label="Run Down" />
                           <FormControlLabel value="Mold/Mildew" control={<Radio />} label="Mold/Mildew" />

                        </RadioGroup>
                     </Box>
                     <Box sx={{ gridArea: "roommateCount", width: "auto" }}>
                        <Typography sx={{ paddingBottom: "4px", width: "auto" }}>How many roommates?</Typography>
                        <Select
                           value={roommates}
                           onChange={(e) => setRoommates(e.target.value)}
                           sx={{ width: "160px", height: "79px" }}
                        >
                           <MenuItem value={1}>Just me</MenuItem>
                           <MenuItem value={2}>One other</MenuItem>
                           <MenuItem value={3}>Two others</MenuItem>
                           <MenuItem value={4}>Three others</MenuItem>
                        </Select>
                     </Box>

                  </div>
               </Box>
            </form >
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
               <Button sx={{ padding: "12px 6px", margin: "20px 0px", color: "var(--blue1)", borderRadius: "8px" }} onClick={handleReviewSubmit}>
                  {submitButtonText}
               </Button>
            </Box>
         </Box >
      </>
   )
}