import React, {
  createContext,
  useContext,
  useState
} from "react";

const SkillsContext = createContext();
export const SkillsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [isLoadsing, setIsLoading] = useState(false);
  const [progresss, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPreLoading, setIsPreLoading] = useState(false);

  // const options = authUser.skills.map(skill => ({
  //     value: skill.id,
  //     label: skill.name
  // }));

  return (
    <SkillsContext.Provider
      value={{
        skillsData,
        loading,
        // options
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};
export const useSkillsContext = () => useContext(SkillsContext);
