
import React, { createContext, useContext, useState } from 'react';



const CategoriesContext = createContext();
export const CategoriesProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [subCategories, setSubCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);


    // useEffect(() => {
    //     fetchSubCategories();
    //     fetchData();
    // }, [])

    // const fetchData = async () => {
    //     await httpRequest(
    //         {
    //             path: 'fetch-all-categories',
    //             method: "Get",
    //             onSuccess: (res) => {
    //             console.log('res',res);
    //             setData(res.categories);
    //             },
    //             onError: (error) => {
    //                 console.log(error);
    //             }
    //         }
    //     );
    // };




// const fetchSubCategories = async (subCaturl) => {
//     await httpRequest(
//       {
//         path: subCaturl,
//         method: "Get",
//         onSuccess: (res) => {
//           setSubCategoryData(res.subCategories);
//         },
//         onError: (error) => {
//           console.log(error);
//         }
//       }
//     );
//   };
//  const handleCategoryChange = async (event) => {
//     const selectedCategoryId = event.target.value;
//     await fetchSubCategories(`fetch-sub-categories/${selectedCategoryId}`)

//     setSelectedCategory(selectedCategoryId);

//     // setItemData((prevItemData) => ({
//     //   ...prevItemData,
//     //   building_id: selectedCategoryId,
//     // }));


//   };

return (
    <CategoriesContext.Provider
        value={{
            data,
            // handleCategoryChange,
            selectedCategory,
            subCategories
        }}
    >
        {children}
    </CategoriesContext.Provider>
);
};
export const useCategoriesContext = () => useContext(CategoriesContext);



