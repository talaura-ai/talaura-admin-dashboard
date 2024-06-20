import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Sidebar from './Sidebar';
import ErrorPage from '../../components/Error/ErrorPage';
import Home from '../../components/Home/Home';
import AssessmentPage from '../../components/Assessment/AssessmentPage';
import CreateAssessment from '../../components/Assessment/CreateAssessment';
import Peoples from '../../components/Peoples/Peoples';
import Reports from '../../components/Reports/Reports';
import { useAppSelector } from '../../app/hooks';
import Login from '../../components/Login/Login';
import ForgotPassword from '../../components/Login/ForgotPassword';
import AssessmentView from '../../components/Assessment/AssessmentView';
import CandidateView from '../../components/Assessment/CandidateView';
import InviteCandidate from '../../components/Assessment/InviteCandidate';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Sidebar />,
//     errorElement: <ErrorPage />,
//     loader: Loader,

//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "/assessment",
//         element: <AssessmentPage />,

//       },
//       {
//         path: "/assessment/create",
//         element: <CreateAssessment />
//       },
//       {
//         path: "/peoples",
//         element: <Peoples />,

//       },
//       {
//         path: "/reports",
//         element: <Reports />,

//       },
//     ]
//   },
//   {
//     path: "/login",
//     element: <Login />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/forgot-password",
//     element: <ForgotPassword />,
//     errorElement: <ErrorPage />,
//   }

// ]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
// <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
//     <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
//     <Route path="/forgot" element={<Login />} errorElement={<ErrorPage />} />
//     </Route>

//     // <Route path="/" element={<Sidebar />} errorElement={<ErrorPage />}>

//     //   <Route path="dashboard" element={<Home />} />
//     //   <Route path="assessment" element={<AssessmentPage />} />
//     //   <Route path="assessment/create" element={<CreateAssessment />} />
//     //   <Route path="peoples" element={<Peoples />} />
//     //   <Route path="reports" element={<Reports />} />
//     // </Route>
//   )
// );

const Root = () => {
  const { token } = useAppSelector((state) => state.admin);
  const redirectIfUser = () => {
    if (token) throw redirect('/');

    return null;
  };

  const redirectIfUserLogout = () => {
    if (!token) throw redirect('/login');

    return null;
  };

  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path='login'
          element={<Login />}
          loader={redirectIfUser}
          errorElement={<ErrorPage />}
          index
        />
        <Route
          path='forgot-password'
          element={<ForgotPassword />}
          errorElement={<ErrorPage />}
        />
        <Route path='logout' action={() => true} errorElement={<ErrorPage />} />
        <Route
          path='/'
          element={<Sidebar />}
          errorElement={<ErrorPage />}
          loader={redirectIfUserLogout}>
          <Route element={<Home />} errorElement={<ErrorPage />} index />
          <Route
            path='assessments'
            element={<AssessmentPage />}
            errorElement={<ErrorPage />}
          />
          <Route
            path='assessments/create'
            element={<CreateAssessment />}
            errorElement={<ErrorPage />}
          />
          <Route
            path='assessment/view/:assessmentId'
            element={<AssessmentView />}
            errorElement={<ErrorPage />}
          />
          <Route
            path='assessment/view/:assessmentId/candidate/:candidateId'
            element={<CandidateView />}
            errorElement={<ErrorPage />}
          />
          <Route
            path='assessments/view/:assessmentId/invite'
            element={<InviteCandidate />}
            errorElement={<ErrorPage />}
          />
          <Route
            path='peoples'
            element={<Peoples />}
            errorElement={<ErrorPage />}
          />
          <Route
            path='reports'
            element={<Reports />}
            errorElement={<ErrorPage />}
          />
        </Route>
      </>
    )
  );
  return <RouterProvider router={appRouter} />;
};

export default Root;
