import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    
    const [module, setModule] = useState({
        id: "CS5610",
        name: "Web Development",
        description: "Learn modern web development technologies",
        course: "CS5610"
    });

    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;
    
    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            
            {/* Assignment Section */}
            <h4>Assignment</h4>
            <h5>Modifying Properties</h5>
            <a id="wd-update-assignment-title"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <FormControl className="w-75" id="wd-assignment-title"
                defaultValue={assignment.title} onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })}/>
            <br />
            
            {/* Assignment Score */}
            <a id="wd-update-assignment-score"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <FormControl className="w-75" id="wd-assignment-score"
                type="number"
                value={assignment.score} 
                onChange={(e) =>
                setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })}/>
            <br />
            
            {/* Assignment Completed */}
            <a id="wd-update-assignment-completed"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                Update Completed
            </a>
            <div className="form-check w-75">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="wd-assignment-completed"
                    checked={assignment.completed}
                    onChange={(e) =>
                        setAssignment({ ...assignment, completed: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="wd-assignment-completed">
                    Completed
                </label>
            </div>
            <hr />
            
            <h5>Retrieving Objects</h5>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a><hr/>
            
            <h5>Retrieving Properties</h5>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a><hr/>
            
            {/* Module Section */}
            <h4>Module</h4>
            <h5>Modifying Properties</h5>
            <a id="wd-update-module-name"
                className="btn btn-primary float-end"
                href={`${MODULE_API_URL}/name/${module.name}`}>
                Update Name
            </a>
            <FormControl className="w-75" id="wd-module-name"
                defaultValue={module.name} onChange={(e) =>
                setModule({ ...module, name: e.target.value })}/>
            <br />
            
            <a id="wd-update-module-description"
                className="btn btn-primary float-end"
                href={`${MODULE_API_URL}/description/${module.description}`}>
                Update Description
            </a>
            <FormControl className="w-75" id="wd-module-description"
                as="textarea"
                rows={3}
                defaultValue={module.description} onChange={(e) =>
                setModule({ ...module, description: e.target.value })}/>
            <hr />
            
            <h5>Retrieving Objects</h5>
            <a id="wd-retrieve-modules" className="btn btn-primary me-2"
                href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a>
            <hr/>
            
            <h5>Retrieving Properties</h5>
            <a id="wd-retrieve-module-name" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Module Name
            </a><hr/>
        </div>
    );
}
