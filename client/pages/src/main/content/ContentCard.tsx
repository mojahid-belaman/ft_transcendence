import { Route, Switch } from 'react-router';
import LiveGame from '../../Components/LiveGame';
import Channels from '../../pages/channels/Channels';
import { DataChannelProvider } from '../../pages/channels/data_context/data-context';
import { DataContexProvider } from '../../pages/friends/data_context/data-context';
import Friends from '../../pages/friends/Friends';
import PingPong from '../../pages/game/PingPong';
import Home from '../../pages/home/Home';
import Profile from '../../pages/profile/Profile';
import Settings from '../../pages/Settings/settings';
import classes from './ContentCard.module.css'
{/* <div className={classes.content} > */}
function ContentCard() {
    return ( <div className={classes.card}>
            <Switch>
                <Route path='/' exact >
                    <Home />
                </Route>
                <Route path='/chat'>
                    <DataContexProvider>
                        <Friends />
                    </DataContexProvider>
                </Route>
                <Route path='/channels'>
                    <DataChannelProvider>
                        <Channels />
                    </DataChannelProvider>
                </Route>
                <Route path="/game">
                    <PingPong />
                </Route>
                {/* <Route path="/liveGame">
                   <LiveGame /> 
                </Route> */}
                <Route path="/settings">
                    <Settings/>
                </Route>
                <Route path="/profile">
                    <Profile/>
                </Route>
            </Switch>
        </div>)
    {/* </div> */}

}
export default ContentCard;