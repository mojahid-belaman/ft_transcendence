import React, { useEffect, useState } from 'react'
import style  from '../styles/Setting.module.css'

const Setting = ({setSetting}: any) => {
    const [isMap, setMap] = useState('')
    const [isPaddle, setPaddle] = useState('')
    const [isBall, setBall] = useState('')
    const [isBorder, setBorder] = useState('')
    const [isText, setText] = useState('')
    const [isTrace, setTrace] = useState('')

    const handleCancel = () => {
        setSetting(true)
    }
    const handleMap = (e: any) => {
        setMap(e.target.value)
    }
    const handlePaddle = (e: any) => {
        setPaddle(e.target.value)
    }
    const handleBall = (e: any) => {
        setBall(e.target.value)
    }
    const handleBorder = (e: any) => {
        setBorder(e.target.value)
    }
    const handleText = (e: any) => {
        setText(e.target.value)
    }
    const handleTrace = (e: any) => {
        setTrace(e.target.value)
    }

  return (
        <div className={style.box}>
            <h1 className={style.title}>SETTING</h1>
            <form>
                <div className={style.field}>
                    <div>
                        <label>Map Color :</label>
                        <select onChange={handleMap}>
                            <option selected hidden>Choose Color The Map</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                    <div>
                        <label>Paddle Color :</label>
                        <select onChange={handlePaddle}>
                            <option selected hidden>Choose Color The Paddle</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                </div>
                <div className={style.field}>
                    <div>
                        <label>Ball Color :</label>
                        <select onChange={handleBall}>
                            <option selected hidden>Choose Color The Ball</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                    <div>
                        <label>Border Color :</label>
                        <select onChange={handleBorder}>
                            <option selected hidden>Choose Color The Border</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                </div>
                <div className={style.field}>
                    <div>
                        <label>Text Color :</label>
                        <select onChange={handleText}>
                            <option selected hidden>Choose Color The Ball</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                    <div>
                        <label>Trace Color :</label>
                        <select onChange={handleTrace}>
                            <option selected hidden>Choose Color The Border</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                </div>
                <div className={style.btns}>
                    <button className={style.apply}>APPLY</button>
                    <button className={style.cancel} onClick={handleCancel}>CANCEL</button>
                </div>
            </form>
        </div>
  )
}

export default Setting