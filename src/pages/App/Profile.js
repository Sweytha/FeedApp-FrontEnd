import React, { useEffect, useState, useContext } from "react";
//UpdateBasicProfile component
import UpdateBasicProfile from "../../components/UpdateBasicProfile";
//UpdatePublicProfile component 
import UpdatePublicProfile from "../../components/UpdatePublicProfile";

//import AppContext object
import { AppContext } from "../../context/applicationContext";
//import LoadingIndicator component
import LoadingIndicator from "../../components/LoadingIndicator";

//seesionApi from ApiUtil.js
import { sessionApi } from "../../util/ApiUtil";

const Profile = () => {

  //the child component make use of AppContext object using useContext hook
  const appContext = useContext(AppContext);
  //get the token from the cookies by using getSession method from AppContext
  const token = appContext.getSession();
  //state variable which initialize the userData to be undefined 
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    document.title = "Profile | Feed App";
    loadProfile();
  }, []);

  const loadProfile = async () => {
    //calls this API from the backend http://localhost:8080/user/get and pass token to header 
    const apiResponse = await sessionApi(token);

    if (apiResponse.status === 1) {
      //get the user data from the API and stores it inside userData by using setter setUserData
      setUserData(apiResponse.payLoad);
    }
  };

  //if the user Data is not loaded, display loading indicator component 
  if (!userData) {
    return <LoadingIndicator />;
  }

  //access the profile details from the userData and stored it inside publicProfile
  const publicProfile = userData.profile ? userData.profile : undefined;



  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 md:mx-12 w-2xl container px-2 mx-auto">
      <div>
        {/* {#UpdateBasicProfile Component} */}
        <UpdateBasicProfile
          password={userData.password}
          emailId={userData.emailId}
          firstName={userData.firstName}
          lastName={userData.lastName}
          phone={userData.phone}
        />

      </div>
      <div>
        {/* {#UpdatePublicProfile Component} */}

        <UpdatePublicProfile
          bio={publicProfile && publicProfile.bio}
          city={publicProfile && publicProfile.city}
          country={publicProfile && publicProfile.country}
          headline={publicProfile && publicProfile.headline}
          picture={publicProfile && publicProfile.picture}
        />

      </div>
    </main>
  )
}

export default Profile
