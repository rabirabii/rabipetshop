import React, { useState } from "react";
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleChangePanel = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <section style={{ padding: "40px 0" }}>
      <Container>
        <Typography
          variant="h2"
          style={{ marginBottom: "30px", textAlign: "center" }}
        >
          Frequently Asked Questions
        </Typography>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Accordion
            expanded={expandedPanel === "panel1"}
            onChange={handleChangePanel("panel1")}
            style={{
              marginBottom: "10px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                What are your store hours?
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "#ffffff" }}>
              <Typography variant="body2">
                Our store is open from 9:00 AM to 6:00 PM from Monday to
                Saturday. On Sundays, we have reduced hours from 10:00 AM to
                4:00 PM.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expandedPanel === "panel2"}
            onChange={handleChangePanel("panel2")}
            style={{
              marginBottom: "10px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Do you offer grooming services?
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "#ffffff" }}>
              <Typography variant="body2">
                Yes, we provide grooming services for various pets. Our
                experienced groomers can take care of bathing, hair trimming,
                nail clipping, and other grooming needs.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expandedPanel === "panel3"}
            onChange={handleChangePanel("panel3")}
            style={{
              marginBottom: "10px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                What brands of pet food do you carry?
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "#ffffff" }}>
              <Typography variant="body2">
                We carry a wide range of high-quality pet food brands, including
                both popular and specialized options. Some of the brands we
                offer include XYZ, ABC, DEF, and GHI. Feel free to visit our
                store to explore the complete selection.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expandedPanel === "panel4"}
            onChange={handleChangePanel("panel4")}
            style={{
              marginBottom: "10px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4a-content"
              id="panel4a-header"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Where is your store located?
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "#ffffff" }}>
              <Typography variant="body2">
                Our store is located at Jalan Raya Jatiwaringin, RT.001/RW.002,
                Jatiwaringin, Bekasi City, West Java, Indonesia, easily
                accessible from major roads and public transportation.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Add more FAQ items as needed */}
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
