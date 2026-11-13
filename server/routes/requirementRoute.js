import {Router} from "express"
import {protect} from "../middlewares/auth.js"
import requirementModel from "../model/requirementModel.js"

const router=Router()
router.post("/post",protect,authorize("buyer","dealer"),requirementModel)
export default router