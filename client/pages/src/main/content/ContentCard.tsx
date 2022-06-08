import { Route, Switch } from 'react-router';
import Channels from '../../pages/channels/Channels';
import { DataChannelProvider } from '../../pages/channels/data_context/data-context';
import { DataContexProvider } from '../../pages/friends/data_context/data-context';
import Friends from '../../pages/friends/Friends';
import Home from '../../pages/home/Home';
import classes from './ContentCard.module.css'

function ContentCard() {
    return (<div className={classes.content} >
        <div className={classes.card}>
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
            </Switch>
        </div>
    </div>)

}
export default ContentCard;