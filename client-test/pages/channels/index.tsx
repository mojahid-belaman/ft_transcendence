import ChannelsComponent from '../../components/channelsComponents/Channels';
import { DataChannelProvider } from '../../components/channelsComponents/data_context/data-context';
import MainApp from '../../components/main/MainApp';

function Channels() {

    return (
        <MainApp>
            <DataChannelProvider>
                <ChannelsComponent />
            </DataChannelProvider>
        </MainApp>)
}

export default Channels;