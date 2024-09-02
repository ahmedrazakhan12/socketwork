import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { httpForToastRequest, httpGetRequest } from "../Api/BaseApi";
import defaultImage from "../assets/images/default_image.jpeg";
import {
  validationWithCountriesForID_Card_number,
  validationsWithCountries,
} from "../utils/constants";
import { useAppContext } from "./AppContext";

const CompletionContext = createContext();
export const CompletionProvider = ({ children }) => {
  const { initApp , getUserData } = useAppContext();
  const [isLoadsing, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [progresss, setProgress] = useState(0);
  const [isPreLoading, setIsPreLoading] = useState(false);
  const [SelectedCountry, setSelectedCountry] = useState("US");

  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [filePicker, setFilePicker] = useState("");
  const [imageFile, setImageFile] = useState(
    "https://placehold.co/600x400/EEE/31343C"
  );
  // const stepNames = ["Personal", "Qualification", "PaymentDetails", "Finish"];
  const stepNames = [
    { name: "Personal", id: "Personal" },
    { name: "Qualification", id: "Qualification" },
    { name: "Payment Details", id: "PaymentDetails" },
    { name: "Finish", id: "Finish" },
  ];
  const [portfolioData, setPortfolioData] = useState([]);
  const [portfolioImage, setPortfolioImage] = useState(
    "https://www.btklsby.go.id/images/placeholder/basic.png"
  );
  const [formData, setFormData] = useState([]);
  const [formDatap, setFormDatap] = useState([]);
  const [dattaa, setDatta] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [subCategories, setSubCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [FilteredSubcategories, setFilteredSubcategories] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [qualificationFormData, setQualificationFormData] = useState([]);
  const [portfolioFormData, setPortfolioFormData] = useState([]);
  const navigate = useNavigate();
  const [SelectedCountryForIdCardNum, setSelectedCountryForIdCardNum] =
    useState("");

  const [userData, setUserData] = useState({
    bio: "",
    image: null,
  });
  const [paymentDetails, setPaymentDetails] = useState({
    username: "",
    name: "",
    account_number: null,
    address: "",
    card_number: null,
  });

  const [userImage, setUserImage] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        // Encode the file content as base64
        const base64Image = reader.result;

        // Set the image data in your state
        setUserData({ ...userData, image: base64Image });
        setUserImage(base64Image);
        console.log("base64", base64Image);
        // Display the image preview if needed
        const url = URL.createObjectURL(file);
        setImageUrl(url);
      };
      reader.readAsDataURL(file);
    }
  };
  const [qerrors, setQErrors] = useState({});

  const handleSave = () => {
    const title = document.querySelector("input[name='title']").value;
    const insitute = document.querySelector("input[name='insitute']").value;
    const description = document.querySelector(
      "textarea[name='description']"
    ).value;
    const start_date = document.querySelector("input[name='start_date']").value;
    const end_date = document.querySelector("input[name='end_date']").value;

    const newErrors = {};

    if (title === "") {
      newErrors.title = "Title field is required";
    }

    if (insitute === "") {
      newErrors.insitute = "Insitute field is required";
    }

    if (start_date === "") {
      newErrors.start_date = "Start date field is required";
    }

    if (end_date === "") {
      newErrors.end_date = "End date field is required";
    }
    if (new Date(start_date) >= new Date(end_date)) {
      newErrors.date = "End date must be greater than start date";
    }
    if (description === "") {
      newErrors.description = "Description field is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setQErrors(newErrors);
    } else {
      setQErrors({}); // Clear errors if there are no validation issues
      const newItem = {
        title: title,
        insitute: insitute,
        description: description,
        start_date: start_date,
        end_date: end_date,
      };
      setDatta((prevItems) => [...prevItems, newItem]);
      setFormData([...formData, newItem]);

      const jsonData = JSON.stringify([...formData, newItem], null, 2);
      const jsonDataElement = document.getElementById("json-data");

      if (jsonDataElement) {
        jsonDataElement.textContent = jsonData;
      }
      console.log("newItem", jsonData);

      setQualificationFormData(jsonData);
      document.querySelector("input[name='title']").value = "";
      document.querySelector("input[name='insitute']").value = "";
      document.querySelector("textarea[name='description']").value = "";
      document.querySelector("input[name='start_date']").value = "";
      document.querySelector("input[name='end_date']").value = "";

      toast.success("Saved");
    }

    // if (title === "") {
    //     toast.error("title field is required");
    // } else if (description === "") {
    //     toast.error("description field is required");
    // } else if (start_date === "") {
    //     toast.error("start_date field is required");
    // } else if (end_date === "") {
    //     toast.error("end_date field is required");
    // } else if (new Date(start_date) >= new Date(end_date)) {
    //     toast.error("End date must be after start date");
    // } else {
    //     const newItem = {
    //         title: title,
    //         insitute: insitute,
    //         description: description,
    //         start_date: start_date,
    //         end_date: end_date,
    //     };
    //     setDatta((prevItems) => [...prevItems, newItem]);
    //     setFormData([...formData, newItem]);

    //     const jsonData = JSON.stringify([...formData, newItem], null, 2);
    //     const jsonDataElement = document.getElementById("json-data");

    //     if (jsonDataElement) {
    //         jsonDataElement.textContent = jsonData;
    //     }

    //     setQualificationFormData(jsonData);
    //     document.querySelector("input[name='title']").value = "";
    //     document.querySelector("input[name='insitute']").value = "";
    //     document.querySelector("textarea[name='description']").value = "";
    //     document.querySelector("input[name='start_date']").value = "";
    //     document.querySelector("input[name='end_date']").value = "";

    //     toast.success("Saved");
  };

  const handleDelete = (index) => {
    const updatedData = [...dattaa];
    updatedData.splice(index, 1);
    setDatta(updatedData);
    toast.success("Removed");
  };
  const handlePortfolioDelete = (index) => {
    const updatedData = [...dattaa];
    updatedData.splice(index, 1);
    setPortfolioData(updatedData);
    toast.success("Removed");
  };

  const fileValue = (event) => {
    const value = event.target;

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);
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

  const handlePortfolioSave = () => {
    const title = document.querySelector("input[name='title']").value;
    const description = document.querySelector(
      "textarea[name='description']"
    ).value;
    const url = document.querySelector("input[name='portfolio_url']").value;

    if (title == "") {
      toast.error("title field is required");
    } else if (description == "") {
      toast.error("description field is required");
    } else if (url == "") {
      toast.error("url field is required");
    } else {
      const newItem = {
        title: title,
        description: description,
        link: url,
        image: imageFile,
      };
      const data = new FormData();
      setPortfolioData((prevItems) => [...prevItems, newItem]);
      setFormDatap([...formDatap, newItem]);

      const jsonData = JSON.stringify([...formDatap, newItem], null, 2);

      const jsonDataElement = document.getElementById("json-data");
      if (jsonDataElement) {
        jsonDataElement.textContent = jsonData;
      }
      setPortfolioFormData(jsonData);
      document.querySelector("input[name='title']").value = "";
      document.querySelector("textarea[name='description']").value = "";
      document.querySelector("input[name='portfolio_url']").value = "";
      setPortfolioImage("");
      document.getElementById("image-preview").src =
        "https://www.btklsby.go.id/images/placeholder/basic.png";
      document.getElementById("filename").innerHTML = "Drag and Drop";
      toast.success("Saved");
    }
  };

  const handleCategoryChange = async (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    const filteredSubs = categoriesData.filter(
      (subcategory) => subcategory.id == selectedCategoryId
    );

    setFilteredSubcategories(
      filteredSubs.length > 0 && filteredSubs[0].sub_categories
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubCategoryChange = async (event) => {
    const selectedSubCategoryId = event.target.value;
    setSelectedSubCategory(selectedSubCategoryId);
  };

  const handleSelectedSkills = (selected) => {
    console.log("selected", selected);

    setSelectedSkill(selected);
    // if()
    const selectedValues = selected.map((item) => item.value);
    console.log(selectedValues, " selectedvalues", selectedValues.length);

    // if (selectedValues.length < 7) {
    setSelectedSkillIds(selectedValues);
    // }

    console.log("selectedValues", selectedValues);
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({});

  const handlePaymentsInputChange = (e) => {
    const { name, value } = e.target;

    setPaymentDetails({ ...paymentDetails, [name]: value });

    // Validation rules similar to Laravel validation
    const validationRules = {
      username: "required",
      name: "required",
      card_number: `required|numeric|digits_between:${validationWithCountriesForID_Card_number[SelectedCountryForIdCardNum].min},${validationWithCountriesForID_Card_number[SelectedCountryForIdCardNum].max}`,
      account_number: `required|numeric|digits_between:${validationsWithCountries[SelectedCountry].min},${validationsWithCountries[SelectedCountry].max}`,
      address: "required",
    };

    // Validate input based on rules
    const validateInput = (name, value) => {
      if (validationRules[name]) {
        const rules = validationRules[name].split("|");
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i].split(":");
          switch (rule[0]) {
            case "required":
              if (!value.trim()) {
                return `${name} is required`;
              }
              break;
            case "numeric":
              if (isNaN(value)) {
                return `${name} must be a number`;
              }
              break;
            case "digits":
              if (value.length !== parseInt(rule[1])) {
                return `${name} must be ${rule[1]} digits`;
              }
              break;
            case "digits_between":
              const range = rule[1].split(",");
              if (
                value.length < parseInt(range[0]) ||
                value.length > parseInt(range[1])
              ) {
                console.log("card_number", name);
                // if(validationRules['card_number']){
                //   // ... change the state
                // }

                // if(validationRules['account_number']){
                //   // ... change the state

                // }

                return `${name} must be between ${range[0]} and ${range[1]} digits`;
              }
              break;
            default:
              break;
          }
        }
      }
      return "";
    };

    // Validate the input and set errors
    const errorMessage = validateInput(name, value);
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleQualificationSubmit = async () => {
    const data = { qualifications: JSON.parse(qualificationFormData) };
    console.log(typeof data.qualifications);
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
          if (res.status == 200) {
            setCurrent(3);
            return <b>{JSON.stringify(res["message"])}</b>;
          }
          setIsLoading(false);
        },
        error: (err) => {
          console.log("err", err);
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{"Validation Error"}</b>;
            }
          }
        },
      }
    );
  };

  const handlePortfolioSubmit = async () => {
    const data = { portfolio_data: JSON.parse(portfolioFormData) };
    console.log(typeof data.portfolio_data);
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
          if (res.status == 200) {
            navigate("/dashboard");
            return <b>{JSON.stringify(res["message"])}</b>;
          }
          setIsLoading(false);
        },
        error: (err) => {
          console.log("err", err);
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{"Validation Error Sppoted"}</b>;
            }
          }
        },
      }
    );
  };

  const handleSubmit = async () => {
    let Success = false;
    console.log("cardd");
    if (
      !paymentDetails.name ||
      !userData.bio ||
      !paymentDetails.username ||
      !paymentDetails.name ||
      !paymentDetails.account_number ||
      !paymentDetails.address ||
      !paymentDetails.card_number
    ) {
      toast.error("Please fill out all the required fields");
      return;
    }

    console.log(paymentDetails.card_number, " paymentDetails");

    console.log(paymentDetails, "cardd");
    if (paymentDetails["card_number"]) {
      if (
        Number(
          validationWithCountriesForID_Card_number[SelectedCountryForIdCardNum]
            .min
        ) <= paymentDetails["card_number"].length &&
        Number(
          validationWithCountriesForID_Card_number[SelectedCountryForIdCardNum]
            .max
        ) >= paymentDetails["card_number"].length
      ) {
      } else {
        toast.error("Id Card Number Is Not Valid!");
        return;
      }
    }
    if (paymentDetails["account_number"]) {
      if (
        Number(validationsWithCountries[SelectedCountry].min) <=
          paymentDetails["account_number"].length &&
        Number(validationsWithCountries[SelectedCountry].max) >=
          paymentDetails["account_number"].length
      ) {
      } else {
        toast.error("Account Number Is Not Valid!");
        return;
      }
    }

    const requestData = {
      name: paymentDetails.name,
      bio: userData.bio,
      qualifications: JSON.parse(qualificationFormData),
      username: paymentDetails.username,
      nameOnCard: paymentDetails.name,
      account_number: paymentDetails.account_number,
      address: paymentDetails.address,
      card_number: paymentDetails.card_number,
      category_id: selectedCategory,
      subcategory_id: selectedSubCategory,
      skill_ids: selectedSkillIds.join(","),
      image: userImage,
    };

    Success = true;
    await toast.promise(
      httpForToastRequest({
        path: "registeration-steps",
        method: "POST",
        data: requestData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            getUserData();
            initApp();

            // setCurrent(4);
            // navigate("/dashboard");
            Success = true;
            return <b>{JSON.stringify(res["message"])}</b>;
          }
          setIsLoading(false);
        },
        error: (err) => {
          Success = false;
          console.log("errrrrr", err);
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{"Validation Error Sppoted"}</b>;
            }
          }
        },
      }
    );

    return Success;
  };

  // const handleSubmit = async () => {

  //   const requestData = {
  //     name: paymentDetails.name,
  //     email: userData.email,
  //     bio: userData.bio,
  //     qualifications: JSON.parse(qualificationFormData),
  //     username: paymentDetails.username,
  //     nameOnCard: paymentDetails.name,
  //     account_number: paymentDetails.account_number,
  //     address: paymentDetails.address,
  //     card_number: paymentDetails.card_number,
  //  category_id: selectedCategory,
  // subcategory_id: selectedSubCategory,
  // skill_ids: selectedSkillIds.join(','),
  //     image: userData.image,
  //   };

  //   // const qualificationsData = { qualifications: JSON.parse(qualificationFormData) };
  //   console.log(selectedSkillIds)
  //   if (!userData.image) {
  //     toast.error("Image field is required");
  //   } else if (!userData.bio) {
  //     toast.error("Bio field is required");
  //   } else if (!selectedCategory) {
  //     toast.error("Category field is required");
  //   } else if (!selectedSubCategory) {
  //     toast.error("SubCategory field is required");
  //   } else if (selectedSkillIds.length === 0) {
  //     toast.error("Skill field is required");
  //   } else {

  //     const formData = new FormData();
  //     formData.append('name', userData.name);
  //     formData.append('email', userData.email);
  //     formData.append('bio', userData.bio);
  //     // formData.append('qualifications', qualificationsData);
  //     formData.append('username', paymentDetails.username);
  //     formData.append('name', paymentDetails.name);
  //     formData.append('account_number', paymentDetails.account_number);
  //     formData.append('address', paymentDetails.address);
  //     formData.append('card_number', paymentDetails.card_number);
  //     formData.append('category_id', selectedCategory);
  //     formData.append('subcategory_id', selectedSubCategory);
  //     formData.append('skill_ids', selectedSkillIds);
  //     formData.append('image', userData.image);
  //     await toast.promise(
  //       httpForToastRequest({
  //         path: "registeration-steps",
  //         method: 'POST',
  //         data: requestData
  //       }),
  //       {
  //         loading: 'Loading...',
  //         success: (res) => {
  //           console.log(res.message);
  //           if (res.status == 200) {
  //             setCurrent(4);
  //           navigate('/dashboard');
  //             return <b>{JSON.stringify(res['message'])}</b>
  //           }
  //           setIsLoading(false);
  //         },
  //         error: (err) => {
  //           console.log('errrrrr', err)
  //           setIsLoading(false);
  //           if (err instanceof AxiosError) {
  //             if (err.response.status == 500) {
  //               return <b>{"Server Error Please Wait while a moment"}</b>
  //             } if (err.response.status == 400) {
  //               return <b>{"Validation Error Sppoted"}</b>
  //             }
  //           }
  //         }
  //       }
  //     );

  //   }
  // };

  const fetchData = async () => {
    await httpGetRequest({
      path: "categories",
      method: "Get",
      onSuccess: (res) => {
        console.log("res", res);
        setCategoriesData(res.data.categories);
        const skillOptions = res.data.skills.map((skill) => ({
          value: skill.id,
          label: skill.name,
        }));
        setSkillsData(skillOptions);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <CompletionContext.Provider
      value={{
        current,
        imageUrl,
        handleFileChange,
        stepNames,
        setCurrent,
        handleSave,
        handleDelete,
        dattaa,
        fileValue,
        handlePortfolioSave,
        portfolioData,
        handlePortfolioDelete,
        handleInputChange,
        handleSubmit,
        handleSelectedSkills,
        handleCategoryChange,
        subCategories,
        selectedCategory,
        handleSubCategoryChange,
        categoriesData,
        skillsData,
        selectedSubCategory,
        validationErrors,
        userData,
        formData,
        SelectedCountry,
        setSelectedCountry,
        handleQualificationSubmit,
        handlePortfolioSubmit,
        FilteredSubcategories,
        paymentDetails,
        handlePaymentsInputChange,
        selectedSkillIds,
        errors,
        qerrors,
        selectedSkill,
        SelectedCountryForIdCardNum,
        setSelectedCountryForIdCardNum,
        setErrors,
      }}
    >
      {children}
    </CompletionContext.Provider>
  );
};
export const useCompletionContext = () => useContext(CompletionContext);
