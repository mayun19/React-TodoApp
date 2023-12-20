import { useState } from "react";
import PopupTask from "./components/PopupTask";

const App = () => {
  const [showButton, setShowButton] = useState(false);
  const [showTask, setShowTask] = useState(false);

  const handleShowMenu = () => {
    setShowButton(!showButton);
  };

  const handleShowTask = () => {
    setShowTask(!showTask);
  };

  return (
    <div className="w-full h-full min-h-screen grid place-items-center box-border p-7 bg-[#4F4F4F]">
      <nav className="fixed right-7 bottom-7 z-10">
        <div className="flex flex-row gap-x-[26px] items-end">
          {showButton && (
            <div className="flex flex-row gap-x-[26px]">
              <div className="button-task flex flex-col items-center gap-[13px]">
                <span className="font-bold sm:text-[#4F4F4F] lg:text-[#F2F2F2]">
                  Task
                </span>
                <button
                  className={
                    showTask
                      ? "rounded-full shadow bg-[#F8B76B] task-open"
                      : "rounded-full shadow bg-[#F2F2F2] task"
                  }
                  onClick={handleShowTask}></button>
              </div>
            </div>
          )}
          {!showTask && (
            <div className="main-button flex">
              <button
                className="rounded-full button-quick bg-[#2F80ED]"
                onClick={handleShowMenu}></button>
            </div>
          )}
        </div>
      </nav>
      {showTask && <PopupTask />}
    </div>
  );
};

export default App;
