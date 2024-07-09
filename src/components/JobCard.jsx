import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import PropTypes from 'prop-types'; // ES6

const JobCard = ({ job }) => {
    const { user } = useAuth();
    const {
        _id,
        jobBannerUrl,
        jobTitle,
        userName,
        // userEmail,
        // jobCategory,
        salaryRange,
        // jobDescription,
        jobPostingDate,
        applicationDeadline,
        jobApplicantsNumber,
    } = job

    return (
        <div>
            <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
                <p className="w-fit absolute right-1 top-4 p-1 text-blue-700 text-sm font-bold rounded-lg bg-gray-200 group dark:bg-gray-600 dark:text-white">Application Deadine: {new Date(applicationDeadline).toLocaleDateString()}</p>
                <p>
                    <img className="p-8 rounded-t-lg" src={jobBannerUrl} alt="product image" />
                </p>
                <div className="px-5 pb-5">
                    <span className="text-base text-gray-500 dark:text-gray-400">Posted By: {userName}</span>
                    <p>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{jobTitle}</h5>
                    </p>

                    <p className="mt-2.5 mb-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 w-fit">Posting Date: {new Date(jobPostingDate).toLocaleDateString()}</p>
                    <p className="text-base font-medium text-blue-700 hover:underline dark:text-blue-500">Applicants Number: {jobApplicantsNumber}</p>

                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">${salaryRange}</span>
                        <Link onClick={() => user || toast.error('You have to log in first to view details')} to={`/job/${_id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Details</Link>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default JobCard;

JobCard.propTypes = {
    job: PropTypes.object,
}