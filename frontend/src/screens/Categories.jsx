import React, { useState } from "react";
import { baseUrlImage } from "../Api/BaseApi";
import cover_placeholder from '../assets/images/coverplaceholder.jpg';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useFrontEndContext } from "../context/FrontEndContext";

function Categories() {
  const {
    filteredCategories,
    setSearchQueryCategories,
    searchQueryCategories,
  } = useFrontEndContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [expandedCategories, setExpandedCategories] = useState({});
const handleExpandClick = (categoryId) => {
    setExpandedCategories(prevState => ({
      ...prevState,
      [categoryId]: !prevState[categoryId]
    }));
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header start */}
      <Header />
      {/* Header End */}
      <section className="tk-main-section">
        <div className="container" data-select2-id="279">
          <div className="row" data-select2-id="278">
            <div className="col-lg-12" data-select2-id="277">
              <form className="tk-formsearch tk-formsearchvtwo">
                <fieldset>
                  <div className="tk-taskform">
                    <div className="tk-inputicon">
                      <i
                        className="bi bi-search"
                        style={{ color: "black" }}
                      ></i>
                      <div className="tk-aside-content">
                        <div className="tk-inputiconbtn">
                          <div className="tk-placeholderholder">
                            <input
                              type="text"
                              className="form-control"
                              id="search_by_keyword"
                              defaultValue={searchQueryCategories}
                              placeholder="Search with keyword"
                              autoComplete="off"
                              onChange={(e) =>
                                setSearchQueryCategories(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tk-inputappend_right">
                      {/* <a className="tk-advancebtn tk-btn-solid-lg">
                        <span className="bi bi-sliders"></span>
                      </a> */}
                    </div>
                  </div>
                </fieldset>
                <div className="tk-advancesearch">
                  <div className="tk-searchbar">
                    <div className="form-group-wrap">
                      <div className="tk-pricerange">
                        <h6>Price range</h6>
                        <div className="tk-rangevalue">
                          <div className="tk-areasizebox">
                            <div className="form-group form-group-half">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Min price"
                                id="gig_min_price_search"
                              />
                            </div>
                            <div className="form-group form-group-half">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Max price"
                                id="gig_max_price_search"
                              />
                            </div>
                          </div>
                          <div className="tk-distanceholder">
                            <div id="rangecollapse" className="collapse">
                              <div
                                id="tk-rangeslider"
                                className="tk-tooltiparrow tk-rangeslider noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr"
                              >
                                <div className="noUi-base">
                                  <div className="noUi-connects">
                                    <div
                                      className="noUi-connect"
                                      style={{
                                        transform:
                                          "translate(0%, 0px) scale(1, 1)",
                                      }}
                                    ></div>
                                  </div>
                                  <div
                                    className="noUi-origin"
                                    style={{
                                      transform: "translate(-100%, 0px)",
                                      zIndex: "5",
                                    }}
                                  >
                                    <div
                                      className="noUi-handle noUi-handle-lower"
                                      data-handle="0"
                                      tabIndex="0"
                                      role="slider"
                                      aria-orientation="horizontal"
                                      aria-valuemin="1.0"
                                      aria-valuemax="100000.0"
                                      aria-valuenow="1.0"
                                      aria-valuetext="1"
                                    >
                                      <div className="noUi-touch-area"></div>
                                    </div>
                                  </div>
                                  <div
                                    className="noUi-origin"
                                    style={{
                                      transform: "translate(0%, 0px)",
                                      zIndex: "4",
                                    }}
                                  >
                                    <div
                                      className="noUi-handle noUi-handle-upper"
                                      data-handle="1"
                                      tabIndex="0"
                                      role="slider"
                                      aria-orientation="horizontal"
                                      aria-valuemin="1.0"
                                      aria-valuemax="100000.0"
                                      aria-valuenow="100000.0"
                                      aria-valuetext="100000"
                                    >
                                      <div className="noUi-touch-area"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tk-searchbar d-none" id="clearFilters">
                    <div className="tk-btnarea">
                      <a
                        href="#"
                        className="tk-advancebtn tk-btn-solid-lg tk-clear_filter"
                      >
                        Clear all filters
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="tk-sort"></div>
            </div>
            {paginatedCategories.length > 0
              ? paginatedCategories.slice(0, 8).map((category, index) => (
                  <div
                    id="gig_48"
                    className="col-sm-12 col-md-6 col-lg-3"
                    key={index}
                  >
                    <div className="tk-topservicetask">
                      <figure className="tk-card__img">
                        <a href="#">
                          <img
                            src={`${baseUrlImage}` + `${category.image}`}
                            alt={category.name}
                            onError={(e) => { e.target.onerror = null; e.target.src = cover_placeholder; }}

                          />
                        </a>
                      </figure>

                      <span className="tk-featuretag">Featured</span>

                      <div className="tk-sevicesinfo">
                        <div className="tk-category_info">
                          <h5>
                            <a href="#">{category.name}</a>
                          </h5>
                        </div>
                        <ul className="tk-category_childlist">
                          {expandedCategories[category.id]
                            ? category.sub_categories.map(
                                (subcategory, subIndex) => (
                                  <li key={subIndex}>
                                    <a href="#">
                                      <span>{subcategory.name}</span>
                                      <em>(0)</em>
                                      <i className="bi bi-chevron-right"></i>
                                    </a>
                                  </li>
                                )
                              )
                            : category.sub_categories.slice(0, 4).map(
                                (subcategory, subIndex) => (
                                  <li key={subIndex}>
                                    <a href="#">
                                      <span>{subcategory.name}</span>
                                      <em>(0)</em>
                                      <i className="bi bi-chevron-right"></i>
                                    </a>
                                  </li>
                                )
                              )}
                          <li className="tk-explore-features">
                            <strong>
                              <button
                                onClick={() => handleExpandClick(category.id)}
                                style={{
                                  color: "#ac04fc",
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                               {category.sub_categories?.length>4? (expandedCategories[category.id]
                                  ? "Show less"
                                  : "Explore all"):''}
                              </button>
                            </strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              : "No Categories Found"}
  <div className="col-sm-12">
              <div className="cat-pagination-holder">
                <div className="cat-pagination">
                  <ul>
                    <li>
                      <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                      >
                        &laquo;
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i + 1}
                        className={currentPage === i + 1 ? "active" : ""}
                      >
                        <button onClick={() => handlePageChange(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <div className="col-sm-12">
              <div className="tk-pagiantion-holder">
                <div className="tk-pagination">
                  <ul>
                    <li className="d-none">
                      <span className="bi bi-chevron-left"></span>
                    </li>

                    <li className=" active">
                      <span>1</span>
                    </li>
                    <li className="">
                      <a href="#">2</a>
                    </li>
                    <li className="">
                      <a href="#">3</a>
                    </li>
                    <li className="">
                      <a href="#">4</a>
                    </li>
                    <li className="">
                      <a href="#">5</a>
                    </li>
                    <li className="">
                      <a href="#">6</a>
                    </li>

                    <li className="tk-nextpage">
                      <a href="#">
                        <i className="bi bi-chevron-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Categories;





// import React, { useState } from "react";


// function Categories() {
//   const {
//     filteredCategories,
//     setSearchQueryCategories,
//     searchQueryCategories,
//   } = useFrontEndContext();

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const paginatedCategories = filteredCategories.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header start */}
//       <Header />
//       {/* Header End */}
//       <section className="tk-main-section">
//         <div className="container" data-select2-id="279">
//           <div className="row" data-select2-id="278">
//             <div className="col-lg-12" data-select2-id="277">
//               <form className="tk-formsearch tk-formsearchvtwo">
//                 <fieldset>
//                   <div className="tk-taskform">
//                     <div className="tk-inputicon">
//                       <i
//                         className="bi bi-search"
//                         style={{ color: "black" }}
//                       ></i>
//                       <div className="tk-aside-content">
//                         <div className="tk-inputiconbtn">
//                           <div className="tk-placeholderholder">
//                             <input
//                               type="text"
//                               className="form-control"
//                               id="search_by_keyword"
//                               defaultValue={searchQueryCategories}
//                               placeholder="Search with keyword"
//                               autoComplete="off"
//                               onChange={(e) =>
//                                 setSearchQueryCategories(e.target.value)
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="tk-inputappend_right">
//                       {/* <a className="tk-advancebtn tk-btn-solid-lg">
//                         <span className="bi bi-sliders"></span>
//                       </a> */}
//                     </div>
//                   </div>
//                 </fieldset>
//                 <div className="tk-advancesearch">
//                   <div className="tk-searchbar">
//                     <div className="form-group-wrap">
//                       <div className="tk-pricerange">
//                         <h6>Price range</h6>
//                         <div className="tk-rangevalue">
//                           <div className="tk-areasizebox">
//                             <div className="form-group form-group-half">
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="Min price"
//                                 id="gig_min_price_search"
//                               />
//                             </div>
//                             <div className="form-group form-group-half">
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 placeholder="Max price"
//                                 id="gig_max_price_search"
//                               />
//                             </div>
//                           </div>
//                           <div className="tk-distanceholder">
//                             <div id="rangecollapse" className="collapse">
//                               <div
//                                 id="tk-rangeslider"
//                                 className="tk-tooltiparrow tk-rangeslider noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr"
//                               >
//                                 <div className="noUi-base">
//                                   <div className="noUi-connects">
//                                     <div
//                                       className="noUi-connect"
//                                       style={{
//                                         transform:
//                                           "translate(0%, 0px) scale(1, 1)",
//                                       }}
//                                     ></div>
//                                   </div>
//                                   <div
//                                     className="noUi-origin"
//                                     style={{
//                                       transform: "translate(-100%, 0px)",
//                                       zIndex: "5",
//                                     }}
//                                   >
//                                     <div
//                                       className="noUi-handle noUi-handle-lower"
//                                       data-handle="0"
//                                       tabIndex="0"
//                                       role="slider"
//                                       aria-orientation="horizontal"
//                                       aria-valuemin="1.0"
//                                       aria-valuemax="100000.0"
//                                       aria-valuenow="1.0"
//                                       aria-valuetext="1"
//                                     >
//                                       <div className="noUi-touch-area"></div>
//                                     </div>
//                                   </div>
//                                   <div
//                                     className="noUi-origin"
//                                     style={{
//                                       transform: "translate(0%, 0px)",
//                                       zIndex: "4",
//                                     }}
//                                   >
//                                     <div
//                                       className="noUi-handle noUi-handle-upper"
//                                       data-handle="1"
//                                       tabIndex="0"
//                                       role="slider"
//                                       aria-orientation="horizontal"
//                                       aria-valuemin="1.0"
//                                       aria-valuemax="100000.0"
//                                       aria-valuenow="100000.0"
//                                       aria-valuetext="100000"
//                                     >
//                                       <div className="noUi-touch-area"></div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="tk-searchbar d-none" id="clearFilters">
//                     <div className="tk-btnarea">
//                       <a
//                         href="#"
//                         className="tk-advancebtn tk-btn-solid-lg tk-clear_filter"
//                       >
//                         Clear all filters
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-lg-12">
//               <div className="tk-sort"></div>
//             </div>
//             {paginatedCategories.length > 0
//               ? paginatedCategories.map((category, index) => (
//                   <div
//                     id="gig_48"
//                     className="col-sm-12 col-md-6 col-lg-3"
//                     key={index}
//                   >
//                     <div className="tk-topservicetask">
//                       <figure className="tk-card__img">
//                         <a href="#">
//                           <img
//                             src={`${baseUrlImage}` + `${category.image}`}
//                             alt={category.name}
//                             onError={(e) => { e.target.onerror = null; e.target.src = cover_placeholder; }}
//                           />
//                         </a>
//                       </figure>

//                       <span className="tk-featuretag">Featured</span>

//                       <div className="tk-sevicesinfo">
//                         <div className="tk-category_info">
//                           <h5>
//                             <a href="#">{category.name}</a>
//                           </h5>
//                         </div>
//                         <ul className="tk-category_childlist">
//                           {category.sub_categories.slice(0,4).map(
//                             (subcategory, subIndex) => (
//                               <li key={subIndex}>
//                                 <a href="#">
//                                   <span>{subcategory.name}</span>
//                                   <em>(0)</em>
//                                   <i className="bi bi-chevron-right"></i>
//                                 </a>
//                               </li>
//                             )
//                           )}
//                           <li className="tk-explore-features">
//                             <strong>
//                               <Link to={""} style={{ color: "#ac04fc" }}>
//                                 Explore all
//                               </Link>
//                             </strong>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               : "No Categories Found"}

//             <div className="col-sm-12">
//               <div className="tk-pagination-holder">
//                 <div className="tk-pagination">
//                   <ul>
//                     <li>
//                       <button 
//                         onClick={() => handlePageChange(currentPage - 1)} 
//                         disabled={currentPage === 1}
//                       >
//                         &laquo;
//                       </button>
//                     </li>
//                     {Array.from({ length: totalPages }, (_, i) => (
//                       <li
//                         key={i + 1}
//                         className={currentPage === i + 1 ? "active" : ""}
//                       >
//                         <button onClick={() => handlePageChange(i + 1)}>
//                           {i + 1}
//                         </button>
//                       </li>
//                     ))}
//                     <li>
//                       <button 
//                         onClick={() => handlePageChange(currentPage + 1)} 
//                         disabled={currentPage === totalPages}
//                       >
//                         &raquo;
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// }

// export default Categories;