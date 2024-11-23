import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Classes from "./Masterfilters/Classes/Classes";
import Addclasses from "./Masterfilters/Classes/Addclasses";
import Updateclasses from "./Masterfilters/Classes/Updateclasses";
import Books from "./Masterfilters/Books/Books";
import Logout from "./Access/Logout";
import Addbooks from "./Masterfilters/Books/Addbooks";
import Sections from "./Masterfilters/Sections/Sections";
import { encodeId } from "./Access/Encodedecode";
import Addsections from "./Masterfilters/Sections/Addsections";
import Units from "./Masterfilters/Units/Units";
import AddUnits from "./Masterfilters/Units/AddUnits";
import Chapters from "./Masterfilters/Chapters/Chapters";
import AddChapters from "./Masterfilters/Chapters/AddChapters";
import Subjects from "./Masterfilters/Subjects/Subjects";
import Addsubjects from "./Masterfilters/Subjects/Addsubjects";
import Updatesubject from "./Masterfilters/Subjects/Updatesubjects";
import Series from "./Masterfilters/Series/Series";
import AddSeries from "./Masterfilters/Series/Addseries";
import UpdateSeries from "./Masterfilters/Series/Updateseries";
import Addschools from "./Users/Schools/Addschools";
import Schools from "./Users/Schools/Schools";
import Addteachers from "./Users/Teachers/Addteachers";
import Teachers from "./Users/Teachers/Teachers";
import Addstudents from "./Users/Students/Addstudents";
import Students from "./Users/Students/Student";
import Login from "./Access/Login";
import Updatebooks from "./Masterfilters/Books/Updatebooks";
import Homepage from "./Dashboard/Homepage";
import Bookpages from "./Resources/Bookpages";
import Managebookpages from "./Resources/Managebookpages";
import Addbookpages from "./Resources/Addbookpages";
import Editbookpages from "./Resources/Editbookpages";
import Updateschools from "./Users/Schools/Updateschools";
import Updatesections from "./Masterfilters/Sections/Updatesections";
import Addlibrary from "./Resources/Addlibrary";
import Library from "./Resources/Library";
import { AuthProvider } from "./Access/AuthContext";
import PrivateRoute from "./Access/PrivateRoute";
import Updateteachers from "./Users/Teachers/Updateteachers";
import Assignbookteachers from "./Users/Teachers/Assignbookteachers";
import Assignbookschools from "./Users/Schools/Assignbookschools";
import Updatestudents from "./Users/Students/Updatestudents";
import Assignbookstudents from "./Users/Students/Assignbookstudents";
import Updateunits from "./Masterfilters/Units/Updateunits";
import Updatechapter from "./Masterfilters/Chapters/Updatechapter";
import Page from "./Access/Page";
import AddAboutUs from "./CMS/Aboutus/AddAboutUs";
import UpdateAboutUs from "./CMS/Aboutus/UpdateAboutUs";
import Addquestion from "./Resources/Addquestion";
import Questions from "./Resources/Questions";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <Page title="Login - Binary Education">
                <Login />
              </Page>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/homepage"
            element={
              <PrivateRoute>
                <Page title="Homepage - Binary Education">
                  <Homepage />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/addbooks"
            element={
              <PrivateRoute>
                <Page title="Books - Binary Education">
                  <Addbooks />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/addsections"
            element={
              <PrivateRoute>
                <Page title="Sections - Binary Education">
                  <Addsections />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/sections"
            element={
              <PrivateRoute>
                <Page title="Sections - Binary Education">
                  <Sections />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/addunits"
            element={
              <PrivateRoute>
                <Page title="Units - Binary Education">
                  <AddUnits />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/units"
            element={
              <PrivateRoute>
                <Page title="Units - Binary Education">
                  <Units />
                </Page>
              </PrivateRoute>
            }
          />

          <Route
            path="/addaboutus"
            element={
              <PrivateRoute>
                <Page title="About us - Binary Education">
                  <AddAboutUs />
                </Page>
              </PrivateRoute>
            }
          />

          <Route
            path="/updateaboutus"
            element={
              <PrivateRoute>
                <Page title="About us - Binary Education">
                  <UpdateAboutUs />
                </Page>
              </PrivateRoute>
            }
          />

          <Route
            path="/addchapters"
            element={
              <PrivateRoute>
                <Page title="Chapters - Binary Education">
                  <AddChapters />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/chapters"
            element={
              <PrivateRoute>
                <Page title="Chapters - Binary Education">
                  <Chapters />
                </Page>
              </PrivateRoute>
            }
          />

          <Route
            path="/books"
            element={
              <PrivateRoute>
                <Page title="Books - Binary Education">
                  <Books />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/addclasses"
            element={
              <PrivateRoute>
                <Page title="Classes - Binary Education">
                  <Addclasses />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/classes"
            element={
              <PrivateRoute>
                <Page title="Classes - Binary Education">
                  <Classes />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/updateclass/:id"
            element={
              <PrivateRoute>
                <Page title="Classes - Binary Education">
                  <Updateclasses />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/subjects"
            element={
              <PrivateRoute>
                <Page title="Subjects - Binary Education">
                  <Subjects />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/addsubjects"
            element={
              <PrivateRoute>
                <Page title="Subjects - Binary Education">
                  <Addsubjects />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/updatesubject/:id"
            element={
              <PrivateRoute>
                <Page title="Subjects - Binary Education">
                  <Updatesubject />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/series"
            element={
              <PrivateRoute>
                <Page title="Series - Binary Education">
                  <Series />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/addseries"
            element={
              <PrivateRoute>
                <Page title="Series - Binary Education">
                  <AddSeries />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/updateseries/:id"
            element={
              <PrivateRoute>
                <Page title="Series - Binary Education">
                  <UpdateSeries />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/addschools"
            element={
              <PrivateRoute>
                <Page title="Schools - Binary Education">
                  <Addschools />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/schools"
            element={
              <PrivateRoute>
                <Page title="Schools - Binary Education">
                  <Schools />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/addteachers"
            element={
              <PrivateRoute>
                <Page title="Teachers - Binary Education">
                  <Addteachers />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/teachers"
            element={
              <PrivateRoute>
                <Page title="Teachers - Binary Education">
                  <Teachers />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/addstudents"
            element={
              <PrivateRoute>
                <Page title="Students - Binary Education">
                  <Addstudents />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <Page title="Students - Binary Education">
                  <Students />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/updatebook/:id"
            element={
              <PrivateRoute>
                <Page title="Books - Binary Education">
                  <Updatebooks />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/bookpages"
            element={
              <PrivateRoute>
                <Page title="Bookpages - Binary Education">
                  <Bookpages />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/managebookpages/:book_id"
            element={
              <PrivateRoute>
                <Page title="Manage Book Page - Binary Education">
                  <Managebookpages />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/addbookpages/:book_id"
            element={
              <PrivateRoute>
                <Page title="Add Book Page - Binary Education">
                  <Addbookpages />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/updatebookpage/:page_id"
            element={
              <PrivateRoute>
                <Page title="Edit Book Page - Binary Education">
                  <Editbookpages />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/updateschools/:school_id"
            element={
              <PrivateRoute>
                <Page title="Schools - Binary Education">
                  <Updateschools />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/assignbookschools/:school_id"
            element={
              <PrivateRoute>
                <Page title="Assign Books - Binary Education">
                  <Assignbookschools />
                </Page>
              </PrivateRoute>
            }
          />

          <Route
            path="/addresources"
            element={
              <PrivateRoute>
                <Page title="Resource - Binary Education">
                  <Addlibrary />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/library"
            element={
              <PrivateRoute>
                <Page title="Library - Binary Education">
                  <Library />
                </Page>
              </PrivateRoute>
            }
          />

          <Route
            path="/addquestion"
            element={
              <PrivateRoute>
                <Page title="Add Question - Binary Education">
                  <Addquestion />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/updateteacher/:teacher_id"
            element={
              <PrivateRoute>
                <Page title="Teachers - Binary Education">
                  <Updateteachers />
                </Page>
              </PrivateRoute>
            }
          />

          <Route
            path="/updatestudents/:student_id"
            element={
              <PrivateRoute>
                <Page title="Students - Binary Education">
                  <Updatestudents />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/assignbookteacher/:teacher_id"
            element={
              <PrivateRoute>
                <Page title="Assign - Binary Education">
                  <Assignbookteachers />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/assignbookstudent/:student_id"
            element={
              <PrivateRoute>
                <Page title="Assign - Binary Education">
                  <Assignbookstudents />
                </Page>
              </PrivateRoute>
            }
          />
          <Route
            path="/updatesection/:section_id"
            element={
              <PrivateRoute>
                <Page title="Sections - Binary Education">
                  <Updatesections />
                </Page>
              </PrivateRoute>
            }
          />

          <Route
            path="/updateunit/:unit_id"
            element={
              <PrivateRoute>
                <Page title="Units - Binary Education">
                  <Updateunits />
                </Page>
              </PrivateRoute>
            }
          />

          <Route
            path="/updatechapter/:chapter_id"
            element={
              <PrivateRoute>
                <Page title="Chapters - Binary Education">
                  <Updatechapter />
                </Page>
              </PrivateRoute>
            }
          />

          <Route
            path="/question-bank"
            element={
              <PrivateRoute>
                <Page title="Chapters - Binary Education">
                  <Questions />
                </Page>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
