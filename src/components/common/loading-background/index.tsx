import React from "react"

const Loading = () => {
  return (
    <>
      <div className="fixed bg-[#D9D9D9] bottom-0 left-0 right-0 top-0 opacity-50 z-[9999]"></div>
      <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center flex-col justify-center z-[10000]">
        <div className="background-loading"></div>
      </div>
    </>
  )
}

export default Loading
