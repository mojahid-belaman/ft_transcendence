
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
                <Link className={classes.link} href="/home"><button className={classes.button}><AiFillHome className={classes.icons} /><div>Home</div></button></Link>
                <Link className={classes.link} href="/chat"><button className={classes.button}><BsFillChatTextFill className={classes.icons} /><div>Chat</div> </button></Link>
                <Link className={classes.link} href="/channels"><button className={classes.button}><RiTeamFill className={classes.icons} /> <div>Channels</div></button></Link>
                <Link className={classes.link} href="/game"><button className={classes.button}><GiPingPongBat className={classes.icons} /> <div>Game</div></button></Link>
                <Link className={classes.link} href="/liveGame"><button className={classes.button}><GiPingPongBat className={classes.icons} /> <div>Live Games</div></button></Link>
                <Link className={classes.link} href="/settings"><button className={classes.button}><AiFillSetting className={classes.icons} /> <div>Settings</div></button></Link>
                <Link className={classes.link} href="/profile"><button className={classes.button}><FaUserAlt className={classes.icons} /> <div>Profile</div></button></Link>                
                <button className={classes.logout}><RiLogoutBoxFill className={classes.icons} /> <div>logout</div></button>

    </nav>
}
export default NavigationBar;