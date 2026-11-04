import {Router} from "express"
import { createProductSeller, getAllProducts, getMyProducts, getProductById } from "../controllers/productController.js"
import { protect } from "../middlewares/auth.js"
import { authorize } from "../middlewares/role.js"
const router=Router()
router.post("/createPostSeller", protect, authorize("farmer", "dealer"), createProductSeller);
router.get("/", getAllProducts);
router.get("/getMyProducts", protect, authorize("farmer", "dealer"), getMyProducts);  // /:id se PEHLE
router.get("/:id", getProductById);   // hamesha sabse neeche
export default router
