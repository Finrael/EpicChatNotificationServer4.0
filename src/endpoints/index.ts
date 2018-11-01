
import addExtraInfo from './registerUserCompInfo'
import setLanguage from './setLanguage'
import getContacts from './getContacts'
import addContacts from './addContacts'
import getAvailableContacts from './getAvailableContacts'
import getConversation from './getConversation';
import getMessages from './getMessages';
import messages from './message'
import convID from './getConversationId';
import {Router} from 'express'
const router = Router();


router.use(addExtraInfo);
router.use(setLanguage);
router.use(getContacts)
router.use(addContacts)
router.use(getAvailableContacts);
router.use(getConversation);
router.use(getMessages);
router.use(messages);
router.use(convID);
export default router;

