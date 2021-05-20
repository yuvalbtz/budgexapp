import {SET_Account_Modal_Open,
        SET_MatualAccount_Modal_Open, 
        SET_Profile_Modal_Open,
        SET_AddItem_Modal_Open,
        SET_BG_SINGLE_ACCOUNT,
        SET_Current_Account_Ui,
        SET_UpdateItem_Modal_Open,
        SET_UpdateAccount_Modal_Open
    
    } from '../actionTypes'



const InitialState = {
    AccountModalIsOpen:false,
    MatualAccountIsOpen:false,
    ModalProfileIsOpen:false,
    bgSingleAccount:'',
    AddItemModalIsOpen:false,
    getCurrentAccountUi:null,
    UpdateItemModalIsOpen:{
        isOpen:false,
        itemDetails:null
    },
    UpdateAccountModalIsOpen:{
        isOpen:false,
        accountDetails:null
    },

}

export function uiReducer(state = InitialState, action){
    switch(action.type){
        case SET_Account_Modal_Open:
            return {
                ...state,
                AccountModalIsOpen:!state.AccountModalIsOpen
            }
            case SET_MatualAccount_Modal_Open:
             return {
                    ...state,
                    MatualAccountIsOpen:!state.MatualAccountIsOpen
                } 
                case SET_Profile_Modal_Open:
             return {
                    ...state,
                    ModalProfileIsOpen:!state.ModalProfileIsOpen
                } 
                
                case SET_BG_SINGLE_ACCOUNT:
                    return {
                           ...state,
                           bgSingleAccount:action.payload
                       }
                      
                       case SET_AddItem_Modal_Open:
                    return {
                           ...state,
                           AddItemModalIsOpen:!state.AddItemModalIsOpen
                       } 
                       case SET_UpdateItem_Modal_Open:
                        return {
                               ...state,
                               UpdateItemModalIsOpen:{
                                isOpen:!state.UpdateItemModalIsOpen.isOpen,
                                itemDetails:action.payload
                               }
                             } 
                             case SET_UpdateAccount_Modal_Open:
                        return {
                               ...state,
                               UpdateAccountModalIsOpen:{
                                isOpen:!state.UpdateAccountModalIsOpen.isOpen,
                                accountDetails:action.payload
                               }
                             } 
                       
                       case SET_Current_Account_Ui:
                        return {
                               ...state,
                               getCurrentAccountUi: action.payload
                           }       
              default:
                  return state
            }          
}