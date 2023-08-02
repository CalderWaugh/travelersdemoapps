import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList.js";
import Navbar from './components/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import travelersumbrella from './components/images/travelersumbrella.jpg'
import redshirt from './components/images/redshirt.jpeg'
import kidshirt from './components/images/kidshirt.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'

const contentStyle = {
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

function Home() {
  const [item, setItems] = useState([]);

  const carouselStyle= {
    padding: "150px",
    width : "600px",
    border: "1px",
    alignSelf: "center",
  }

  return (
    <div style={{paddingTop: "5rem"}}>
      <div style={{display: "flex", padding: "20px", alignItems: "center", justifyContent: "center"}}>{""}
    <div style={{padding: "10px"}}>
      <Link to="/search?category=outdoors"><Button variant="primary">Outdoor</Button>{' '}</Link>{""}
      </div>
      <div style={{padding: "10px"}}>
      <Link to="/search?category=indoors"><Button variant="success">Indoors</Button>{' '}</Link>{""}
      </div>
      <div style={{padding: "10px"}}>
      <Link to="/search?category=weather"><Button variant="warning">Weather</Button>{' '}</Link>{""}
      </div>
      <div style={{padding: "10px"}}>
      <Link to="/search?category=household"><Button variant="danger">Household</Button>{' '}</Link>{""}
      </div>
      <div style={{padding: "10px"}}>
      <Link to="/search?category=construction"><Button variant="info">Construction</Button>{' '}</Link>{""}
      </div>
    </div>
    <Container  style={{backgroundColor: "#D3D3D3", display: "flex",
        alignItems: "center", justifyContent: "center"}}>
      <Carousel >
      <Carousel.Item interval={2000}>
        <img
        style={carouselStyle}
          src={travelersumbrella}
          alt="First slide"
        />
        <Carousel.Caption style={{color: "black"}}>
          <h3>Travelers Umbrella</h3>
          <p>#1 Selling</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
        style={carouselStyle}
          src={redshirt}
          alt="First slide"
        />
        <Carousel.Caption style={{color: "black"}} >
          <h3>Travelers Shirt</h3>
          <p>Now Trending</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
        style={carouselStyle}
          src={kidshirt}
          alt="First slide"
        />
        <Carousel.Caption style={{color: "black"}}>
          <h3>Travelers Kid Shirt</h3>
          <p>Most Popular</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Container>

    </div>
  );
}

export default Home;
