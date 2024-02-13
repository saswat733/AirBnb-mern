import {Router} from "express"
import { changeCurrentPassword, getCurrentUser, getUserchannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails } from "../controllers/user.controller.js"
// import { upload } from "../middleware/multer.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
// import { verify } from "jsonwebtoken"
const router=Router()

router.route("/register").post(registerUser)


router.route("/login").post(loginUser)


//secured routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/changePassword").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)
// router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
// router.route("/cover-image").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)
router.route("/c/:username").get(verifyJWT,getUserchannelProfile)
router.route("/watch-history").get(verifyJWT,getWatchHistory)

export default router