import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "~/components/Buttons/Button/Button";
import Input from "~/components/Inputs/Input/Input";
import Authtemplate from "~/templates/AuthTemplate/Authtemplate";
import "./Login.css";


const Login = () => {
  const navigate = useNavigate()
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

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
        const token = response.data.guest_session_id
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
      <Input
        name="email"
        placeholder="Email"
        onChange={handleChangeEmail}
        value={Email}
      />
        <Input
        name="password"
        placeholder="contraseña"
        onChange={handleChangeEmail}
        value={Password}
      />
      <Button
        onClick={handleToken}
        label="Iniciar"
        disable={Email === ""}
      />
      </div>
      

    </Authtemplate>
  );
};

Login.displayName = "Login";

export default Login;
