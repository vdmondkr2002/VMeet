import React from "react";
import useStyles from "./styles.js";
import "./styles.css";
import descData from "./descData.js";
import Carousel from "react-material-ui-carousel";
import { Card } from "@material-ui/core";

const Testimonals = () => {
  const classes = useStyles();

  const Item = (props) => {
    return (
      <div style={{ margin: "auto 10px" }}>
        <Card
          raised
          id="demo"
          className="carousel slide"
          style={{ margin: " 10px auto" }}
        >
          <div className="carousel-inner">
            <div className="carousel-caption">
              <p>{props.item.testimonal}</p> <img src={props.item.img} />
              <div id="image-caption">{props.item.name}</div>
            </div>
          </div>
        </Card>
      </div>
    );
  };
  return (
    <>
      <div>
        <Carousel
          animation="fade"
          indicators={false}
          autoPlay={true}
          interval={10000}
          stopAutoPlayOnHover={false}
          navButtonsAlwaysInVisible={true}
        >
          {descData.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Testimonals;
