import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { baseUrlImage } from '../../Api/BaseApi';
import { useSettingsContext } from '../../context/Settings';

const PortfolioUpdateModal = ({
  showModalPortfolio,
  handleClosePortfolio,
  handleInputChangePortfolio,
  handleDropPortfolio,
  handleDragOverPortfolio,
  fileValue,
  portfolioData,
  selectedFilesPortfolio,
  handleUpdatePortfolio, // Assuming you have this function
}) => {
const{
  handleImageChangePortfolio,
  UpdateportfolioImage
}=useSettingsContext();

console.log("portfolioData",portfolioData)
  return (
    <Modal
      show={showModalPortfolio}
      onHide={handleClosePortfolio}
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Portfolio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tk-themeform">
          <fieldset>
            <div className="form-group">
              <label className="tk-label tk-required">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter title"
                autoComplete="off"
                onChange={handleInputChangePortfolio}
                value={portfolioData.title}
              />
            </div>
            <div className="form-group">
              <label className="tk-label tk-required">Portfolio URL</label>
              <input
                type="text"
                name="link"
                className="form-control"
                placeholder="Enter portfolio URL"
                autoComplete="off"
                onChange={handleInputChangePortfolio}
                value={portfolioData.link}
              />
            </div>

            <div className="form-group">
              <label className="tk-label">Portfolio description</label>
              <textarea
                className="form-control"
                onChange={handleInputChangePortfolio}
                value={portfolioData.description}
                name="description"
                placeholder="Enter portfolio description"
              ></textarea>
            </div>

            <div className="form-group">
              <div className="tk-draganddropwrap form-group">
                <div
                  className="tk-draganddrop"
                  onDrop={handleDropPortfolio}
                  onDragOver={handleDragOverPortfolio}
                >
                  <svg>
                    <rect width="100%" height="100%"></rect>
                  </svg>
                  <input
                    className="tk-drag-imagearea"
                    type="file"
                    id="at_upload_files"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.jpg,.jpeg,.gif,.png,.mp4,.mp3,.3gp,.flv,.ogg,.wmv,.avi,.txt"
                    onChange={handleImageChangePortfolio}
                  />
                  <div className="tk-dragfile">
                    <div className="tk-fileareaitem">
                      {selectedFilesPortfolio.length > 0 ? (
                        // Render previews for selected files
                        selectedFilesPortfolio.map((file, index) => (
                          <div key={index} className="file-preview">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="preview-image"
                            />
                            <span className="file-name">{file.name}</span>
                          </div>
                        ))
                      ) : (
                        // Show this when no files are selected
                        <img
                          // src={https://taskup.wp-guppy.com/images/image-uploader.jpg}
                          src={baseUrlImage+UpdateportfolioImage}
                          alt=""
                          width={'100px'}
                        />
                      )}
                    </div>
                    <div className="tk-filearea">
                      <div className="text-center d-none">
                        <span className="fw-normal">Uploading...</span>
                      </div>
                      <div className="text-center tk-text-flex">
                        <span>Drop your files here to upload</span>
                        <label
                          className="tk-drag-label"
                          htmlFor="at_upload_files"
                        >
                          <em>Click here</em>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="tk-savebtn text-white">
                  <Button
                    className="tb-btn text-white"
                    // onClick={handleUpdatePortfolio}
                    onClick={async () =>
                      await handleUpdatePortfolio(`update-portfolio/${portfolioData.id}`)
                    }
                  >
                    Save &amp; Update
                  </Button>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PortfolioUpdateModal;
