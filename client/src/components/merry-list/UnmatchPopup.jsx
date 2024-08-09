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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-[16px] w-[343px] lg:w-[528px] mx-4">
        <div className="flex flex-row justify-between items-center py-[8px] px-[16px] lg:px-[24px] border-b border-color-[#E4E6ED]">
          <h1 className="text-[1.25rem] font-[600] flex items-center">
            Unmatch Confirmation
          </h1>
          <button
            className="flex justify-end items-end text-[1.8rem] size-[40px] text-[#C8CCDB]"
            onClick={() => onClose(false)}
          >
            x
          </button>
        </div>
        <div className="p-[24px] flex flex-col gap-[24px]">
          <p className="text-[1rem] font-[400] text-[#646D89]">
            Do you sure to unmatch this profile?
          </p>
          <div className="flex max-lg:flex-col justify-start gap-[16px]">
            <button
              onClick={handleUnmatch}
              className="px-[24px] py-[12px] text-[1rem] bg-[#FFE1EA] rounded-[99px] lending-[150%] text-[#95002B] font-[700]"
            >
              Yes, I want to unmatch
            </button>
            <button
              className="px-[24px] py-[12px] text-[1rem] bg-[#C70039] rounded-[99px] lending-[150%] text-[white] font-[700]"
              onClick={onClose}
            >
              No, I don’t
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
