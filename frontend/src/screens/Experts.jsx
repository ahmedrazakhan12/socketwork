import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";
import Rating from "@mui/material/Rating";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useFrontEndContext } from "../context/FrontEndContext";
import {
  buildUrl,
  checkNumberExists,
  getExperts,
  getSearchExperts,
  mapToObject,
  removeFieldsWithNoneValue,
} from "../utils/helpers";

import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { baseurl } from "../Api/BaseApi";
import ExpertItem from "../Expert/components/ExpertItem";
import socketIO from "../socket/socket";

import { useTheme } from "@mui/material/styles";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let oldExperts = [];
// Number of results to show per page
let numberOfResultsPerPage = 2;

// list-of-users will come from socket.io we'll listen
const onlineExperts = [
  // "randomemail1@example.com",
  // "randomemail2@example.com",
  // "testing1@gmail.com",
  // "randomemail4@example.com",
  // "randomemail5@example.com",
  // "admin4444@gmail.com"
  // 11
];

function Experts() {
  const theme = useTheme();
  const [selectedMultipleSkills, setSelectedMultipleSkills] = React.useState(
    []
  );
  const [Filterations, setFilterations] = useState({
    orderBy: "all",
  });
  const [selectedMultipleLanguages, setSelectedMultipleLanguages] =
    React.useState([]);
  const [selectedMultipleCategories, setSelectedMultipleCategories] = useState(
    []
  );

  const { countriesData } = useFrontEndContext();

  const [MyExperts, setMyExperts] = useState([]);

  const [ToggleOnlineExperts, setToggleOnlineExperts] = useState(false);

  const [SearchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [Busy, setBusy] = useState(false);

  // filterations

  const [OnlineUsers, setOnlineUsers] = useState([]);
  const nav = useNavigate();
  const l = useLocation();
  // - handle Load More.
  const [SelectedPage, setSelectedPage] = useState(1);
  const [SelectedRatings, setSelectedRatings] = useState();
  const [SideBarData, setSideBarData] = useState([]);

  useEffect(() => {
    // socketIO.on('connect', (data) => {
    //   console.log('online-users', data)
    // });

    socketIO.on("users", (data) => {
      const onlineUsersIds = Object.keys(data).map((_) => Number(_));

      console.log("online-users", onlineUsersIds);
      // myUsers = onlineUsersIds
      setOnlineUsers([...onlineUsersIds]);
    });
  }, []);

  // - skills
  // - languages
  // - search-query
  // - country
  // - category
  // - rating

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event.target, " event");
    setSelectedMultipleSkills(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleLanguagesChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedMultipleLanguages(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [SortByDate, setSortByDate] = useState("all");
  const [FilterBusy, setFilterBusy] = useState(false);
  const handleSortByDate = (event) => {
    setSortByDate(event.target.value);
    console.log(event.target.value, " sort by date");
    let myExperts = [];

    myExperts = [...MyExperts?.experts];
    oldExperts = [...myExperts];

    // let exp0 = myExperts[0];
    // myExperts[0] = myExperts[1];
    // myExperts[1] = exp0;
    // const sortedArray = myExperts.sort((a, b) =>
    //   b.updated_at.localeCompare(a.updated_at)
    // );
    const sortedArray = myExperts.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );
    console.log(sortedArray, " my experts");
    // myExperts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setMyExperts((_) => {
      return {
        ..._,
        experts: [...myExperts],
      };
    });
  };

  useEffect(() => {
    console.log("search ", searchParams);
  }, [l]);

  useEffect(() => {
    axios.get(baseurl + "/home").then((_) => {
      //  setSideBarData(_?.data)
      setSideBarData(_?.data?.data);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    nav("/experts");

    console.log(event.target);
    setFilterations((prevFilterations) => ({
      ...prevFilterations,
      [name]: value,
    }));
  };
  useEffect(() => {
    async function fetchExperts() {
      setBusy(true);
      let myExperts = [];

      const params = mapToObject(searchParams);

      if (Object.keys(params).length > 0) {
        const searchExpertsData = await getSearchExperts({ ...params });
        myExperts = searchExpertsData?.experts;

        setMyExperts(myExperts);
        setBusy(false);
        console.log("search experts", params ? "found" : "not found");
      } else {
        // const queryObj = removeFieldsWithNoneValue(Filterations);

        // if (selectedMultipleSkills.length > 0) {
        //   queryObj.skills = selectedMultipleSkills.join(",");
        // }
        // if (selectedMultipleLanguages.length > 0) {
        //   queryObj.languages = selectedMultipleLanguages.join(",");
        //   console.log(selectedMultipleLanguages.join(","), " expertsss");
        // }
        // if (selectedMultipleCategories.length > 0) {
        //   queryObj.categories = selectedMultipleCategories.join(",");
        //   console.log(selectedMultipleLanguages.join(","), " expertsss");
        // }
        // if (SelectedRatings) {
        //   queryObj.rating = SelectedRatings;
        // }

        // const url = buildUrl(queryObj);

        const { data } = await getExperts(
          `${baseurl}/experts?${SelectedPage ? "page=" + SelectedPage : ""}`
          // `${baseurl}/experts${url}`
        );

        console.log("experts ", data);
        myExperts = data;

        setMyExperts((_) => {
          const oldExperts = _?.experts ?? [];
          const newExperts = myExperts?.experts ?? [];

          return {
            ...myExperts,
            experts: [...oldExperts, ...newExperts],
          };
        });
        setBusy(false);
      }
    }

    fetchExperts();
  }, [SelectedPage]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownClick = (dropdownId) => {
    if (activeDropdown === dropdownId) {
      setActiveDropdown(null); // Collapse the dropdown if it's already active
    } else {
      setActiveDropdown(dropdownId); // Activate the clicked dropdown
    }
  };

  async function handleToggleOnlineUsers(e) {
    setToggleOnlineExperts((_) => !_);

    // if (!ToggleOnlineExperts) {
    //   setFilterBusy(true);
    //   setBusy(true);
    //   // const { data } = await getExperts(`${baseurl}/experts?all=1`);
    //   setBusy(false);
    //   setFilterBusy(false);

    //   console.log(data, " search data");
    //   setMyExperts(data);
    // }
    if (!ToggleOnlineExperts) {
      setMyExperts((_) => {
        oldExperts = [..._.experts];
        return {
          ..._,
          experts: _.experts.filter((expert) => {
            return checkNumberExists(OnlineUsers, expert?.id);
          }),
        };
      });
    } else {
      setMyExperts((_) => {
        return {
          ..._,
          experts: oldExperts,
        };
      });
    }
    console.log("toggle online users");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {/* <button
        onClick={() => {
          nav("/experts?hamza=34");
        }}
      >
        Hamza
      </button> */}
      <section className="tk-main-section">
        <div className="container" data-select2-id="13">
          <div className="row" data-select2-id="12">
            <div className="col-lg-12" data-select2-id="11">
              <div className="d-flex" style={{}}>
                <div
                  className="tk-sort"
                  style={{
                    width: "75%",
                    display: "flex",
                    marginLeft: "auto",
                    justifyContent: "space-between",
                  }}
                  data-select2-id="10"
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          disabled={Busy || FilterBusy}
                          //  disabled={!OnlineUsers.length}
                          checked={ToggleOnlineExperts}
                          onChange={(e) => {
                            // setToggleOnlineExperts(e.target.checked);
                            // setToggleButton(!ToggleButton);
                            nav("/experts");

                            handleToggleOnlineUsers();
                          }}
                          color="secondary"
                        />
                      }
                      // label={  !(Busy ? ToggleButton : ToggleOnlineUserss) ? "Show Online Experts" : "Undo"}
                      label={"Show Online Experts"}
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xl-3">
              <aside className="tk-searchfilter">
                <a href="#" className="tk-closefilter">
                  <i className="bi bi-x"></i>
                </a>
                <div className="tk-searchfilter-wrap">
                  <div className="tk-aside-holder">
                    <div
                      className="tk-asidetitle d-flex justify-content-between"
                      data-bs-toggle="collapse"
                      data-bs-target="#search-tab"
                      role="button"
                      id="dropdown"
                      aria-expanded={
                        activeDropdown === "search-tab" ? "true" : "false"
                      }
                      onClick={() => handleDropdownClick("search-tab")}
                    >
                      <h5>Search</h5>
                      {activeDropdown === "search-tab" ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )}
                    </div>
                    <div id="search-tab" className="collapse show">
                      <div className="tk-aside-content">
                        <div className="tk-inputiconbtn">
                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              setFilterations({});
                              nav("/experts/");
                              setBusy(true);
                              setFilterBusy(true);
                              const { data } = await getExperts(
                                `${baseurl}/experts?${
                                  SearchTerm.length
                                    ? "keyword=" + SearchTerm
                                    : ""
                                }`
                              );
                              setBusy(false);
                              setFilterBusy(false);

                              console.log(data, " search data");
                              setMyExperts(data);
                              //  clearing query-params
                              //- fetch experts through api based on search query

                              // console.log( "hamzaetues")
                            }}
                            className="tk-placeholderholder"
                          >
                            <input
                              type="text"
                              placeholder="Type and hit enter"
                              // value={SearchTerm}
                              name="searchInput"
                              onChange={async (e) => {
                                setFilterations({});
                                setSearchTerm(e.target.value);
                                nav("/experts/");
                                // const { data } = await getExperts(
                                //   `${baseurl}/experts?${
                                //     e.target.value
                                //       ? "keyword=" + SearchTerm
                                //       : ""
                                //   }`
                                // );
                                // console.log(data, " search data");
                                // setMyExperts(data);
                                // setSearchTerm(e.target.value)
                              }}
                              id="search_by_keyword"
                              className="form-control tk-themeinput"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tk-aside-holder">
                    <div
                      className="tk-asidetitle d-flex justify-content-between"
                      data-bs-toggle="collapse"
                      data-bs-target="#skill-tab"
                      role="button"
                      id="dropdown"
                      aria-expanded={
                        activeDropdown === "skill-tab" ? "true" : "false"
                      }
                      onClick={() => {
                        console.log(selectedMultipleSkills, " person name");
                        handleDropdownClick("skill-tab");
                      }}
                    >
                      <h5>Skills</h5>
                      {activeDropdown === "skill-tab" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </div>

                    <div id="skill-tab" className="collapse">
                      <div className="tk-aside-content">
                        <div className="tk-filterselect mCustomScrollbar _mCS_1">
                          <ul className="tk-categoriesfilter">
                            {SideBarData?.skills &&
                              SideBarData?.skills.map((data, index) => (
                                <li key={index}>
                                  <div className="tk-form-checkbox">
                                    <input
                                      className="form-check-input tk-form-check-input-sm tk-select-skill"
                                      type="checkbox"
                                      value={data.name}
                                      id="skill-14"
                                      onChange={() => {
                                        // nav("/experts");

                                        setSelectedMultipleSkills((prevState) =>
                                          prevState.includes(data.id)
                                            ? prevState.filter(
                                                (item) => item !== data.id
                                              )
                                            : [...prevState, data.id]
                                        );
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="skill-14"
                                    >
                                      <span>{data.name}</span>
                                    </label>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tk-aside-holder">
                    <div
                      className="tk-asidetitle d-flex justify-content-between"
                      data-bs-toggle="collapse"
                      data-bs-target="#rating-tab"
                      role="button"
                      id="dropdown"
                      aria-expanded={
                        activeDropdown === "rating-tab" ? "true" : "false"
                      }
                      onClick={() => handleDropdownClick("rating-tab")}
                    >
                      <h5>Search By Rating</h5>
                      {activeDropdown === "rating-tab" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </div>
                    <div id="rating-tab" className="collapse">
                      <div className="tk-aside-content">
                        <div className="tk-filterselect mCustomScrollbar _mCS_4">
                          <Rating
                            name="rating"
                            // defaultValue={selectedRating}
                            onChange={(e) => {
                              // nav("/experts");

                              console.log(e.target.value, " ratingSe");
                              setSelectedRatings(Number(e.target.value));
                              const myExperts = [...MyExperts?.experts];

                              console.log(
                                myExperts.filter(
                                  (expert) =>
                                    Number(expert.average_rating) <=
                                    Number(e.target.value)
                                ),
                                " rating",
                                myExperts
                              );
                              setMyExperts((_) => {
                                return {
                                  ..._,
                                  experts: [
                                    ...myExperts.filter(
                                      (expert) =>
                                        Number(expert.average_rating || 0) >=
                                        Number(e.target.value)
                                    ),
                                  ],
                                };
                              });
                            }}
                            value={SelectedRatings}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tk-aside-holder">
                    <div
                      className="tk-asidetitle d-flex justify-content-between"
                      data-bs-toggle="collapse"
                      data-bs-target="#languages-tab"
                      role="button"
                      id="dropdown"
                      aria-expanded={
                        activeDropdown === "languages-tab" ? "true" : "false"
                      }
                      onClick={() => handleDropdownClick("languages-tab")}
                    >
                      <h5>Languages</h5>
                      {activeDropdown === "languages-tab" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </div>
                    <div id="languages-tab" className="collapse">
                      <div className="tk-aside-content">
                        <div className="tk-filterselect mCustomScrollbar _mCS_1">
                          <ul className="tk-categoriesfilter">
                            {SideBarData?.languages &&
                              SideBarData?.languages.map((data, index) => (
                                <li key={index}>
                                  <div className="tk-form-checkbox">
                                    <input
                                      className="form-check-input tk-form-check-input-sm tk-select-skill"
                                      type="checkbox"
                                      value={data.name}
                                      id="skill-14"
                                      onChange={() => {
                                        // nav("/experts");

                                        setSelectedMultipleLanguages(
                                          (prevState) =>
                                            prevState.includes(data.name)
                                              ? prevState.filter(
                                                  (item) => item !== data.name
                                                )
                                              : [...prevState, data.name]
                                        );
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="skill-14"
                                    >
                                      <span>{data.name}</span>
                                    </label>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tk-aside-holder">
                    <div
                      className="tk-asidetitle d-flex justify-content-between"
                      data-bs-toggle="collapse"
                      data-bs-target="#price_range-tab"
                      role="button"
                      id="dropdown"
                      aria-expanded={
                        activeDropdown === "price_range-tab" ? "true" : "false"
                      }
                      onClick={() => handleDropdownClick("price_range-tab")}
                    >
                      <h5>Price Range</h5>
                      {activeDropdown === "price_range-tab" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </div>
                    <div id="price_range-tab" className="collapse">
                      <div className="tk-aside-content">
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
                              max="300"
                              step="1"
                              placeholder="Min price"
                              id="seller_min_hr_rate"
                              name="min_price"
                              value={Filterations?.min_price}
                              onChange={handleInputChange}
                            />
                            <input
                              value={Filterations?.max_price}
                              onChange={handleInputChange}
                              name="max_price"
                              type="number"
                              className="form-control"
                              step="1"
                              placeholder="Max price"
                              id="seller_max_hr_rate"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tk-aside-holder location-tab">
                    <div
                      className="tk-asidetitle collapsed d-flex justify-content-between"
                      data-bs-toggle="collapse"
                      data-bs-target="#city"
                      role="button"
                      id="dropdown"
                      aria-expanded={
                        activeDropdown === "city" ? "true" : "false"
                      }
                      onClick={() => handleDropdownClick("city")}
                    >
                      <h5>Country</h5>
                      {activeDropdown === "city" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </div>
                    <div id="city" className="collapse">
                      <div className="tk-aside-content">
                        <div className="tk-inputiconbtn">
                          <div className="tk-placeholderholder">
                            <select
                              name="country"
                              id=""
                              className="form-select tk-themeinput"
                              value={Filterations?.country}
                              onChange={handleInputChange}
                            >
                              {[{ name: "None" }, ...countriesData].map(
                                (country, i) => (
                                  <option value={country.name} key={i}>
                                    {country.name}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tk-aside-holder">
                    <div
                      className="tk-asidetitle d-flex justify-content-between"
                      data-bs-toggle="collapse"
                      data-bs-target="#categories"
                      role="button"
                      id="dropdown"
                      aria-expanded={
                        activeDropdown === "categories" ? "true" : "false"
                      }
                      onClick={() => handleDropdownClick("categories")}
                    >
                      <h5>Categories</h5>
                      {activeDropdown === "categories" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </div>
                    <div id="categories" className="collapse">
                      <div className="tk-aside-content">
                        <div className="tk-filterselect mCustomScrollbar _mCS_1">
                          <ul className="tk-categoriesfilter">
                            {SideBarData?.categories &&
                              SideBarData?.categories.map((data, index) => (
                                <li key={index}>
                                  <div className="tk-form-checkbox">
                                    <input
                                      className="form-check-input tk-form-check-input-sm tk-select-skill"
                                      type="checkbox"
                                      value={data.name}
                                      id="skill-14"
                                      onChange={() => {
                                        // nav("/experts");

                                        setSelectedMultipleCategories(
                                          (prevState) =>
                                            prevState.includes(data.id)
                                              ? prevState.filter(
                                                  (item) => item !== data.id
                                                )
                                              : [...prevState, data.id]
                                        );
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="skill-14"
                                    >
                                      <span>{data.name}</span>
                                    </label>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-1 align-items-center">
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      style={{
                        color: "white",
                        padding: "0.5rem 1rem",
                        margin: "2rem 0 0 0",
                        borderRadius: "0.4rem",
                        opacity: FilterBusy ? 0.6 : 1,
                      }}
                      // disabled={FilterBusy}
                      onClick={async () => {
                        const queryObj =
                          removeFieldsWithNoneValue(Filterations);

                        if (selectedMultipleSkills.length > 0) {
                          queryObj.skills = selectedMultipleSkills.join(",");
                        }
                        if (selectedMultipleLanguages.length > 0) {
                          queryObj.languages =
                            selectedMultipleLanguages.join(",");
                          console.log(
                            selectedMultipleLanguages.join(","),
                            " expertsss"
                          );
                        }
                        if (selectedMultipleCategories.length > 0) {
                          queryObj.category =
                            selectedMultipleCategories.join(",");
                          console.log(
                            selectedMultipleLanguages.join(","),
                            " expertsss"
                          );
                        }
                        if (SelectedRatings) {
                          queryObj.rating = SelectedRatings;
                        }

                        nav("/experts");
                        const url = buildUrl(queryObj);

                        setFilterBusy(true);
                        setBusy(true);
                        const { data } = await getExperts(
                          baseurl + "/experts" + url
                        );
                        setBusy(false);
                        setFilterBusy(false);

                        console.log(
                          data,
                          baseurl + "/experts" + url,
                          " filter"
                        );

                        setMyExperts(data);
                        // console.log(baseurl + '/experts' + url, ' url')

                        // setMyExperts(data)
                        // const { data } = await getExperts(baseurl + "/experts");
                        // console.log(data?.experts, " apply");
                      }}
                      className="clear-filters-btn"
                    >
                      Search&nbsp;
                      <SearchIcon />
                    </Button>
                    <Button
                      style={{
                        background: "#dbdbdb",
                        color: "black",
                        padding: "0.5rem 0.5rem",
                        margin: "2rem 0 0 0",
                        borderRadius: "0.4rem",
                      }}
                      size="small"
                      className="clear-filters-btn d-flex "
                      onClick={async () => {
                        try {
                          // just clearing out the appllied filters
                          // const { data } = await getExperts(baseurl + "/experts");
                          window.location.reload();
                          // setSelectedMultipleLanguages([]);
                          // setSelectedMultipleSkills([]);

                          // setMyExperts(data);
                        } catch (error) {
                          console.log(
                            "error, while clearing off filters",
                            error
                          );
                        }
                      }}
                    >
                      Clear &nbsp;
                    </Button>
                  </div>
                  {/* <button
                    style={{
                      background: "black",
                      color: "white",
                      padding: "0.4rem 1rem",
                      margin: "2rem 0 0 0",
                    }}
                    onClick={async () => {
                     
                      console.log(baseurl + '/experts' )
                      const {data} = getExperts(baseurl + '/experts'    )
                      setMyExperts(data)
                      // const { data } = await getExperts(baseurl + "/experts");
                      // console.log(data?.experts, " apply");
                    }}
                  >
                    Apply Filters
                  </button> */}
                </div>
                {/* <div id="clearFilters" className="tk-filterbtns">
                  <a className="tk-btn-solid tk-advancebtn" onClick={() => {

                    setToggleOnlineUserss(false);
                    setFilterations({})

                  }}>
                    Clear all filters{" "}
                  </a>
                  <a className="tk-btn-solid tk-advancebtn" onClick={() => applyFilters()}>
                    Apply Filterations
                  </a>
                </div> */}
              </aside>
            </div>

            <div
              className="col-lg-8 col-xl-9"
              style={{ opacity: Busy || FilterBusy ? 0.6 : 1 }}
            >
              <div className="tk-section-holder">
                {/* {filteredExperts.length > expertsToShow && ( */}
                {/* {MyExperts && MyExperts?.experts ? "" :  <span style={{textAlign: "center"}}>No Results</span>  } */}
                {Object.keys(mapToObject(searchParams)).length > 0 &&
                  MyExperts &&
                  MyExperts.map((expert) => (
                    <ExpertItem
                      project={expert}
                      isOnline={checkNumberExists(OnlineUsers, expert?.id)}
                    />
                  ))}
                {MyExperts &&
                  MyExperts?.experts &&
                  MyExperts?.experts.length === 0 && (
                    <span style={{ textAlign: "center", display: "block" }}>
                      No Results
                    </span>
                  )}
                {!(Object.keys(mapToObject(searchParams)).length > 0) &&
                  MyExperts &&
                  MyExperts?.experts?.map((expert) => (
                    <ExpertItem
                      project={expert}
                      isOnline={checkNumberExists(OnlineUsers, expert?.id)}
                    />
                  ))}
              </div>
              {!(
                Number(MyExperts?.lastPage) === Number(MyExperts?.currentPage)
              ) && (
                <div className="row">
                  <div className="col-5 col-md-2 m-auto">
                    {Busy && (
                      <div
                        style={{
                          fontSize: "1.3rem",
                          margin: "2rem 0 0 0",
                          textAlign: "center",
                        }}
                      >
                        <CircularProgress color="secondary" />{" "}
                      </div>
                    )}
                    {!(Object.keys(mapToObject(searchParams)).length > 0) &&
                    !Busy &&
                    !ToggleOnlineExperts ? (
                      <button
                        className="tk-btn-solid tk-btn-yellow text-white mt-4 btn-sm-res"
                        onClick={async () => {
                          setSelectedPage((_) => _ + 1);
                          console.log(
                            MyExperts?.lastPage,
                            MyExperts?.currentPage,
                            " experts"
                          );
                          // setMyExperts(data?.experts)
                          // fetchExperts
                        }} // Call handleShowMore function when button is clicked
                        style={{ textWrap: "nowrap" }}
                      >
                        Show More
                      </button>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Experts;
