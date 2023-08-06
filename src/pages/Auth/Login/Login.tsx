import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "~/components/Buttons/Button/Button";
import Input from "~/components/Inputs/Input/Input";
import Authtemplate from "~/templates/AuthTemplate/Authtemplate";
import "./Login.css";


const Login = () => {
  const navigate = useNavigate()
  const [Email, setEmail] = useState("");
  const [EmailStatus, setEmailStatus] = useState(false);
  const [PasswordStatus, setPasswordStatus] = useState(false);
  const [Password, setPassword] = useState("");
  const [Agree, setAgree] = useState(false);
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(validateEmail(e.target.value))
    {
      setEmailStatus(true);
    }else
    {
      setEmailStatus(false);
    }
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(validatePassword(e.target.value))
    {
      setPasswordStatus(true)
    }else
    {
      setPasswordStatus(false)
    }
    setPassword(e.target.value);
  };

  const handleChangeAgree = () => {
    setAgree(!Agree);
  };

  const validateEmail = (values:string) => {

    if (values=="") {
      return false
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
      return false
    }
  
    return true
  }

  const validatePassword = (values:string) => {

    if (values.length>=7) {
      return true
    } 
  
    return false
  }

  useEffect(() => {
    console.log(Agree);
  }, [Agree]);

  const handleToken = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/authentication/guest_session/new",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTExY2U2ZTBjNGUxZjQ4M2E3NDIxMDNjMDJmYjZmOSIsInN1YiI6IjY0MTM3ZDEyYTZjMTA0MDA3OTA3MTM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IhXW1F90EvMAP_AMkFrEfMJdyuswuVnBY6_KlyVMkO0",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        //const token = response.data.guest_session_id
        sessionStorage.setItem("token", response.data.guest_session_id);
        setTimeout(() => {
          navigate('/dashboard',
          // {state: {
          //   token,
          //   username:Email,
          //   expires_at:response.data.expires_at
          // }}
          )
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Authtemplate>
      <div className="login-container">
      <h1>Login</h1>
      <h5>Bienvenido</h5>
      <Input className="text"
        name="correo electronico de DaCodes"
        placeholder="Email"
        onChange={handleChangeEmail}
        value={Email}
        type="text"
      />
      <label style={{ display: !EmailStatus ? "block" : "none" }}>*Introduce un email valido</label>
       <br />
       <br />
        <Input
        className="text"
        name="contraseña"
        placeholder="contraseña"
        value={Password}
        onChange={handleChangePassword}
        type="password"
      />
       <label style={{ display: !PasswordStatus ? "block" : "none" }}>*Contraseña minimo 7 caracteres</label>

<br />
<br />
       <input type="checkbox" onChange={handleChangeAgree} name="agree" value="agree"></input>
       <label htmlFor="agree" className="myAgreement"> He leido y acepto los terminos y condiciones</label>
       <br />
       <br />
      <Button
        onClick={handleToken}
        label="Crear cuenta"
        disable={EmailStatus == false || PasswordStatus==false || Agree==false}
      />
      
      </div>
      

    </Authtemplate>
  );
};

Login.displayName = "Login";

export default Login;
