import { useState } from 'react'
import AllFriends from '../../home_components/all/AllFriends';
import BlockedList from '../../home_components/blocked/BlockedList';
import OnlineList from '../../home_components/online/OnlineList';
import PendingList from '../../home_components/pending/PendingList';
import PeopleList from '../../home_components/people/PeopleList';
import MainApp from '../../main/MainApp';
import classes from './Home.module.css'

function Home() {
    const [buttons, setButton] = useState(1);

    return (<MainApp>
        <div className={classes.home}>
            <input type="text" placeholder="  Search..." />
            <div className={classes.navBar}>
                <button onClick={() => setButton(1)}> Online </button>
                <button onClick={() => setButton(2)}> All Friends </button>
                <button onClick={() => setButton(3)}> Pending </button>
                <button onClick={() => setButton(4)}> Blocked </button>
                <button onClick={() => setButton(5)}> People </button>
            </div>
            {buttons === 1 ? <OnlineList /> : null}
            {buttons === 2 ? <AllFriends /> : null}
            {buttons === 3 ? <PendingList /> : null}
            {buttons === 4 ? <BlockedList /> : null}
            {buttons === 5 ? <PeopleList /> : null}
        </div>
    </MainApp>)
}
export default Home