import React from "react";
import style from "./ModalReview.module.css"
import { Box, Button, Grid, Rating, Stack, TextField, Typography } from "@mui/material";
import { postReviews } from "../../redux/slices/reviewSlice";
import { useAppDispatch } from "../../redux/hooks";

type reviewForm = {
   reviewText: string,
   rating: number | null
}

export const ModalReview: React.FC<{}> = () => {
   const dispatch = useAppDispatch()
   const [review, setReview] = React.useState<reviewForm>({
      reviewText: "",
      rating: null
   });

   const handlerChange = (event: any) => {
      setReview({
         ...review,
         [event.target.name]: event.target.value
      })
   }

   const handlerSubmit = (event: any) => {
      event.preventDefault();
      dispatch(postReviews(review.rating, review.reviewText))
      setReview({ reviewText: "", rating: null })
   }

   return (
      <form onSubmit={handlerSubmit} className={style.modalBox}>
         <Grid className={style.ratingBox}>
            <Typography className={style.typo}>ADD RATE :</Typography>
            <Rating
               name="rating"
               defaultValue={2}
               max={10}
               onChangeActive={handlerChange}
               className={style.rating}
            />
         </Grid>
         <TextField label="Add your review" multiline rows={5} variant="filled" className={style.reviewInput}
            sx={{
               "& .MuiInputLabel-root": { color: '#12181b' },
               "& .MuiInputBase-root": {
                  fontSize: 20,
                  '&:after': { borderBottom: "2px solid black" }
               }
            }}
            name="reviewText"
            value={review.reviewText}
            onChange={handlerChange}
         />
         <Button color="error" variant="contained" type="submit" className={style.postButton}>
            Post review
         </Button>
      </form>
   )
}

// '&:after': { color: '#12181b' },