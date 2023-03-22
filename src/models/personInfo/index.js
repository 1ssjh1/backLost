import { get } from "../../util/axios"

const personInfo = {
    state:{
       info:{
        name: "张三",
        studentId: "201xxxxxxxx",
        phoneNumber: "133xxxxxxxx",
        role: "admin"
       },
      
      },
    reducers:{
        getInfo(state,payload){
            return{
                ...state,
                info:{...payload}
            }
        },
        setisPop(state,payload){
            return{
                ...state,
                isPop:true
            }
        }
    },
    effects:{
        async Info(payload, rootState){
            const res = await get('user/userinfo')
            if(res.code === 0){
                this.getInfo(res.data)
            }else if(res.code === 2){
                
            }
        }
    }
}
export default personInfo