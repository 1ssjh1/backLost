/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2021-02-13 17:47:59
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Count = props => (
    <div>
    </div>
)

const mapState = state => ({
})

const mapDispatch = (dispatch) => ({

})
const CountContainer = connect(mapState, mapDispatch)(Count)
export default CountContainer;