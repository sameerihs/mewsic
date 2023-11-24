import { useState } from "react";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";
import mewsic_logo from "../assets/images/mewsic_logo.svg";
import ParticlesBg from "particles-bg";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);

    if (response && !response.error) {
      // console.log(response._id);
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });

      navigate("/home");
    } else {
      alert("Failure");
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-4/12 items-center bg-black opacity-80 p-4 rounded-xl">
          <div className="pt-12 flex justify-center items-center">
            <img src={mewsic_logo} alt="mewsic logo" width={125} />
          </div>
          <div className="py-10 flex items-center justify-center flex-col">
            {/*  I will have my 2 inputs(email and password) and I will have my sign up instead button*/}
            <div className="font-bold mb-4 text-white">
              To continue, log in to Mewsic.
            </div>
            <TextInput
              label="Email address"
              placeholder="Email address"
              className="my-6"
              value={email}
              setValue={setEmail}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              value={password}
              setValue={setPassword}
            />
            <div className=" w-full flex items-center justify-center my-8">
              <button
                className="bg-indigo-300 hover:bg-indigo-500 hover:text-gray-900 font-semibold p-3 px-10 rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                LOG IN
              </button>
            </div>
            <div className="w-full border border-solid border-gray-300 text-white"></div>
            <div className="my-6 font-semibold text-lg text-white">
              Don't have an account?
            </div>
            <div className="border border-gray-500 text-white hover:bg-indigo-400 hover:text-white w-full flex items-center justify-center py-4 rounded-full font-bold">
              <Link to="/signup">SIGN UP FOR MEWSIC</Link>
            </div>
          </div>
        </div>
      </div>
      <ParticlesBg type="cobweb" bg={true} />
    </>
  );
};

export default LoginComponent;
