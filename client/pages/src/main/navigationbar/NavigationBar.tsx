
import { Link } from 'react-router-dom';
import classes from './NavigationBar.module.css'
import ProfileCard from './ProfileCard';
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BsFillChatTextFill } from "react-icons/bs";
import { RiTeamFill, RiLogoutBoxFill } from "react-icons/ri";
import { GiPingPongBat } from "react-icons/gi";

function NavigationBar() {
    return <nav className={classes.nav}>
        <div>
            <div className={classes.barContent}>
                {/* <ProfileCard /> */}
                <Link className={classes.link} to="/"><button><AiFillHome className={classes.icons} />Home</button></Link>
                <Link className={classes.link} to="/chat"><button><i><BsFillChatTextFill className={classes.icons} /></i>Chat </button></Link>
                <Link className={classes.link} to="/channels"><button><RiTeamFill className={classes.icons} /> Channels</button></Link>
                <Link className={classes.link} to="/game"><button><GiPingPongBat className={classes.icons} /> Game</button></Link>
                <Link className={classes.link} to="/settings"><button><AiFillSetting className={classes.icons} /> Settings</button></Link>
                {/* <div className={classes.logout}> <div className={classes.button}><RiLogoutBoxFill className={classes.icons} />logout</div></div> */}
            </div>
        </div>
    </nav>
}
export default NavigationBar;