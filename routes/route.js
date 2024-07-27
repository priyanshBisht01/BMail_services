import express from 'express'
import { loginController, RegisterController, testController } from '../controllers/authController.js';
import { createSubscription, deleteSubscriptions, getAllSubscriptions, updateSubscription } from '../controllers/subscriptionsController.js';
import { isAdmin, isSignedIn } from '../middlewares/atuhMiddleware.js';
import { createMonthlyPlans, updateMonthlyPlan ,deleteMonthlyPlan, getAllMonthlySubscriptions} from '../controllers/monthlyController.js';
import { Subscriptions } from '../models/subscriptionSchema.js';
import { addSubscription, deleteUserSubscription, getSubscriptionDetails } from '../controllers/subscribersController.js';
import { sendEmail } from '../helper/emailSender.js';
import { createEmailServices, deleteEmailservices, getAllEmailServices, updateEmailServices } from '../controllers/emailServiceController.js';
import { createEmailMonthlyPlans, deleteEmailMonthlyPlan, getAllEmailMonthlySubscriptions, updateEmailMonthlyPlan } from '../controllers/emailServicesMonthlyController.js';
import { addemailServiceSubscription, deleteUserEmailSubscription, getEmailSubscriptionDetails } from '../controllers/emailServicesSubscriberController.js';
import { createVpsHosting, deleteVpsHosting, getAllVpsHosting, updateVpsHosting } from '../controllers/vpsHostingController.js';
import { createVpsHostingMonthlyPlans, deleteVpsHostingMonthlyPlan, getVpsHostingMonthlyPlan, updateVpsHostingMonthly } from '../controllers/vpsHostingMonthlyPlanController.js';
import { addVpsSubscription, deleteUserVpsSubscription, getVpsSubscriptionDetails } from '../controllers/vpsHostingSubscriberController.js';
const router = express.Router();
const vpsMonthlyRouter = express.Router()
const vpsSubscriber = express.Router()
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
// delete subscription of the user
router.delete('/deleteSubscription/:id',isSignedIn,deleteUserSubscription)

//for email services admin

// for creating email services
router.post('/create-emailServices',isSignedIn,isAdmin,createEmailServices)
// for updating email services
router.put('/update-emailServices/:id',isSignedIn,isAdmin,updateEmailServices)
//for getting all email services
router.get('/getAll-emailServices',isSignedIn,isAdmin,getAllEmailServices)
// for deleting email services
router.delete('/delete-emailServices/:id',isSignedIn,isAdmin,deleteEmailservices)

//for email services monthly plan admin

// for creating monthly plan for specific email services
router.post('/create-emailMontlyPlan',isSignedIn,isAdmin,createEmailMonthlyPlans)
//for updating monthly plan 
router.put('/update-emailMonthlyPlan/:id',isSignedIn,isAdmin,updateEmailMonthlyPlan)
//for deleting the monthly plan
router.delete('/delete-emailMonthlyPlan/:id',isSignedIn,isAdmin,deleteEmailMonthlyPlan);
// for getting all monthly plan for specific subscription
router.get('/get-emailMonthlyServicesPlan/:id',isSignedIn,getAllEmailMonthlySubscriptions);


// for subscriber [email Services]

// add subscriber
router.put('/create-UserEmailService/:id',isSignedIn,addemailServiceSubscription)
// get detail of the plan
router.get('/get-UserEmailService/:id',isSignedIn,getEmailSubscriptionDetails)
// deleting or canceling plan
router.delete('/delete-UserEmailServices/:id',isSignedIn,deleteUserEmailSubscription);


// vps hosting 

//create vps hosting plan
router.post('/create-vpsHosting',isSignedIn,isAdmin,createVpsHosting)
// updating the hostiing plan
router.put('/update-vpsHosting/:id',isSignedIn,isAdmin,updateVpsHosting)
// for getting all plans
router.get('/getAll-vpsHosting',isSignedIn,isAdmin,getAllVpsHosting)
// for deleting vps Hosting plan
router.delete('/delete-vpsHosting/:id',isSignedIn,isAdmin,deleteVpsHosting) 



// vps hosting monthly plan
vpsMonthlyRouter.post('/createMonthlyplan-vpsHosting',isSignedIn,isAdmin,createVpsHostingMonthlyPlans)
vpsMonthlyRouter.put('/updateMonthlyPlan-vpsHosting/:id',isSignedIn,isAdmin,updateVpsHostingMonthly )
vpsMonthlyRouter.delete('/deleteMonthlyPlan-vpsHosting/:id',isSignedIn,isAdmin,deleteVpsHostingMonthlyPlan)
vpsMonthlyRouter.get('/getMonthly-vpsHosting/:id',isSignedIn,getVpsHostingMonthlyPlan)


//for subscriber to subscribe the vps hosting 

vpsSubscriber.put('/create-vpsSubscriber/:id',isSignedIn,addVpsSubscription)
vpsSubscriber.get('/get-vpsSubsciption/:id',isSignedIn,getVpsSubscriptionDetails)
vpsSubscriber.put('/delete-vpsSubsciber/:id',isSignedIn,deleteUserVpsSubscription)
// email testing 
// router.get('/email',sendEmail)
//testing
router.get('/test',isSignedIn,isAdmin,testController);

export  {router,vpsMonthlyRouter,vpsSubscriber}