
// import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
// import defaultImage from "../assets/images/default_image.jpeg";
// import toast from 'react-hot-toast';
// import { httpForToastRequest, httpRequest } from '../Api/BaseApi';
// import { useAppContext } from './AppContext';
// import { AxiosError } from 'axios';
// import { Scheduler } from "@aldabil/react-scheduler";

// const ScheduleContext = createContext();
// export const ScheduleProvider = ({ children }) => {
//     // const {
//     //     authUser,
//     // } = useAppContext();

//     const event = scheduler.edited;
//     const [isLoading, setIsLoading] = useState(false);
//     const [progresss, setProgress] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [isPreLoading, setIsPreLoading] = useState(false);

//     const [state, setState] = useState({
//       startDate: event?.start || new Date().toISOString().slice(0, 16),
//       endDate: event?.end || new Date().toISOString().slice(0, 16),
//     });
//     const [error, setError] = useState("");
  
//     const handleChange = (value, name) => {
//       setState((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     };
  
//     const handleSubmit = async () => {
//       try {
          
//         // const formData = new FormData();
//         // formData.append('start_date_time', state.startDate);
//         // formData.append('end_date_time', state.endDate);
//         //      await toast.promise(
//         //     httpForToastRequest({
//         //         path: "store-schedule",
//         //         method: 'POST',
//         //         data: formData
//         //     }),
//         //     {
//         //         loading: 'Loading...',
//         //         success: (res) => {
//         //             console.log(res.message);
//         //             if (res.status == 200) {
//         //                 return <b>{JSON.stringify(res['message'])}</b>
//         //             }
//         //             setIsLoading(false);
//         //         },
//         //         error: (err) => {
//         //             setIsLoading(false);
//         //             if (err instanceof AxiosError) {
//         //                 if (err.response.status == 500) {
//         //                     return <b>{"Server Error Please Wait while a moment"}</b>
//         //                 } if (err.response.status == 400) {
//         //                     return <b>{JSON.stringify(err.response.data['message'])}</b>
//         //                 }
//         //             }
//         //         }
//         //     }
//         // );
//         scheduler.loading(true);
//         const added_updated_event = await new Promise((res) => {
//           setTimeout(() => {
//             res({
//               event_id: event?.event_id || Math.random(),
//               start: new Date(state.startDate),
//               end: new Date(state.endDate),
//             });
//           }, 3000);
//         });
  
//          console.log(added_updated_event);
        
//         scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
//         scheduler.close();
//       } finally {
//         scheduler.loading(false);
//       }
//     };

//     // const handleSubmitP = async () => {
//     //     setIsLoading(true);
  
//     //     await toast.promise(
//     //         httpForToastRequest({
//     //             path: "store-portfolio",
//     //             method: 'POST',
//     //             data: data
//     //         }),
//     //         {
//     //             loading: 'Loading...',
//     //             success: (res) => {
//     //                 console.log(res.message);
//     //                 if (res.status == 200) {
//     //                     setShowModalPortfolio(false)
//     //                     return <b>{JSON.stringify(res['message'])}</b>
//     //                 }
//     //                 setIsLoading(false);
//     //             },
//     //             error: (err) => {
//     //                 setIsLoading(false);
//     //                 if (err instanceof AxiosError) {
//     //                     if (err.response.status == 500) {
//     //                         return <b>{"Server Error Please Wait while a moment"}</b>
//     //                     } if (err.response.status == 400) {
//     //                         return <b>{JSON.stringify(err.response.data['message'])}</b>
//     //                     }
//     //                 }
//     //             }
//     //         }
//     //     );
//     // };


//     return (
//         <ScheduleContext.Provider
//             value={{
//                 event,
//                 state,
//                 handleChange,
//                 handleSubmit,
//                 scheduler
//             }}
//         >
//             {children}
//         </ScheduleContext.Provider>
//     );
// };
// export const useScheduleContext = () => useContext(ScheduleContext);



