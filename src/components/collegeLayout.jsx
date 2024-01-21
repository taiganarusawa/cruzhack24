import { Box, Grid, MobileStepper, Typography, Button, Paper, Rating } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from "react-swipeable-views";
import { useEffect, useState, useRef } from 'react';

import styles from "@/styles/layout.module.css";

function ReviewBox(props) {

   const review = props.review;

   console.log(review);

   const [currentSlide, setCurrentSlide] = useState(0);
   const imageCount = review.file_paths.length;

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
            {review.file_paths.map((path, index) => (
               <div key={index} >
                  {
                     Math.abs(currentSlide - index) <= 2 ? (
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
                           src={"http://127.0.0.1:5000" + path}
                           alt={"image"}
                        />
                     ) : null
                  }
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
               <Typography className={styles.reviewInfoTitle}>{review.title ? review.title : "No title provided"}</Typography>
               <Box className={styles.starBox}>
                  <Rating name="read-only" value={review.college_rating} precision={.5} readOnly style={{ color: 'var(--byellow)' }} />
               </Box>
            </Box>
            <Box className={styles.reviewInfoMain}>
               <Typography className={styles.reviewInfoText}>
                  {review.brief_review}
               </Typography>
               <Typography className={styles.reviewAuthor}>
                  - Review by {review.user_name}
               </Typography>
            </Box>
         </Paper>
      </Box>
   </Paper >
}

export default function CollegeLayout(props) {

   const data = props.data;

   const [reviews, setReviews] = useState([]);
   const [page, setPage] = useState(1);

   const sentinelRef = useRef(null);

   // Reset reviews if college changes
   useEffect(() => {
      console.log("Changed")
      setReviews([]);
   }, [props.urlname])

   useEffect(() => {
      const fetchReviews = async () => {
         try {
            const response = await fetch(`http://127.0.0.1:5000/api/getreviews?collegeName=${props.urlname}&page=${page}`);
            if (!response.ok) {
               throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            setReviews((prevReviews) => [...prevReviews, ...data]);
         } catch (error) {
            console.error('Error fetching reviews:', error);
         }
      };

      fetchReviews();
   }, [page, props.urlname]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            if (entries[0].isIntersecting) {
               // Load more reviews when sentinel is in view
               setPage((prevPage) => prevPage + 1);
            }
         },
         { threshold: 1 } // Fully visible
      );

      if (sentinelRef.current) {
         observer.observe(sentinelRef.current);
      }

      // Cleanup observer when component is unmounted
      return () => {
         observer.disconnect();
      };
   }, []);

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