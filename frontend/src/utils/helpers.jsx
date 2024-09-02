import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { baseurl, httpForToastRequest, httpRequest } from "../Api/BaseApi";

export async function fetchUserDataForGoogleSocialAuth(accessToken) {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error as needed
    return null;
  }
}


const testBaseUrl = "http://192.168.100.41/iot.gmgsolutions.io/api";

export async function isRegistered(email) {
  const formData = new FormData();
  formData.append("email", email);
  const { data } = await axios.post(baseurl + "/is-registered", formData);
  return data;
  // const response = await toast.promise(
  //     httpForToastRequest({
  //         path: 'is-registered',
  //         method: "POST",
  //         data: { email }
  //     }),
  //     {
  //         loading: 'Loading...',
  //         success: (res) => {
  //             console.log(res.message);
  //             if (res.status == 200) {
  //                 const token = res.token
  //                 localStorage.setItem('token', token);

  //                 return <b>{JSON.stringify(res['message'])}</b>
  //             }
  //         },
  //         error: (err) => {
  //             console.log('err', err)
  //             if (err instanceof AxiosError) {
  //                 if (err.response.data.message.email) {
  //                     return <b>{"Email Already exist"}</b>;
  //                 }
  //                 if (err.response.data.message.password) {
  //                     return <b>{err.response.data.message['password'][0]}</b>;
  //                 } else if (err.response.status == 500) {
  //                     return <b>{"Server Error Please Wait while a moment"}</b>
  //                 } if (err.response.status == 400) {
  //                     return <b>{JSON.stringify(err.response.data['message'])}</b>
  //                 }
  //             }
  //         }
  //     }
  // );
  // return response?.success
}

export function getCountryCode(countryName) {
  const countryMapping = {
    Afghanistan: "AF",
    Albania: "AL",
    Algeria: "DZ",
    Andorra: "AD",
    Angola: "AO",
    "Antigua and Barbuda": "AG",
    Argentina: "AR",
    Armenia: "AM",
    Australia: "AU",
    'american samoa': "Aas",
    Austria: "AT",
    Azerbaijan: "AZ",
    Bahamas: "BS",
    Bahrain: "BH",
    Bangladesh: "BD",
    Barbados: "BB",
    Belarus: "BY",
    Belgium: "BE",
    Belize: "BZ",
    Benin: "BJ",
    Bhutan: "BT",
    Bolivia: "BO",
    "Bosnia and Herzegovina": "BA",
    Botswana: "BW",
    Brazil: "BR",
    Brunei: "BN",
    Bulgaria: "BG",
    "Burkina Faso": "BF",
    Burundi: "BI",
    "Cabo Verde": "CV",
    Cambodia: "KH",
    Cameroon: "CM",
    Canada: "CA",
    "Central African Republic": "CF",
    Chad: "TD",
    Chile: "CL",
    China: "CN",
    Colombia: "CO",
    Comoros: "KM",
    "Congo (Congo-Brazzaville)": "CG",
    "Costa Rica": "CR",
    Croatia: "HR",
    Cuba: "CU",
    Cyprus: "CY",
    "Czechia (Czech Republic)": "CZ",
    "Democratic Republic of the Congo": "CD",
    Denmark: "DK",
    Djibouti: "DJ",
    Dominica: "DM",
    "Dominican Republic": "DO",
    Ecuador: "EC",
    Egypt: "EG",
    "El Salvador": "SV",
    "Equatorial Guinea": "GQ",
    Eritrea: "ER",
    Estonia: "EE",
    "Eswatini (fmr. Swaziland)": "SZ",
    Ethiopia: "ET",
    Fiji: "FJ",
    Finland: "FI",
    France: "FR",
    Gabon: "GA",
    Gambia: "GM",
    Georgia: "GE",
    Germany: "DE",
    Ghana: "GH",
    Greece: "GR",
    Grenada: "GD",
    Guatemala: "GT",
    Guinea: "GN",
    "Guinea-Bissau": "GW",
    Guyana: "GY",
    Haiti: "HT",
    Honduras: "HN",
    Hungary: "HU",
    Iceland: "IS",
    India: "IN",
    Indonesia: "ID",
    Iran: "IR",
    Iraq: "IQ",
    Ireland: "IE",
    Israel: "IL",
    Italy: "IT",
    Jamaica: "JM",
    Japan: "JP",
    Jordan: "JO",
    Kazakhstan: "KZ",
    Kenya: "KE",
    Kiribati: "KI",
    "Kuwait": "KW",
    Kyrgyzstan: "KG",
    "Laos (Lao People's Democratic Republic)": "LA",
    Latvia: "LV",
    Lebanon: "LB",
    Lesotho: "LS",
    Liberia: "LR",
    Libya: "LY",
    Liechtenstein: "LI",
    Lithuania: "LT",
    Luxembourg: "LU",
    Madagascar: "MG",
    Malawi: "MW",
    Malaysia: "MY",
    Maldives: "MV",
    Mali: "ML",
    Malta: "MT",
    "Marshall Islands": "MH",
    Mauritania: "MR",
    Mauritius: "MU",
    Mexico: "MX",
    "Micronesia (Federated States of Micronesia)": "FM",
    "Moldova (Republic of Moldova)": "MD",
    Monaco: "MC",
    Mongolia: "MN",
    Montenegro: "ME",
    Morocco: "MA",
    Mozambique: "MZ",
    "Myanmar (formerly Burma)": "MM",
    Namibia: "NA",
    Nauru: "NR",
    Nepal: "NP",
    Netherlands: "NL",
    "New Zealand": "NZ",
    Nicaragua: "NI",
    Niger: "NE",
    Nigeria: "NG",
    "North Korea (Democratic People's Republic of Korea)": "KP",
    "North Macedonia (formerly Macedonia)": "MK",
    Norway: "NO",
    Oman: "OM",
    Pakistan: "PK",
    Palau: "PW",
    "Palestine State": "PS",
    Panama: "PA",
    "Papua New Guinea": "PG",
    Paraguay: "PY",
    Peru: "PE",
    Philippines: "PH",
    Poland: "PL",
    Portugal: "PT",
    Qatar: "QA",
    Romania: "RO",
    Russia: "RU",
    Rwanda: "RW",
    "Saint Kitts and Nevis": "KN",
    "Saint Lucia": "LC",
    "Saint Vincent and the Grenadines": "VC",
    Samoa: "WS",
    "San Marino": "SM",
    "Sao Tome and Principe": "ST",
    "Saudi Arabia": "SA",
    Senegal: "SN",
    Serbia: "RS",
    Seychelles: "SC",
    "Sierra Leone": "SL",
    Singapore: "SG",
    Slovakia: "SK",
    Slovenia: "SI",
    "Solomon Islands": "SB",
    Somalia: "SO",
    "South Africa": "ZA",
    "South Korea (Republic of Korea)": "KR",
    "South Sudan": "SS",
    Spain: "ES",
    "Sri Lanka": "LK",
    Sudan: "SD",
    Suriname: "SR",
    Sweden: "SE",
    Switzerland: "CH",
    Syria: "SY",
    Tajikistan: "TJ",
    Tanzania: "TZ",
    Thailand: "TH",
    "Timor-Leste": "TL",
    Togo: "TG",
    Tonga: "TO",
    "Trinidad and Tobago": "TT",
    Tunisia: "TN",
    Turkey: "TR",
    Turkmenistan: "TM",
    Tuvalu: "TV",
    Uganda: "UG",
    Ukraine: "UA",
    "United Arab Emirates": "AE",
    "United Kingdom": "GB",
    "United States": "US",
    Uruguay: "UY",
    Uzbekistan: "UZ",
    Vanuatu: "VU",
    Venezuela: "VE",
    Vietnam: "VN",
    Yemen: "YE",
    Zambia: "ZM",
    Zimbabwe: "ZW"
    // Add more country mappings as needed...
  };


  const formattedCountryName = countryName.toLowerCase().trim();

  for (let name in countryMapping) {
    if (formattedCountryName === name.toLowerCase()) {
      return countryMapping[name];
    }
  }

  return null; // Return null if the country code is not found
}

export function formatDate(inputDate) {
  var date = new Date(inputDate);
  if (!isNaN(date.getTime())) {
    // Months use 0 index.
    return (
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear()
    );
  }
}
export function getDateDifferenceInMinutes(dateStr1, dateStr2) {
  // Convert strings to Date objects
  var date1 = new Date(dateStr1);
  var date2 = new Date(dateStr2);

  // Calculate the difference in milliseconds
  var differenceMs = Math.abs(date2 - date1);

  // Convert milliseconds to minutes
  var differenceMinutes = Math.floor(differenceMs / (1000 * 60));

  return differenceMinutes;
}
export function extractTimeFromDate(dateStr) {
  // Convert string to Date object
  var dateObj = new Date(dateStr);

  // Extract time
  var hours = dateObj.getHours();
  var minutes = dateObj.getMinutes();
  var seconds = dateObj.getSeconds();

  // Format the time
  var formattedTime =
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds;

  return formattedTime;
}

export function getDateDifference(dateStr1, dateStr2) {
  // Convert strings to Date objects
  var date1 = new Date(dateStr1);
  var date2 = new Date(dateStr2);

  // Calculate the difference in milliseconds
  var differenceMs = Math.abs(date2 - date1);

  // Convert milliseconds to seconds
  var differenceSeconds = Math.floor(differenceMs / 1000);

  if (differenceSeconds < 60) {
    return differenceSeconds === 1
      ? differenceSeconds + " second"
      : differenceSeconds + " seconds";
  } else {
    // Convert seconds to minutes
    var differenceMinutes = Math.floor(differenceSeconds / 60);

    if (differenceMinutes < 60) {
      return differenceMinutes === 1
        ? differenceMinutes + " minute"
        : differenceMinutes + " minutes";
    } else {
      // Convert minutes to hours
      var differenceHours = Math.floor(differenceMinutes / 60);

      if (differenceHours < 24) {
        return differenceHours === 1
          ? differenceHours + " hour"
          : differenceHours + " hours";
      } else {
        // Calculate the difference in days
        var differenceDays = Math.floor(differenceHours / 24);
        return differenceDays === 1
          ? differenceDays + " day"
          : differenceDays + " days";
      }
    }
  }
}

export async function getLoggedinUserData(token) {
  console.log(localStorage.getItem("token"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  try {
    const res = await axios.get(baseurl + "/logged-in-user", { headers });
    return res.data;
  } catch (error) {
    console.log("error occured while fetching the appoinments", error);
    // toast.error("can't get your appointments");
  }
}
export async function getDatasetForExpert() {
  // console.log(localStorage.getItem('token'))
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  try {
    const res = await axios.get(baseurl + "/countries-dataset", { headers });
    return res.data;
  } catch (error) {
    console.log("error occured while fetching the appoinments", error);
    toast.error("can't get Dataset For Conutry Based Reached");
  }
}

export async function getCallLogsForUser() {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  const { data } = await axios.get(baseurl + "/call-logs", { headers });
  return data;
}

export function isEqualWithThreshold(number1, number2, threshold) {
  return Math.abs(number1 - number2) <= threshold;
}

export function isNumber(value) {
  return !isNaN(value);
}

export function getNumberFromString(input) {
  const numberRegex = /^[-+]?(\d+(\.\d*)?|\.\d+)/; // Regex to match decimal numbers
  const match = input.match(numberRegex);

  if (match) {
    const numberString = match[0]; // Extract the matched number string
    const number = parseFloat(numberString); // Parse the number string into a floating-point number
    return number;
  }

  return 0; // Return 0 if no number is found
}

export async function getExperts(url) {
  const country = "all";
  // if any country /country-name is provided here, then it will return the experts from all countries
  const { data } = await axios.get(url);
  return data;
}
export function convertToTitleCase(str) {
  return str.replace(/_/g, " ").replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function storeCallLogs(
  receiver_id,
  callType,
  startedAt,
  endedAt,
  duration
) {
  console.log(receiver_id, "receiver id");
  const data = {
    receiver_id,
    call_type: callType,
    started_at: formatDateForLaravel(startedAt),
    ended_at: formatDateForLaravel(endedAt),
    duration: duration,
  };

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  axios
    .post(`${baseurl}/store-call-logs`, data, { headers })
    .then((response) => {
      // toast.success("Call Ended at " + endedAt);
      console.log("Call logs stored successfully:", response.data);
    })
    .catch((error) => {
      toast.error("Error storing calllogs");
      console.error("Error storing call logs:", error);
    });
}

export function formatDateForLaravel(date) {
  const convertedDate = date.toISOString().replace("T", " ").slice(0, 19);
  return convertedDate;
}

export function objectToQueryString(obj) {
  const queryParams = [];

  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== "") {
      const value = encodeURIComponent(obj[key]);
      queryParams.push(`${encodeURIComponent(key)}=${value}`);
    }
  }

  return queryParams.join("&");
}

export function queryStringToObject(queryString) {
  const params = new URLSearchParams(queryString);
  const obj = {};

  // Iterate over each parameter and assign it to the object
  for (let [key, value] of params) {
    obj[key] = value;
  }

  return obj;
}

export function mapToObject(map) {
  const obj = {};

  for (let [key, value] of map) {
    obj[key] = value;
  }

  return obj;
}

export const getSearchExperts = async (searchData) => {
  try {
    const { searchInput, country, category, minPrice, maxPrice, sub_category } =
      searchData;
    console.log("google ", searchData);

    const params = {};
    if (searchInput) params.keyword = searchInput;
    if (country) params.country = country;
    if (sub_category) params.sub_category = sub_category;
    if (category) params.category_id = category;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;

    console.log("Search params:", params);

    const response = await axios.get(`${baseurl}/experts-search`, {
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle the response as needed
    console.log("Search results:", response.data);
    return response.data; // Return the search results
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error searching experts:", error);
    throw error; // Rethrow the error to the calling function or component
  }
};

export function mockApi(data, limit, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const slicedData = data.slice(0, limit);
      const totalResults = data.length;

      resolve({ items: slicedData, totalResults });
    }, wait);
  });
}
export function truncate(str, maxLength, suffix = "...") {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}

export async function fetchBlogs(page, search = "") {
  const url = `${baseurl}/fetch-blogs?pageNumber=${page}&resultsPerPage=${8}&search=${search}`;

  try {
    const response = await axios.get(url);
    const res = response.data;

    // Process the blogs data here
    return res?.blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}

export const storeAppointment = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(`${baseurl}/store-appointment`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle the response as needed
    console.log("Appointment stored successfully:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error storing appointment:", error);
    throw error; // Rethrow the error to the calling function or component
  }
};

export const storeSchedule = async (scheduleData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${baseurl}/store-schedule`,
      scheduleData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Handle the response as needed
    console.log("Schedule stored successfully:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error storing schedule:", error);
    throw error; // Rethrow the error to the calling function or component
  }
};

export function extractOnlyTimeFromDate(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function formatCurrentTime(date = new Date()) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}
export async function createCheckoutSession(
  price,
  description,
  purpose,
  subscriptionData
) {
  // for subscription api
  // formData.append('package_id', packageId);
  // formData.append('amount', newAmount);
  // formData.append('duration', duration);
  // formData.append('confirmation', value);
  // duration: subscriptionData?.duration,
  // confirmation: subscriptionData?.confirmation,

  // for requesting-payment-api
  const postData = {
    product_price: price,
    description,
    success_url: `${window.origin}/success`,
    failed_url: `${window.origin}/failed`,
    purpose,
  };

  if (subscriptionData) {
    if (subscriptionData?.package_id) {
      postData["package_id"] = subscriptionData?.package_id;
    }
    if (subscriptionData?.duration) {
      postData["duration"] = subscriptionData?.duration;
    }
    if (subscriptionData?.confirmation) {
      postData["confirmation"] = subscriptionData?.confirmation;
    }
    if (subscriptionData?.ad_slot) {
      postData["ad_slot"] = subscriptionData?.ad_slot;
    }

    const { data } = await axios.post(
      baseurl + "/create-checkout-session",
      postData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    window.location.href = data.session_url;
    return data;
  }

  const { data } = await axios.post(
    baseurl + "/create-checkout-session",
    postData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  // Redirect to Stripe Checkout

  window.location.href = data.session_url;

  return data;
}
export async function checkVerificationStatus(serverId) {
  const { data } = await axios.get(
    baseurl + `/check-verification-session/${serverId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  console.log("checkVerificationStatus", data);
  return data;
}

export async function createVerificationSession() {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      baseurl + "/create-verification-session",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const popup = window.open(
      data.session_url,
      "_blank",
      "width=400,height=600"
    );
    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        checkVerificationStatus(data.session_id).then((data) => {
          if (data.client_secret === "verified") {
            console.log("Verification successful!");
            alert("Verification successful!");
          } else {
            console.log("Verification failed!");
            alert("Verification failed!");
          }
        });
      }
    }, 1000);
    return data;
  } catch (error) {
    console.error("Error creating verification session:", 4);
    throw error;
  }
}

export async function createLiveStream(roomId, price, title,description,scheduleType, start_time,end_time, selectedDate) {
  try {
    const formData = new FormData();
    formData.append("room_id", roomId);
    formData.append("price", price);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", scheduleType);
    formData.append("start_time", start_time);
    formData.append("end_time", end_time);
    formData.append("date", selectedDate);
    const token = localStorage.getItem("token");
    const { data } = await axios.post(baseurl + "/store-livestream", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.livestream;
  } catch (error) {
    console.error("Error creating verification session:", 4);
    throw error;
  }
}
export async function payLiveStream(expert_id, price) {
  console.log("payLiveStream", expert_id, price);
  try {
    const formData = new FormData();
    formData.append("expert_id", expert_id);
    formData.append("price", price);
    const token = localStorage.getItem("token");
    const { data } = await axios.post(baseurl + "/pay-livestream", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.success;
  } catch (error) {
    console.error("Error creating verification session:", 4);
    throw error;
  }
}
export async function getLiveStreamDetails(id) {
  try {
    const { data } = await axios.get(`${baseurl}/get-livestream/${id}`);
    return data.liveStream;
  } catch (error) {
    console.log("error occured while fetching the appoinments", error);
  }
}

export async function getTransactionDetails(id) {
  try {
    const { data } = await axios.get(`${baseurl}/transactions/${id}`);
    return data;
  } catch (error) {
    console.log("error occured while fetching the appoinments", error);
  }
}

export async function updateTransactionStatus(id, status) {
  const data = {
    status: status,
  };

  try {
    const response = await axios.put(
      `${baseurl}/transactions/update/${id}`,
      data
    );
    console.log(response.data);
    // Handle successful response
  } catch (error) {
    console.log(error);
    // Handle error
  }
}

export function decodeQueryString(encoded) {
  let decoded = "";
  for (let i = 0; i < encoded.length; i++) {
    decoded += String.fromCharCode(encoded.charCodeAt(i) - 1);
  }
  return decoded;
}

export function extractQueryParams(url) {
  // Extract the query string from the URL
  var queryString = url.split("?")[1];

  // Check if there is a query string present
  if (queryString) {
    // Split the query string into an array of key-value pairs
    var pairs = queryString.split("&");

    // Initialize an empty object to store the result
    var params = {};

    // Iterate over each key-value pair
    pairs.forEach(function (pair) {
      var keyValue = pair.split("=");
      var key = decodeURIComponent(keyValue[0]);
      var value = decodeURIComponent(keyValue[1] || "");

      params[key] = value;
    });

    return params;
  }

  return {};
}

export function isValidQueryParams(url) {
  // Extract the query parameters part from the URL
  const queryString = url.split("?")[1];

  if (!queryString) {
    // If there are no query parameters, return false
    return false;
  }

  // Split the query parameters by '&'
  const params = queryString.split("&");

  // Loop through each parameter and check if it's in the correct format
  for (let param of params) {
    // Split parameter key and value by '='
    const keyValue = param.split("=");

    // Check if there are exactly two parts (key and value)
    if (keyValue.length !== 2) {
      return false;
    }

    // Check if both key and value are not empty
    if (!keyValue[0] || !keyValue[1]) {
      return false;
    }

    // If all checks pass, move to the next parameter
  }

  // If all parameters are valid, return true
  return true;
}

export async function createSubscription(
  packageId,
  newAmount,
  duration,
  confirmation,
  ad_slot
) {
  try {
    const formData = new FormData();
    formData.append("package_id", packageId);
    formData.append("amount", newAmount);
    formData.append("duration", duration);
    formData.append("confirmation", confirmation);
    formData.append("ad_slot", ad_slot);
    // formData.append("ad_slot", confirmation);

    const response = await axios.post(
      baseurl + "/subscribe-profile-package",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log( )
    console.log(response.data, " sub-created");
    const data = response.data;

    return data;
  } catch (error) {
    // Handle any error that occurred during the request
    if (axios.isAxiosError(error)) {
      const response = error.response;
      if (response.status === 500) {
        throw new Error("Server Error. Please wait a moment.");
      } else if (response.status === 422) {
        throw new Error(JSON.stringify(response.data.message));
      } else if (response.status === 501) {
        throw new Error(JSON.stringify(response.data.message));
      } else if (response.status === 401) {
        throw new Error(JSON.stringify(response.data.message));
      }
    }
    throw new Error("An error occurred while creating the subscription.");
  }
}

export async function createInstantAppointment(expertId) {
  const res = await toast.promise(
    httpForToastRequest({
      path: "store-instant-appointment",
      method: "POST",
      data: { expert_id: expertId },
    }),
    {
      loading: "Loading...",
      success: (res) => {
        console.log(res.message);
        if (res.status == 200) {
          return <b>{JSON.stringify(res["message"])}</b>;
        }
      },
      error: (err) => {
        console.log("err", err);
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

  return res;
}
export async function UpdateLivestreamStatus(value) {
  const res = await toast.promise(
    httpForToastRequest({
      path: "update-livestream-status",
      method: "POST",
      data: { status: value },
    }),
    {
      loading: "Loading...",
      success: (res) => {
        console.log(res.message);
        if (res.status == 200) {
          return <b>{JSON.stringify(res["message"])}</b>;
        }
      },
      error: (err) => {
        console.log("err", err);
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

  return res;
}

export async function storeChat(users, text) {
  const formData = new FormData();
  formData.append("usersId", users);
  formData.append("text", text);
  // formData.append('media', '{}');
  formData.append("isSeen", "1");
  formData.append("status", "1");

  try {
    const response = await httpRequest({
      method: "POST",
      path: "store-chat",
      data: formData,
    });
    // Handle the response as needed
    console.log(response.data, " shaddu");
    return response.data; // Return the response data
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error(error);
  }
}

export async function fetchAppointmentsForUser() {
  try {
    const response = await axios.get(baseurl + "/fetch-appointments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const appointments = response.data;
    console.log(appointments, "apts");
    return appointments;
    // Process the appointments as needed
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

export async function checkIfUserExpert() {
  try {
    const { data } = await axios.get(baseurl + "/check-user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data?.success;
    // Process the appointments as needed
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error setting item to localStorage", error);
  }
};

export const getItem = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error("Error getting item from localStorage", error);
    return null;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from localStorage", error);
  }
};

export function checkDateDifference(currentDate, staticDate) {
  console.log(currentDate.toString(), "\n", staticDate.toString());
  const oneHourInMillis = 1000 * 60 * 60;
  const diffInMillis = currentDate.getTime() - staticDate.getTime();

  return diffInMillis <= oneHourInMillis;
}

export function getMostRecentDate(datesArray) {
  if (!Array.isArray(datesArray) || datesArray.length === 0) {
    return null; // Return null if the array is empty or not an array
  }
}
export async function fetchBioProfile(id) {
  try {
    const response = await axios.get(baseurl + "/view-bio-profile/" + id);
    const user = response.data.data.user;
    console.log(user, "user");
    return user;
    // Process the appointments as needed
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

// export function getMostRecentDate(eu){}

export async function updateToCompleteApt(aptId) {
  try {
    const { data } = await axios.post(
      baseurl + "/update-to-complete/" + aptId,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(data, "/n");
    // toast.success('Appointment Completed Successfully!')
    return data;
    // Process the appointments as needed
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

export function removeFieldsWithNoneValue(obj) {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== "None") {
      result[key] = obj[key];
    }
  }
  return result;
}

export function buildUrl(params) {
  const queryParts = [];

  // Convert all fields into query parameters
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      queryParts.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      );
    }
  });

  // Construct the final URL
  const queryString = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
  return `${queryString}`;
}

export function checkNumberExists(array, number) {
  return array.includes(number);
}
export async function fetchExperts(url) {
  try {
    const response = await axios.get(url);
    const experts = response.data?.data?.experts;
    console.log(experts);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error(error);
  }
}

export function decode(encodedString) {
  // Remove the suffix 'XvhE0'
  const numberPart = encodedString.replace("XvhE0", "");

  // Convert the remaining string to a number and divide by 2
  const originalNumber = Number(numberPart) / 2;

  return originalNumber;
}

export async function transactionComplete() {
  const url = "https://example.com/api/experts";

  try {
    const response = await axios.post(url, {});

    // Handle the response and access the expert data
    const experts = response.data;
    console.log(experts);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error(error);
  }
}

// Call the fetchExperts function to fetch the experts
// fetchExperts();

export async function fetchAppointments() {
  try {
    const response = await axios.get(baseurl + "/fetch-all-appointments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const appointments = response.data;
    return appointments;
    // Process the appointments as needed
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}


// live streams

export const calculateTotalHours = (startTime, endTime) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;


  if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
    console.error("Invalid time format. Expected HH:mm:ss.");
    return "Invalid time format";
  }

  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error("Invalid date objects created.");
    return "Invalid date";
  }

  const diff = end - start;
  const totalHours = diff / (1000 * 60 * 60);

  return totalHours.toFixed(); 
};
export const fetchExpertLiveStreams = async () => {
  try {
    const response = await axios.get(baseurl + "/expert-livestreams", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data.livestreams;
  } catch (error) {
    console.error('Error fetching livestreams:', error);
    throw error;
  }
};