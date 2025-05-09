//import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={48} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kambaz/Courses/1234/Home">
              CS1234 React JS
            </a>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <a href="#/Kambaz/Courses/1234/Home"> Go </a>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/nodejs.jpg" width={48} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1235/Home">
              CS1235 Node.js
            </a>
            <p className="wd-dashboard-course-title">
              Backend Development
            </p>
            <a href="#/Kanbas/Courses/1235/Home"> Go </a>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/mongodb.jpg" width={48} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1236/Home">
              CS1236 MongoDB
            </a>
            <p className="wd-dashboard-course-title">
              Database Management
            </p>
            <a href="#/Kanbas/Courses/1236/Home"> Go </a>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/express.jpg" width={48} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1237/Home">
              CS1237 Express.js
            </a>
            <p className="wd-dashboard-course-title">
              Web Application Framework
            </p>
            <a href="#/Kanbas/Courses/1237/Home"> Go </a>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/typescript.jpg" width={48} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1238/Home">
              CS1238 TypeScript
            </a>
            <p className="wd-dashboard-course-title">
              Type-safe JavaScript
            </p>
            <a href="#/Kanbas/Courses/1238/Home"> Go </a>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/aws.jpg" width={48} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1239/Home">
              CS1239 AWS
            </a>
            <p className="wd-dashboard-course-title">
              Cloud Computing
            </p>
            <a href="#/Kanbas/Courses/1239/Home"> Go </a>
          </div>
        </div>
      </div>
    </div>
  );
}
