import type { NextPage } from "next";
import Image from "next/image";
import demo from "../assets/demo.gif";
import fire from "../assets/Fire.gif";
import logo from "../assets/kaijukingz_logo.webp";
import coffee from "../assets/coffee.png";
import haruxe from "../assets/haruxe.gif";

const Home: NextPage = () => {
  return (
    <div className="bg-black">
      <div className="max-w-[1300px] mx-auto">
        <div className="w-full flex place-content-center">
          <div className="h-[80px] p-5 text-white text-lg flex align-middle font-kingz bg-black place-content-start fixed top-0 lg:w-[1300px] w-full z-10">
            <Image src={logo} width="150px" />
            <div className=" flex flex-row">
              <h1 className="my-auto ml-10 mr-5">Created by:</h1>
              <Image
                src={haruxe}
                className="rounded-full "
                width="40px"
                height="40px"
              />
              <h1 className="my-auto mx-2"> + </h1>
              <Image
                src={coffee}
                className="rounded-full"
                width="40px"
                height="40px"
              />
            </div>
          </div>
        </div>
        <div className="h-screen p-5 mt-[80px] text-white text-xl font-kingz space-y-5 mx-auto place-content-center">
          <h1 className="mx-auto text-center text-2xl">dna burnt: 235</h1>
          <ul className="space-y-5 flex flex-col">
            <li className="bg-[#92929228] flex space-x-3 p-4 mx-auto rounded-sm">
              <div className="relative">
                <div className="w-[80px] h-[80px]">
                  <div>
                    <Image src={demo} className="rounded-sm" />
                  </div>
                  <div className="absolute top-0 opacity-50">
                    <Image src={fire} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 place-content-center">
                <h1 className="">Burnt 1 Day ago</h1>
                <p>by haruxe.eth</p>
              </div>
            </li>
            <li className="bg-[#92929228] flex space-x-3 p-4 mx-auto rounded-sm">
              <div className="relative">
                <div className="w-[80px] h-[80px]">
                  <div>
                    <Image src={demo} className="rounded-sm" />
                  </div>
                  <div className="absolute top-0 opacity-50">
                    <Image src={fire} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 place-content-center">
                <h1 className="">Burnt 1 Day ago</h1>
                <p>by haruxe.eth</p>
              </div>
            </li>
            <li className="bg-[#92929228] flex space-x-3 p-4 mx-auto rounded-sm">
              <div className="relative">
                <div className="w-[80px] h-[80px]">
                  <div>
                    <Image src={demo} className="rounded-sm" />
                  </div>
                  <div className="absolute top-0 opacity-50">
                    <Image src={fire} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 place-content-center">
                <h1 className="">Burnt 1 Day ago</h1>
                <p>by haruxe.eth</p>
              </div>
            </li>
            <li className="bg-[#92929228] flex space-x-3 p-4 mx-auto">
              <div className="relative">
                <div className="w-[80px] h-[80px]">
                  <div>
                    <Image src={demo} className="rounded-sm" />
                  </div>
                  <div className="absolute top-0 opacity-50">
                    <Image src={fire} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 place-content-center">
                <h1 className="">Burnt 1 Day ago</h1>
                <p>by haruxe.eth</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
