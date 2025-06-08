import express from "express";
import { upload } from "../service/cloudinary.js";
import {  deleteFood, FetchFood, getfoodById, updateFood, uploadFood } from "../controllers/productController.js";
import { changePasswordByEmail, CheckLogedInUser, login, logout, register, ResendOTP, sendOtp, verifyOtp } from "../controllers/authController.js";
import { InformationSolutionDetails, InformationSolutionDetailsDelete, InformationSolutionDetailsFetch, InformationSolutionDetailsUpdate } from "../controllers/solutionAnyProblemInformationController.js";
import {RecentBlogController, RecentBlogDetailsDelete, RecentBlogDetailsFetch, RecentBlogDetailsUpdate } from "../controllers/recentBlogController.js";
import { FeatureWorkUpdate, OurFeatureWorkDelete, OurFeatureWorkFetch, OurFeatureWorkSchema } from "../controllers/ourFeaturedWorkController.js";
import { ChooseUsDelete, ChooseUsFetch, ChooseUsSchema, ChooseUsUpdate } from "../controllers/chooseUsController.js";
import { FooterDetailsDelete, FooterDetailsFetch, FooterDetailsUpdate, FooterPost } from "../controllers/footerController.js";
import { ClientSay, ClientsSayDetailsDelete, ClientsSayDetailsFetch, ClientsSayDetailsUpdate } from "../controllers/clientSayController.js";
import { addToCart, getCartItem, removeFromcart } from "../controllers/cartController.js";

const router = express.Router();

// image upload Cloudnary routes
router.post("/upload/blog",upload.single('image'),uploadFood);
router.get("/fetch/blog",FetchFood);
router.get("/fetch/blog/:id",getfoodById);
router.delete("/delete/blog/:id",deleteFood);
router.put('/update/blog/:id', upload.single('image'), updateFood);

// auth routes
router.post("/send-otp",sendOtp);
router.post("/verify-otp",verifyOtp);
router.post("/reset-password",changePasswordByEmail);
router.post("/register",upload.single('image'),register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/check-user",CheckLogedInUser);
router.post("/resend-otp",ResendOTP);


router.post("/add-to-cart",addToCart);
router.get("/get-cart-item",getCartItem);
router.delete("/delete-cart-item/:id",removeFromcart);



// services routes
router.post("/information-details-post",upload.single('image'),InformationSolutionDetails);
router.post("/recent-blog",upload.single('image'),RecentBlogController);
router.get("/Information-Details-fetch/:id",upload.single('image'),InformationSolutionDetailsFetch);
router.delete("/Information-Details-delete/:id",upload.single('image'),InformationSolutionDetailsDelete);
router.put("/Information-Details-update/:id",upload.single('image'),InformationSolutionDetailsUpdate);

// Recent Blog API
router.post("/recent-blog-post",upload.single('image'),RecentBlogController);
router.get("/recent-blog-fetch",upload.single('image'),RecentBlogDetailsFetch);
router.delete("/recent-blog-delete/:id",upload.single('image'),RecentBlogDetailsDelete);
router.put("/recent-blog-update/:id",upload.single('image'),RecentBlogDetailsUpdate);

// Our Feature Work API
router.post("/feature-work-post",upload.single('image'),OurFeatureWorkSchema);
router.get("/feature-work-fetch",upload.single('image'),OurFeatureWorkFetch);
router.delete("/feature-work-delete/:id",upload.single('image'),OurFeatureWorkDelete);
router.put("/feature-work-update/:id",upload.single('image'), FeatureWorkUpdate);

// Choose Us API
router.post("/choose-us-post",upload.single('image'),ChooseUsSchema);
router.get("/choose-us-fetch",upload.single('image'),ChooseUsFetch);
router.delete("/choose-us-delete/:id",upload.single('image'),ChooseUsDelete);
router.put("/choose-us-update/:id",upload.single('image'), ChooseUsUpdate);

// Footer API
router.post("/footer-post",upload.single('image'),FooterPost);
router.get("/footer-fetch",upload.single('image'),FooterDetailsFetch);
router.delete("/footer-delete/:id",upload.single('image'),FooterDetailsDelete);
router.put("/footer-update/:id",upload.single('image'), FooterDetailsUpdate);

// Client Say API
router.post("/clientsay-post",upload.single('image'),ClientSay);
router.get("/clientsay-fetch",upload.single('image'),ClientsSayDetailsFetch);
router.delete("/clientsay-delete/:id",upload.single('image'),ClientsSayDetailsDelete);
router.put("/clientsay-update/:id",upload.single('image'), ClientsSayDetailsUpdate);

export default router;


