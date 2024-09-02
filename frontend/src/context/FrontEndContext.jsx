
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { baseurl, httpForToastRequest, httpGetRequest } from '../Api/BaseApi';
import { useAppContext } from './AppContext';

const FrontEndContext = createContext();
export const FrontEndProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchCondition, setSearchCondition] = useState(false);
    const [progresss, setProgress] = useState(0);
    const [data, setData] = useState([]);
    const [Expertsdata, setExpertData] = useState([]);
    const [featuredExperts, setFeaturedExperts] = useState([]);
    const [ExpertSkills, setExpertSkills] = useState([]);
    const [languagesData, setLanguageData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [searchExperts, setSearchExperts] = useState([]);
    const [Skillsdata, setSkillData] = useState([]);
    const [filteredExperts, setFiltererdData] = useState([]);
    const [filteredCategories, setFiltererdCategories] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [singleUser, setSingleUser] = useState();
    const [slotData, setSlotData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryCategories, setSearchQueryCategories] = useState('');
    const [timer, setTimer] = useState(30);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [MODALOPENED, setMODALOPENED] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [faqData, setFaqData] = useState([]);
    const [liveStreams, setLiveStreams] = useState([]);
    const [subscriptionData, setSubscriptionData] = useState([]);
    const [profileSubscriptionData, setProfileSubscriptionData] = useState([]);
    const [websiteData, setWebsiteData] = useState([]);
    const [reviewData, setReviewData] = useState({
        rating: null,
        review: '',
    });
    const [openReview, setOpenReview] = React.useState(false);
    const [searchData, setSearchData] = useState({
        keyword: '',
        min_price: null,
        max_price: null,
    });
    const [country, setCountry] = useState('Select Country');
    const [searchError, setSearchError] = useState(null);
    const [category, setCategory] = useState('Select Category');
    const navigate = useNavigate();
    const handleCategoryIdChange = (value) => {
        console.log("handleCategoryIdChange", value)
        setCategory(value);
    };
    const handleCountryNameChange = (value) => {
        console.log("handleCountryNameChange", value)
        setCountry(value);
    };
    const handleInputSearchChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
    };
    const handleCloseReview = () => {
        setOpenReview(false);
    };

    const handleClickOpen = () => {
        setOpenReview(true);
    };
    const handleInputReviewChange = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    };
   
    const handleReviewSubmit = async (expertId,bookingId) => {
        // setIsLoading(true);
        const formData = new FormData();
        formData.append('expert_id', expertId);
        formData.append('booking_id', bookingId);
        formData.append('review', reviewData.review);
        formData.append('rating', reviewData.rating);
        await toast.promise(
            httpForToastRequest({
                path: "store-review",
                method: 'POST',
                data: formData
            }),
            {
                loading: 'Loading...',
                success: (res) => {
                    console.log(res.message);
                    if (res.status == 200) {
                        // initApp();
                        ViewProfile(expertId)
                        // setShowTicketModal(false);
                        setOpenReview(false)
                        setReviewData({
                            rating: null,
                            review: '',
                        });
                        return <b>{JSON.stringify(res['message'])}</b>
                    }
                    setIsLoading(false);
                },
                error: (err) => {
                    console.log('err', err)
                    setIsLoading(false);
                    if (err instanceof AxiosError) {
                        if (err.response.status == 500) {
                            return <b>{"Server Error Please Wait while a moment"}</b>
                        } if (err.response.status == 400) {
                            return <b>{JSON.stringify(err.response.data['message'])}</b>
                        }
                    }
                }
            }
        );
    };


    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(false)
        const formData = [{
            keyword: searchData.keyword,
            country: country,
            category_id: category,
            min_price: searchData.min_price,
            max_Price: searchData.max_price,
        }];
        console.log(formData, '/formData')
        try {
            // Your API call logic goes here
            const response = await axios.get(`${baseurl}/experts-search?keyword=${searchData.keyword}&country=${country}&category_id=${category}&min_price=${searchData.min_price}&max_price=${searchData.max_price}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setSearchError(null)
                setSearchExperts(response.data.experts)
                setSearchCondition(true);
                setSearchData({
                    keyword: '',
                    min_price: null,
                    max_price: null,
                })
                setCountry('')
                setCategory('')
                navigate('/experts')
            } else if (response.status === 404) {
                setSearchError(response.data.message);
            }
            setIsLoading(false)
            //   const data = await response.json();
            console.log('API Response:', response.data.experts);

            // Handle the API response as needed
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("axios Error. Please try again.", error.response);
                setSearchError(error.response.data.message);
            } else {
                console.log("Server Error. Please try again.", error);
            }
            // Handle errors
        }
    };
    const {
        allReviews,
        singleReview,
        setAllReviews,
        setSingleReview,
        countriesData,
        AUTHUSER
    } = useAppContext();

    useEffect(() => {
        initApp();
    }, [])
    useEffect(() => {
        fetchTestimonialsData()
        fetchSubscriptionsData();
    }, [])



    const initApp = () => {
        fetchCountry();
        fetchFaqsData();
        fetchLiveStreams();
        fetchSubscriptionsData();
        fetchProfileSubscriptionsData();
        fetchFeaturedExperts();
        fetchWebsiteSettings();
    }
 
    const [AuthcountryName, setAuthCountryName] = useState('');
    useEffect(() => {
        fetchData(AuthcountryName,2);
    }, [AuthcountryName])
    const fetchCountry = async () => {
      try {
        const response = await axios.get('https://ipinfo.io/json');
        const countryCode = response.data.country;

        const countryResponse = await axios.get(`https://restcountries.com/v3/alpha/${countryCode}`);

        if (countryResponse.data && countryResponse.data[0]?.name) {
          const countryFullName = countryResponse.data[0].name.common;
          setAuthCountryName(countryFullName);
        } else {
          throw new Error('Invalid response from REST Countries API');
        }
      } catch (error) {
        console.error('Error fetching country:', error.message);
      }
    };









    useEffect(() => {
        const timer = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [timer]);
    useEffect(() => {
        setFiltererdData(Expertsdata.filter((expert) =>
            expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expert.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expert.contact.toLowerCase().includes(searchQuery.toLowerCase())
        ))
    }, [Expertsdata, searchQuery])


    useEffect(() => {
        setFiltererdCategories(categoriesData.filter((cat) =>
            cat.name.toLowerCase().includes(searchQueryCategories.toLowerCase())
        ))
    }, [categoriesData, searchQueryCategories])

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
        setSelectedCountry(e.target.value);
        const filteredData = Expertsdata.filter((expert) =>
            expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expert.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expert.contact.toLowerCase().includes(searchQuery.toLowerCase())
        );

        console.log('filteredData', filteredData)

        const filteredExpertsByCountry = filteredData
            ? filteredData.filter((expert) => expert.country == e.target.value)
            : filteredData;

        setFiltererdData(filteredExpertsByCountry);
    };
    const handleRatingChange = (e) => {
        console.log('ratingData', e.target.value)

        setSelectedCountry(e.target.value);
        const filteredData = Expertsdata.filter((expert) =>
            expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expert.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expert.contact.toLowerCase().includes(searchQuery.toLowerCase())
        );

        console.log('filteredData', filteredData)

        const filteredExpertsByCountry = filteredData
            ? filteredData.filter((expert) => expert.average_rating == e.target.value)
            : filteredData;

        setFiltererdData(filteredExpertsByCountry);
    };


    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;

        const filteredData = Expertsdata.filter((expert) =>
            expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expert.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expert.contact.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const filteredExpertsByCategory = filteredData.filter((expert) => {
            const expertCategories = expert.categories.map((category) => category.name.toLowerCase());
            return expertCategories.includes(selectedCategory.toLowerCase());
        });

        console.log('filteredExpertsByCategory', filteredExpertsByCategory);
        setFiltererdData(filteredExpertsByCategory);
    };
    const fetchData = async (AuthcountryName,limit) => {
        console.log("/AuthcountryName",AuthcountryName)
        await httpGetRequest(
            {
                path: `experts`,
                method: "Get",
                onSuccess: (res) => {
                    setLoading(false);
                    setSkillData(res.data.skills);
                    setExpertData(res.data.experts);
                    setLanguageData(res.data.languages);
                    const skillsData = res.data.experts.map((data) => data.skills);
                    setExpertSkills(skillsData);
                },
                onError: (error) => {
                    setLoading(false);
                    console.log(error);
                }
            }
        );
    };
    const fetchFeaturedExperts = async () => {
        await httpGetRequest(
            {
                path: 'featured-experts',
                method: "Get",
                onSuccess: (res) => {
                    setLoading(false);
                    setFeaturedExperts(res.data.featured_experts);
                },
                onError: (error) => {
                    setLoading(false);
                    console.log(error);
                }
            }
        );
    };

    const ViewProfile = async (UserId) => {
        setLoading(true);
        await httpGetRequest(
            {
                path: `view-profile/${UserId}`,
                method: "Get",
                onSuccess: (res) => {
                    setLoading(false);
                    setSingleUser(res.data.user);
                    setAllReviews(res.data.user_reviews);
                    setSlotData(res.data.user_schedule);
                    setSingleReview(res.data.expert_rating['average_rating']);
                },
                onError: (error) => {
                    setLoading(false);
                    console.log(error);
                }
            }
        );
    };

    const ViewExpertSchedule = async (UserId) => {
        await httpGetRequest(
            {
                path: `expert-schedule/${UserId}`,
                method: "Get",
                onSuccess: (res) => {
                    setLoading(false);
                    setScheduleData(res.timelslots);
                },
                onError: (error) => {
                    setLoading(false);
                    console.log(error);
                }
            }
        );
    };

    const fetchFaqsData = async () => {
        await httpGetRequest(
            {
                path: 'faqs',
                method: "Get",
                onSuccess: (res) => {
                    setFaqData(res.data.faqs);
                    setCategoriesData(res.data.categories);
                    setLoading(false);
                },
                onError: (error) => {
                    console.log(error);
                }
            }
        );
    };
    const fetchLiveStreams = async () => {
        await httpGetRequest(
            {
                path: 'livestreams',
                method: "Get",
                onSuccess: (res) => {
                    setLiveStreams(res.livestreams);
                    setLoading(false);
                },
                onError: (error) => {
                    console.log(error);
                }
            }
        );
    };

    const fetchSubscriptionsData = async () => {
        await httpGetRequest(
            {
                path: 'subscriptions',
                method: "Get",
                onSuccess: (res) => {
                    setSubscriptionData(res.packages);
                    console.log(res.packages, '/subscription');
                    setLoading(false);
                },
                onError: (error) => {
                    console.log(error);
                }
            }
        );
    };
    const fetchProfileSubscriptionsData = async () => {
        await httpGetRequest(
            {
                path: 'profile-subscriptions',
                method: "Get",
                onSuccess: (res) => {
                    setProfileSubscriptionData(res.packages);
                    console.log(res.packages, '/ProfileSubscriptionData');
                    setLoading(false);
                },
                onError: (error) => {
                    console.log(error);
                }
            }
        );
    };
    const fetchWebsiteSettings = async () => {
        await httpGetRequest(
            {
                path: 'website-settings-data',
                method: "Get",
                onSuccess: (res) => {
                    setWebsiteData(res.Setting);
                    setLoading(false);
                },
                onError: (error) => {
                    console.log(error);
                }
            }
        );
    };






    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const handleChoosePlan = async (id, status) => {
        await toast.promise(
            httpForToastRequest({
                path: `subscribe-package/${id}`,
                method: 'POST',
            }),
            {
                loading: 'Loading...',
                success: (res) => {
                    console.log(res);
                    if (res.status == 200) {
                        initApp();
                        return <b>{JSON.stringify(res['message'])}</b>
                    }
                    setIsLoading(false);
                },
                error: (err) => {
                    console.log('err', err)
                    setIsLoading(false);
                    if (err instanceof AxiosError) {
                        if (err.response.status == 500) {
                            return <b>{"Server Error Please Wait while a moment"}</b>
                        } if (err.response.status == 400) {
                            return <b>{JSON.stringify(err.response.data['message'])}</b>
                        }
                        if (err.response.status == 401) {
                            return <b>{JSON.stringify(err.response.data['message'])}</b>
                        }
                    }
                }
            }
        );
    };



    const [testimonials, setTestimonials] = useState();
    const fetchTestimonialsData = async () => {
            await httpGetRequest(
                {
                    path: 'testimonials',
                    method: "Get",
                    onSuccess: (res) => {
                        setTestimonials(res.testimonials);
                        console.log('testttt',res.testimonials)
                        setLoading(false);
                    },
                    onError: (error) => {
                        console.log(error);
                    }
                }
            );
        };


    return (
        <FrontEndContext.Provider
            value={{
                data,
                Expertsdata,
                loading,
                searchQuery,
                setSearchQuery,
                filteredExperts,
                Skillsdata,
                languagesData,
                setFiltererdData,
                categoriesData,
                singleUser,
                ViewProfile,
                scheduleData,
                ViewExpertSchedule,
                timer,
                allReviews,
                singleReview,
                countriesData,
                // filteredExpertsByCountry,
                selectedCountry,
                // handleCountryChange
                handleCountryChange,
                selectedCategory,
                handleCategoryChange,
                selectedRating,
                handleRatingChange,
                filteredCategories,
                setSearchQueryCategories,
                searchQueryCategories,
                faqData,
                subscriptionData,
                openDialog,
                handleOpenDialog,
                handleCloseDialog,
                handleChoosePlan,
                setOpenDialog,
                profileSubscriptionData,
                // review
                openReview,
                handleClickOpen,
                handleCloseReview,
                handleInputReviewChange,
                handleReviewSubmit,
                setReviewData,
                reviewData,
                //search api 
                searchData,
                country,
                category,
                handleCategoryIdChange,
                handleInputSearchChange,
                handleSearchSubmit,
                handleCountryNameChange,
                searchExperts,
                searchError,
                isLoading,
                searchCondition,
                setSearchCondition,
                featuredExperts,
                fetchData,
                websiteData,
                AuthcountryName,
                slotData,
                initApp,
                AUTHUSER,
                fetchSubscriptionsData,
                liveStreams,
                fetchLiveStreams,
                testimonials,
                MODALOPENED,
                setMODALOPENED


            }}
        >
            {children}
        </FrontEndContext.Provider>
    );
};
export const useFrontEndContext = () => useContext(FrontEndContext);



