import { Router } from "express";
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    patchContactController,
    deleteContactByIdController,
    upsertContactController
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.ADMIN), ctrlWrapper(getContactsController));
router.get('/:contactId', checkRoles(ROLES.ADMIN, ROLES.USER), isValidId, ctrlWrapper(getContactByIdController));
router.post('/', checkRoles(ROLES.ADMIN), validateBody(createContactSchema), ctrlWrapper(createContactController));
router.put('/:contactId', checkRoles(ROLES.ADMIN), isValidId, validateBody(createContactSchema), ctrlWrapper(upsertContactController),);
router.patch('/:contactId', checkRoles(ROLES.ADMIN, ROLES.USER), validateBody(updateContactSchema), ctrlWrapper(patchContactController));
router.delete('/:contactId',  checkRoles(ROLES.ADMIN), isValidId, ctrlWrapper(deleteContactByIdController));

export default router;