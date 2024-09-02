import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/joy";
import {
  Box,
  Button,
  Container,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import Header from "./components/Header";
function AutomatedAnswers() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { supportAnswers, fetchSupportAnswers, loading, supportCategories ,AllsupportAnswers } =
    useAppContext();
  const { id } = useParams();
  const ContentItem = styled("div")({
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  });
  useEffect(() => {
    fetchSupportAnswers(id);
  }, [id]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredAnswers, setFilteredAnswers] = useState([]);

  const handleCategoryClick = (category) => {
    setFilteredAnswers(AllsupportAnswers.filter(
      (qa) =>  qa.category_id == category
    ))
  //   if(supportAnswers != null){
  //     setFilteredAnswers(supportAnswers)
  //   }else{
   
  // }
    setSelectedCategory(category);
  };

  return (
    <>
      <Header />
      <Hidden mdUp>
        <Button
          style={{ width: "10px", color: "black" }}
          size="sm"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </Button>
        <Drawer anchor="left" open={open} onClose={toggleDrawer}>
          <div style={{ width: 250, padding: "20px" }}>
            <Typography
              component="h3"
              style={{ fontSize: "20px" }}
              className="pb-3 border-bottom border-1 p-3"
            >
              Categories
            </Typography>
            <List>
              {supportCategories?.map((category) => (
                <ListItem
                  button
                  key={category.id}
                  selected={selectedCategory === category}
                  onClick={() => handleCategoryClick(category.id)}
                  style={{textTransform :'capitalize'}}
                >
                  <ListItemText primary={category.title} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </Hidden>

         <Container style={{ backgroundColor: "#F7F7F7", height: "100vh" }}>
      <Box className="row">
        <Hidden smDown>
          <Box className="col-md-3 col-12">
            <Typography
              component="h2"
              className="p-2 mt-2 border-bottom border-1 pb-3"
              style={{ fontSize: "20px" }}
            >
              Categories
            </Typography>
            <List>
              {supportCategories?.map((category) => (
                <ListItem
                  button
                  key={category.id}
                  selected={selectedCategory === category}
                  onClick={() => handleCategoryClick(category.id)}
                  style={{textTransform :'capitalize'}}
                >
                  <ListItemText primary={category.title} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Hidden>

        <Box className="col-md-9 col-12">
          <Typography
            component="h2"
            className="border-1 border-bottom pb-3 p-2 mt-2"
            style={{ marginBottom: "20px", fontSize: "20px" }}
          >
            Questions Answers
          </Typography>
          {filteredAnswers.length > 0
            ? filteredAnswers.map((qa, i) => (
                <Box key={i}>
                  <Typography variant="h6">Q: {qa.question}</Typography>
                  <ContentItem>A: {qa.answer}</ContentItem>
                </Box>
              ))
            : "No Data"}
        </Box>
      </Box>
    </Container>
      <Footer />
    </>
  );
}

export default AutomatedAnswers;
