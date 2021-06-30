import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import carouselImage1 from "../../assets/images/b1.jpg";
import carouselImage2 from "../../assets/images/b2.jpg";
import carouselImage3 from "../../assets/images/b3.jpg";

const ProductsBanner = () => {
  const classes = useStyles();

  return (
    <div className={classes.carouselContainer}>
      <Carousel
        infiniteLoop
        autoPlay
        showThumbs={false}
        showStatus={false}
        className={classes.carousel}
        thumbWidth={500}
      >
        <div
          className={classes.carouselImage}
          style={{
            background: `url(${carouselImage1}) center/cover no-repeat`,
          }}
        ></div>
        <div
          className={classes.carouselImage}
          style={{
            background: `url(${carouselImage2}) center/cover no-repeat`,
          }}
        ></div>
        <div
          className={classes.carouselImage}
          style={{
            background: `url(${carouselImage3}) center/cover no-repeat`,
          }}
        ></div>
      </Carousel>
    </div>
  );
};

export default ProductsBanner;

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    paddingTop: "14vh",
  },
  carouselImage: {
    height: "60vh",
    fill: "contain",
    [theme.breakpoints.down("xs")]: {
      height: "50vh",
    },
  },
}));
