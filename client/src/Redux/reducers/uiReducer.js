import {
        SET_AddItem_Modal_Open,
        SET_Current_Account_Ui,
        SET_UpdateItem_Modal_Open,
        SET_UpdateAccount_Modal_Open,
        SET_LightBoxImage,
        SET_NotificationsCount
    
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
        accountDetails:null,
       
    },

    LightBoxImage:{
        ImageUrl:''
    },

    NotificationsCount:{
       Badge:0
    }

}

export function uiReducer(state = InitialState, action){
    switch(action.type){
       
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
                                accountDetails:action.payload,
                                
                               }
                             } 

                             case SET_LightBoxImage:
                                return {
                                       ...state,
                                       LightBoxImage:{
                                        ImageUrl:action.payload
                                        }
                                     } 
                       
                       case SET_Current_Account_Ui:
                        return {
                               ...state,
                               getCurrentAccountUi: action.payload
                           }

                           case SET_NotificationsCount:
                        
                        return {
                               ...state,
                               NotificationsCount:{
                                Badge:action.payload
                               }
                           }
                           
                           

              default:
                  return state
            }          
}