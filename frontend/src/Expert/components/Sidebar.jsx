import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import {useFrontEndContext} from '../../context/FrontEndContext'

function Sidebar() {
  const { AUTHUSER, authUser, authUserActiveSubscription } = useAppContext();
  const [isBioProfileEnabled, setIsBioProfileEnabled] = useState();
  const userType = authUser.user?.user_type;
  const{websiteData}=useFrontEndContext()

  useEffect(() => {
    if (authUserActiveSubscription !== null) {
      if (authUserActiveSubscription?.subscription_package?.features) {
        try {
          const features = JSON.parse(
            authUserActiveSubscription.subscription_package.features
          );

          if (features && features["Bio Profile"] === "Bio Profile") {
            setIsBioProfileEnabled(true);
          }
        } catch (error) {
          console.error("Error parsing features JSON:", error);
        }
      }
    }
  }, [authUserActiveSubscription]);
  const sidebarLinks = [
    {
      id: 1,
      title: "Profile Settings",
      path: "/settings",
      icoClass: "bi bi-person",
    },
    {
      id: 2,
      title: "Skill Verification Request",
      path: "/identity-verification",
      icoClass: "bi bi-check-square",
    },
    {
      id: 3,
      title: "Billing Information",
      path: "/billing-information",
      icoClass: "bi bi-credit-card",
    },
    {
      id: 4,
      title: "Account Settings",
      path: "/account-settings",
      icoClass: "bi bi-gear",
    },
    {
      id: 5,
      title: "Portfolio Settings",
      path: "/portfolio-settings",
      icoClass: "bi bi-sliders",
    },
    {
      id: 6,
      title: "Social Media",
      path: "/socialMedia",
      icoClass: "bi bi-hdd-network",
    },
    {
      id: 7,
      title: "Qualification",
      path: "/qualification-settings",
      icoClass: "bi bi-mortarboard",
    },
    {
      id: 8,
      title: "Wallet Settings",
      path: "/add-wallet",
      icoClass: "bi bi-wallet",
    },

    {
      id: 9,
      title: "Subscriptions",
      path: "/subscription",
      icoClass: "bi bi-wallet",
    },
    {
      id: 912730,
      title: "Profile Subscriptions",
      path: "/profile-subscriptions",
      icoClass: "bi bi-window-plus",
    },
    ...(websiteData.isReferral_Module=="true"
      ? [
    {
      id: 11,
      title: "Referral Code",
      path: "/update-refferal",
      icoClass: "bi bi-people",
    },
    {
      id: 12,
      title: "Referral Team",
      path: "/refferal-team",
      icoClass: "bi bi-people",
    },
    // {
    //   id: 13,
    //   title: "Referral Earnings",
    //   path: "/refferal-earnings",
    //   icoClass: "bi bi-people",
    // },
      ]
      : []),
    {
      id: 11,
      title: "Support",
      path: "/support",
      icoClass: "bi bi-life-preserver",
    },
    ...(userType === "expert" && isBioProfileEnabled
      ? [
          {
            id: 11,
            title: "Upload Posts",
            path: "/media-posts",
            icoClass: "bi bi-pencil",
          },
          {
            id: 12,
            title: "Bio Profile",
            path: `/profile/${AUTHUSER.profile_url}`,
            icoClass: "bi bi-people",
          },
        ]
      : []),
    {
      id: 13,
      title: "W-4 Form",
      path: `/w4-form`,
      icoClass: "bi bi-pencil",
    },
  ];

  return (
    <aside>
      <div className="tb-asideholder">
        <div className="tb-asidebox tb-settingtabholder">
          <ul className="tb-settingtab">
            {sidebarLinks
              .filter((data) => {
                if (AUTHUSER.user_type === "user") {
                  return ![
                    "Skill Verification Request",
                    "Billing Information",
                    "Portfolio Settings",
                    "Qualification Settings",
                    "Subscriptions",
                    "Profile Subscriptions",
                    "Bio Profile",
                    "Bio Link",
                  ].includes(data.title);
                } else {
                  return true;
                }
              })
              .map((data, i) => (
                <li className="" key={i}>
                  <NavLink  to={data.path}
                  className={({ isActive }) =>
                    isActive ? "active" : ""
                  }>
                    <i className={`text-dark ${data.icoClass}`}></i>
                    {data.title}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
