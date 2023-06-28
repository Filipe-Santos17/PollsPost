import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string,
  btnStyle?: string,
  isDisabled?: boolean,
  handleClickButton?: () => void | null,
  typeBtn?: "submit" | "button"
}

export default function Button({content, btnStyle = "", isDisabled = false, handleClickButton, typeBtn = "button"}: ButtonProps) {
  return (
    <button className={`btn ${btnStyle}`} disabled={isDisabled} onClick={handleClickButton} type={typeBtn}>{content}</button>
  )
}
