import express from 'express'
import { loginController, RegisterController, testController } from '../controllers/authController.js';
import { createSubscription, deleteSubscriptions, getAllSubscriptions, updateSubscription } from '../controllers/subscriptionsController.js';
import { isAdmin, isSignedIn } from '../middlewares/atuhMiddleware.js';
import { createMonthlyPlans, updateMonthlyPlan ,deleteMonthlyPlan, getAllMonthlySubscriptions} from '../controllers/monthlyController.js';
import { Subscriptions } from '../models/subscriptionSchema.js';
import { addSubscription, getSubscriptionDetails } from '../controllers/subscribersController.js';
const router = express.Router();
// Register Route
router.post('/register',RegisterController)
// Login route
router.post('/login',loginController)


// for Subscriptions plans

//add new subscription
router.post('/create-subscription',isSignedIn,isAdmin,createSubscription);
// update subscription
router.put('/update-subscription/:id',isSignedIn,isAdmin,updateSubscription)
// get all subscription
router.get('/get-subscription',isSignedIn,isAdmin,getAllSubscriptions)
//delete subscriptions 
router.delete('/delete-subscription/:id',isSignedIn,isAdmin,deleteSubscriptions)


//for monthly plans

//add new monthly-plan for specific subscription
router.post('/create-monthlyPlan',isSignedIn,isAdmin,createMonthlyPlans)
// updating the monthly-plans
router.put('/update-monthlyPlan/:id',isSignedIn,isAdmin,updateMonthlyPlan)
// deleting the monthly-plan
router.delete('/delete-monthlyPlan/:id',isSignedIn,isAdmin,deleteMonthlyPlan)
//get all monthly plans
router.get('/getAll-MonthlyPlans/:id',isSignedIn,getAllMonthlySubscriptions)


// for subscribers 

//add subscription to the user 
router.put ('/create-newSubscriber/:id',isSignedIn,addSubscription)
// get current subscription details
router.get('/getCurrentSubscriptions/:id',isSignedIn,getSubscriptionDetails)

//testing
router.get('/test',isSignedIn,isAdmin,testController);

export default router