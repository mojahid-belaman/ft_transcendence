import React from 'react'
import style  from '../styles/Setting.module.css'

const Setting = () => {
  return (
    <div className={style.container}>
        <div className={style.box}>
            <h1 className={style.title}>SETTING</h1>
            <form>
                <div className={style.field}>
                    <div>
                        <label>Map Color :</label>
                        <select>
                            <option selected hidden>Choose Color The Map</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                    <div>
                        <label>Paddle Color :</label>
                        <select>
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
                        <select>
                            <option selected hidden>Choose Color The Ball</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                    <div>
                        <label>Border Color :</label>
                        <select>
                            <option selected hidden>Choose Color The Border</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button className={style.apply}>APPLY</button>
                    <button className={style.cancel}>CANCEL</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Setting