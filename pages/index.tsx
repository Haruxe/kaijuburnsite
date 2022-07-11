import type { NextPage } from "next";
import Image from "next/image";
import demo from "../assets/demo.gif";
import fire from "../assets/Fire.gif";
import logo from "../assets/kaijukingz_logo.webp";
import coffee from "../assets/coffee.png";
import haruxe from "../assets/haruxe.gif";
import { useEffect, useState } from "react";
import { FireAlt } from "styled-icons/fa-solid";
import { ChevronsLeft, ChevronsRight } from "styled-icons/boxicons-regular";
import trainImage from "../assets/scientists.png";
import { url } from "inspector";

const Home: NextPage = () => {
  const [logs, setLogs] = useState([]);
  const [burnt, setBurnt] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    getInfo(page * 7);
  }, [page]);

  async function getInfo(startIndex) {
    const epicResult = await fetch("https://dna.0day.love/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
      query getEpicBurned($sort_by: String, $address: String){
        get_epic_burned(input:{sort_by:$sort_by, address:$address}){
          id
          address
          amount
          rarity
        }
      }
      `,
        variables: {
          // LET THE USER CHANGE THIS TO 'ASC' or 'DESC' TO SORT RESULTS
          sort_by: "DESC",
          // LET THE USER INPUTS AN ADDRESS AND ENTER IT HERE TO FILTER RESULTS ON AN ADDRESS
          address: "",
        },
      }),
    }).then((res) => res.json());

    setLogs(epicResult.data.get_epic_burned.slice(startIndex, startIndex + 7));
    setBurnt(epicResult.data.get_epic_burned.length);
  }

  return (
    <div
      className="bg-black h-screen"
      style={{
        backgroundImage: `url(
          "https://kaijukingz.io/static/media/Bottom%20Floor.f24a049c.gif"
        )`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 100em #000000",
        backgroundColor: "#000000",
      }}
    >
      <div className="max-w-[1300px] mx-auto">
        <div className="w-full flex place-content-center">
          <div className="h-[80px] p-5 text-white text-lg flex align-middle font-kingz place-content-start fixed top-0 xl:w-[1300px] w-full z-10">
            <Image src={logo} width="150px" />
          </div>
        </div>
        <div className="p-5 mt-[80px] text-white text-xl font-kingz space-y-5 mx-auto place-content-center">
          <div className="mx-auto text-center text-2xl place-content-center flex flex-row">
            <FireAlt className="w-4 mr-2" />{" "}
            <h1 className="text-3xl">dna burnt: {burnt ? burnt : "-"}</h1>
          </div>
          <ul className="space-y-5 flex flex-col">
            {logs &&
              logs.map((e) => {
                return (
                  <li className="bg-[#000000b0]  flex space-x-3 p-4 mx-auto rounded-sm">
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
                      <p>
                        by{" "}
                        <a href={"https://etherscan.io/address/" + e.address}>
                          {e.address}
                        </a>
                      </p>
                    </div>
                  </li>
                );
              })}
            {logs && (
              <div className="mx-auto space-x-10 flex align-middle">
                <ChevronsLeft
                  className="w-10 cursor-pointer"
                  onClick={() => {
                    if (page != 0) setPage(page - 1);
                  }}
                />
                <h1 className="my-auto">
                  Page {page + 1} of {Math.ceil(burnt / 7)}
                </h1>
                <ChevronsRight
                  className="w-10 cursor-pointer"
                  onClick={() => {
                    if (page != Math.ceil(burnt / 7) - 1) setPage(page + 1);
                  }}
                />
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className="place-content-center flex">
        <div className=" flex flex-row text-white font-kingz xl:w-[1300px] w-full fixed bottom-0 px-5">
          <h1 className="my-auto ml-10 mr-5">Created by:</h1>
          <a href="https://twitter.com/haruxeETH" target={"_blank"}>
            <Image
              src={haruxe}
              className="rounded-full "
              width="40px"
              height="40px"
            />
          </a>
          <h1 className="my-auto mx-2"> + </h1>
          <a href="https://twitter.com/erc1337_Coffee" target={"_blank"}>
            <Image
              src={coffee}
              className="rounded-full"
              width="40px"
              height="40px"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
