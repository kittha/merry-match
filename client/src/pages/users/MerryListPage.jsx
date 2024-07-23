import React from "react";
import { useMerryLimit } from "../../contexts/MerryLimitProvider";
//import { useState } from "react";
//import axios from "axios";
//import image from "/assets/complaint-image/image.png";
import { useState, useEffect } from "react";
import axios from "axios";
import RedHearticon from "/assets/merrylist-image/red-heart.png";
import GroupHearticon from "/assets/merrylist-image/group-heart.png";
import Locationicon from "/assets/merrylist-image/location.png";
import Chaticon from "/assets/merrylist-image/chat.png";
import Vectoricon from "/assets/merrylist-image/vector.png";
import WhiteHearticon from "/assets/merrylist-image/white-heart.png";
import Footer from "../../components/homepage/Footer";

function MerryListPage() {
  const [merryList, setMerryList] = useState([]);

  const getMerryList = async () => {
    try {
      const showMerryList = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/merry-list`
      );
      console.log("Hello!!", showMerryList.data.data);
      setMerryList(showMerryList.data.data);
    } catch (error) {
      console.error("Error fetching merry list:", error);
    }
  };

  useEffect(() => {
    getMerryList();
  }, []);

  return (
    <main className="font-Nunito lg:w-full lg:h-auto">
      <section className="w-[375px] flex flex-col gap-[40px] bg-[#FCFCFE] pt-[90px] lg:w-[1440px] h-auto min-[320px]:w-auto lg:gap-[80px] lg:pt-[160px] font-Nunito mx-auto">
        <article className="w-[343px] h-[532px] flex flex-col gap-[40px] mx-auto lg:w-[993px] lg:h-auto lg:gap-[40px]">
          <section className="flex flex-col gap-[40px] lg:w-[933px] lg:h-[209px] lg:gap-[24px]">
            <header className="w-[343px] h-[109px] flex flex-col gap-[8px] lg:w-[933px] lg:h-[87px]">
              <p className="lg:w-[933px] lg:h-[21px] lg:text-[14px] lg:leading-[21px] text-[#7B4429] lg:font-semibold">
                MERRY LIST
              </p>
              <h2 className="text-[#A62D82] lg:w-[933px] lg:h-[58px] lg:text-[46px] lg:leading-[57.5px] lg:font-extrabold">
                Let’s know each other <br className="lg:hidden" /> with Merry!
              </h2>
            </header>
            <section className="lg:w-[933px] lg:h-[98px] flex justify-between">
              <article className="lg:w-[416px] lg:h-[98px] lg:gap-[16px] lg:flex-row lg:flex">
                <div className="lg:w-[200px] lg:h-[98px] rounded-2xl border border-[#F1F2F6] pt-[20px] pr-[24px] pb-[20px] pl-[24px] flex flex-col gap-[4px] bg-[#FFFFFF]">
                  <section className="flex flex-row gap-[4px] w-[57px] h-[30px]">
                    <h4 className="w-[29px] h-[30px] font-bold text-[24px] leading-[30px] text-[#C70039]">
                      16
                    </h4>
                    <img
                      src={RedHearticon}
                      className="w-[23px] h-[20px]  mt-[5px] ml-[-2px]"
                      alt="Red heart icon"
                    />
                  </section>
                  <label className="w-[152px] h-[24px] font-normal text-[16px] leading-[24px] text-[#646D89]">
                    Merry to you
                  </label>
                </div>
                <div className="lg:w-[200px] lg:h-[98px] rounded-2xl border border-[#F1F2F6] pt-[20px] pr-[24px] pb-[20px] pl-[24px] flex flex-col gap-[4px] bg-[#FFFFFF]">
                  <section className="flex flex-row gap-[4px] w-[57px] h-[30px]">
                    <h4 className="w-[29px] h-[30px] font-bold text-[24px] leading-[30px] text-[#C70039]">
                      3
                    </h4>
                    <img
                      src={GroupHearticon}
                      className="w-[40px] h-[20px] mt-[5px] ml-[-6px]"
                      alt="Group heart icon"
                    />
                  </section>
                  <label className="w-[152px] h-[24px] font-normal text-[16px] leading-[24px] text-[#646D89]">
                    Merry match
                  </label>
                </div>
              </article>

              <article className="lg:w-[167px] lg:h-[42px]">
                <section className="lg:w-[167px] lg:h-[24px] flex lg:flex-row lg:gap-[10px] mt-[28px]">
                  <p className="lg:w-[123px] lg:h-[24px] font-normal text-[16px] leading-[24px] text-[#646D89]">
                    Merry limit today
                  </p>
                  <p className="lg:w-[34px] lg:h-[24px] font-normal text-[16px] leading-[24px] text-[#FF1659]">
                    2/20
                  </p>
                </section>
                <p className="lg:w-[167px] lg:h-[18px] font-medium text-[12px] leading-[18px] text-right text-[#9AA1B9] mb-[28px]">
                  Reset in 12h...
                </p>
                <section className="lg:w-[167px] lg:h-[24px]"></section>
              </article>
            </section>
          </section>

          <section className="w-[933px] h-auto flex flex-col gap-[24px]">
            {merryList.map((list, index) => {
              return (
                <section
                  className="w-[933px] h-[238px] border-b border-[#E4E6ED]"
                  key={index}
                >
                  <article className="w-[674px] h-[107px] flex flex-row gap-[40px] mt-[16px] ml-[16px] mb-[35px]">
                    <img
                      src="https://pakmud.com/wp-content/uploads/2023/03/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B9%81%E0%B8%A1%E0%B8%A7%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B9%86-6.jpg"
                      className="w-[187px] h-[187px] rounded-[24px]"
                      alt="Merry list image"
                    />
                    <div className="w-[447px] h-[182px] flex flex-col gap-[24px]">
                      <section className="w-[447px] h-[30px] flex flex-row gap-[16px]">
                        <div className="flex flex-row gap-[8px] w-auto h-[30px] font-bold text-[24px] leading-[30px]">
                          <h4 className="w-auto h-[30px] text-[#2A2E3F]">
                            {list.name}
                          </h4>
                          <h4 className="w-[29px] h-[30px] text-[#646D89]">
                            24
                          </h4>
                        </div>
                        <section className="w-[324px] h-[24px] flex flex-row gap-[6px] mt-[5px] mb-[5px]">
                          <img
                            src={Locationicon}
                            className="w-[11.2px] h-[13.6px] mt-[4px] ml-[4px]"
                            alt="Location icon"
                          />
                          <p className="w-[302px] h-[24px] font-normal text-[16px] leading-[24px] text-[#646D89]">
                            {list.city}, {list.location}
                          </p>
                        </section>
                      </section>
                      <section className="w-[447px] h-[128px] flex flex-col">
                        <section className="flex flex-row w-[447px] h-[32px] font-normal text-[16px] leading-[24px]">
                          <label className="w-[167px] h-[24px] text-[#2A2E3F]">
                            Sexual identities
                          </label>
                          <p className="w-[280px] h-[24px] text-[#646D89]">
                            {list.sexual_identities}
                          </p>
                        </section>
                        <section className="flex flex-row w-[447px] h-[32px]">
                          <label className="w-[167px] h-[24px] text-[#2A2E3F]">
                            Sexual preferences
                          </label>
                          <p className="w-[280px] h-[24px] text-[#646D89]">
                            {list.sexual_preferences}
                          </p>
                        </section>
                        <section className="flex flex-row w-[447px] h-[32px]">
                          <label className="w-[167px] h-[24px] text-[#2A2E3F]">
                            Racial preferences
                          </label>
                          <p className="w-[280px] h-[24px] text-[#646D89]">
                            {list.racial_preferences}
                          </p>
                        </section>
                        <section className="flex flex-row w-[447px] h-[32px]">
                          <label className="w-[167px] h-[24px] text-[#2A2E3F]">
                            Meeting interests
                          </label>
                          <p className="w-[280px] h-[24px] text-[#646D89]">
                            {list.meeting_interests}
                          </p>
                        </section>
                      </section>
                    </div>
                    <div className="w-[176px] h-[104px] flex flex-col gap-[24px] items-end">
                      <section className="w-[157.4px] h-[32px] rounded-full border flex flex-row gap-[4px] border-[#C70039] pl-[21px] pr-[11px] pt-[4px] pb-[4px]">
                        <img
                          src={GroupHearticon}
                          className="w-[20.4px] h-[12px] mt-[5px] ml-[-6px]"
                          alt="Group heart icon"
                        />
                        <h3 className="w-[101px] h-[24px] font-extrabold text-[16px] leading-[24px] text-[#C70039]">
                          Merry Match!
                        </h3>
                      </section>
                      <section className="w-[176px] h-[48px] flex flex-row gap-[16px]">
                        <div className="w-[48px] h-[48px] rounded-2xl bg-[#FFFFFF] shadow-lg">
                          <img
                            src={Chaticon}
                            alt="Chat icon"
                            className="mt-[15.6px] ml-[14.4px]"
                          />
                        </div>
                        <div className="w-[48px] h-[48px] rounded-2xl bg-[#FFFFFF] shadow-lg">
                          <img
                            src={Vectoricon}
                            alt="Vector icon"
                            className="mt-[15.6px] ml-[12px] mb-[12px]"
                          />
                        </div>
                        <div className="w-[48px] h-[48px] rounded-2xl bg-[#C70039] shadow-lg">
                          <img
                            src={WhiteHearticon}
                            alt="White heart icon"
                            className="mt-[5px] ml-[3px]"
                          />
                        </div>
                      </section>
                    </div>
                  </article>
                </section>
              );
            })}

            {/* <section className="w-[933px] h-[238px] border-b border-[#E4E6ED]">
              <article className="w-[674px] h-[107px] flex flex-row gap-[40px] mt-[16px] ml-[16px] mb-[35px]">
                <img
                  src="https://pakmud.com/wp-content/uploads/2023/03/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B9%81%E0%B8%A1%E0%B8%A7%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B9%86-6.jpg"
                  className="w-[187px] h-[187px] rounded-[24px]"
                  alt="Merry list image"
                />
                <div className="w-[447px] h-[182px] flex flex-col gap-[24px]">
                  <section className="w-[447px] h-[30px] flex flex-row gap-[16px]">
                    <div className="flex flex-row gap-[8px] w-[107px] h-[30px] font-bold text-[24px] leading-[30px]">
                      <h4 className="w-[70px] h-[30px] text-[#2A2E3F]">
                        Ygritte
                      </h4>
                      <h4 className="w-[29px] h-[30px] text-[#646D89]">32</h4>
                    </div>
                    <section className="w-[324px] h-[24px] flex flex-row gap-[6px] mt-[5px] mb-[5px]">
                      <img
                        src={Locationicon}
                        className="w-[11.2px] h-[13.6px] mt-[4px] ml-[4px]"
                        alt="Location icon"
                      />
                      <p className="w-[302px] h-[24px] font-normal text-[16px] leading-[24px] text-[#646D89]">
                        Bangkok, Thailand
                      </p>
                    </section>
                  </section>
                  <section className="w-[447px] h-[128px] flex flex-col">
                    <section className="flex flex-row w-[447px] h-[32px] font-normal text-[16px] leading-[24px]">
                      <label className="w-[167px] h-[24px] text-[#2A2E3F]">
                        Sexual identities
                      </label>
                      <p className="w-[280px] h-[24px] text-[#646D89]">
                        Female
                      </p>
                    </section>
                    <section className="flex flex-row w-[447px] h-[32px]">
                      <label className="w-[167px] h-[24px] text-[#2A2E3F]">
                        Sexual preferences
                      </label>
                      <p className="w-[280px] h-[24px] text-[#646D89]">Male</p>
                    </section>
                    <section className="flex flex-row w-[447px] h-[32px]">
                      <label className="w-[167px] h-[24px] text-[#2A2E3F]">
                        Racial preferences
                      </label>
                      <p className="w-[280px] h-[24px] text-[#646D89]">
                        Indefinite
                      </p>
                    </section>
                    <section className="flex flex-row w-[447px] h-[32px]">
                      <label className="w-[167px] h-[24px] text-[#2A2E3F]">
                        Meeting interests
                      </label>
                      <p className="w-[280px] h-[24px] text-[#646D89]">
                        Long-term commitment
                      </p>
                    </section>
                  </section>
                </div>
                <div className="w-[176px] h-[104px] flex flex-col gap-[24px] items-end">
                  <section className="w-[133px] h-[32px] rounded-full border flex flex-row gap-[4px] border-[#C8CCDB] pl-[15px] pr-[11px] pt-[4px] pb-[4px]">
                    <h3 className="w-[101px] h-[24px] font-normal text-[16px] leading-[24px] text-[#646D89]">
                      Not Match yet
                    </h3>
                  </section>
                  <section className="w-[176px] h-[48px] flex flex-row gap-[16px] justify-end">
                    <div className="w-[48px] h-[48px] rounded-2xl bg-[#FFFFFF] shadow-lg">
                      <img
                        src={Vectoricon}
                        alt="Vector icon"
                        className="mt-[15.6px] ml-[12px] mb-[12px]"
                      />
                    </div>
                    <div className="w-[48px] h-[48px] rounded-2xl bg-[#C70039] shadow-lg">
                      <img
                        src={WhiteHearticon}
                        alt="White heart icon"
                        className="mt-[5px] ml-[3px]"
                      />
                    </div>
                  </section>
                </div>
              </article>
            </section> */}
          </section>
        </article>
      </section>
      <Footer />
    </main>
  );
}

export default MerryListPage;
