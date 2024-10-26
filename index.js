import { saveSettingsDebounced } from '../../../../script.js';
import { extension_settings, renderExtensionTemplate } from '../../../extensions.js';

const MODULE_NAME = 'SillyTavern-ConsolidateMessages';

const settings = {
    enabled: true
};

/**
 * Consolidate consecutive messages in the chat array based on the name of the sender.
 * @param {object[]} chat Array of chat messages
 * 
 * A chat message object has the following properties: name, message
 * 
 * The chat array is modified in place.
 */
function joinMessages(chat) {
    if (!settings.enabled) {
        return;
    }
    console.debug('Consolidating messages, message count before:', chat.length);
    for (let i = 0; i < chat.length - 1; i++) {
        if (chat[i].name === chat[i + 1].name) {
            chat[i].message += '\n' + chat[i + 1].message;
            chat.splice(i + 1, 1);
            i--;
        }
    }
    console.debug('Consolidating messages; message count after: ' + chat.length);
}

window['ConsolidateMessages_joinMessages'] = joinMessages;

jQuery(async () => {
    if (!extension_settings.consolidate_messages) {
        extension_settings.consolidate_messages = settings;
    }

    Object.assign(settings, extension_settings.consolidate_messages);

    $('#extensions_settings2').append(renderExtensionTemplate('third-party/' + MODULE_NAME, 'settings'));

    $('#consolidate_messages_enabled').prop('checked', settings.enabled).on('input', () => {
        settings.enabled = !!$('#consolidate_messages_enabled').prop('checked');
        Object.assign(extension_settings.consolidate_messages, settings);
        saveSettingsDebounced();
    });
});
