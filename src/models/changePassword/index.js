import {patch} from '../../util/axios';

const changePassword = {
    state:{
    },
    reducers:{
        sendChangePassword(state,payload){
            return{
                ...state,payload
            }
        }
    },
    effects:{
        async sendChangePasswordAsync(payload,rootState){
            const res =await patch('/user/changepassword',{
                oldPassword:payload.oldPassword,
                newPassword:payload.newPassword,
                newPasswordAgain:payload.newPasswordAgain
            });
            this.sendChangePassword(res)
            return res
        }
    }
}

export default changePassword;