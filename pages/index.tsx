import type { NextPage } from "next";
import Image from "next/image";
import fire from "../public/fire.gif";
import logo from "../public/kaijukingz_logo.webp";
import coffee from "../public/coffee.png";
import haruxe from "../public/haruxe.gif";
import { useEffect, useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  Dna,
} from "styled-icons/boxicons-regular";
import { LocalFireDepartment } from "styled-icons/material";

const Home: NextPage = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [burnt, setBurnt] = useState(0);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [displayed, setDisplayed] = useState<any[]>([]);
  const [toggleMode, setToggleMode] = useState(0);

  useEffect(() => {
    getInfo();
  }, [toggleMode]);

  useEffect(() => {
    setDisplayed(logs.slice(page * 7, page * 7 + 7));
  }, [page]);

  async function getInfo() {
    let result;
    if (toggleMode == 0) {
      //toggle epic rarities to display
      result = await fetch("https://dna.0day.love/graphql", {
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
                type
                timestamp
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
      setLogs(result.data.get_epic_burned);
      setPages(Math.ceil(result.data.get_epic_burned.length / 7));
      setDisplayed(result.data.get_epic_burned.slice(page * 7, page * 7 + 7));
      setBurnt(result.data.get_epic_burned.length);
      setPage(0);
    } else {
      //toggle other rarities to display
      result = await fetch("https://dna.0day.love/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query getOtherBurned($sort_by: String, $address: String){
              get_other_burned(input:{sort_by:$sort_by, address:$address}){
                id
                address
                amount
                type
                timestamp
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
      console.log(result);
      setLogs(result.data.get_other_burned);
      setPages(Math.ceil(result.data.get_other_burned.length / 7));
      setDisplayed(result.data.get_other_burned.slice(page * 7, page * 7 + 7));
      setPage(0);
      setBurnt(result.data.get_other_burned.length);
    }
  }

  return (
    <div
      className="bg-black h-[1300px]"
      style={{
        backgroundImage: `url(
          "https://kaijukingz.io/static/media/Bottom%20Floor.f24a049c.gif"
        )`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 100em #000000",
        backgroundPositionY: "80px",
      }}
    >
      <div className="mx-auto">
        <div className="flex place-content-center h-[80px] bg-black">
          <div className="p-4 text-white text-lg flex align-middle font-kingz place-content-start fixed top-0 w-screen z-10 bg-black ">
            <Image src={logo} height="50px" width="200px" alt="kaijuKingz" />
          </div>
        </div>
        <div className="p-5 text-white text-lg font-kingz space-y-5 mx-auto place-content-center mb-[80px]">
          <div className="mx-auto text-center text-2xl place-content-center flex flex-row ">
            <div className="bg-[#000000b0] flex flex-row px-3 py-1 align-middle place-content-center">
              <LocalFireDepartment className="w-5 mr-2" />{" "}
              <h1>dna burnt: {burnt ? burnt : "-"}</h1>
            </div>
          </div>
          <div className="mx-auto text-center text-2xl place-content-center flex flex-row ">
            <div className="bg-[#000000b0] flex flex-row px-3 py-1 align-middle place-content-center">
              <h1>The kaijuz are hungry for more...</h1>
            </div>
          </div>
          <div className="mx-auto text-center text-2xl place-content-center flex flex-row ">
            <div className="bg-[#000000b0] flex flex-row px-3 py-1 align-middle place-content-center space-x-5">
              <button
                className={toggleMode == 0 ? "text-red-600" : "text-white"}
                onClick={() => setToggleMode(0)}
              >
                epic
              </button>
              <button
                className={toggleMode == 1 ? "text-red-600" : "text-white"}
                onClick={() => setToggleMode(1)}
              >
                others
              </button>
            </div>
          </div>
          <ul className="space-y-5 flex flex-col">
            {displayed &&
              displayed.map((e, index) => {
                let imgLocation = "/dna/" + e.rarity + e.type + ".gif";
                return (
                  <li
                    className="bg-[#000000b0]  flex space-x-3 p-4 mx-auto rounded-sm"
                    key={index}
                  >
                    <div className="relative">
                      <div className="w-[80px] h-[80px] relative">
                        <div>
                          <Image
                            src={imgLocation}
                            className="rounded-sm"
                            alt="dna"
                            layout="fill"
                          />
                        </div>
                        <div className="absolute top-0 opacity-20">
                          <Image
                            src={fire}
                            alt="fire"
                            width="100px"
                            height="100px"
                            className="rounded-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 place-content-center">
                      <h1 className="">Burnt 1 Day ago</h1>
                      <p>
                        by{" "}
                        <a href={"https://etherscan.io/address/" + e?.address}>
                          {e?.address.length < 14
                            ? e?.address
                            : e?.address.slice(0, 5) +
                              "..." +
                              e?.address.slice(
                                e.address.length - 4,
                                e.address.length
                              )}
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
                  Page {page + 1} of {pages}
                </h1>
                <ChevronsRight
                  className="w-10 cursor-pointer"
                  onClick={() => {
                    if (page != pages - 1) setPage(page + 1);
                  }}
                />
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className="place-content-center flex">
        <div className=" flex flex-row text-white font-kingz w-screen bg-black fixed bottom-0 p-2 ">
          <h1 className="my-auto ml-10 mr-5">Created by</h1>
          <a
            href="https://twitter.com/haruxeETH"
            target={"_blank"}
            rel="noreferrer"
          >
            <Image
              src={haruxe}
              className="rounded-full "
              width="40px"
              height="40px"
              alt="haruxe"
            />
          </a>
          <h1 className="my-auto mx-2"> + </h1>
          <a
            href="https://twitter.com/erc1337_Coffee"
            target={"_blank"}
            rel="noreferrer"
          >
            <Image
              src={coffee}
              className="rounded-full"
              width="40px"
              height="40px"
              alt="coffee"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
