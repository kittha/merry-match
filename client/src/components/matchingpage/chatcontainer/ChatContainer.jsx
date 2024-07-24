import React from "react";
import discover from "/assets/matchingpage/chatArea/discover-vector.png";
import matched from "/assets/matchingpage/chatArea/merry-match.png";
import profile from "/assets/profilepicture/john.png";

const ChatContainer = () => {
    return (
        <div className="w-screen lg:w-[316px] h-screen bg-white shadow-2xl flex flex-col lg:pt-[88px] pt-[52px] font-Nunito absolute lg:z-20">
        <div className="discover flex justify-center h-[216px] lg:h-[259px] px-[15px] py-[20px] lg:py-[36px]">
            <button className="flex flex-col items-center justify-center text-center w-[343px] lg:w-[282px] h-[187px] rounded-[16px] border-[1px] border-[#A62D82] bg-white">
                <img src={discover} alt="Discover" />
                <p className="text-[24px] font-bold text-[#95002B]">Discover New Match</p>
                <p className="text-[14px] font-medium text-[#646D89]">start find and Merry to get know</p>
                <p className="text-[14px] font-medium text-[#646D89]">and connect with new friend!</p>
            </button>
        </div>
        <div className="merryMatch flex justify-center bg-white px-[15px] py-[16px] lg:py-[24px]">
            <div className="flex flex-col justify-start gap-[16px] w-[343px] lg:w-[282px]">
                <p className="text-[24px] font-bold text-[#2A2E3F]">Merry Match!</p>
                <div className="flex flex-row overflow-x-auto">
                    <div className="flex flex-nowrap gap-[12px]">
                        <button 
                            className="relative usermatch bg-white w-[100px] h-[100px] rounded-[24px]"
                            onClick={() => navigate("/")}
                        >
                            <img src={profile} alt="profile" className=" rounded-[24px]"/>
                            <img src={matched} alt="matched" className=" absolute bottom-0.5 right-0.5"/>
                        </button>
                        
                            
                    </div>
                </div>
            </div>
        </div>
        <div className="chatWithMatch flex-1 overflow-auto bg-white px-[15px]">
            <div className="flex flex-col justify-start w-[343px] lg:w-[282px]">
                <p className="text-[24px] font-bold text-[#2A2E3F] sticky top-0 z-10 bg-white py-[16px]">Chat with Merry Match</p>
                <div className="flex flex-col gap-[8px]">
                    <button 
                        className=" w-auto h-[92px] rounded-[16px] bg-white border-0 hover:border-[1px] hover:border-[#A62D82] hover:bg-[#F6F7FC] focus:outline-none"
                        onClick={() => navigate("/")}
                    >
                    <div className="flex gap-[12px] mx-[12px] my-[16px]">
                        <img src={profile} alt="profile" className="h-[60px] w-[60px] rounded-full"/>
                        <div className="flex flex-col text-left justify-center">
                            <p className="text-[16px] font-medium text-[#2A2E3F]">Name</p>
                            <p className="text-[14px] font-medium text-[#646D89] truncate w-[230px] lg:w-[180px]">message It is a long established fact that a reader will be distracted by the readable content</p>
                        </div>
                    </div>
                    </button>

                </div>
            </div>
        </div>
        </div>
    )
}

export default ChatContainer