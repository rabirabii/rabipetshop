import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Typography, Card, CardContent } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useInView } from "react-intersection-observer";
import "./About.scss";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
const AnimatedImg = animated.img;

const About = () => {
  const [imageInView, setImageInView] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const mapRef = useRef(null);
  const imageAnimation = useSpring({
    opacity: imageInView ? 1 : 0,
    transform: imageInView ? "translateY(0)" : "translateY(20px)",
    config: { tension: 120, friction: 14 },
  });

  const aboutSectionAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 120, friction: 14 },
  });

  const handleImageInView = (inView) => {
    setImageInView(inView);
  };

  const initializeMap = (latitude, longitude) => {
    if (!mapInitialized) {
      setMapInitialized(true);
    }
  };

  useEffect(() => {
    // Fetch the latitude and longitude coordinates based on the address using the OpenCage Geocoder API
    const address =
      "Jl. Raya Jatiwaringin No.194, RT.001/RW.002, Jatiwaringin, Kec. Pd. Gede, Kota Bks, Jawa Barat 17411";
    const apiKey = "ceaecba534484b5789bf3dcc21bc941c";
    const encodedAddress = encodeURIComponent(address);

    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=ceaecba534484b5789bf3dcc21bc941c`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0]?.geometry || {};
          if (lat && lng) {
            initializeMap(lat, lng);
          } else {
            console.error(
              "Latitude or longitude is missing in the API response."
            );
          }
        } else {
          console.error("No results found in the API response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
      });
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const teamData = [
    {
      name: "Wahyu Budiman",
      role: "Developer",
      imageSrc: "assets/jun.jpeg",
    },
    {
      name: "Andika Rendrasto",
      role: "Design",
      imageSrc: "assets/jun.jpeg",
    },
    {
      name: "Aranda Embun",
      role: "Design",
      imageSrc: "assets/jun.jpeg",
    },
    {
      name: "Mita Sofiatun",
      role: "Joki",
      imageSrc: "assets/jun.jpeg",
    },
  ];
  return (
    <ParallaxProvider>
      <>
        {/* Navbar */}
        {/* ... */}

        {/* About Section */}
        <section sx={{ py: 5 }} className="about">
          <animated.div style={aboutSectionAnimation}>
            <Container>
              <Grid container>
                <Grid item xs={12}>
                  <div className="about__pic">
                    <div ref={ref}>
                      <Parallax y={["-50%", "0%"]} tagOuter="figure">
                        <AnimatedImg
                          src="assets/jun.jpeg"
                          alt=""
                          style={imageAnimation}
                          className="about__pic"
                          onLoad={() => handleImageInView(true)}
                        />
                      </Parallax>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={3} sx={{ mt: 5 }}>
                <Grid item xs={12} sm={4}>
                  <div className="about__item">
                    <Typography variant="h4">Who We Are?</Typography>
                    <Typography variant="body1">
                      The Petstore is a passionate and dedicated team of pet
                      lovers committed to providing the best care and products
                      for your beloved pets. With years of experience in the pet
                      industry, we understand the unique needs and love that
                      pets bring into our lives.
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="about__item">
                    <Typography variant="h4">What We Do?</Typography>
                    <Typography variant="body1">
                      At The Petstore, we offer a wide range of high-quality pet
                      products including food, toys, accessories, and grooming
                      supplies. Our goal is to ensure that your pets lead
                      healthy and happy lives by providing them with the best
                      care and products available in the market.
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="about__item">
                    <Typography variant="h4">Why Choose Us?</Typography>
                    <Typography variant="body1">
                      Choosing The Petstore means choosing a team that is
                      dedicated to the well-being of your pets. We pride
                      ourselves on our exceptional customer service, extensive
                      product selection, and commitment to providing a
                      personalized shopping experience. Your pets' happiness and
                      satisfaction are our top priorities.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </animated.div>
        </section>
        {/* About Section End */}

        {/* Testimonial Section */}
        {/* ... */}

        {/* Team Section */}
        <section className="team">
          <Container>
            <div className="section-title">
              <Typography variant="subtitle1" component="span">
                Our Team
              </Typography>
              <Typography variant="h2">Meet Our Team</Typography>
            </div>
            <Grid container spacing={3} sx={{ mt: 5 }}>
              {teamData.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card className="team__card">
                    <CardContent>
                      <Parallax y={[-20, 20]} tagOuter="figure">
                        <AnimatedImg
                          src={member.imageSrc}
                          alt={member.name}
                          className="team__item__img"
                          style={imageAnimation}
                          onLoad={() => handleImageInView(true)}
                        />
                      </Parallax>
                      <div className="team__item__details">
                        <Typography variant="h4">{member.name}</Typography>
                        <Typography variant="subtitle2">
                          {member.role}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
        {/* Team Section End */}
        <section className="map">
          <LoadScript googleMapsApiKey="AIzaSyCFxnaV2YjOolDv9IaDhsSrlQRKt90jrjw">
            <GoogleMap
              ref={mapRef}
              mapContainerStyle={{ height: "400px", width: "100%" }}
              zoom={13}
              center={{ lat: 0, lng: 0 }} // Initial center, will be updated with fetched coordinates
            >
              {mapInitialized && <Marker position={{ lat: 0, lng: 0 }} />} //
              Marker will be updated with fetched coordinates
            </GoogleMap>
          </LoadScript>
        </section>
        {/* Footer */}
        {/* ... */}
      </>
    </ParallaxProvider>
  );
};

export default About;
