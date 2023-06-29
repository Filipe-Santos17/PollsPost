export type InputBoxType = {
  labelName: string,
  idName: string,
  typeInput: "text" | "number" | "password",
  value: string,
  onchange?: () => void,
  placeholderText?: string,
  autoFocus?: boolean,
  error?: string,
  onBlur?: () => void,
  validate?: () => void,
  setValue?: React.Dispatch<React.SetStateAction<string>>
}

export type dataPoll = {
  id: number,
  name: string,
  user_id: number,
  updatedAt: string,
  createdAt: string,
}

export type itemCard = {
  title: string,
  startDate: string,
  dataId: number,
  setAllData?: React.Dispatch<React.SetStateAction<dataPoll[] | null>>,
}

export type userPoll = {
  id: number,
  name: string,
  email: number,
  updatedAt: string,
  createdAt: string,
}

export type createNewPoll = {
  name: string,
  option_one: string,
  option_two: string,
  option_three?: string,
  option_four?: string,
  option_five?: string,
}

export type optionsPoll = {
  createdAt: string,
  id: number,
  name: string,
  polls: [
    option_one: string,
  ],
  updatedAt: string,
  user_id: number,
}