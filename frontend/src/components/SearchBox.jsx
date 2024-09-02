import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useFrontEndContext } from "../context/FrontEndContext";
import { objectToQueryString } from "../utils/helpers";
function SearchBox({websiteData}) {
  const {
    categoriesData,
    searchError,
  } = useFrontEndContext();
  const{countriesData}=useAppContext();
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    searchInput: '',
    country: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  function handleSubmitQuery(e) {
    e.preventDefault();

    if (isNaN(formData.minPrice) || isNaN(formData.maxPrice)) {
      // Display an error message or handle invalid price input
      console.log('Invalid price input');
      return;
    }

    const minPrice = parseFloat(formData.minPrice);
    const maxPrice = parseFloat(formData.maxPrice);

    if (minPrice >= maxPrice) {
      // Display an error message or handle the case of minPrice >= maxPrice
      toast.error('Minimum price must be less than maximum price');
      return;
    }

    nav(`/experts/?${objectToQueryString(formData)}`)
  }

  useEffect(() => {
    //  ({}).then(_ => console.log(_, ' experts'))
  }, [])

  return (
    <div className="col-xl-5">
      <div className="tk-talents-search">
        <div className="tk-talents-search_title">
          <h4>{websiteData?.top_banner_filter_heading ? websiteData?.top_banner_filter_heading : 'Explore Top Experts' }</h4>
          {websiteData?.top_banner_filter_subheading ? <p>{websiteData?.top_banner_filter_subheading}</p>  : null}  
        </div>
        <div className="tk-talents-search_content">


          <form className="tk-themeform" onSubmit={handleSubmitQuery}>
            <fieldset>
              <div className="tk-themeform__wrap">
                <div className="form-group">
                  <label className="tk-label">What Are You Looking For?</label>
                  <div className="tk-inputicon">
                    <i
                      className="bi bi-search "
                      style={{ color: "#ac04fc !important" }}
                    ></i>
                    <input
                      type="text"
                      id="search_keyword"
                      className="form-control"
                      name="searchInput"
                      // value={searchData.keyword}
                      // onChange={handleInputSearchChange}
                      value={formData.searchInput}
                      onChange={handleInputChange}
                      placeholder="Search with keyword"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="tk-label">
                    Select Your Country (optional)
                  </label>
                  <div className="tk-inputicon">
                    <i
                      className="bi bi-flag "
                      style={{ color: "#ac04fc !important" }}
                    ></i>
                    <select
                      name="country"
                      id=""
                      className="form-control form-select"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option defaultValue="Select Country">
                        Select Country
                      </option>
                      {countriesData.map((data, index) => (
                        <option value={data.name} key={index}>
                          {data.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="tk-label">Category</label>
                  <div className="tk-inputicon">
                    <i
                      className="bi bi-list "
                      style={{ color: "#ac04fc !important" }}
                    ></i>
                    <select
                      name="category"
                      id=""
                      className="form-control form-select"
                      // value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option defaultValue="Select Category">
                        Select Category
                      </option>
                      {categoriesData?.map((category, index) => (

                        <option value={category.id} key={index}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="tk-label">Set Your Budget Range</label>
                  <div className="tk-rangeslider-wrapper pt-0">
                    <div className="tk-distance pt-0">
                      <div className="tk-aside-content pt-0">
                        <div
                          className="tk-rangevalue"
                          data-bs-target="#rangecollapse"
                          role="list"
                          aria-expanded="false"
                        >
                          <div className="tk-areasizebox">
                            <input
                              type="number"
                              className="form-control"
                              min="1"
                              value={formData.minPrice}
                              onChange={handleInputChange}
                              max="300"
                              step="1"
                              placeholder="Min price"
                              id="seller_min_hr_rate"
                              name="minPrice"
                            />
                            <input
                              type="number"
                              className="form-control"
                              step="1"
                              placeholder="Max price"
                              id="seller_max_hr_rate"
                              name="maxPrice"
                              value={formData.maxPrice}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        {searchError && (
                          <div className="tk-verifyemail_alert  mt-3">
                            {searchError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="tk-searchbtn">
                    <button
                      type="submit"
                      className="tk-btn-solid-lg tk-btn-yellow w-100"
                    >
                      Search Now <i className="bi bi-search"></i>{" "}
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;