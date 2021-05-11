import React from "react";
import TermsAndConditions from "../components/welcomePage/TermsAndConditions";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const WelcomePage = () => {

      return (
            <div className="WelcomePageContainer container-fluid  ">
                  <TermsAndConditions />
            </div>
      );
};

export default WelcomePage;
