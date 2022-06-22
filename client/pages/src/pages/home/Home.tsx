import { useState } from 'react'
import AllFriends from './all/AllFriends';
import BlockedList from './blocked/BlockedList';
import classes from './Home.module.css'
import OnlineList from './online/OnlineList';
import PendingList from './pending/PendingList';
import PeopleList from './people/PeopleList';

function Home() {
    const [buttons, setButton] = useState(1);
    
    return <div className={classes.home}>
        <input type="text" placeholder="  Search..." />
        <div className={classes.navBar}>
            <button onClick={()=>setButton(1)}> Online </button>
            <button onClick={()=>setButton(2)}> All Friends </button>
            <button onClick={()=>setButton(3)}> Pending </button>
            <button onClick={()=>setButton(4)}> Blocked </button>
            <button onClick={()=>setButton(5)}> People </button>
        </div>
        {buttons === 1 ?<OnlineList /> : null}
        {buttons === 2 ? <AllFriends/> : null}
        {buttons === 3 ? <PendingList/> : null}
        {buttons === 4 ? <BlockedList/> : null}
        {buttons === 5 ? <PeopleList/> : null}

    </div>
}
export default Home