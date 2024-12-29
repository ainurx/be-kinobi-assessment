import { Router } from "express";

// import { login } from "../controller/adminController";
// import { createAuthor, findAuhor, deleteAuthor, updateAuthor } from "../controller/authorController";
import userAuth from "../middleware/userAuth";
import userHandler from "../handler/userHandler";
import userImageHandler from "../handler/userImageHandler";
import { uploadImage } from "../common/util";

const router = Router()

router.post('/signup', userHandler.signup)
router.post('/signin', userHandler.signin)

router.get('/images', userAuth.validateToken, userImageHandler.findUserImages)
router.post('/image', userAuth.validateToken, uploadImage.single('image'),  userImageHandler.uploadImage)

// router.post('/author', createAuthor)
// router.get('/authors', findAuhor)
// router.delete('/author/:id', deleteAuthor)
// router.put('/author/:id', updateAuthor)

export default router