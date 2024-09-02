import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, LinearProgress, Typography } from "@mui/material";
import { styled } from '@mui/system';
import React from "react";
import { Button } from "react-bootstrap";
import Footer from "../components/Footer";
import { useSettingsContext } from "../context/Settings";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
const Input = styled('input')({
  display: 'none',
});
function UploadMediaPosts() {
  const {
    validationErrors,
    handleMediaFileChange,
    handleMediaInputChange,
    handlePostSubmit,
    postData,
    file,
progress2
  } = useSettingsContext();
 

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="tk-main-section tk-main-bg">
        <div className="container">
          <div className="gy-lg-0 gy-4 row">
            <div className="col-lg-4 col-xl-3 ">
              <Sidebar />
            </div>
            <div className="col-lg-8 col-xl-9">
              <div className="tk-project-wrapper">
                <div className="tk-profile-form">
                  <form className="tk-themeform" id="tb_save_settings">
                    <fieldset>
                      <div className="tk-themeform__wrap">
                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label tk-required">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={postData.title}
                            onChange={handleMediaInputChange}
                            placeholder="Title"
                          />
                          {validationErrors.title && (
                            <Typography className="text-danger">
                              {validationErrors.title}
                            </Typography>
                          )}
                        </div>
                        {/* <div className="form-group-half form-group_vertical" >
                       <label className="tk-label tk-required">
                            Choose File
                          </label> 
                         <input
                            type="file"
                            className="form-control"
                            name="media_url"
                            onChange={handleMediaFileChange}
                          />
                          {validationErrors.media_url && (
                            <Typography className="text-danger">
                              {validationErrors.media_url}
                            </Typography>
                          )}   
                          <MuiFileInput 
                          placeholder="Choose Image Or Video"
                          className="MuiFileInput-ClearIconButton MuiFileInput-placeholder MuiFileInput-Typography-size-text MuiFileInput-TextField"
                            value={file}
                            onChange={handleChange}
                          />
                        </div> */}
                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label tk-required">
                            Media type
                          </label>
                          <select
                            name="media_type"
                            className="form-select"
                            onChange={handleMediaInputChange}
                            value={postData.media_type}
                          >
                            <option value="image">image</option>
                            <option value="video">video</option>
                          </select>
                          {validationErrors.media_type && (
                            <Typography className="text-danger">
                              {validationErrors.media_type}
                            </Typography>
                          )}
                        </div>
                      </div>
                      <div className=" form-group_vertical" >
                       <label className="tk-label tk-required">
                            Choose File
                          </label> 
                        
                          <Box sx={{ width: '100%', textAlign: 'center', mt: 5 ,border:'1px solid #ac04fc'}}>
      <label htmlFor="file-upload"   style={{
            // height:'10vh',
            padding:'15px',
            fontSize:'14px',
            color:'#0A0F26',
            fontWeight:'600'
          }}>
        <Input
          accept="image/*,video/*"
          id="file-upload"
          type="file"
          onChange={handleMediaFileChange}
        
        />
      <FileUploadIcon />  Choose Image Or Video
          
      </label>
    
    </Box>
    {validationErrors.media_url && (
                            <Typography className="text-danger">
                              {validationErrors.media_url}
                            </Typography>
                          )}   
    {file && (

        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">{file.name}</Typography>
          <LinearProgress
            variant="determinate"
            value={progress2}
            sx={{ mt: 1, height: '10px', borderRadius: '5px' }}
          />
        </Box>
      )}
                        </div>
                      <div className="form-group_vertical">
                        <label className="tk-label tk-required">
                          Description
                        </label>
                        <textarea
                          type="text"
                          name="description"
                          className="form-control"
                          onChange={handleMediaInputChange}
                          placeholder="Description"
                        >
                          {postData.description}
                        </textarea>
                        {validationErrors.description && (
                          <Typography className="text-danger">
                            {validationErrors.description}
                          </Typography>
                        )}
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div className="tk-profileform__holder">
                  <div className="tk-dhbbtnarea">
                    <em>
                      Click “Save &amp; Update” to update the latest changes
                    </em>

                    <Button
                      className="tk-btn-solid-lg"
                      onClick={handlePostSubmit}
                      // disabled={isLoading}
                    >
                      <span style={{ color: "white" }}>Save &amp; Update</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default UploadMediaPosts;
