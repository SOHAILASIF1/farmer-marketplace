import {Router} from "express"
import { createProductSeller, deleteProduct, getAllProducts, getMyProducts, getProductById, updateProduct } from "../controllers/productController.js"
import { protect } from "../middlewares/auth.js"
import { authorize } from "../middlewares/role.js"
const router=Router()
router.post("/createPostSeller", protect, authorize("farmer", "dealer"), createProductSeller);
router.get("/", getAllProducts);
router.delete("/:id",protect,authorize("farmer","dealer"),deleteProduct)
router.patch("/:id",protect,authorize("farmer","dealer"),updateProduct)
router.get("/getMyProducts", protect, authorize("farmer", "dealer"), getMyProducts);  // /:id se PEHLE
router.get("/:id", getProductById);
   // hamesha sabse neeche
export default router
