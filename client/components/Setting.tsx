import React from 'react'
import style  from '../styles/Setting.module.css'

const Setting = () => {
  return (
    <div className={style.container}>
        <div className={style.box}>
            <div className={style.header}>
                <h1>Setting</h1>
            </div>
            <div /*className={style.content}*/>
                <h2>Background Color: </h2>
                <div /*className={style.map}*/>

                </div>
                <div /*className={style.color}*/>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Setting