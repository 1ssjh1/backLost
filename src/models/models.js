/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2020-12-26 14:43:37
 */
// export const count = {
//     state: 3, // initial state
//     reducers: {
//       // handle state changes with pure functions
//       increment(state, payload) {
//         return state + payload
//       }
//     },
//     effects: {
//       // handle state changes with impure functions.
//       // use async/await for async actions
//       async incrementAsync(payload, rootState) {
//         await new Promise(resolve => setTimeout(resolve, 1000))
//         this.increment(payload)
//       }
//     }
// }
export { default as login } from './login'
export { default as common } from './common'
export { default as userController } from './userController'
export { default as personInfo } from './personInfo'
export { default as register } from './register'
export { default as add } from './add'
export { default as manageLose } from './manageLose'
export { default as member} from './member'
export { default as picdata} from './picdata'
export { default as approve} from './approve'
export { default as changePassword} from './changePassword'