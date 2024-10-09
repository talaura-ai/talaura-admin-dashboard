import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import AssessmentPage from '../../components/Assessment/AssessmentPage';
import AssessmentView from '../../components/AssessmentView';
import CandidateView from '../../components/CandidateView';
import CreateAssessment from '../../components/CreateAssessment';
import ErrorPage from '../../components/Error/ErrorPage';
import Home from '../../components/Home/Home';
import InviteCandidate from '../../components/InviteCandidate';
import ForgotPassword from '../../components/Login/ForgotPassword';
import Login from '../../components/Login/Login';
import Peoples from '../../components/Peoples/Peoples';
import Reports from '../../components/Reports/Reports';
import Sidebar from './Sidebar';

import CreateJD from '../../components/Assessment/CreateJD';
import AddJd from '../../components/Assessment/AddJd';

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
          path="login"
          element={<Login />}
          loader={redirectIfUser}
          errorElement={<ErrorPage />}
          index
        />
        <Route path="forgot-password" element={<ForgotPassword />} errorElement={<ErrorPage />} />
        <Route path="logout" action={() => true} errorElement={<ErrorPage />} />
        <Route
          path="/"
          element={<Sidebar />}
          errorElement={<ErrorPage />}
          loader={redirectIfUserLogout}
        >
          <Route element={<Home />} errorElement={<ErrorPage />} index />
          <Route path="assessments" element={<AssessmentPage />} errorElement={<ErrorPage />} />
          <Route
            path="assessments/create"
            element={<CreateAssessment />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="assessment/view/:assessmentId"
            element={<AssessmentView />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="assessment/view/:assessmentId/candidate/:candidateId"
            element={<CandidateView />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="assessments/view/:assessmentId/invite"
            element={<InviteCandidate />}
            errorElement={<ErrorPage />}
          />
          <Route path="peoples" element={<Peoples />} errorElement={<ErrorPage />} />
          <Route path="reports" element={<Reports />} errorElement={<ErrorPage />} />
          {/* Below this pages added recently */}
          <Route path="assessments/test" element={<CreateJD />} errorElement={<ErrorPage />} />
          <Route path="assessments/test2" element={<AddJd />} errorElement={<ErrorPage />} />
        </Route>
      </>,
    ),
  );
  return <RouterProvider router={appRouter} />;
};

export default Root;
