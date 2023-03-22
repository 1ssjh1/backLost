/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2020-12-26 16:13:46
 */
import style from "./index.module.less";
import { useEffect } from "react";
import { connect } from "react-redux";

const WaitContainer = (props) => {

    useEffect(()=>{
        props.setWaitStatus(false)
    },[])

    return (
        <div className={style.container} >
            <span className={style.backImg}></span>
            <div className={style.waitContent} >
            {/* 注册信息已成功提交！（换行）待管理员审核通过后可正常登陆（换行）注意：请勿重复注册（小字） */}
                <p style={{fontSize:'25px'}}>&nbsp;&nbsp;&nbsp;注册信息已成功提交！</p>
                <p >待管理员审核通过后可正常登录
                 </p>
                 <p  style={{marginLeft:'108px'}}>请勿重复注册</p>
                {/* <p style={{fontSize:'5px',marginRight:'62px'}} ></p> */}
            </div>
        </div>
    )
}

const mapState = (state) => ({

})

const mapDispatch = (dispatch) =>({
    setWaitStatus:dispatch.register.setWaitStatus
})

const Wait = connect(mapState,mapDispatch)(WaitContainer)

export default Wait;