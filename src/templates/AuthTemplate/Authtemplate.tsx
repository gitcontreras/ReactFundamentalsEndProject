import React from "react";
import "./Authtemplate.css";
import DaCodesHeader from "../../assets/images/DacodesLogoHeader.png";
import BestPlaceToCodeLogo from "../../assets/images/BestPlaceToCode-logo.png";
import LogoGPTW from "../../assets/images/LogoGPTW.png";
import Vector from "../../assets/images/Vector.png";
import aws from "../../assets/images/aws.png";
import userIcon from "../../assets/images/user.png";

interface AuthTemplateI {
  children: React.ReactNode;
  title?:string
}

const Authtemplate = ({ children }: AuthTemplateI) => {
  return (
    <div className="auth-template">
      <div className="navbar">
      <img src={DaCodesHeader} alt="DaCodes" className="imgHeader"/>
      <img src={userIcon} alt="DaCodes" className="imgHeaderLogin"/>
      </div>
      <div className="body">
        {children}
      </div>
      <div className="footer-container">
        <h1 className="footer">We are coding the world of tomorrow</h1>
        <p className="footer-description">
          DaCodes es una de las mejores empresas de desarrollo de software en México y LATAM. Lo que nos separa de los 
          demás es el nivel de involucramiento que tenemos en nuestros proyectos y la pasión que tenemos por desarrollar 
          productos digitales de calidad mundial. Somos un equipo de 220+ dacoders especializados en la planeación, diseño, 
          desarrollo, implementación e innovación continua de productos digitales disruptivos.
        </p>
        <img src={BestPlaceToCodeLogo} alt="DaCodes" className="footer-image-first"/>
        <img src={LogoGPTW} alt="DaCodes" className="footer-image" />
        <img src={Vector} alt="DaCodes" className="footer-image"/>
        <img src={aws} alt="DaCodes" className="footer-image"/>
      </div>
    </div>
  );
};

Authtemplate.dislayName = "Authtemplate";
export default Authtemplate;
