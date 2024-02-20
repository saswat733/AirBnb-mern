import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/user.models.js"
import uploadOnCloudinary from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import { Place } from "../models/place.models.js"
// const registerUser= asyncHandler(async (req,res)=>{
//     // step-1: get user detail from frontend
//     // step-2: validation whether the provided details are correct
//     // step-3: check if user already exists: either using username or email
//     // step-4: check for images,check for avatar
//     // step-5: if available then upload it on cloudinary
//     // create user object - create entry in DB
//     // remove password and refresh token field from response
//     // check for user creation
//     // return response

//     const {fullname,username,email,password}=req.body
//     console.log("email",email)
//     // if(fullname===""){
//     //     throw new ApiError(400,"fullname is required")
//     // }
//     // if(username===""){
//     //     throw new ApiError(400,"username is required")
//     // }
//     // if(email===""){
//     //     throw new ApiError(400,"email is required")
//     // }
//     // if(password===""){
//     //     throw new ApiError(400,"password is required")
//     // }

//     if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
//         throw new ApiError(400, "All fields are required");
//     }

//     //checks if the user already exists or not
//     const existedUser= await User.findOne({
//         $or: [{username},{email}]
//     })

//     if(existedUser){
//         throw new ApiError(409,"user is already registered")
//     }

//     //taking the images local path
//     const avatarLocalPath = req.files?.avatar[0]?.path;
//     const coverImageLocalPath=req.files?.coverImage[0]?.path;

//     if(!avatarLocalPath){
//         throw new ApiError(400,"Avatar file is required")
//     }


//     //uploading on cloudinary
//     const avatar = await uploadOnCloudinary(avatarLocalPath)

//     const coverImage = await uploadOnCloudinary(coverImageLocalPath)

//     if(!avatar){
//         throw new ApiError(400,"Avatar file is required")
//     }


//     //creating user
//     const user=await User.create({
//         fullname,
//         avatar:avatar.url,
//         coverImage:coverImage?.url || "",
//         email,
//         password,
//         username:username.toLowerCase(),
//     })

//     //checking is the user is created or not
//     const createdUser=await User.findById(user._id).select(
//         "-password -refreshToken"
//     )

//     if(!createdUser){
//         throw new ApiError(500,"Something went wrong while registering the user")
//     }


//     return res.status(201).json(
//         new ApiResponse(200,createdUser,"user created successfully")
//     )



// })

const generateAccessAndRefreshToken = async (userId) => {
    try {
        // find user on id basis
        const user = await User.findById(userId);

        if (!user) {
            console.log("User not found");
            throw new ApiError(404, "User not found");
        }

        // generate refresh and access token
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // store refresh token in the database
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error in generateAccessAndRefreshToken:", error);
        throw new ApiError(500, `Something went wrong: ${error.message}`);
    }

};
const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;

    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if the user already exists
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existedUser) {
        throw new ApiError(409, "User is already registered");
    }

    // Convert username to lowercase if it's defined
    const lowerCaseUsername = username ? username.toLowerCase() : undefined;

    // Create user
    const user = await User.create({
        fullname,
        email,
        password,
        username: lowerCaseUsername,
    });

    // Check if the user is created
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));
});


const loginUser = asyncHandler(async (req, res) => {
    //bring the data from req body
    //username or email
    //find the user 
    //password check
    //accesss and refresh token
    //send cookies

    const { username, email, password } = req.body;

    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "all fields are required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })


    if (!user) {
        throw new ApiError(400, 'user not found');
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, 'invalid user credentials');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken')

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(
        200,
        {
            user:loggedInUser,accessToken,
            refreshToken
        },
        "User logged in successfully"
    ))
})


const logoutUser = asyncHandler(async (req, res) => {
    console.log('hello bhai');
    try {
        // Update user document to remove refreshToken field
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            { new: true }
        );

        // Options for cookie clearing
        const options = {
            httpOnly: true,
            secure: true
        };

        // Clear access token and refresh token cookies
        res.clearCookie("accessToken", options);
        res.clearCookie("refreshToken", options);

        // Send JSON response indicating successful logout
        res.status(200).json(new ApiResponse(200, {}, "User logged out"));
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error logging out:", error);
        res.status(500).json(new ApiResponse(500, {}, "Error logging out"));
    }
});



//refresh tokens are saved in database and acces token are with user and it expires in specific time so we send request end point inorder to refresh the access token

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )


        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken, refreshToken: newRefreshToken
                    },
                    "Access Token refreshed"
                )
            )


    } catch (error) {
        throw new ApiError(401, error?.message || "invalid refresh token")
    }


})


const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    console.log(oldPassword)
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword

    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password Changed Successfully"))
})


const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "current user fetched successfully"))
    // return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));
})

const getAllLocationPhotos = asyncHandler(async (req, res) => {
    const places=await Place.find();

    res.status(200).json({success:true,data:places})

});

const getAddedLocations = asyncHandler(async (req, res) => {
    // Fetch all added locations from the database
    const locations = await Place.find();

    // Check if locations were found
    if (!locations || locations.length === 0) {
        throw new ApiError(404, "No locations found");
    }

    // Send the locations as the response data
    return res.status(200).json(new ApiResponse(200, locations, "All locations fetched successfully"));
});


const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body

    if (!fullname || !email) {
        throw new ApiError(400, "all fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,
                email: email
            }
        },
        { new: true }
    ).select("-password")


    return res.status(200)
        .json(new ApiResponse(200,
            req.user,
            "Account Details udpdated succesfully"))
})


const addLocationForm = asyncHandler(async (req, res) => {
    const { title, address, description, extraInfo, checkIn, checkOut, maxGuests, perks, photos,price } = req.body;

    // Check if any required fields are empty
    if ([title, address, description, checkIn, checkOut, maxGuests].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if photos array is missing or empty
    if (!photos || photos.length === 0) {
        throw new ApiError(400, "Photos for location missing.");
    }

    // Create new location
    const newLocation = await Place.create({
        title,
        address,
        description,
        photos,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        perks, // Assuming perks is already an array
        price
    });

    // Find the newly created location
    const createdLocation = await Place.findById(newLocation._id);

    if (!createdLocation) {
        throw new ApiError(400, 'Something went wrong while creating new location');
    }

    return res.status(200).json(new ApiResponse(200, createdLocation, "Location created successfully."));
});

const singleLocation = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; // Ensure to use the correct parameter name
        console.log('ID:', id); // Log the received ID
        
        const singlePlace = await Place.findById(id);
        
        if (!singlePlace) {
            console.log('Place not found');
            return res.status(404).json({ error: 'Place not found' });
        }
        
        console.log('Found place:', singlePlace); // Log the found place
        return res.json(singlePlace);
    } catch (error) {
        console.error('Error in singleLocation controller:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


export {
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    refreshAccessToken,
    updateAccountDetails,
    addLocationForm,
    getAddedLocations,
    getAllLocationPhotos,
    singleLocation
    
}




// registerUser:
//     Handles user registration.
//     Validates required fields (fullname, email, username, password).
//     Checks if the user already exists.
//     Uploads avatar and cover image to Cloudinary.
//     Creates a new user in the database.
//     Returns a JSON response with the created user data.

// loginUser:
//     Handles user login.
//     Validates whether either username or email is provided.
//     Finds the user based on the provided username or email.
//     Checks the password validity.
//     Generates access and refresh tokens.
//     Sets cookies with the tokens.
//     Returns a JSON response with the logged-in user data.

// logoutUser:
//     Handles user logout.
//     Clears the access and refresh tokens cookies.
//     Returns a JSON response indicating successful logout.

// refreshAccessToken:
//     Handles the refresh of the access token using the provided refresh token.
//     Verifies the incoming refresh token.
//     Generates a new access token and refresh token pair.
//     Sets cookies with the new tokens.
//     Returns a JSON response with the new tokens.

// changeCurrentPassword:
//     Handles the change of the current user's password.
//     Validates the old password.
//     Updates the password in the database.
//     Returns a JSON response indicating successful password change.

// getCurrentUser:
//     Returns the current user's data.
//     Excludes sensitive information like the password and refresh token.
//     Returns a JSON response with the current user's data.

// updateAccountDetails:
//     Handles the update of the current user's account details (fullname and email).
//     Validates that both fields are provided.
//     Updates the user's details in the database.
//     Returns a JSON response indicating successful account details update.

// updateUserAvatar and updateUserCoverImage:
//     Handle the update of the current user's avatar and cover image, respectively.
//     Uploads the new image to Cloudinary.
//     Updates the user's profile with the new image URL.
//     Returns a JSON response indicating successful image update.

// getUserchannelProfile:
//     Fetches the profile of a user's channel based on the provided username.
//     Uses MongoDB's aggregation pipeline to gather information about the user and their subscribers.
//     Returns a JSON response with the user's channel profile.