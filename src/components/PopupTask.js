import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ItemTask from "./ItemTask";
import InputTask from "./InputTask";
import { updateFilterStatus } from "../slices/todoSlice";

const PopupTask = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);

  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col w-full md:w-[734px] md:h-[500px] h-screen overflow-y-scroll bg-[#FFFFFF] p-6 rounded">
        <div className="flex flex-row container justify-between items-start todo-action">
          <select
            id="status"
            onChange={(e) => updateFilter(e)}
            value={filterStatus}
            className="flex justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-[#828282] hover:bg-gray-50">
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded bg-[#2F80ED] text-white py-3.5 font-semibold px-4">
            New Task
          </button>
        </div>
        <ItemTask />
        <InputTask
          type="add"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
};

export default PopupTask;
