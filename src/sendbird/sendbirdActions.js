import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';
import { sendBirdAPICreds } from '../utils/constants';

export const sbConnect = async (userId, nickname) => {
    console.log('userId', userId)
    if(!userId){
        return
    }
    const sb = SendbirdChat.init({
        appId: sendBirdAPICreds.apiKey,
        modules: [
            new GroupChannelModule(),
        ],
    });
    try {
        const user = await sb.connect(String(userId));
        console.log('usersendbird', user);
        resolve('sendbird connected....')
    } catch (error){
        reject('Error connecting Sendbird!!!')
    }

}