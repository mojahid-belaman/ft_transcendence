import { useState } from 'react'
import AllFriends from './all/AllFriends';
import classes from './Home.module.css'
import OnlineList from './online/OnlineList';

function Home() {
    const [buttons, setButton] = useState(1);
    function showComponent(event) {
        if (event.target.outerText === 'Online')
            setButton(1);
        if (event.target.outerText === 'All')
            setButton(2);
        if (event.target.outerText === 'Pending')
            setButton(3);
        if (event.target.outerText === 'Blocked')
            setButton(4);
    }
    return <div className={classes.home}>
        <input type="text" /* value="" */ placeholder="  Search..." />
        <div className={classes.navBar}>
            <button onClick={showComponent}> Online</button>
            <button onClick={showComponent}> All</button>
            <button onClick={showComponent}> Pending</button>
            <button onClick={showComponent}> Blocked</button>
        </div>
        {buttons === 1 ?<OnlineList /> : null}
        {buttons === 2 ? <AllFriends/> : null}
        {buttons === 3 ? <div>Pending</div> : null}
        {buttons === 4 ? <div>Blocked</div> : null}

    </div>
}
export default Home