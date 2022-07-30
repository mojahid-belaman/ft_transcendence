import Friends from "../../components/chatComponents/Friends";
import MainApp from "../../components/main/MainApp";
import { DataContexProvider } from '../../components/chatComponents/data_context/data-context';

function chat() {

    return (
        <MainApp>
            <DataContexProvider>
                <Friends />
            </DataContexProvider>
        </MainApp>)
}

export default chat;