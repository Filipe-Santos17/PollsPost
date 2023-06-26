import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string,
  btnStyle?: string,
  isDisabled: boolean,
  handleClickButton?: () => void | null,
}


export default function Button({content, btnStyle, isDisabled = false, handleClickButton}: ButtonProps) {
  return (
    <button className={`btn ${btnStyle}`} disabled={isDisabled} onClick={handleClickButton}>{content}</button>
  )
}
