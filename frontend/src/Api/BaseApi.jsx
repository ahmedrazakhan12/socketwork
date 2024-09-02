import axios from "axios";
// export const baseurl = "https://muzamilbackend.gmgsolution.com/api";
// export const baseUrlImage = "https://muzamilbackend.gmgsolution.com/public/";

// export const baseurl = "https://zyacom.com/backend/api";
// export const baseUrlImage = "https://zyacom.com/backend/public/";
export const baseurl = "https://zyacom.com/backend/api";
export const baseUrlImage = "https://zyacom.com/backend/public/";
// export const baseurl = "https://polydate.gmgsolution.com/api";

// export const baseUrlImage = "https://polydate.gmgsolution.com/public/";

export const httpRequest = async ({
  path,
  data,
  onSuccess,
  onError,
  method,
}) => {
  try {
    const token = localStorage.getItem("token");

    // Check if the user is logged in (token exists)
    if (!token) {
      console.log("User not logged in. Redirecting to login page.");
      return;
    }

    const response = await axios.request({
      method: method,
      data,
      url: baseurl + "/" + path,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      onSuccess(response.data);
    }
  } catch (error) {
    console.log("Data error:", error);

    if (axios.isAxiosError(error)) {
      onError(error);
    } else {
      console.log("Server Error. Please try again.", error);
    }
  }
};

export const httpForToastRequest = async ({ path, data, method }) => {
  console.log(path);
  try {
    const token = localStorage.getItem("token");
    const response = await axios.request({
      method: method,
      data,
      url: baseurl + "/" + path,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

// for frontEnd Ui
export const httpGetRequest = async ({
  path,
  data,
  onSuccess,
  onError,
  method,
}) => {
  try {
    const response = await axios.request({
      method: method,
      data,
      url: baseurl + "/" + path,
    });
    if (response.status === 200) {
      onSuccess(response.data);
    }
  } catch (error) {
    console.log("data error check ", error);
    if (axios.isAxiosError(error)) {
      onError(error);
    } else {
      alert("Server Error Please Try again");
    }
  }
};
