import { Router } from "express";
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    patchContactController,
    deleteContactByIdController
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateCreateContact } from '../middlewares/validateCreateContact.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', validateCreateContact, ctrlWrapper(createContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactByIdController));

export default router;
