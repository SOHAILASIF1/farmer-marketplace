import {Router} from "express"
import { createProductSeller } from "../controllers/productController.js"
import { protect } from "../middlewares/auth.js"
import { authorize } from "../middlewares/role.js"
const router=Router()
router.post("/createPostSeller",protect,authorize("farmer","dealer"),createProductSeller)
export default router