/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2021-02-17 22:49:24
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const InfoTitle = props =>{
  const { loginDispatch } = props
  const getInfo = ()=> {
    loginDispatch.getInfo()
  }
  getInfo()
  return (
    <div>
      11
    </div>
  )
} 

const mapState = state => ({
    Info: state.common.Info
})

const mapDispatch = (dispatch) => ({
    loginDispatch : dispatch.common
})
const InfoTitleContainer = connect(mapState, mapDispatch)(InfoTitle)
export default InfoTitleContainer;