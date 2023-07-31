import Home from "./pages/home";
import {
    CREATE_JOB_ROUTE,
    GOOGLE_ROUTE,
    HOME_ROUTE,
    JOB_ROURE,
    REGISTRATION_ROUTE,
    SETTINGS_ROUTE,
    SIGNIN_ROUTE,
    BID_ROUTE,
    FREELANCER_JOB_ROUTE,
    EMPLOYER_JOB_ROUTE,
    NOTIFICATION_ROUTE,
} from "./utils/consts";
import Settings from "./pages/settings";
import SignIn from "./pages/signIn";
import Registration from "./pages/registration";
import {googleSuccess} from "./components/auth/google/googleHooks";
import createJobPage from "./pages/createJob";
import jobPage from "./pages/job";
import BidsPage from "./pages/bids";
import freelancerJobs from "pages/frelancerJobs";
import employerJobs from "pages/employerJobs";
import notificationPage from "pages/notification";




export const authRoutes = [
    {
        path: SETTINGS_ROUTE,
        Element: Settings
    },
    {
        path: CREATE_JOB_ROUTE,
        Element: createJobPage
    },
    {
        path: BID_ROUTE ,
        Element: BidsPage
    },
    {
        path: FREELANCER_JOB_ROUTE,
        Element: freelancerJobs
    },
    {
        path: EMPLOYER_JOB_ROUTE,
        Element: employerJobs
    },
    {
        path: NOTIFICATION_ROUTE,
        Element: notificationPage
    }
]
export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Element: Home
    },
    {
        path: SIGNIN_ROUTE,
        Element: SignIn
    },
    {
        path: REGISTRATION_ROUTE,
        Element: Registration
    },
    {
        path: GOOGLE_ROUTE,
        Element: googleSuccess
    },
    {
        path: JOB_ROURE + '/:id',
        Element: jobPage
    },
]

