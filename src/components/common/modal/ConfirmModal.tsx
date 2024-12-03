import Modal from "@/components/common/modal"
import { MdInfoOutline } from "react-icons/md"

interface Props {
  open: boolean
  onCancel: () => void
  title?: string
  message: string
  onOk?: () => void
  cancelText?: string
  okText?: string
  okButtonProps?: any
  cancelButtonProps?: any
  width?: number
}

const ConfirmModal = (props: Props) => {
  const { open, onCancel, title, message, onOk, cancelText, okText, okButtonProps, cancelButtonProps, width } = props
  return (
    <Modal width={width} open={open} onCancel={onCancel} onOk={onOk} cancelText={cancelText} okText={okText} okButtonProps={okButtonProps} cancelButtonProps={cancelButtonProps}>
      <div className="flex flex-col items-center">
        <MdInfoOutline size={60} color="#ffde21" />
        {title && (
          <div>
            <p className="text-[1rem] pe-1 text-[30px] font-bold">{title}</p>
          </div>
        )}
        <div className="mt-2 text-[16px]">{message}</div>
      </div>
      <div className="flex gap-5 justify-center mt-4">
        <button onClick={onOk} className="bg-[#305cde] text-white py-2 px-8 rounded-[8px] text-[16px]">
          Confirm
        </button>
        <button onClick={onCancel} className="bg-[#ff2c2c] text-white py-2 px-8 rounded-[8px] text-[16px]">
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
