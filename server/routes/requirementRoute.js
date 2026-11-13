import {Router} from "express"
import {protect} from "../middlewares/auth.js"
// import requirementModel from "../model/requirementModel.js"
import { authorize } from "../middlewares/role.js"
import { createRequirement } from "../controllers/requirementController.js"

const router=Router()
router.post("/post",protect,authorize("buyer","dealer"),createRequirement)
export default router