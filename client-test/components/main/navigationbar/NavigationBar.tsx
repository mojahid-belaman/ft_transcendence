
import classes from './NavigationBar.module.css'
import ProfileCard from './ProfileCard';
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BsFillChatTextFill } from "react-icons/bs";
import { RiTeamFill, RiLogoutBoxFill } from "react-icons/ri";
import { GiPingPongBat } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";
import Link from 'next/link';

function NavigationBar() {
    return <nav className={classes.nav}>
        <div>
            <div className={classes.barContent}>
                {/* <ProfileCard /> */}
                <Link className={classes.link} href="/home"><button><AiFillHome className={classes.icons} />Home</button></Link>
                <Link className={classes.link} href="/chat"><button><i><BsFillChatTextFill className={classes.icons} /></i>Chat </button></Link>
                <Link className={classes.link} href="/channels"><button><RiTeamFill className={classes.icons} /> Channels</button></Link>
                <Link className={classes.link} href="/game"><button><GiPingPongBat className={classes.icons} /> Game</button></Link>
                <Link className={classes.link} href="/liveGame"><button><GiPingPongBat className={classes.icons} /> Live Games</button></Link>
                <Link className={classes.link} href="/settings"><button><AiFillSetting className={classes.icons} /> Settings</button></Link>
                <Link className={classes.link} href="/profile"><button><FaUserAlt className={classes.icons} /> Profile</button></Link>
                
                {/* <div className={classes.logout}> <div className={classes.button}><RiLogoutBoxFill className={classes.icons} />logout</div></div> */}
            </div>
        </div>
    </nav>
}
export default NavigationBar;