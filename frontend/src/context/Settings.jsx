import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { httpForToastRequest, httpRequest } from "../Api/BaseApi";
import { useAppContext } from "./AppContext";

const SettingsContext = createContext();
export const SettingsProvider = ({ children }) => {
  const {
    authUser,
    options,
    editAuthData,
    setEditAuthData,
    selectedOptions,
    handleSkillChange,
    handleLanguageChange,
    setSelectedOptions,
    identityVerificationData,
    setIdentityVerificationData,
    billingData,
    setbillingData,
    countriesData,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    // portfolio
    portfolioData,
    setPortfolioData,
    //qualification
    qualificationData,
    setQualificationData,
    languages,
    selectedLanguages,
    fetchPortfoliosData,
    phoneContact,
setPhoneContact,
fetchAuthUserVerification,
getUserData,
userDataAuth,
AUTHUSER

  } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [progresss, setProgress] = useState(0);
  const [portfolioId, setPortfolioId] = useState(0);
  const [qualifciationId, setQualifciationId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profilePicSrc, setProfilePicSrc] = useState(
    "https://taskup.wp-guppy.com/images/default-user-120x120.png"
  );
  const [bannerPicSrc, setBannerPicSrc] = useState(
    "https://taskup.wp-guppy.com/images/default-img.jpg"
  );
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesSecond, setSelectedFilesSecond] = useState([]);
  const [refferalTeam, setRefferalTeam] = useState([]);
  const [portfoliosData, setPortfoliosData] = useState([]);
  const [qualificationsData, setQqualificationsData] = useState([]);
  const [portfolioPicUpdate, setPortfolioPicUpdate] = useState(null);

  const [selectedFilesPortfolio, setSelectedFilesPortfolio] = useState([]);
  const [selectedImageProfile, setSelectedImageProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [portfolioImage, setPortfolioImage] = useState(null);
  const [showModalPortfolio, setShowModalPortfolio] = useState(false);
  const [showModalPortfolioUpdate, setShowModalPortfolioUpdate] =
    useState(false);
  const [showModalQualification, setShowModalQualification] = useState(false);
  // const [phone, setPhone] = useState(false);
  const [showModalQualificationUpdate, setShowModalQualificationUpdate] =
    useState(false);
  const [refferalCode, setRefferalCode] = useState();
  const handleInputChange = (e) => {
    setEditAuthData({ ...editAuthData, [e.target.name]: e.target.value });
  };
  const [dataUri, setDataUri] = useState(null);
  const [camera, setCamera] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportType, setReportType] = useState("");
  const [selectedReportType, setSelectedReportType] = useState("");

  const [reportData, setReportData] = useState({
    message: "",
  });
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    media_type: "",
    media_url: null,
  });
  const [posts, setPosts] = useState([]);
  const [UpdateportfolioImage, setUpdatePortfolioImage] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setCamera(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCamera(false);
  };
  const [validationErrors, setValidationErrors] = useState({});

  const handleImageChangeProfile = (event) => {
    const file = event.target.files[0];
    console.log("files", file);
    setEditAuthData({ ...editAuthData, image: file });
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageProfile(imageUrl);
    } else {
      setSelectedImageProfile(null);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setEditAuthData({ ...editAuthData, cover_image: file });
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    } else {
      setSelectedImage(null);
    }
  };

  const handleSelectedSkills = (selected) => {
    const selectedValues = selected.map((item) => item.value);
    setSelectedOptions(selectedValues);
  };

  const validateAuthFields = (data) => {
    for (const key in data) {
      if (data[key] == "") {
        toast.error(`Field ${key}  is required`);
        return false;
      }
    }
    return true;
  };
  function mapToObject(map) {
    const obj = {};

    for (let [key, value] of map) {
      obj[key] = value;
    }

    return obj;
  }


  // async function getUserData() {
  //   const userData = await fetchAuthUser();
  //   console.log(userData);
  //   setUserDataAuth(userData)
  //   // Use userData as needed
  // }
  
  
  const handleSubmitU = async (path) => {
    // if (!validateAuthFields(editAuthData )) {
    //     setIsLoading(false);
    //     return;
    //   }

    let L = [];
    selectedLanguages.forEach((option) => {
      L.push(option.value);
    });
    let s = [];
    selectedOptions.forEach((option) => {
      s.push(option.value);
    });

    const formData = new FormData();
    formData.append("name", editAuthData.name);
    formData.append("email", editAuthData.email);
    formData.append("bio", editAuthData.bio);
    formData.append("contact", phoneContact);
    formData.append("description", editAuthData.description);
    formData.append("country", selectedCountry);
    formData.append("state", selectedState);
    formData.append("city", selectedCity);
    formData.append("skill_ids[]", s);
    formData.append("language_ids[]", L);
    let errorMessage = "";

if (!editAuthData.image) {
    errorMessage += "Image is required.\n";
}
if (!editAuthData.name) {
    errorMessage += "Name is required.\n";
}

if (!editAuthData.email) {
    errorMessage += "Email is required.\n";
}

if (!editAuthData.bio) {
    errorMessage += "Bio is required.\n";
}

if (!phoneContact) {
    errorMessage += "Phone contact is required.\n";
}



if (L.length === 0 && userDataAuth?.user_type === 'expert') {
  errorMessage += "Please select at least one language.\n";
}

if (s.length === 0 && userDataAuth?.user_type === 'expert') {
  errorMessage += "Please select at least one skill.\n";
}
if (errorMessage) {
  toast.error(errorMessage);
  return
}

    if (!selectedCountry || !selectedState || !selectedCity) {
      toast.error("Kindly, Select All Of Them Country, State & City");
      return;
    }

    setIsLoading(true);

    if (editAuthData.image !== null) {
      formData.append("image", editAuthData.image);
    }
    if (editAuthData.cover_image !== null) {
      formData.append("cover_image", editAuthData.cover_image);
    }
    console.log(mapToObject(formData), "/formData");
    setProgress(30);
    await httpRequest({
      path: path,
      method: "POST",
      data: formData,
      onSuccess: (res) => {
        if (res.status === 200) {
          getUserData();
          setProgress(100);
          toast.success(JSON.stringify(res["message"]));
          setIsLoading(false);
        }
      },
      onError: (error) => {
        console.log(error);
        setIsLoading(false);
      },
    });
  };

  // identity verification section

  const handleFileChange = (e) => {
    setIdentityVerificationData({
      ...identityVerificationData,
      media: e.target.files[0],
    });
  };

  const handleInputChangeIdentity = (e) => {
    setIdentityVerificationData({
      ...identityVerificationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChangeIdentitySecond = (e) => {
    setIdentityVerificationData({
      ...identityVerificationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitI = async (path) => {
    setIsLoading(true);

    if (!validateAuthFields(identityVerificationData)) {
      setIsLoading(false);

      return;
    }

    const formData = new FormData();
    // formData.append("name", identityVerificationData.name);
    formData.append("skill_name", identityVerificationData.skill_name);
    formData.append("address", identityVerificationData.address);
    formData.append("contact", identityVerificationData.contact);
    formData.append("identity", identityVerificationData.identity);
    if (identityVerificationData.media !== null) {
      formData.append("media", identityVerificationData.media);
    }

    setProgress(30);
    await httpRequest({
      path: path,
      method: "POST",
      data: formData,
      onSuccess: (res) => {
        if (res.status === 200) {
          setProgress(100);
          fetchAuthUserVerification();
          window.location.href = "#request-skill";
          toast.success(JSON.stringify(res["message"]));

          setIsLoading(false);
        }
      },
      onError: (error) => {
        console.log(error);
        setIsLoading(false);
      },
    });
  };


  //billing information
  const handleInputChangeBilling = (e) => {
    setbillingData({ ...billingData, [e.target.name]: e.target.value });
  };

  const handleSubmitB = async (path) => {
    setIsLoading(true);

    // if (!validateAuthFields(billingData )) {
    //     setIsLoading(false);
    //     return;
    //   }
    const formData = new FormData();
    formData.append("name", billingData.name);
    formData.append("lastname", billingData.lastname);
    formData.append("company_title", billingData.company_title);
    formData.append("address", billingData.address);
    formData.append("code", billingData.code);

    setProgress(30);
    await httpRequest({
      path: path,
      method: "POST",
      data: formData,
      onSuccess: (res) => {
        if (res.status === 200) {
          setProgress(100);
          toast.success(JSON.stringify(res["message"]));

          setIsLoading(false);
        }
      },
      onError: (error) => {
        console.log(error);
        setIsLoading(false);
      },
    });
  };

  const handleCountryChange = (event) => {
    const selectedCountryId = event.target.value;
    setSelectedCountry(selectedCountryId);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (event) => {
    const selectedStateId = event.target.value;
    setSelectedState(selectedStateId);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    const selectedCityId = event.target.value;
    setSelectedCity(selectedCityId);
  };

  // portfolio section
  const handleClosePortfolio = () => setShowModalPortfolio(false);
  const handleClosePortfolioUpdate = () => {
    setShowModalPortfolioUpdate(false);
    setPortfolioData({
      title: "",
      description: "",
      link: "",
    });
  };

  const handleFileChangePortfolio = (e) => {
    // setPortfolioData({ ...portfolioData, image: e.target.files[0] });
    const files = Array.from(e.target.files);
    setSelectedFilesPortfolio(files);
  };

  const handleDropPortfolio = (e) => {
    // setPortfolioData({ ...portfolioData, image: e.target.files[0] });
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFilesPortfolio(files);
  };

  const handleDragOverPortfolio = (e) => {
    // setPortfolioData({ ...portfolioData, image: e.target.files[0] });
    e.preventDefault();
  };

  const handleInputChangePortfolio = (e) => {
    setPortfolioData({ ...portfolioData, [e.target.name]: e.target.value });
  };
  const handleImageChangePortfolio = (e) => {
    setPortfolioPicUpdate(e.target.files[0]);
    console.log("handleImageChangePortfolio", e.target.files[0]);
  };
  const fileValue = (event) => {
    const value = event.target;

    const file = event.target.files[0];
    setPortfolioPicUpdate(event.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPortfolioData({ ...portfolioData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
    const path = value.value;
    const extension = path.split(".").pop();

    if (
      extension === "jpg" ||
      extension === "svg" ||
      extension === "jpeg" ||
      extension === "png" ||
      extension === "gif"
    ) {
      document.getElementById("image-preview").src = window.URL.createObjectURL(
        value.files[0]
      );
      const filename = path
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -1)
        .join(".");
      setPortfolioImage(window.URL.createObjectURL(value.files[0]));
      document.getElementById("filename").innerHTML = filename;
    } else {
      alert(
        "File not supported. Kindly Upload the Image of below given extension"
      );
    }
  };
  const handleSubmitP = async () => {
    setIsLoading(true);

    const data = { portfolio_data: [portfolioData] };
    await toast.promise(
      httpForToastRequest({
        path: "store-portfolio",
        method: "POST",
        data: data,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status === 200) {
            setShowModalPortfolio(false);
            fetchPortfoliosDataUpdate();
            fetchPortfoliosData();

            return <b>{JSON.stringify(res["message"])}</b>;
          }
          setIsLoading(false);
        },
        error: (err) => {
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
          }
        },
      }
    );
  };
  const handleUpdatePortfolio = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", portfolioData.title);
    formData.append("description", portfolioData.description);
    formData.append("link", portfolioData.link);
    if (portfolioPicUpdate !== null) {
      formData.append("image", portfolioPicUpdate);
    }
    await toast.promise(
      httpForToastRequest({
        path: `update-portfolio/${portfolioId ? portfolioId : 0}`,
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status === 200) {
            setShowModalPortfolioUpdate(false);
            fetchPortfoliosData();
            fetchPortfoliosDataUpdate();
            return <b>{JSON.stringify(res["message"])}</b>;
          }
          setIsLoading(false);
        },
        error: (err) => {
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
          }
        },
      }
    );
  };
  const fetchPortfoliosDataUpdate = async () => {
    await httpRequest({
      path: "user-portfolios",
      method: "Get",
      onSuccess: (res) => {
        // setPosts(res.posts);
        setPortfoliosData(res.data.user_portfolio);
        setQqualificationsData(res.data.user_qualifications);
        console.log("porfolios", res.data.user_qualifications);
        setLoading(false);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  const fetchPortfolioData = (portfolioId) => {
    setShowModalPortfolioUpdate(true);
    // Find the selected portfolio from portfoliosData
    setPortfolioId(portfolioId);
    console.log("user_portfolio", portfolioId);
    const selectedPortfolio = portfoliosData.find(
      (portfolio) => portfolio.id === portfolioId
    );
    setUpdatePortfolioImage(selectedPortfolio.image);
  
    setPortfolioData({
      title: selectedPortfolio.title,
      description: selectedPortfolio.description,
      link: selectedPortfolio.link,
    });
    console.log("user_portfolio_post_data", selectedPortfolio);

    // Open the modal and pass portfoliosData and selected portfolio data
  };

  const fetchQualificationData = (qualifciationId) => {
    // Find the selected portfolio from portfoliosData
    setQualifciationId(qualifciationId);
    console.log("user_portfolio", qualifciationId);
    const selectedQualifciation = qualificationsData.find(
      (portfolio) => portfolio.id === qualifciationId
    );
    setQualificationData({
      title: selectedQualifciation.title,
      description: selectedQualifciation.description,
      insitute: selectedQualifciation.insitute,
      start_date: selectedQualifciation.start_date,
      end_date: selectedQualifciation.end_date,
    });
    // console.log("user_portfolio_post_data",selectedQualifciation)

    // Open the modal and pass portfoliosData and selected portfolio data
    setShowModalQualificationUpdate(true);
  };

  // qualification section
  const handleCloseQualification = () => setShowModalQualification(false);
  const handleCloseQualificationUpdate = () => {
    setShowModalQualificationUpdate(false);
    setQualificationData({
      title: "",
      description: "",
      insitute: "",
      start_date: null,
      end_date: null,
    });
  };

  const handleInputChangeQualification = (e) => {
    setQualificationData({
      ...qualificationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitQ = async () => {
    setIsLoading(true);
    const data = { qualifications: [qualificationData] };
    await toast.promise(
      httpForToastRequest({
        path: "store-qualification",
        method: "POST",
        data: data,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status === 200) {
            fetchPortfoliosData();
            fetchPortfoliosDataUpdate()
            setShowModalQualification(false);
            return <b>{JSON.stringify(res["message"])}</b>;
          }
          setIsLoading(false);
        },
        error: (err) => {
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
          }
        },
      }
    );
  };
  const handleSubmitQUpdate = async (path) => {
    setIsLoading(true);
    await toast.promise(
      httpForToastRequest({
        path: path + qualifciationId,
        method: "POST",
        data: qualificationData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status === 200) {
            fetchPortfoliosData();
            setShowModalQualificationUpdate(false);

            setQualificationData({
              title: "",
              description: "",
              insitute: "",
              start_date: null,
              end_date: null,
            });
            return <b>{JSON.stringify(res["message"])}</b>;
          }
          setIsLoading(false);
        },
        error: (err) => {
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b> Server Error Please Wait while a moment </b>;
            }
            if (err.response.status == 400) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
          }
        },
      }
    );
  };

  // Function to handle capturing the photo
  const handleTakePhoto = (dataUri) => {
    console.log("Photo captured:", dataUri);
    setDataUri(dataUri); // Save the captured photo in state
  };

  // report profile

  const handleClickOpenReport = () => {
    setOpenReportModal(true);
  };

  const handleCloseReport = () => {
    setOpenReportModal(false);
  };

  const handleReportChange = (event) => {
    const value = event.target.value;
    setSelectedReportType(value);
  };

  const handleInputReportChange = (e) => {
    setValidationErrors({ ...validationErrors, [e.target.name]: "" });
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!reportData.message) {
      errors.name = "Message field is required.";
    }
    if (!selectedReportType) {
      errors.report_type = "Report Type field is required.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReport = async (ExpertId, userId) => {
    setIsLoading(true);
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("expert_id", ExpertId);
    formData.append("user_id", userId);
    formData.append("report_type", selectedReportType);
    formData.append("message", reportData.message);
    await toast.promise(
      httpForToastRequest({
        path: "report-profile",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            setProgress(100);
            toast.success(JSON.stringify(res["message"]));
            setOpenReportModal(false);
            setIsLoading(false);
          }
          setIsLoading(false);
        },
        error: (err) => {
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
          }
        },
      }
    );
  };

  //refferal code
  const validateFormRefferal = () => {
    const errors = {};
    if (!refferalCode) {
      errors.refferalCode = "Refferal Code is required.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRefferalSubmit = async () => {
    setIsLoading(true);
    if (!validateFormRefferal()) {
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("referral_code", refferalCode);
    await toast.promise(
      httpForToastRequest({
        path: "update-refferal-code",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          if (res.status == 200) {
            getUserData();
            setRefferalCode("");
            setIsLoading(false);
            return <b>{JSON.stringify(res["message"])}</b>;
          }
        },
        error: (err) => {
          console.log("err", err);
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
            if (err.response.status == 404) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
          }
        },
      }
    );
  };
  useEffect(() => {
    fetchRefferalTeamData();
    fetchPostsData();
    // getUserData();
    fetchPortfoliosDataUpdate();
  }, []);
  const fetchRefferalTeamData = async () => {
    await httpRequest({
      path: "get-refferal-team",
      method: "Get",
      onSuccess: (res) => {
        console.log("res.data.team", res.team);
        setRefferalTeam(res.team);
        setLoading(false);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  // posts

  // const handleMediaFileChange = (event) => {
  //     const file = event.target.files[0];
  //     setPostData({ ...postData, media_url: file });

  // };
  const [file, setFile] = useState(null);
  const [progress2, setProgress2] = useState(0);
  const handleMediaFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPostData({ ...postData, media_url: selectedFile });
    if (selectedFile) {
      setFile(selectedFile);
      setProgress2(0);
      incrementProgress();
    }
  };

  const incrementProgress = () => {
    const interval = 10; // Interval in milliseconds
    const increment = 2; // Increment percentage

    const timer = setInterval(() => {
      setProgress2((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return oldProgress + increment;
      });
    }, interval);
  };

  const handleMediaInputChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const validatePostForm = () => {
    const errors = {};
    if (!postData.title) {
      errors.title = "Title field is required.";
    }
    if (!postData.description) {
      errors.description = "Description field is required.";
    }
    if (!postData.media_type) {
      errors.media_type = "Media_type field is required.";
    }
    if (!postData.media_url) {
      errors.media_url = "Media_File field is required.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePostSubmit = async () => {
    setIsLoading(true);
    if (!validatePostForm()) {
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("description", postData.description);
    formData.append("media_type", postData.media_type);
    formData.append("media_url", postData.media_url);
    await toast.promise(
      httpForToastRequest({
        path: "create-post",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          if (res.status == 200) {
            setPostData({
              title: "",
              description: "",
              media_type: "",
              media_url: null,
            });
            fetchPostsData();
            setIsLoading(false);
            return <b>{JSON.stringify(res["message"])}</b>;
          }
        },
        error: (err) => {
          console.log("err", err);
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
            if (err.response.status == 404) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
          }
        },
      }
    );
  };

  const fetchPostsData = async () => {
    await httpRequest({
      path: "fetch-posts",
      method: "Get",
      onSuccess: (res) => {
        setPosts(res.posts);
        console.log("posts", res.posts);
        setLoading(false);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handlePostDelete = async (path) => {
    setIsLoading(true);

    await toast.promise(
      httpForToastRequest({
        path: path,
        method: "delete",
      }),
      {
        loading: "Loading...",
        success: (res) => {
          if (res.status == 200) {
            fetchPostsData();
            setIsLoading(false);
            return <b>{JSON.stringify(res["message"])}</b>;
          }
        },
        error: (err) => {
          console.log("err", err);
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
            if (err.response.status == 404) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
          }
        },
      }
    );
  };

  const handlePortfolioDelete = async (path) => {
    setIsLoading(true);

    await toast.promise(
      httpForToastRequest({
        path: path,
        method: "delete",
      }),
      {
        loading: "Loading...",
        success: (res) => {
          if (res.status == 200) {
            fetchPortfoliosData();
            setIsLoading(false);
            return <b>{JSON.stringify(res["message"])}</b>;
          }
        },
        error: (err) => {
          console.log("err", err);
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
            if (err.response.status == 404) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
          }
        },
      }
    );
  };
  const handleQualificationDelete = async (path) => {
    setIsLoading(true);

    await toast.promise(
      httpForToastRequest({
        path: path,
        method: "delete",
      }),
      {
        loading: "Loading...",
        success: (res) => {
          if (res.status == 200) {
            fetchPortfoliosData();
            setIsLoading(false);
            return <b>{JSON.stringify(res["message"])}</b>;
          }
        },
        error: (err) => {
          console.log("err", err);
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
            if (err.response.status == 404) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
          }
        },
      }
    );
  };
  return (
    <SettingsContext.Provider
      value={{
        profilePicSrc,
        bannerPicSrc,
        setProfilePicSrc,
        setBannerPicSrc,
        selectedOptions,
        handleInputChange,
        handleSubmitU,
        isLoading,
        handleSelectedSkills,
        options,
        editAuthData,
        handleSkillChange,
        setSelectedOptions,
        // selectedSkills
        selectedImage,
        handleImageChange,
        setSelectedImage,
        selectedImageProfile,
        setSelectedImageProfile,
        handleImageChangeProfile,
        // identity
        handleFileChange,
        selectedFiles,
        identityVerificationData,
        setIdentityVerificationData,
        handleInputChangeIdentity,
        handleSubmitI,
        selectedFilesSecond,
        handleInputChangeIdentitySecond,
        //billing information
        handleInputChangeBilling,
        handleSubmitB,
        billingData,
        // countries
        countriesData,
        setSelectedCountry,
        setSelectedState,
        selectedCountry,
        setSelectedCity,
        selectedState,
        selectedCity,
        handleCountryChange,
        handleStateChange,
        handleCityChange,
        // portfolio
        handleFileChangePortfolio,
        handleDropPortfolio,
        handleDragOverPortfolio,
        handleInputChangePortfolio,
        selectedFilesPortfolio,
        handleSubmitP,
        handleClosePortfolio,
        showModalPortfolio,
        setShowModalPortfolio,
        portfolioData,
        fileValue,
        handlePortfolioDelete,
        handleClosePortfolioUpdate,
        handleImageChangePortfolio,
        // qualifciation
        handleCloseQualification,
        handleInputChangeQualification,
        qualificationData,
        handleSubmitQ,
        showModalQualification,
        setShowModalQualification,
        languages,
        selectedLanguages,
        handleLanguageChange,
        dataUri,
        setDataUri,
        camera,
        setCamera,
        handleTakePhoto,
        handleSubmitQUpdate,
        handleCloseQualificationUpdate,
        showModalQualificationUpdate,
        fetchQualificationData,
        handleQualificationDelete,
        // camera modal
        handleClickOpen,
        handleClose,
        open,
        openReportModal,
        reportReason,
        reportType,
        handleClickOpenReport,
        handleCloseReport,
        handleReport,
        handleReportChange,
        handleInputReportChange,
        validationErrors,
        selectedReportType,
        reportData,
        // handleReportChange,
        handleRefferalSubmit,
        refferalCode,
        setRefferalCode,
        refferalTeam,
        openAlert,
        handleClickOpenAlert,
        handleCloseAlert,

        // posts
        handleMediaFileChange,
        handleMediaInputChange,
        handlePostSubmit,
        postData,
        posts,
        handlePostDelete,
        handleUpdatePortfolio,
        fetchPortfolioData,
        showModalPortfolioUpdate,
        file,
        progress2,
        setPhoneContact,
        phoneContact,
        setbillingData,
        userDataAuth,
        UpdateportfolioImage,


      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
export const useSettingsContext = () => useContext(SettingsContext);
