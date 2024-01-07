"use client";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "/public/equity.svg";
import Microsoft from "/public/microsoft.svg";
import axios from "axios";

function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [registerUser, setRegisterUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
  };

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", registerUser);
      console.log(response)
      setLoading(false);
      router.push("/auth/login");
    } catch (error) {
      console.log("Signup failed", error.message);
    }
  };
  return (
    <div className={`flex`}>
      <div className="grow-[8]">
        <div className="bg-[#871914] h-screen text-white pt-10 px-7">
          <Image src={Logo} width={120} height={120} alt="Logo" />
          <div className="text-6xl font-semibold pt-10">
            Welcome to <br />
            School Pay
          </div>
          <br />
          <div className="text-2xl">More than just banking</div>
        </div>
      </div>
      <div className="grow-[5]">
        <div className="pt-9 px-5">
          <h1 className="font-semibold">Hello there,</h1>
          <h5>Sign Up to continue</h5>
          <div className="mb-3">
            <Button
              variant="bordered"
              fullWidth={true}
              className="mt-3 font-bold"
            >
              Sign Up with{" "}
              <span>
                <Image src={Microsoft} width={20} height={20} alt="Microsoft" />
              </span>
            </Button>
          </div>
          <h2 className="font-bold text-center">Or</h2>
          <h2 className="font-bold text-xl pt-3 pb-2">
            Sign Up with Email and Password
          </h2>
          <div className="pt-9">
            <h3 className="pb-3">Username</h3>
            <div className="md:flex-nowrap gap-4">
              <Input
                type="text"
                name="username"
                label="Username"
                variant="bordered"
                onChange={handleChange}
                value={registerUser.username}
              />
            </div>
            <h3 className="pb-3">Email address or Phonenumber</h3>
            <div className="md:flex-nowrap gap-4">
              <Input
                type="email"
                name="email"
                label="Email"
                variant="bordered"
                onChange={handleChange}
                value={registerUser.email}
              />
            </div>
            <div className="pt-5 pb-3">
              <h3 className="pb-3">Enter Password</h3>
              <Input
                type="password"
                name="password"
                placeholder="Enter Password"
                variant="bordered"
                onChange={handleChange}
                value={registerUser.password}
              />
            </div>
            <div className="text-[#C1400A] pt-3">
              <a href="/forgot">Forgot your password?</a>
            </div>
            <div className="flex gap-5 flex-col pt-8">
              <Button
                color="danger"
                fullWidth={true}
                className="bg-[#871914] text-white mb-6"
                onPress={onSignup}
                isLoading={loading}
              >
                Sign Up User
              </Button>
              <Button
                color="danger"
                fullWidth={true}
                className="bg-[#871914] text-white"
                onPress={() => router.push("/auth/login")}
              >
                Login User
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
