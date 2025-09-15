"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Settings,
  Paperclip,
  User,
  Link,
  SquareArrowOutUpRight,
  MessageCircle,
  TextAlignJustify,
  Check,
} from "lucide-react";
import { createDelay, tabsData } from "./data";
import { contents } from "./data";
import Image from "next/image";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: clears the timeout if value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchBar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [filteredResults, setFilteredResults] = useState(contents);
  const [counts, setCounts] = useState({
    all: 0,
    files: 0,
    people: 0,
    chats: 0,
  });
  const [tabs, setTabs] = useState(tabsData);
  const debouncedSearchTerm = useDebounce(searchText, 500); // 500ms delay
  const [loading, setLoading] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);

  const setData = async () => {
    setLoading(true);
    await createDelay(1000);
    setLoading(false);
    setFilteredResults(
      contents.filter((content) =>
        content.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (linkClicked) {
      setTimeout(() => setLinkClicked(false), 600);
    }
  }, [linkClicked]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      setData();
    } else {
      setFilteredResults([]);
      setOpen(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (filteredResults.length === 0) {
      setCounts({
        all: 0,
        files: 0,
        people: 0,
        chats: 0,
      });
    } else {
      setCounts({
        all: filteredResults.length,
        files: filteredResults.filter((content) => content.type == "file")
          .length,
        people: filteredResults.filter((content) => content.type == "people")
          .length,
        chats: 0,
      });
    }
  }, [filteredResults]);

  const getIconComponent = (icon: string, size: number = 16) => {
    switch (icon) {
      case "paperclip":
        return <Paperclip size={size} />;
      case "list":
        return <TextAlignJustify size={size} />;
      case "chat":
        return <MessageCircle size={size} />;
      case "user":
        return <User size={size} />;
      default:
        return null;
    }
  };

  const updateTabs = (tab: string, checked: boolean) => {
    const tempTabs = [...tabs];
    tempTabs.forEach((t) => {
      if (t.title.toLowerCase() === tab) {
        t.show = checked;
      }
    });
    setTabs([...tempTabs]);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#e4e4e4] text-[#aaaaaa]">
      <div
        className={`min-w-[500px] py-5 rounded-2xl shadow-md bg-white flex flex-col transition-all ease-in-out overflow-hidden duration-700 ${
          debouncedSearchTerm.length ? "h-[550px]" : "h-[70px]"
        }`}
      >
        {/* Search box and clear button */}
        <div className="w-full flex justify-between px-5 items-cente">
          <div className="flex items-center h-full w-[75%]">
            {loading ? (
              <div
                className="inline-block size-5 animate-spin rounded-full border-3 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            ) : (
              <Search />
            )}

            <input
              type="text"
              className="outline-none mx-2 text-xl text-black placeholder:text-[#aaaaaa] w-full"
              placeholder="Searching is easier"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="w-[25%] text-end">
            {debouncedSearchTerm.length ? (
              <span
                className="text-[12px] cursor-pointer text-black underline"
                onClick={() => {
                  setSearchText("");
                  setSelectedTab(0);
                }}
              >
                Clear
              </span>
            ) : (
              <>
                <span className="text-[12px] text-[#8b8b8b] border border-gray-300 p-1.5 rounded-md mr-1.5 mt-1.5 relative overflow-hidden">
                  s
                  <span className="text-[12px] border border-gray-300 p-1.5 rounded-md  absolute top-[px] -left-[1px] text-transparent">
                    s
                  </span>
                </span>
                <span className="text-[12px] text-[#8b8b8b]">quick access</span>
              </>
            )}
          </div>
        </div>
        {/* Content */}
        <div
          className={`transition-all ease-in-out ${
            loading ? "overflow-hidden" : "overflow-scroll"
          } duration-500 flex flex-col justify-start ${
            debouncedSearchTerm.length ? "opacity-100" : "opacity-0"
          }`}

          //className={`flex flex-col justify-start`}
        >
          {/* Tabs */}
          <div className="border-b-2 border-[#f4f4f4] w-full flex justify-between items-center mt-5">
            <div className="px-5 flex gap-3 text-[14px]">
              {tabs
                .filter((tab) => tab.show === true)
                .map((tab, index) => (
                  <div
                    key={tab.id}
                    className={`${
                      selectedTab === index
                        ? " font-medium text-black relative after:absolute after:-bottom-[1.5px] after:left-0 after:w-full after:h-[2px] after:bg-black"
                        : ""
                    } cursor-pointer flex gap-1 items-center py-1.5 px-2`}
                    onClick={() => setSelectedTab(index)}
                  >
                    <div>
                      {tab.icon && tab.icon.length
                        ? getIconComponent(tab.icon.toLowerCase())
                        : null}
                    </div>
                    <div>{tab.title}</div>

                    <div>
                      <span className="inline-flex items-center rounded-md bg-pink-400/10 py-0.5 px-2 text-xs font-medium text-pink-400">
                        {index === 0
                          ? counts.all
                          : index === 1
                          ? counts.files
                          : index === 2
                          ? counts.people
                          : "0"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div
              className={`px-5 cursor-pointer relative `}
              onClick={() => setOpen((prev) => !prev)}
            >
              <Settings
                size={20}
                className={`transition-all duration-300  ${
                  isOpen ? "rotate-90" : "rotate-0"
                }`}
              />

              {isOpen ? (
                <div
                  className="absolute right-3 w-[200px] mt-1 bg-white shadow-2xl rounded-xl border border-gray-200 py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {["Files", "People", "Chats", "Lists"].map((item, idx) => (
                    <div key={idx} className="flex justify-between px-4 py-2">
                      <div
                        className={`flex items-center gap-1 ${
                          tabs.find(
                            (tab) =>
                              tab.title.toLowerCase() === item.toLowerCase()
                          )?.show
                            ? "text-black"
                            : ""
                        }`}
                      >
                        <div>
                          {tabs.find(
                            (tab) =>
                              tab.title.toLowerCase() === item.toLowerCase()
                          )?.icon.length
                            ? getIconComponent(
                                tabs
                                  .find(
                                    (tab) =>
                                      tab.title.toLowerCase() ===
                                      item.toLowerCase()
                                  )
                                  ?.icon.toLowerCase() as string
                              )
                            : null}
                        </div>
                        <div>{item}</div>
                      </div>
                      <div>
                        <div className="relative group">
                          <input
                            type="checkbox"
                            className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md z-10 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              updateTabs(item.toLowerCase(), e.target.checked);
                            }}
                            checked={
                              tabs.find(
                                (tab) =>
                                  tab.title.toLowerCase() === item.toLowerCase()
                              )?.show
                                ? true
                                : false
                            }
                          />
                          <span className="w-7 h-4 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-black after:w-3 after:h-3 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-2"></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          {/* Content Panel*/}

          {loading ? (
            <div className="py-3 ">
              {/* List item starts */}
              {contents.map((content) => (
                <div
                  key={content.id}
                  className="px-5 py-2 border-b border-[#f7f7f7] w-full last:border-0"
                >
                  <div className="flex gap-2 animate-pulse">
                    <div className="size-[38px] rounded-lg relative">
                      <div className="w-full h-full rounded-lg overflow-hidden bg-gray-200" />
                    </div>
                    <div className="flex flex-col">
                      <div className=" bg-gray-200 w-[150px] h-2 rounded-xl mt-2" />
                      <div className=" bg-gray-200 w-[100px] h-1.5 mt-2 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-scroll min-h-[300px]">
              {/* List item starts */}
              {selectedTab !== 3 &&
              filteredResults.filter((content) =>
                selectedTab === 0
                  ? content
                  : selectedTab === 1
                  ? content.type === "file"
                  : selectedTab === 2
                  ? content.type === "people"
                  : content
              ).length ? (
                filteredResults
                  .filter((content) =>
                    selectedTab === 0
                      ? content
                      : selectedTab === 1
                      ? content.type === "file"
                      : selectedTab === 2
                      ? content.type === "people"
                      : content
                  )
                  .map((content, idx) => (
                    <div
                      key={content.id}
                      className={`mt-3 px-5 py-2 border-b border-[#f7f7f7] w-full last:border-0 flex justify-between cursor-pointer hover:bg-[#f8f8f8] group transition-opacity duration-500 delay-[${
                        (idx + 1) * 1000
                      }] ${loading ? "opacity-0" : "opacity-100"}`}
                    >
                      <div className="flex gap-2">
                        <div className="size-[38px] rounded-lg relative">
                          <div className="w-full h-full rounded-lg overflow-hidden">
                            {content.type === "people" ? (
                              <Image
                                width={0}
                                height={0}
                                src={`/people/${content.id}.jpg`}
                                sizes="100vw"
                                className="w-full h-full object-cover"
                                alt="user"
                              />
                            ) : (
                              <Image
                                width={0}
                                height={0}
                                src={`/people/file.jpg`}
                                sizes="100vw"
                                className="w-full h-full object-cover rounded-lg"
                                alt="file"
                              />
                            )}
                          </div>

                          {content.type === "people" ? (
                            <div
                              className={`absolute -bottom-[4px] -right-[4px] size-[12px] bg-white rounded-full overflow-hidden flex justify-center items-center`}
                            >
                              <div
                                className={`w-[70%] h-[70%]  rounded-full ${
                                  content.isActive
                                    ? "bg-[#faca00]"
                                    : "bg-[#de1314]"
                                }`}
                              ></div>
                            </div>
                          ) : null}
                        </div>

                        <div className="flex flex-col">
                          <div
                            className="font-medium text-black text-[14px]"
                            dangerouslySetInnerHTML={{
                              __html: content.title.replace(
                                new RegExp(debouncedSearchTerm, "gi"),
                                (match) =>
                                  `<mark style="background-color:#fee7ce">${match}</mark>`
                              ),
                            }}
                          />

                          <div className="text-gray-400 text-[12px]">{`${
                            content.type === "people"
                              ? !content.isActive
                                ? content.lastActiveDate === "unactivated"
                                  ? ""
                                  : ""
                                : "Last active"
                              : content.type === "file"
                              ? `in ${content.folder} -`
                              : ""
                          } ${content.lastActiveDate
                            .slice(0, 1)
                            .toUpperCase()}${content.lastActiveDate
                            .slice(1)
                            .toLocaleLowerCase()}`}</div>
                        </div>
                      </div>

                      <div className="justify-self-end items-center gap-3 text-xs text-gray-400 hidden group-hover:flex">
                        <div className="relative">
                          <Link
                            size={12}
                            color="darkgray"
                            onMouseEnter={() => setLinkHovered(true)}
                            onMouseLeave={() => {
                              setLinkHovered(false);
                              setLinkClicked(false);
                            }}
                            onClick={() => {
                              setLinkClicked(true);
                            }}
                          />{" "}
                          <div
                            className={`px-1 py-0.5 rounded text-[10px] text-nowrap bg-black text-white absolute top-0 left-1/2 transform -translate-x-1/2  -translate-y-6 ${
                              linkHovered ? "visible" : "hidden"
                            }`}
                          >
                            {linkClicked ? (
                              <div className="flex items-center">
                                <Check size={10} />&nbsp;&nbsp;Link copied!
                              </div>
                            ) : (
                              "Copy link"
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <SquareArrowOutUpRight size={12} color="darkgray" />
                          <a
                            target="_blank"
                            href="https://avinashrathoddev.vercel.app/"
                          >
                            New Tab
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center w-full min-h-[300px] p-5">
                  No results
                </div>
              )}
            </div>
          )}
          {/* List item end */}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
