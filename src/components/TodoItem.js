import { useState, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import {
  FaRegClock,
  FaPencilAlt,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import InputTask from "./InputTask";

const TodoItem = ({ todo }) => {
  const [showTask, setShowTask] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const today = new Date();
  const date = new Date(todo.date);
  const timeDifference = Math.abs(today - date);
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? "incomplete" : "complete" })
    );
  };

  const handleTask = () => {
    setShowTask(!showTask);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted Successfully");
  };

  const handleUpdate = () => {
    setModalUpdate(true);
  };

  return (
    <div className="todo flex flex-col py-[22px] border-b border-[#828282]">
      {!modalUpdate && (
        <div
          className={`flex flex-row items-center justify-between space-x-3 getClass`}>
          <div className="flex items-center gap-[22px]">
            <input
              type="checkbox"
              id={todo.id}
              data-id={todo.id}
              checked={checked}
              className="round rounded-none border-[#828282]"
              onChange={handleCheck}
            />
            <p
              className={
                todo.status === "complete"
                  ? "line-through font-bold text-[#828282] font-base"
                  : "font-bold text-[#4F4F4F] font-base"
              }>
              {todo.title}{" "}
            </p>
          </div>
          <div className="flex flex-row items-center gap-3.5 pe-[25px] option">
            <span className="xday text-red-400">{daysRemaining} Days Left</span>
            <span className="text-[#4F4F4F]">{todo.date}</span>
            <div className="hideandsee cursor-pointer" onClick={handleTask}>
              {showTask ? (
                <FaAngleUp className="-mr-1 h-5 w-5 text-[#828282]" size={2} />
              ) : (
                <FaAngleDown
                  className="-mr-1 h-5 w-5 text-[#828282]"
                  size={2}
                />
              )}
            </div>
            <Menu as="div" className="relative inline-block text-left ">
              <div>
                <Menu.Button className="grid w-full place-items-center gap-x-1.5 bg-white text-gray-900  hover:bg-gray-50">
                  <EllipsisHorizontalIcon
                    className="mr-1 h-5 w-5 text-[#828282]"
                    width={4}
                    color="#828282"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg outline-[#828282] border border-[#828282] divide-y divide-[#828282] border-focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      <div
                        onClick={() => handleUpdate()}
                        onKeyDown={() => handleUpdate()}
                        role="button"
                        tabIndex={0}
                        className="block p-2 text-[#828282] font-semibold text-sm cursor-pointer">
                        Update
                      </div>
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      <div
                        onClick={() => handleDelete()}
                        onKeyDown={() => handleDelete()}
                        tabIndex={0}
                        className="block p-2 text-[#EB5757] font-semibold text-sm cursor-pointer">
                        Delete
                      </div>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      )}
      {showTask && !modalUpdate && (
        <div className="flex flex-col items-start pt-4 pl-10 gap-[13px]">
          <div className="flex flex-row items-center date gap-[18px]">
            <FaRegClock className="text-[#4F4F4F]" size={20} />
            <input
              type="date"
              className="bg-white border border-[#828282] text-[#4F4F4F] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
              value={todo.date}
              required
              // onChange={({ target }) => setDate(target.value)}
              // min={todayDate}
              // max={maxDate}
            />
          </div>
          <div className="flex desc-todo gap-[18px]">
            <FaPencilAlt className="mt-1 text-[#4F4F4F]" size={20} />
            <p className="max-w-[518px] text-justify text-[#4F4F4F] text-sm">
              {todo.desc}
            </p>
          </div>
        </div>
      )}
      <InputTask
        type="update"
        todo={todo}
        modalOpen={modalUpdate}
        setModalOpen={setModalUpdate}
      />
    </div>
  );
};

export default TodoItem;
