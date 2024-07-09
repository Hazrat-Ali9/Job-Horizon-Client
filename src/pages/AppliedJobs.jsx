import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState } from "react";
import AppliedJobsPDF from "../components/AppliedJobsPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Helmet } from "react-helmet";



const AppliedJobs = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [filter, setFilter] = useState('');
    const [showDownloadLink, setShowDownloadLink] = useState(false)
    const handleCategoryFilter = (e) => {
        e.preventDefault();
        refetch();
    }

    const { data: jobs = [], isLoading, refetch, isFetching } = useQuery({
        queryKey: ['applied-jobs'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/applied-jobs/${user.email}?filter=${filter}`)
            return data;
        }
    })

    if (isLoading) {
        return <div className='text-center my-12'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }


    const handleGeneratePDF = () => {
        setShowDownloadLink(true);
    };

    return (

        <div>
            <Helmet>
                <title>JobHorizon | My Applied Jobs</title>
            </Helmet>

            <div className="flex flex-col justify-center items-center">
                <form
                    onSubmit={handleCategoryFilter}
                    className=" my-4 flex justify-center items-center">
                    <select
                        onChange={e => {
                            setFilter(e.target.value)
                        }}
                        type="text"
                        id="jobCategory"
                        name="jobCategory"
                        defaultValue={''}
                        className="mt-1 w-52 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                        <option value="">All Category</option>
                        <option value='On-Site Job'>On-Site Job</option>
                        <option value='Remote Job'>Remote Job</option>
                        <option value='Hybrid'>Hybrid</option>
                        <option value='Part-Time'>Part-Time</option>
                    </select>
                    <button
                        className="inline-block rounded bg-indigo-600 px-4 py-2 ml-4 text-xs font-medium text-white hover:bg-indigo-700">
                        Apply
                    </button>
                </form>

                {/* Button to trigger PDF generation */}
                <button
                    className="inline-block rounded bg-indigo-600 px-4 py-2 mt-4 text-xs font-medium text-white hover:bg-indigo-700"
                    onClick={handleGeneratePDF}>Generate Summary PDF</button>

                {/* Conditionally render the download link when PDF is ready */}
                {showDownloadLink && (
                    <PDFDownloadLink
                        className="inline-block rounded bg-indigo-600 px-4 py-2 mt-4 text-xs font-medium text-white hover:bg-indigo-700"
                        document={<AppliedJobsPDF jobs={jobs} />}
                        fileName={`${user?.displayName}'s Applied Jobs.pdf`}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download now!'
                        }
                    </PDFDownloadLink>
                )}
            </div>


            {
                isFetching && <div className='text-center my-12'>
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            }

            <div
                id="container"
                className={`className = overflow-x-auto max-w-5xl mx-auto ${isFetching ? 'hidden' : ''}`
                }>
                <table
                    className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900"
                >
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Job Title</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                Application Deadline
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Job Category</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                Salary range
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                Applicant Name
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                Applicant Email
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                Resume Link
                            </th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            jobs.map(job => (
                                <tr key={job._id}>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                        {job.jobTitle}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{new Date(job.applicationDeadline).toLocaleDateString()}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{job.jobCategory}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">${job.salaryRange}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{job.application.applicantUserName}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{job.application.applicantUserEmail}</td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <a
                                            href={job.application.resumeLink}
                                            target="_blank"
                                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                                            Resume
                                        </a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppliedJobs;