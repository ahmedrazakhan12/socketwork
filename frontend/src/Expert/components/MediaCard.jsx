/* eslint-disable jsx-a11y/anchor-is-valid */
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Face from "@mui/icons-material/Face";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import * as React from "react";
import { baseUrlImage } from "../../Api/BaseApi";

export default function MediaCard({ data, key, user }) {
  const [isCommentSectionVisible, setCommentSectionVisibility] =
    React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");

  const toggleCommentSection = () => {
    setCommentSectionVisibility(!isCommentSectionVisible);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    // Add newComment to comments array
    setComments([...comments, newComment]);
    // Clear the input field
    setNewComment("");
  };
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // const data = [
  //   {
  //     media_type: 'image',
  //     media_url: 'https://via.placeholder.com/400x300.png',
  //   },
  //   {
  //     media_type: 'video',
  //     media_url: 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  //   },
  //   {
  //     media_type: 'video',
  //     media_url: 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  //   },
  // ];
  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };
  return (
    <Box className="col-md-4 col-12" key={key}>
      <Card
        variant="outlined"
        sx={{
          minWidth: "100%",
          "--Card-radius": (theme) => theme.vars.radius.xs,
          mt: 3,
        }}
      >
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", gap: 1 }}
        >
          {/* <IconButton variant="plain" color="neutral" size="sm" onClick={handlePrevImage}>
          <KeyboardArrowLeft />
        </IconButton> */}
          <Box
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: "-2px",
                borderRadius: "50%",
                background:
                  "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
              },
            }}
          >
            <Avatar
              size="sm"
              src="/static/logo.png"
              sx={{
                p: 0.5,
                border: "2px solid",
                borderColor: "background.body",
              }}
            />
          </Box>
          <Typography fontWeight="lg" sx={{ mt: 3 }}>
            {user?.name}
          </Typography>
          {/* <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
          <MoreHoriz />
        </IconButton> */}
          {/* <IconButton variant="plain" color="neutral" size="sm" onClick={handleNextImage}>
          <KeyboardArrowRight />
        </IconButton> */}
        </CardContent>
        <CardOverflow>
          <AspectRatio>
            {/* {data[currentIndex].media_type === 'image' ? (
              <img src={data[currentIndex].media_url} alt="" loading="lazy" />
            ) : (
              <video controls>
                <source src={data[currentIndex].media_url} />
              </video>
            )} */}
            {data.media_type === "image" ? (
              <img src={baseUrlImage + data.media_url} alt="" loading="lazy" />
            ) : (
              <video controls>
                <source src={baseUrlImage + data.media_url} />
              </video>
            )}
          </AspectRatio>
        </CardOverflow>
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", mx: -1 }}
        >
          <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
            <IconButton variant="plain" color="neutral" size="sm">
              <FavoriteBorder />
            </IconButton>
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              onClick={toggleCommentSection}
            >
              <ModeCommentOutlined />
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <SendOutlined />
            </IconButton>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mx: "auto" }}
          >
            {[...Array(data.length)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: "50%",
                  width: `max(${6 - Math.abs(currentIndex - index)}px, 3px)`,
                  height: `max(${6 - Math.abs(currentIndex - index)}px, 3px)`,
                  bgcolor:
                    index === currentIndex
                      ? "primary.solidBg"
                      : "background.level3",
                }}
              />
            ))}
          </Box>
          <Box sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}>
            <IconButton variant="plain" color="neutral" size="sm">
              <BookmarkBorderRoundedIcon />
            </IconButton>
          </Box>
        </CardContent>
        <CardContent>
          {/* <Link
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          8.1M Likes
        </Link> */}
          <Typography fontSize="sm">{data.title}</Typography>
          <Link
            component="button"
            underline="none"
            fontSize="sm"
            startDecorator="…"
            sx={{ color: "text.tertiary" }}
          >
            more
          </Link>
          <Link
            component="button"
            underline="none"
            fontSize="10px"
            sx={{ color: "text.tertiary", my: 0.5 }}
          >
            {data.uploaded_at}
          </Link>
          <Drawer
            anchor="bottom"
            open={isCommentSectionVisible}
            onClose={toggleCommentSection}
            // sx={{ width: '100%', maxWidth: 360 }}
            sx={{ width: "100%", maxWidth: "100vw", margin: 0 }}
          >
            <List>
              {comments.map((comment, index) => (
                <ListItem key={index}>
                  <Avatar
                    size="sm"
                    src="/static/logo.png"
                    sx={{
                      p: 0.5,
                      border: "2px solid",
                      borderColor: "background.body",
                    }}
                  />
                  <Typography>{comment}</Typography>
                </ListItem>
              ))}
            </List>
            <CardContent orientation="horizontal" sx={{ gap: 1 }}>
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                sx={{ ml: -1 }}
              >
                <Face />
              </IconButton>
              <Input
                variant="plain"
                size="sm"
                placeholder="Add a comment…"
                sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
                value={newComment}
                onChange={handleCommentChange}
              />
              <Link underline="none" role="button" onClick={handleAddComment}>
                Post
              </Link>
            </CardContent>
          </Drawer>
        </CardContent>
      </Card>
    </Box>
  );
}
