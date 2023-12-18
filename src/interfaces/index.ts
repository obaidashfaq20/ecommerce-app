export interface stateInterface {
  user: userInterface
  cart: cartInterface
}

export interface userInterface {
  isLoggedIn: boolean
  // isLoggedIn?: Boolean optional
  token: string | null
  email: string
}

export interface cartInterface {
  items: Array<productInterface>
}

export interface productInterface {
  id: number
  name: string
  price: number
  availbility: boolean
}
