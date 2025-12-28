
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** Aura Clean
- **Date:** 2025-12-26
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001
- **Test Name:** Home Page Load and Content Display
- **Test Code:** [TC001_Home_Page_Load_and_Content_Display.py](./TC001_Home_Page_Load_and_Content_Display.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/982586ae-e107-46ae-af2d-e5da8f680618/ffdf8cdf-b5cf-4b91-9690-196ff3677eac
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002
- **Test Name:** Services Page Filtering and Service Details Display
- **Test Code:** [TC002_Services_Page_Filtering_and_Service_Details_Display.py](./TC002_Services_Page_Filtering_and_Service_Details_Display.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/982586ae-e107-46ae-af2d-e5da8f680618/7780374a-3c64-4798-b54e-b914561b7818
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003
- **Test Name:** Booking Wizard: Successful Booking Flow
- **Test Code:** [TC003_Booking_Wizard_Successful_Booking_Flow.py](./TC003_Booking_Wizard_Successful_Booking_Flow.py)
- **Test Error:** The booking wizard is stuck on step 1 and does not proceed to step 2 after clicking 'Continue'. This prevents further testing of the booking process including date/time selection, customer details entry, final confirmation, backend integration, and email notification verification. Please fix this issue to enable complete testing.
Browser Console Logs:
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/982586ae-e107-46ae-af2d-e5da8f680618/f2448ec7-aac5-4ea5-b220-d613734ae323
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004
- **Test Name:** Booking Wizard: Input Validation and Error Handling
- **Test Code:** [TC004_Booking_Wizard_Input_Validation_and_Error_Handling.py](./TC004_Booking_Wizard_Input_Validation_and_Error_Handling.py)
- **Test Error:** The booking wizard correctly prevents progression without selecting a service and disallows past date selection. However, after selecting a valid date, no available time slots appear, blocking further progression. This is a critical issue preventing completion of the booking process and validation of customer details input. Reporting this issue and stopping further testing.
Browser Console Logs:
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/982586ae-e107-46ae-af2d-e5da8f680618/e1ad8e03-eb78-420f-98ba-66f98ec443d4
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005
- **Test Name:** User Authentication: Login, Logout, and Protected Routes
- **Test Code:** [TC005_User_Authentication_Login_Logout_and_Protected_Routes.py](./TC005_User_Authentication_Login_Logout_and_Protected_Routes.py)
- **Test Error:** Login functionality failed. Unable to proceed with testing user login, protected routes, and logout functionality due to authentication failure. Please investigate the Supabase Auth integration or backend issues.
Browser Console Logs:
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at https://kxzcbeohlyidclvgwsde.supabase.co/auth/v1/token?grant_type=password:0:0)
[ERROR] TypeError: Failed to fetch
    at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7191:23
    at _handleRequest2 (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7481:20)
    at _request (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7471:22)
    at SupabaseAuthClient.signInWithPassword (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:9228:21)
    at Object.signInWithEmail (http://localhost:3000/@fs/C:/Onyx%20Web%20Systems/Portfolio/Aura%20Clean/src/lib/supabase-queries.ts:131:49)
    at handleSubmit (http://localhost:3000/@fs/C:/Onyx%20Web%20Systems/Portfolio/Aura%20Clean/src/pages/Login.tsx:41:25)
    at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3674:22)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3699:24)
    at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3733:39)
    at invokeGuardedCallbackAndCatchFirstError (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3736:33) (at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7482:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/982586ae-e107-46ae-af2d-e5da8f680618/4aaa770a-c447-4c54-9cee-50c3432b90b7
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006
- **Test Name:** User Dashboard Booking Management
- **Test Code:** [TC006_User_Dashboard_Booking_Management.py](./TC006_User_Dashboard_Booking_Management.py)
- **Test Error:** Login attempts failed due to 'Failed to fetch' error, preventing access to user dashboard and booking features. Unable to verify upcoming and past bookings, cancel bookings, or see booking status updates. Task cannot proceed further without resolving backend connectivity or server issues.
Browser Console Logs:
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at https://kxzcbeohlyidclvgwsde.supabase.co/auth/v1/token?grant_type=password:0:0)
[ERROR] TypeError: Failed to fetch
    at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7191:23
    at _handleRequest2 (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7481:20)
    at _request (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7471:22)
    at SupabaseAuthClient.signInWithPassword (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:9228:21)
    at Object.signInWithEmail (http://localhost:3000/@fs/C:/Onyx%20Web%20Systems/Portfolio/Aura%20Clean/src/lib/supabase-queries.ts:131:49)
    at handleSubmit (http://localhost:3000/@fs/C:/Onyx%20Web%20Systems/Portfolio/Aura%20Clean/src/pages/Login.tsx:41:25)
    at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3674:22)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3699:24)
    at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3733:39)
    at invokeGuardedCallbackAndCatchFirstError (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3736:33) (at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7482:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at https://kxzcbeohlyidclvgwsde.supabase.co/auth/v1/token?grant_type=password:0:0)
[ERROR] TypeError: Failed to fetch
    at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7191:23
    at _handleRequest2 (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7481:20)
    at _request (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7471:22)
    at SupabaseAuthClient.signInWithPassword (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:9228:21)
    at Object.signInWithEmail (http://localhost:3000/@fs/C:/Onyx%20Web%20Systems/Portfolio/Aura%20Clean/src/lib/supabase-queries.ts:131:49)
    at handleSubmit (http://localhost:3000/@fs/C:/Onyx%20Web%20Systems/Portfolio/Aura%20Clean/src/pages/Login.tsx:41:25)
    at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3674:22)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3699:24)
    at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3733:39)
    at invokeGuardedCallbackAndCatchFirstError (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3736:33) (at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7482:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/982586ae-e107-46ae-af2d-e5da8f680618/b646ef59-099a-4b34-aecd-95320dcef181
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007
- **Test Name:** Admin Dashboard - Booking and Message Management with Email Notifications
- **Test Code:** [TC007_Admin_Dashboard___Booking_and_Message_Management_with_Email_Notifications.py](./TC007_Admin_Dashboard___Booking_and_Message_Management_with_Email_Notifications.py)
- **Test Error:** Unable to proceed with admin verification tasks because the 'Sign In' button is not accessible. Reported the issue and stopped further actions.
Browser Console Logs:
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at https://kxzcbeohlyidclvgwsde.supabase.co/auth/v1/token?grant_type=password:0:0)
[ERROR] TypeError: Failed to fetch
    at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7191:23
    at _handleRequest2 (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7481:20)
    at _request (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7471:22)
    at SupabaseAuthClient.signInWithPassword (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:9228:21)
    at Object.signInWithEmail (http://localhost:3000/@fs/C:/Onyx%20Web%20Systems/Portfolio/Aura%20Clean/src/lib/supabase-queries.ts:131:49)
    at handleSubmit (http://localhost:3000/@fs/C:/Onyx%20Web%20Systems/Portfolio/Aura%20Clean/src/pages/Login.tsx:41:25)
    at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3674:22)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3699:24)
    at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3733:39)
    at invokeGuardedCallbackAndCatchFirstError (http://localhost:3000/node_modules/.vite/deps/chunk-276SZO74.js?v=fd8509a9:3736:33) (at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=fd8509a9:7482:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[ERROR] Failed to load resource: net::ERR_TIMED_OUT (at https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop:0:0)
[ERROR] Failed to load resource: net::ERR_TIMED_OUT (at https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/982586ae-e107-46ae-af2d-e5da8f680618/a8e2448c-787a-44a5-b553-eeacd9810c50
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008
- **Test Name:** Contact Form Validation and Email Notification
- **Test Code:** [TC008_Contact_Form_Validation_and_Email_Notification.py](./TC008_Contact_Form_Validation_and_Email_Notification.py)
- **Test Error:** Reported the website issue blocking the contact form validation and submission. The task to verify form validation, message storage in Supabase, and confirmation email sending cannot proceed due to this issue. Stopping further actions.
Browser Console Logs:
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at https://kxzcbeohlyidclvgwsde.supabase.co/rest/v1/contact_messages?select=*:0:0)
[ERROR] Contact form submission error: {message: TypeError: Failed to fetch, details: TypeError: Failed to fetch
    at http://localhost…rtfolio/Aura%20Clean/src/pages/Contact.tsx:82:25), hint: , code: } (at http://localhost:3000/@fs/C:/Onyx%20Web%20Systems/Portfolio/Aura%20Clean/src/pages/Contact.tsx:100:16)
[ERROR] Contact form error: Error: TypeError: Failed to fetch
    at Object.mutationFn (http://localhost:3000/@fs/C:/Onyx%20Web%20Systems/Portfolio/Aura%20Clean/src/pages/Contact.tsx:102:15) (at http://localhost:3000/@fs/C:/Onyx%20Web%20Systems/Portfolio/Aura%20Clean/src/pages/Contact.tsx:115:14)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/982586ae-e107-46ae-af2d-e5da8f680618/8cea9830-d06a-4361-9117-654baa68e589
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009
- **Test Name:** Responsive Design - Mobile, Tablet, Desktop Layout Consistency
- **Test Code:** [null](./null)
- **Test Error:** Test execution timed out after 15 minutes
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/982586ae-e107-46ae-af2d-e5da8f680618/c303f1fc-413d-4310-9b05-00e90310b83c
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010
- **Test Name:** Accessibility Compliance Test for WCAG 2.1 AA
- **Test Code:** [TC010_Accessibility_Compliance_Test_for_WCAG_2.1_AA.py](./TC010_Accessibility_Compliance_Test_for_WCAG_2.1_AA.py)
- **Test Error:** Accessibility testing on homepage completed. Keyboard navigation confirmed all interactive elements reachable and usable via keyboard alone. ARIA labels, roles, and landmarks are missing, which is a WCAG 2.1 AA compliance issue. Color contrast check revealed multiple elements with insufficient contrast. No error messages or validation feedback found on homepage. Navigation to booking wizard page failed due to unclickable 'Book Now' button, blocking further testing. Reporting this issue and stopping further actions.
Browser Console Logs:
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
[WARNING] ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath. (at http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=fd8509a9:4412:12)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/982586ae-e107-46ae-af2d-e5da8f680618/1aaef5e6-83bc-4bb2-a96d-8512a66dc6f7
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **20.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---