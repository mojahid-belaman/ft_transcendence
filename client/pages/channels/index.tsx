import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ChannelsComponent from '../../components/channelsComponents/Channels';
import { DataChannelProvider } from '../../components/channelsComponents/data_context/data-context';
import ParticleBackground from '../../components/gameComponents/ParticleBackground';
import MainApp from '../../components/main/MainApp';

function Channels() {

    const history = useRouter();

	const authHandler = async () => {
		const token = Cookies.get("access_token")
		if (token)
			await axios.get("http://localhost:5000/auth/isAuthorized", {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			}).then(res => {
				return;
			})
			.catch(err => {
			history.push("/login")
			})
		else
			history.push("/login")
	}

	useEffect(() => {
		authHandler();
	}, []);

    return (
        <MainApp>
			{/* <ParticleBackground/> */}
            <DataChannelProvider>
                <ChannelsComponent />
            </DataChannelProvider>
        </MainApp>)
}

export default Channels;