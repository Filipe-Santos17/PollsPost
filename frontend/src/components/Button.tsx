import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string,
  btnStyle?: string,
  isDisabled?: boolean,
  handleClickButton?: () => void | null,
  typeBtn?: "Submit" | "Button"
}


export default function Button({content, btnStyle = "", isDisabled = false, handleClickButton, typeBtn = "Button"}: ButtonProps) {
  return (
    <button className={`btn ${btnStyle}`} disabled={isDisabled} onClick={handleClickButton} type={typeBtn}>{content}</button>
  )
}
