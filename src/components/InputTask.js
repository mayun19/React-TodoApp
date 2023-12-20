import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { Menu } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import {
  FaRegClock,
  FaPencilAlt,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { addTodo, updateTodo } from "../slices/todoSlice";

const InputTask = ({ type, modalOpen, setModalOpen, todo }) => {
  const [showTask, setShowTask] = useState(true);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("incomplete");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setDate(todo.date);
      setDesc(todo.desc);
    } else {
      setTitle("");
      setDate("");
      setDesc("");
      setStatus("incomplete");
    }
  }, [type, todo, modalOpen]);

  const handleTask = () => {
    setShowTask(!showTask);
  };

  const handleInputTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleInputDate = (e) => {
    setDate(e.target.value);
  };

  const handleInputDesc = (e) => {
    setDesc(e.target.value);
  };

  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();
  if (day < 10) {
    day = +("0" + day);
  }
  if (month < 10) {
    month = +("0" + month);
  }

  const todayDate = year + "-" + month + "-" + day;
  const maxDate = year + 1 + "-" + month + "-" + day;

  const handleAddTask = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
    }
    if (title && date && desc) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            date,
            desc,
            status,
          })
        );
        toast.success("Task updated successfully");
      }
      if (type === "update") {
        if (todo.title !== title || todo.date !== date || todo.desc !== desc) {
          dispatch(updateTodo({ ...todo, title, date, desc }));
        } else {
          toast.error("No Changes Made");
        }
      }
      setModalOpen(false);
    }
  };

  return (
    modalOpen && (
      <div>
        <div
          className={
            type === "update"
              ? "todo flex flex-col"
              : "todo flex flex-col py-[22px] border-b border-[#828282]"
          }>
          <form onSubmit={(e) => handleAddTask(e)}>
            <div className="flex flex-row items-center justify-between space-x-3">
              <div className="flex flex-row items-center gap-[22px]">
                <input type="checkbox" className="round rounded-none" />
                <input
                  type="text"
                  placeholder="Type Task Title"
                  required
                  value={title}
                  onChange={handleInputTitle}
                  className="w-full md:w-[380px] border border-[#828282] text-sm text-[#4F4F4F] rounded p-3"
                />
              </div>
              <div className="flex flex-row items-center gap-3.5 pe-[25px] option">
                <span className="text-[#4F4F4F]">{todayDate}</span>
                <div className="hideandsee cursor-pointer" onClick={handleTask}>
                  {showTask ? (
                    <FaAngleUp
                      className="-mr-1 h-5 w-5 text-[#828282]"
                      size={2}
                    />
                  ) : (
                    <FaAngleDown
                      className="-mr-1 h-5 w-5 text-[#828282]"
                      size={2}
                    />
                  )}
                </div>
                <Menu as="div" className="relative inline-block text-left ">
                  <div>
                    <Menu.Button className="flex w-full justify-between gap-x-1.5 bg-white text-gray-900  hover:bg-gray-50">
                      <EllipsisHorizontalIcon
                        className="-mr-1 h-5 w-5 text-[#828282]"
                        width={4}
                        color="#828282"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                </Menu>
              </div>
            </div>
            {showTask && (
              <div className="flex flex-col items-start pt-4 pl-10 gap-[13px]">
                <div className="flex flex-row items-center date gap-[18px]">
                  <FaRegClock className="text-[#2F80ED]" size={20} />
                  <input
                    type="date"
                    className="bg-white border border-[#828282] text-[#4F4F4F] text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-3"
                    value={date}
                    required
                    onChange={handleInputDate}
                    min={todayDate}
                    max={maxDate}
                  />
                </div>
                <div className="flex desc-todo gap-[18px]">
                  <FaPencilAlt className="mt-1 text-[#2F80ED]" size={20} />
                  <textarea
                    placeholder="No Description"
                    className="w-full text-sm md:w-[543px] focus:outline-none"
                    value={desc}
                    onChange={handleInputDesc}></textarea>
                </div>
                <button className="w-full bg-white border md:w-[380px] py-2.5 px-0 rounded text-sm font-semibold border-[#828282] text-[#4F4F4F] hover:bg-[#2F80ED] hover:border-none hover:text-white">
                  {type === "update" ? "Update" : "Add"} Task
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    )
  );
};

export default InputTask;
