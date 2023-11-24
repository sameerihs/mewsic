import { useState } from "react";
import { useCookies } from "react-cookie";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import mewsic_logo from "../assets/images/mewsic_logo.svg";
import ParticlesBg from "particles-bg";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
    if (email !== confirmEmail) {
      alert("Email and confirm email fields must match. Please check again");
      return;
    }
    const data = { email, password, username, firstName, lastName };
    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/register",
      data
    );
    if (response && !response.error) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/home");
    } else {
      alert("Failure");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden">
      <div className="w-4/12 items-center bg-black opacity-80 rounded-xl flex flex-col p-4 my-4">
        <div className="logoDiv p-6 ">
          <img src={mewsic_logo} alt="mewsic logo" width={125} />
        </div>
        <div className="w-full inputRegion flex items-center justify-center flex-col p-2">
          {/*  I will have my 2 inputs(email and password) and I will have my sign up instead button*/}
          <div className="font-bold mb-4 text-2xl text-white">
            Sign up for free to start listening.
          </div>
          <TextInput
            label="Email address"
            placeholder="Enter your email"
            className="my-6"
            value={email}
            setValue={setEmail}
          />
          <TextInput
            label="Confirm Email Address"
            placeholder="Enter your email again"
            className="mb-6"
            value={confirmEmail}
            setValue={setConfirmEmail}
          />
          <TextInput
            label="Username"
            placeholder="Enter your username"
            className="mb-6"
            value={username}
            setValue={setUsername}
          />
          <PasswordInput
            label="Create Password"
            placeholder="Enter a strong password here"
            value={password}
            setValue={setPassword}
          />
          <div className="w-full flex flex-wrap items-center justify-between ">
            <div>
              <TextInput
                label="First Name"
                placeholder="First Name"
                className="my-6"
                value={firstName}
                setValue={setFirstName}
              />
            </div>
            <div>
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                className="my-6"
                value={lastName}
                setValue={setLastName}
              />
            </div>
          </div>
          <div className=" w-full flex items-center justify-center     my-8">
            <button
              className="bg-indigo-300 hover:bg-indigo-500 hover:text-gray-900 font-semibold p-3 px-10 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                signUp();
              }}
            >
              Sign Up
            </button>
          </div>
          <div className="w-full border border-solid border-gray-300"></div>
          <div className="my-6 font-semibold text-lg text-white">
            Already have an account?
          </div>
          <div className="border border-gray-500 text-gray-500  hover:bg-indigo-400 hover:text-white w-full flex items-center justify-center py-4 rounded-full font-bold">
            <Link to="/login">LOG IN INSTEAD</Link>
          </div>
        </div>
      </div>
      <ParticlesBg type="cobweb" bg={true} />
    </div>
  );
};

export default SignupComponent;
