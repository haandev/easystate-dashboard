namespace AuthTypes {
    type ValueType = {
      state: StateType
      provided: boolean
      dispatch: React.Dispatch<ActionType>
    }
  
    type StateType = {
      refreshToken? : string
      username?:string
      accessToken?:string
      isLoggedIn:boolean
      roles?: Array<any>
    }
    type ActionType =
      | {
          type: "login"
          data: {
            accessToken:string,
            refreshToken:string,
            username:string
          }
        }
      | {
          type: "logout"
        }
    type ReducerType = (state: StateType, action: ActionType) => StateType
  }
  