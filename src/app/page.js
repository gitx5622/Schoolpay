"use client";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../../public/equity.svg";
import Microsoft from "../../public/microsoft.svg";

export default function Home() {
  const router = useRouter();
  return (
    <div className={`flex`}>
      <div className="grow-[8]">
        <div className="bg-[#871914] h-screen text-white pt-24 px-7">
          <Image src={Logo} width={120} height={120} alt="Logo" />
          <div className="text-6xl font-semibold pt-10">
            Welcome to <br />
            Schoolpay
          </div>
          <br />
          <div className="text-2xl">More than just banking</div>
        </div>
      </div>
      <div className="grow-0">
        <div className="pt-9 px-5">
          <h1 className="font-semibold">Hello there,</h1>
          <h5>Sign in to continue</h5>
          <div className="mb-3">
            <Button
              variant="bordered"
              fullWidth={true}
              className="mt-3 font-bold"
            >
              Sign in with{" "}
              <span>
                <Image src={Microsoft} width={20} height={20} alt="Microsoft" />
              </span>
            </Button>
          </div>
          <h2 className="font-bold text-center">Or</h2>
          <h2 className="font-bold text-xl pt-3">Sign in</h2>
          Sign in to continue. Remember, your password is yours, do not share it
          with anyone.
          <div className="pt-6">
            If this is your first time here, you can{" "}
            <span className="text-[#871914]">register</span> using the register
            button below
          </div>
          <div className="pt-9">
            <h3>Email address or Phonenumber</h3>
            <div className="md:flex-nowrap gap-4">
              <Input type="email" label="Email" variant="bordered" />
            </div>
            <div className="pt-5">
              <h3>Enter Password</h3>
              <Input placeholder="Enter Password" variant="bordered" />
            </div>
            <div className="text-[#C1400A] pt-3">
              <a href="/forgot">Forgot your password?</a>
            </div>
            <div className="flex gap-5 flex-col pt-5">
              <Button
                color="danger"
                fullWidth={true}
                className="bg-[#871914] text-white"
                onClick={() => router.push("/home/dashboard")}
              >
                Sign In User
              </Button>
              <Button
                color="danger"
                fullWidth={true}
                className="bg-[#871914] text-white"
                // startContent={<UserIcon />}
              >
                Register User
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
