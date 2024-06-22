import playButtonCircled from './icons/Play_Button_Circled.png';
import plus from './icons/Plus.png';
import rectangle_3 from './icons/Rectangle_3.png';
import loginSplitPic from './login/login-split-pic.png';
import successEmailOnForgot from './login/success-email-on-forgot.png';
import Cancel from './login/Cancel.png';
import Create from './icons/Create.png';
import sortDown from './icons/Sort_Down.png';
import Dashboard from './sidebar/Dashboard.png';
import Graph from './sidebar/Graph.png';
import People from './sidebar/People.png';
import Logout from './header/Logout Rounded.png';
import Upload from './JD/Upload.png';
import Empty_Insight from './JD/empty_insight.png';
import Empty_JD from './JD/empty_jd.png';
import JD_Logo from './JD/jd_logo.png';
import Time from './modules/Time.png';
import Assessments from './sidebar/Assessments.png';

const ICONS = {
  playButtonCircled,
  plus,
  rectangle_3,
  Create,
  sortDown,
};

const SIDEBAR = {
  Dashboard,
  People,
  Graph,
  Assessments,
};

const HEADER = {
  Logout,
};

const LOGIN = {
  loginSplitPic,
  successEmailOnForgot,
  Cancel,
};
const MODULES = {
  Time,
};

const JD = {
  Upload,
  Empty_Insight,
  Empty_JD,
  JD_Logo,
};

const IMAGES = {
  ...ICONS,
  ...SIDEBAR,
  ...LOGIN,
  ...HEADER,
  ...JD,
  ...MODULES,
};

export default IMAGES;
