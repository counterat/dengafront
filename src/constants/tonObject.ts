import { TonConnectUI } from '@tonconnect/ui';

export const ton = new TonConnectUI({
    manifestUrl: 'https://api.bebracoin.com/tonconnect-manifest.json',
    actionsConfiguration:{
        modals : ['before', 'success', 'error'],
        notifications: ['before', 'success', 'error']
    }
});
