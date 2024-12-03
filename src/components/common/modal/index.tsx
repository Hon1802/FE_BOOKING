import { Modal } from "antd"
import styled from "styled-components"

const ModalStyled = styled(Modal)`
  padding: 0.786rem 1.5rem;
  .ant-modal-content {
    border-radius: 10px !important;
    background-color: white;
    color: black;
  }
  .ant-modal-footer {
    display: none;
  }
  .ant-modal-close-x{
    color: black;
  }
`
interface Props {
    open: boolean,
    onCancel: () => void,
    title?: string,
    children: React.ReactNode,
    onOk?: () => void,
    cancelText?: string,
    okText?: string,
    okButtonProps?: any,
    cancelButtonProps?: any,
    width?: number
}
const CustomModal = ({ open, onCancel, title, children, onOk, cancelText, okText, okButtonProps, cancelButtonProps, width }: Props) => {
    return (
        <ModalStyled
            width={width}
            centered
            open={open}
            onCancel={onCancel}
            onOk={onOk}
            cancelText={cancelText}
            okText={okText}
            okButtonProps={okButtonProps}
            cancelButtonProps={cancelButtonProps}
        >
            {title &&
                <div>
                    <p className="text-[1rem] pe-1 mb-3">
                        {title}
                    </p>
                </div>
            }
            <div className="mt-4">
                {children}
            </div>
        </ModalStyled >
    )
}

export default CustomModal