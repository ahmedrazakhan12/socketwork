import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { baseurl } from "../Api/BaseApi";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
function W4Form() {
  const{
    AUTHUSER
  }=useAppContext();
  const [formData, setFormData] = useState({
    contact_email: '',
    first_name: AUTHUSER?.name || '',
    last_name: '',
    street_address: '',
    address_2: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.contact_email) newErrors.contact_email = 'Contact Email is required';
    if (!formData.first_name) newErrors.first_name = 'First Name is required';
    if (!formData.last_name) newErrors.last_name = 'Last Name is required';
    if (!formData.street_address) newErrors.street_address = 'Street Address is required';
    if (!formData.address_2) newErrors.address_2 = 'Address 2 is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${baseurl}/update-w4form`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        toast.success('W4Form Submitted Successfully');
      } else {
        alert('Something Went Wrong');
      }
    } catch (error) {
      alert('Something Went Wrong');
    } finally {
      setLoading(false);
    }
  };
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
                <div className="tk-project-box">
                <div className="tb-dhb-profile-settings">
                <div className="tb-dhb-mainheading">
                  <h2>W-4 Form <span className="tk-label m-1">{'(Your form will be submitted to the admin.)'}</span></h2>
                </div>
              </div>
                </div>
                <div className="tk-profile-form">
                <form className="tk-themeform" id="tb_save_settings" onSubmit={handleSubmit}>
        <fieldset>
          <div className="tk-themeform__wrap">
            <div className="form-group form-group_vertical">
              <label className="tk-label tk-required">Contact Email</label>
              <input
                type="text"
                className="form-control"
                name="contact_email"
                placeholder="Contact Email"
                value={formData.contact_email}
                onChange={handleChange}
              />
              {errors.contact_email && <span className="text-danger">{errors.contact_email}</span>}
            </div>
            <div className="form-group-half form-group_vertical">
              <label className="tk-label tk-required">First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
              />
              {errors.first_name && <span className="text-danger">{errors.first_name}</span>}
            </div>
            <div className="form-group-half form-group_vertical">
              <label className="tk-label tk-required">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
              />
              {errors.last_name && <span className="text-danger">{errors.last_name}</span>}
            </div>
            <div className="form-group form-group_vertical">
              <label className="tk-label">Street Address</label>
              <textarea
                name="street_address"
                cols="30"
                rows="10"
                placeholder="Street Address"
                className="form-control"
                value={formData.street_address}
                onChange={handleChange}
              />
              {errors.street_address && <span className="text-danger">{errors.street_address}</span>}
            </div>
            <div className="form-group form-group_vertical">
              <label className="tk-label tk-required">Address 2</label>
              <input
                type="text"
                className="form-control"
                name="address_2"
                placeholder="Address 2"
                value={formData.address_2}
                onChange={handleChange}
              />
              {errors.address_2 && <span className="text-danger">{errors.address_2}</span>}
            </div>
          </div>
        </fieldset>
        <div className="tk-profileform__holder">
          <div className="tk-dhbbtnarea">
            <em>
              Click “Save & Update” to update the latest changes
            </em>
            <Button className="tk-btn-solid-lg" type="submit" disabled={loading}>
              <span style={{ color: "white" }}>Save & Update</span>
            </Button>
          </div>
        </div>
      </form>
                </div>
                {/* <div className="tk-profileform__holder">
                  <div className="tk-dhbbtnarea">
                    <em>
                      Click “Save &amp; Update” to update the latest changes
                    </em>
                    <Button
                      className="tk-btn-solid-lg"
                    >
                      <span style={{ color: "white" }}>Save &amp; Update</span>
                    </Button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default W4Form;

