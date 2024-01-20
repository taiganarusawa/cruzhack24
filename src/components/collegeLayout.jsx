import { Box, Grid, MobileStepper, Typography, Button, Paper, Rating } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from "react-swipeable-views";
import { useState } from 'react';

import styles from "@/styles/layout.module.css";

const data = {
   "collegeName": "College Nine",
   "officialDesc": "College Nine opened in 2000 and its theme of international and global perspectives recognizes the importance of cultural competency in the 21st century. The College Nine community offers students a range of opportunities to explore these issues and to develop skills as dynamic leaders.",
   "studentDesc": "College Nine: Home of antisocial CS majors. Of course, you'll find other majors here. But exclusively STEM majors. It's not as quiet as Crown/Merill, but don't let that fool you. Very little grass to lie down on, and as CS majors don't touch grass, you'll never see them on the little grass there is. The closest college to Tree 9, home of the infamous tree raves, getting there and back is super easy.",
   "studentRating": 4
}

const reviews = [
   {
      "id": "11111_id",
      "author": "Bananas sluggers",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "starRating": 4.2,
      "images": [
         "url1", "url2", "url3"
      ],
      "reviewTitle": "Not the best but not the worst"
   },
   {
      "id": "11112_id",
      "author": "SoccerFanatic22",
      "textReview": "Great experience! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Highly recommended!",
      "starRating": 4.8,
      "images": ["url4", "url5"],
      "reviewTitle": "Fantastic Service"
   },
   {
      "id": "11113_id",
      "author": "TechieGuru",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The product exceeded my expectations!",
      "starRating": 4.5,
      "images": ["url6"],
      "reviewTitle": "Impressive Technology"
   },
   {
      "id": "11114_id",
      "author": "HealthyEater",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The food quality is top-notch!",
      "starRating": 4.0,
      "images": ["url7", "url8"],
      "reviewTitle": "Delicious and Nutritious"
   },
   {
      "id": "11115_id",
      "author": "AdventureSeeker",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amazing experience with great customer service!",
      "starRating": 4.7,
      "images": ["url9"],
      "reviewTitle": "Thrilling Adventure"
   },
   {
      "id": "11116_id",
      "author": "BookWorm87",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The book selection is diverse and captivating!",
      "starRating": 4.3,
      "images": ["url10", "url11"],
      "reviewTitle": "Literary Paradise"
   },
   {
      "id": "11117_id",
      "author": "FitnessEnthusiast",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The gym facilities are top-notch!",
      "starRating": 4.6,
      "images": ["url12"],
      "reviewTitle": "Fit and Fabulous"
   },
   {
      "id": "11118_id",
      "author": "PetLover101",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pet-friendly environment with caring staff!",
      "starRating": 4.4,
      "images": ["url13", "url14"],
      "reviewTitle": "Pawsitively Wonderful"
   },
   {
      "id": "11119_id",
      "author": "FashionistaStyle",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Trendy and stylish clothing collection!",
      "starRating": 4.2,
      "images": ["url15"],
      "reviewTitle": "Fashion Forward"
   },
   {
      "id": "11120_id",
      "author": "ArtConnoisseur",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The art gallery showcases incredible talent!",
      "starRating": 4.9,
      "images": ["url16", "url17"],
      "reviewTitle": "Masterpieces Everywhere"
   },
   {
      "id": "11121_id",
      "author": "TechSavvyUser",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cutting-edge technology and prompt support!",
      "starRating": 4.5,
      "images": ["url18"],
      "reviewTitle": "Tech Marvels"
   },
   {
      "id": "11122_id",
      "author": "FoodieExplorer",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Culinary delights that leave your taste buds wanting more!",
      "starRating": 4.3,
      "images": ["url19", "url20"],
      "reviewTitle": "Gastronomic Bliss"
   },
   {
      "id": "11123_id",
      "author": "MusicLover99",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The music selection is diverse and enjoyable!",
      "starRating": 4.6,
      "images": ["url21"],
      "reviewTitle": "Harmonious Vibes"
   },
   {
      "id": "11124_id",
      "author": "TravelEnthusiast",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A travel destination that exceeded expectations!",
      "starRating": 4.7,
      "images": ["url22", "url23"],
      "reviewTitle": "Wanderlust Fulfilled"
   },
   {
      "id": "11125_id",
      "author": "HomeDecorFan",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Unique and stylish home decor items!",
      "starRating": 4.1,
      "images": ["url24"],
      "reviewTitle": "Chic Living Spaces"
   },
   {
      "id": "11126_id",
      "author": "GamerPro123",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The gaming experience is immersive and enjoyable!",
      "starRating": 4.4,
      "images": ["url25", "url26"],
      "reviewTitle": "Gaming Paradise"
   },
   {
      "id": "11127_id",
      "author": "NatureLover22",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Surrounded by breathtaking natural beauty!",
      "starRating": 4.8,
      "images": ["url27"],
      "reviewTitle": "Nature's Retreat"
   },
   {
      "id": "11128_id",
      "author": "FitnessJunkie99",
      "textReview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The fitness classes are challenging and effective!",
      "starRating": 4.5,
      "images": ["url28", "url29"],
      "reviewTitle": "Fit for Life"
   }
]

function ReviewBox(props) {

   const review = props.review;

   const [currentSlide, setCurrentSlide] = useState(0);
   const imageCount = review.images.length;

   const handleNext = () => {
      if (currentSlide == imageCount - 1) {
         setCurrentSlide(0);
      } else {
         setCurrentSlide((prevSlide) => prevSlide + 1);
      }
   };

   const handleBack = () => {
      if (currentSlide == 0) {
         setCurrentSlide(imageCount - 1);
      } else {
         setCurrentSlide((prevSlide) => prevSlide - 1);
      }
   };

   const handleSlideChange = (step) => {
      setCurrentSlide(step);
   };

   const createStarArray = (stars) => {
      let arr = [];
      for (let i = 0; i < stars; i++) {
         arr.push(i);
      }
      return arr;
   }

   return <Paper elevation={2}>
      <Box className={styles.reviewBox}>
         <SwipeableViews
            index={currentSlide}
            onChangeIndex={handleSlideChange}
            enableMouseEvents
         >
            {review.images.map((image, index) => (
               <div key={index}>
                  {Math.abs(currentSlide - index) <= 2 ? (
                     <Box
                        component="img"
                        sx={{
                           height: '240px',
                           display: 'block',
                           maxWidth: 400,
                           overflow: 'hidden',
                           width: '100%',
                           display: "flex",
                           justifyContent: "center"
                        }}
                        src={image}
                        alt={"image"}
                     />
                  ) : null}
               </div>
            ))}
         </SwipeableViews>
         <MobileStepper
            steps={imageCount}
            variant="dots"
            sx={{
               '& .MuiMobileStepper-dotActive': {
                  backgroundColor: "var(--bblue)"
               }
            }}
            position="static"
            activeStep={currentSlide}
            nextButton={
               <Button size="small" onClick={handleNext} disableRipple={true} style={{ "color": "var(--byellow)" }}>
                  Next
                  <KeyboardArrowRight />
               </Button>
            }
            backButton={
               <Button size="small" onClick={handleBack} disableRipple={true} style={{ "color": "var(--byellow)" }}>
                  <KeyboardArrowLeft />
                  Back
               </Button>
            }
         />
         <Paper elevation={0} className={styles.reviewInfoCont}>
            <Box className={styles.reviewInfoTitleCont}>
               <Typography className={styles.reviewInfoTitle}>{review.reviewTitle}</Typography>
               <Box className={styles.starBox}>
                  <Rating name="read-only" value={review.starRating} precision={.5} readOnly style={{ color: 'var(--byellow)' }} />
               </Box>
            </Box>
            <Box className={styles.reviewInfoMain}>
               <Typography className={styles.reviewInfoText}>
                  {review.textReview}
               </Typography>
               <Typography className={styles.reviewAuthor}>
                  - Review by {review.author}
               </Typography>
            </Box>
         </Paper>
      </Box>
   </Paper>
}

export default function CollegeLayout(props) {
   return (
      <Box className={styles.rootBox}>
         <Box className={styles.collegeNameRoot} sx={{ width: "100%" }}>
            <Typography className={styles.collegeName}>{data.collegeName}</Typography>
         </Box>
         <Box className={styles.collegeInfoBox}>
            <Box className={styles.officialInfoBox}>
               <Typography className={styles.collegeInfoHeaders}>UCSC's Description</Typography>
               <Typography className={styles.collegeInfoDesc}>{data.officialDesc}</Typography>
            </Box>
            <Box className={styles.studentInfoBox}>
               <Typography className={styles.collegeInfoHeaders}>Student's Description</Typography>
               <Typography className={styles.collegeInfoDesc}>{data.studentDesc}</Typography>
            </Box>
         </Box>
         <Box className={styles.scrollableContainerRoot}>
            <Grid container className={styles.scrollableContainer} sx={{ width: { xs: "300px", sm: "640px" } }}>
               {reviews.map((review, index) => {
                  return <Box className={styles.reviewBoxCont}>
                     <ReviewBox review={review}></ReviewBox>
                  </Box>
               })}
            </Grid>
         </Box>
      </Box>
   )
}