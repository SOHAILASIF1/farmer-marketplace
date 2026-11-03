import {Router} from "express"
import { createProductSeller, getAllProducts, getProductById } from "../controllers/productController.js"
import { protect } from "../middlewares/auth.js"
import { authorize } from "../middlewares/role.js"
const router=Router()
router.post("/createPostSeller",protect,authorize("farmer","dealer"),createProductSeller)
router.get("/",getAllProducts)
router.get("/:id",getProductById)
export default router
