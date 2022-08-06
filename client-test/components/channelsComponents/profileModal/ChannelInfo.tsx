import { useState } from 'react';
import About from './About';
import Admins from './Admins';
import classes from './ChannelInfo.module.css'
import Members from './Members';
function ChannelInfo(props: any) {
    const [buttons, setButton] = useState(1);
    return (
        <div className={classes.infoCard}>
            <div className={classes.header}>
                <img className={classes.channelImage} src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"></img>
                <div className={classes.channelName}>
                   <p>{props.channel.name}</p>
                    <div className={classes.buttons}>
                        <button onClick={()=> setButton(1)}>About</button>
                        <button onClick={()=> setButton(2)}>Admins</button>
                        <button onClick={()=> setButton(3)}>Members</button>
                    </div>
                </div>
            </div>
            {buttons === 1 ? <About channel={props.channel} /> : null}
            {buttons === 2 ? <div><Admins channel={props.channel} /></div> : null}
            {buttons === 3 ? <div><Members channel={props.channel} /></div> : null}
        </div>
    )
}
export default ChannelInfo
