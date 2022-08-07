import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ChannelsComponent from '../../components/channelsComponents/Channels';
import { DataChannelProvider } from '../../components/channelsComponents/data_context/data-context';
import MainApp from '../../components/main/MainApp';

function Channels() {
	const history = useRouter();
	const token = Cookies.get("access_token");
	const tempToken = Cookies.get('2fa_token');
	
	const authHandler = async () => {
		if(tempToken)
				history.push('/twoFactorAuth')
		else if (token)
			  await axios.get("http://localhost:5000/auth/isAuthorized", {
				  headers: {
					  Authorization: `Bearer ${token}`,
				  }
				  }).then(() => {
					  return;
				  })
				  .catch(err => {
					history.push("/");
				})
		else
		  history.push('/');
		}

	useEffect(() => {
		authHandler();
	}, []);
    return (
        <MainApp>
            <DataChannelProvider>
                <ChannelsComponent />
            </DataChannelProvider>
        </MainApp>)
}

export default Channels;