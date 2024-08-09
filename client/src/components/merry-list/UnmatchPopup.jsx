import { useMatch } from "../../hooks/useMatch";

const ModalPopup = ({ user, onClose }) => {
  const { undoMerry } = useMatch();
  let myUserId = JSON.parse(localStorage.getItem("data")).id;
  let tmpUser = null;
  const unlikedUserId = user?.user_id_2;

  // if myUserId is stay at database user_id column2; then swap user_id_2 <-> user_id_1
  if (myUserId === user?.user_id_2) {
    tmpUser = user?.user_id_1;
    user.user_id_1 = myUserId;
    user.user_id_2 = tmpUser;
  }

  const handleUnmatch = async () => {
    if (user) {
      await undoMerry(unlikedUserId);
      window.location.reload();
      onClose(false); // close modal when unmatch finish
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="UnmatchButton w-[528px] h-[200px] bg-white rounded-[24px] flex flex-col z-30 shadow-2xl ">
        <div className="flex flex-row space-x-[45%]">
          <h1 className="text-[1.25rem] m-[5%] font-[600]">
            Unmatch Confirmation
          </h1>
          <button className="text-[1.8rem] text-[#C8CCDB]" onClick={onClose}>
            x
          </button>
        </div>
        <p className="text-[1rem] m-[5%] mt-[0] font-[400] text-[#646D89]">
          Do you sure to unmatch this profile?
        </p>
        <div className="w-[100%] h-[auto] ml-[5%] flex justify-start space-x-[5%]">
          <button
            onClick={handleUnmatch}
            className="w-[12rem] h-[3rem] text-[1rem] bg-[#FFE1EA] rounded-[99px] lending-[150%] text-[#95002B] font-[700]"
          >
            Yes, I want to unmatch
          </button>
          <button
            className="w-[7.813rem] h-[3rem] text-[1rem] bg-[#C70039] rounded-[99px] lending-[150%] text-[white] font-[700]"
            onClick={onClose}
          >
            No, I don’t
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
