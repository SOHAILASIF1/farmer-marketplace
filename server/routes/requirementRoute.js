import {Router} from "express"
import {protect} from "../middlewares/auth.js"
// import requirementModel from "../model/requirementModel.js"
import { authorize } from "../middlewares/role.js"
import { closeRequirement, createRequirement, deletRequirement, getAllRequirement, getMyRequirement } from "../controllers/requirementController.js"

const router=Router()
router.post("/post",protect,authorize("buyer","dealer"),createRequirement)
router.get("/",protect,authorize("farmer","dealer"),getAllRequirement)
router.get("/my",protect,authorize("buyer","dealer"),getMyRequirement)
router.patch("/:id/close",protect,authorize("buyer","dealer",closeRequirement))
router.delete("/:id",protect,authorize("buyer","dealer"),deletRequirement)
export default router